import { TYPES } from '../constants';
import { IBurnTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';


const burnTransform: any = {
    ...getDefaultTransform(),
    assetId: pipe<TDCCGuiBurn, string, string>(
        ifElse<TDCCGuiBurn, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop<IDCCGuiBurnMoney, 'quantity'>('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TDCCGuiBurn, TMoney | TLong, string>(prop('quantity'), getCoins),
    chainId: (prop as any)('chainId')
};

export const burn = factory<TDCCGuiBurn, TWithPartialFee<IBurnTransaction<string>>>(burnTransform as any);

export interface IDCCGuiBurnMoney extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TMoney;
    chainId: number;
}

export interface IDCCGuiBurnLong extends IDefaultGuiTx<typeof TYPES.BURN> {
    quantity: TLong;
    assetId: string;
    chainId: number;
}

export type TDCCGuiBurn = IDCCGuiBurnMoney | IDCCGuiBurnLong;

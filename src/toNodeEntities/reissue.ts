import { TYPES } from '../constants';
import { IReissueTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, pipe, prop } from '../utils';

export const reissue = factory<TDCCGuiReissue, TWithPartialFee<IReissueTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<TDCCGuiReissue, string, string>(
        ifElse<TDCCGuiReissue, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, TMoney, string>(
                prop('quantity'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    quantity: pipe<TDCCGuiReissue, TMoney | TLong, string>(prop('quantity'), getCoins),
    reissuable: prop('reissuable'),
    chainId: prop('chainId'),
});

export interface IDCCGuiReissueMoney extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    quantity: TMoney;
    reissuable: boolean;
    chainId: number;
}

export interface IDCCGuiReissueLong extends IDefaultGuiTx<typeof TYPES.REISSUE> {
    assetId: string;
    quantity: TLong;
    reissuable: boolean;
    chainId: number;
}

export type TDCCGuiReissue = IDCCGuiReissueMoney | IDCCGuiReissueLong;

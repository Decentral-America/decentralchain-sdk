import { TYPES } from '../constants';
import { IMassTransferItem, IMassTransferTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { emptyError, getAssetId, getCoins, has, ifElse, map, pipe, prop } from '../utils';


const remapTransferItem = factory<IDCCGuiMassTransferItem<TMoney | TLong>, IMassTransferItem<string>>({
    recipient: prop('recipient'),
    amount: pipe<IDCCGuiMassTransferItem<TMoney | TLong>, TMoney | TLong, string>(prop('amount'), getCoins)
});

const getFirstMassTransferItem = (list: Array<IDCCGuiMassTransferItem<TMoney>>): IDCCGuiMassTransferItem<TMoney> => {
    if (!list.length) {
        throw new Error('MassTransfer transaction must have one transfer!');
    }
    return list[0];
};

export const massTransfer = factory<TDCCGuiMassTransfer, TWithPartialFee<IMassTransferTransaction<string>>>({
    ...getDefaultTransform(),
    transfers: pipe(prop('transfers'), map(remapTransferItem)),
    assetId: pipe<TDCCGuiMassTransfer, string, string>(
        ifElse<TDCCGuiMassTransfer, string, string>(
            has('assetId'),
            prop<any, 'assetId'>('assetId'),
            pipe<any, Array<IDCCGuiMassTransferItem<TMoney>>, IDCCGuiMassTransferItem<TMoney>, TMoney, string>(
                prop<any, 'transfers'>('transfers'),
                getFirstMassTransferItem,
                prop<IDCCGuiMassTransferItem<TMoney>, 'amount'>('amount'),
                getAssetId
            )
        ),
        emptyError('Has no assetId!')
    ),
    attachment: prop('attachment')
});

export interface IDCCGuiMassTransferMoney extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment: string;
    transfers: Array<IDCCGuiMassTransferItem<TMoney>>;
}

export interface IDCCGuiMassTransferLong extends IDefaultGuiTx<typeof TYPES.MASS_TRANSFER> {
    attachment: string;
    assetId: string;
    transfers: Array<IDCCGuiMassTransferItem<TLong>>;
}

export type TDCCGuiMassTransfer = IDCCGuiMassTransferMoney | IDCCGuiMassTransferLong;

interface IDCCGuiMassTransferItem<T extends TMoney | TLong> {
    recipient: string;
    amount: T;
}

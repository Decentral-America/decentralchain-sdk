import { TYPES } from '../constants';
import { ITransferTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TLong, TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { defaultTo, getAssetId, getCoins, pipe, prop } from '../utils';


export const transfer = factory<IDCCGuiTransfer, TWithPartialFee<ITransferTransaction<string>>>({
    ...getDefaultTransform(),
    recipient: prop('recipient'),
    amount: pipe<IDCCGuiTransfer, TMoney, string>(prop('amount'), getCoins),
    feeAssetId: pipe<IDCCGuiTransfer, TMoney | TLong | undefined | null, string | null, string>(prop('fee'), getAssetId, defaultTo('DCC')),
    assetId: pipe(prop('amount'), getAssetId),
    attachment: pipe(prop('attachment'), defaultTo('')),
});

export interface IDCCGuiTransfer extends IDefaultGuiTx<typeof TYPES.TRANSFER> {
    recipient: string;
    amount: TMoney;
    attachment?: string;
}

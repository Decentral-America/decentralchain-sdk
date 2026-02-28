import { TYPES } from '../constants';
import { ILeaseTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, pipe, prop } from '../utils';


export const lease = factory<IDCCGuiLease, TWithPartialFee<ILeaseTransaction<string>>>({
    ...getDefaultTransform(),
    amount: pipe<IDCCGuiLease, TMoney, string>(prop('amount'), getCoins),
    recipient: prop('recipient')
});

export interface IDCCGuiLease extends IDefaultGuiTx<typeof TYPES.LEASE> {
    amount: TMoney;
    recipient: string;
}
import { alias, IDCCGuiAlias } from './alias';
import { burn, TDCCGuiBurn } from './burn';
import { cancelLease, IDCCGuiCancelLease } from './cancelLease';
import { data, IDCCGuiData } from './data';
import { exchange, remapOrder as order, IDCCGuiExchangeOrder, IDCCGuiExchange } from './exchange';
import { issue, IDCCGuiIssue } from './issue';
import { reissue, TDCCGuiReissue } from './reissue';
import { lease, IDCCGuiLease } from './lease';
import { massTransfer, TDCCGuiMassTransfer } from './massTransfer';
import { setAssetScript, IDCCGuiSetAssetScript } from './setAssetScript';
import { setScript, IDCCGuiSetScript } from './setScript';
import { sponsorship, IDCCGuiSponsorship } from './sponsorship';
import { transfer, IDCCGuiTransfer } from './transfer';
import {
    IExchangeTransactionOrderWithProofs, ISponsorshipTransaction,
    TTransaction,
    TTransactionMap
} from '@decentralchain/ts-types';
import { TYPES } from '../constants';
import { TWithPartialFee } from '../types';
import { isOrder } from '../utils';
import { invokeScript, IDCCGuiInvokeScript } from './invokeScript';
import { updateAssetInfo, IDCCGuiUpdateAssetInfo } from "./updateAssetInfo";


export const node = {
    alias, burn, cancelLease,
    data, exchange, issue,
    reissue, lease, massTransfer,
    setAssetScript, setScript, sponsorship,
    transfer, order, invokeScript,
    updateAssetInfo
};

export {
    IDCCGuiAlias,
    TDCCGuiBurn,
    IDCCGuiCancelLease,
    IDCCGuiData,
    IDCCGuiExchange,
    IDCCGuiIssue,
    TDCCGuiReissue,
    IDCCGuiLease,
    TDCCGuiMassTransfer,
    IDCCGuiSetAssetScript,
    IDCCGuiSetScript,
    IDCCGuiSponsorship,
    IDCCGuiTransfer,
};

export function toNode(item: IDCCGuiExchangeOrder): IExchangeTransactionOrderWithProofs<string>;
export function toNode<TX extends TDCCGuiEntity, TYPE extends TX['type'] = TX['type']>(item: TX): TWithPartialFee<TTransactionMap<string>[TYPE]>;
export function toNode(item: TDCCGuiEntity | IDCCGuiExchangeOrder): TWithPartialFee<TTransaction<string>> | IExchangeTransactionOrderWithProofs<string> {

    if (isOrder(item)) {
        return order(item);
    }

    switch (item.type) {
        case TYPES.ISSUE:
            return issue(item);
        case TYPES.TRANSFER:
            return transfer(item);
        case TYPES.REISSUE:
            return reissue(item);
        case TYPES.BURN:
            return burn(item);
        case TYPES.EXCHANGE:
            return exchange(item);
        case TYPES.LEASE:
            return lease(item);
        case TYPES.CANCEL_LEASE:
            return cancelLease(item);
        case TYPES.ALIAS:
            return alias(item);
        case TYPES.MASS_TRANSFER:
            return massTransfer(item);
        case TYPES.DATA:
            return data(item);
        case TYPES.SET_SCRIPT:
            return setScript(item);
        case TYPES.SPONSORSHIP:
            return sponsorship(item) as ISponsorshipTransaction<string>;
        case TYPES.SET_ASSET_SCRIPT:
            return setAssetScript(item);
        case TYPES.INVOKE_SCRIPT:
            return invokeScript(item);
        case TYPES.UPDATE_ASSET_INFO:
            return updateAssetInfo(item);
        default:
            throw new Error('Unknown transaction type!');
    }
}


export type TDCCGuiEntity = IDCCGuiAlias
    | TDCCGuiBurn
    | IDCCGuiCancelLease
    | IDCCGuiData
    | IDCCGuiExchange
    | IDCCGuiIssue
    | TDCCGuiReissue
    | IDCCGuiLease
    | TDCCGuiMassTransfer
    | IDCCGuiSetAssetScript
    | IDCCGuiSetScript
    | IDCCGuiSponsorship
    | IDCCGuiTransfer
    | IDCCGuiInvokeScript
    | IDCCGuiUpdateAssetInfo;

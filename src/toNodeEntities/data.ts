import { TYPES } from '../constants';
import { DATA_FIELD_TYPE, IDataTransaction, TDataTransactionEntry } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TLong, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getCoins, map, pipe, prop } from '../utils';


const parseValueByType = (item: TDCCGuiDataTransactionEntry): TDataTransactionEntry<string>['value'] | null => {
    switch (item.type) {
        case DATA_FIELD_TYPE.BINARY:
        case DATA_FIELD_TYPE.STRING:
        case DATA_FIELD_TYPE.BOOLEAN:
            return item.value;
        case DATA_FIELD_TYPE.INTEGER:
            return getCoins(item.value);
        default:
            return null
    }
};

const remapDataEntryItem = (item: TDCCGuiDataTransactionEntry): TDataTransactionEntry<string> => ({
    key: prop('key', item),
    type: prop('type', item),
    value: parseValueByType(item)
}) as TDataTransactionEntry<string>;

export const data = factory<IDCCGuiData, TWithPartialFee<IDataTransaction<string>>>({
    ...getDefaultTransform(),
    data: pipe(prop('data'), map(remapDataEntryItem))
});

export interface IDCCGuiData extends IDefaultGuiTx<typeof TYPES.DATA> {
    data: Array<TDCCGuiDataTransactionEntry>;
}

type TDCCGuiDataTransactionEntry =
    IDCCGuiDataTransactionEntryInteger |
    IDCCGuiDataTransactionEntryBoolean |
    IDCCGuiDataTransactionEntryString |
    IDCCGuiDataTransactionEntryBinary |
    IDCCGuiDataTransactionEntryEmpty;

interface IDCCGuiDataTransactionEntryInteger {
    key: string;
    type: typeof DATA_FIELD_TYPE.INTEGER;
    value: TLong;
}

interface IDCCGuiDataTransactionEntryBoolean {
    key: string;
    type: typeof DATA_FIELD_TYPE.BOOLEAN;
    value: boolean | null;
}

interface IDCCGuiDataTransactionEntryString {
    key: string;
    type?: typeof DATA_FIELD_TYPE.STRING;
    value: string;
}

interface IDCCGuiDataTransactionEntryBinary {
    key: string;
    type?: typeof DATA_FIELD_TYPE.BINARY;
    value: string;
}


interface IDCCGuiDataTransactionEntryEmpty {
    key: string;
    type?: undefined;
    value: null|undefined;
}

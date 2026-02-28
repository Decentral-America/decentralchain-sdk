import { TYPES } from '../constants';
import { ISetAssetScriptTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { prop } from '../utils';
import { TWithPartialFee } from '../types';


export const setAssetScript = factory<IDCCGuiSetAssetScript, TWithPartialFee<ISetAssetScriptTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: prop('assetId'),
    script: prop('script'),
    chainId: prop('chainId'),
});

export interface IDCCGuiSetAssetScript extends IDefaultGuiTx<typeof TYPES.SET_ASSET_SCRIPT> {
    assetId: string;
    script: string;
    chainId: number;
}
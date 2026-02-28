import { TYPES } from '../constants';
import { ISponsorshipTransaction } from '@decentralchain/ts-types';
import { factory } from '../core/factory';
import { TMoney, TWithPartialFee } from '../types';
import { getDefaultTransform, IDefaultGuiTx } from './general';
import { getAssetId, getCoins, ifElse, isStopSponsorship, pipe, prop } from '../utils';

export interface IUpdatedISponsorshipTransaction<LONG> extends Omit<ISponsorshipTransaction<LONG>, 'minSponsoredAssetFee'> {
    minSponsoredAssetFee: LONG | null;
}

export const sponsorship = factory<IDCCGuiSponsorship, TWithPartialFee<IUpdatedISponsorshipTransaction<string>>>({
    ...getDefaultTransform(),
    assetId: pipe<IDCCGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getAssetId),
    minSponsoredAssetFee: ifElse(
        pipe<IDCCGuiSponsorship, TMoney, string, boolean>(prop('minSponsoredAssetFee'), getCoins, isStopSponsorship),
        () => null,
        pipe<IDCCGuiSponsorship, TMoney, string>(prop('minSponsoredAssetFee'), getCoins)
    )
});

export interface IDCCGuiSponsorship extends IDefaultGuiTx<typeof TYPES.SPONSORSHIP> {
    minSponsoredAssetFee: TMoney;
}

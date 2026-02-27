# @decentralchain/assets-pairs-order

Utility for determining the correct ordering of asset pairs on the DecentralChain DEX.

When trading Asset A for Asset B, the DEX needs to know which is the "amount asset" and which is the "price asset." This library resolves that ordering based on a configurable priority list.

## Installation

```bash
npm install @decentralchain/assets-pairs-order
```

## Usage

```javascript
import { createOrderPair, MAINNET_DATA } from '@decentralchain/assets-pairs-order';

const orderPair = createOrderPair(MAINNET_DATA);

const [amountAsset, priceAsset] = orderPair(
  'DNhP2zAH5HM1kdUSmxcBqs8RP4vvUgRFc1YgAKkfPmPD',
  'FxSm86qcEw8wGfpX3T7X5fsnuK5XxYA6ZfVYJja29vMA'
);
```

## API

### `createOrderPair(data)`

Creates an ordering function from a priority list.

- **`data`** — Array of asset ID strings defining asset priority (highest priority = highest index).
- **Returns** — A function `(assetId1, assetId2) => [amountAsset, priceAsset]`

### `MAINNET_DATA`

Pre-configured priority list for DecentralChain mainnet.

### `TESTNET_DATA`

Pre-configured priority list for DecentralChain testnet.

### `ARBITRARY_DATA`

Additional asset ordering data.

## Browser

For browser usage, include `dist/browser.js`.

## License

MIT

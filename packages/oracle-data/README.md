# @decentralchain/oracle-data

Oracle data parsing and encoding utilities for the DecentralChain blockchain.

Provides structured access to on-chain oracle data entries — defining how oracle key-value data is encoded, decoded, and validated.

## Installation

```bash
npm install @decentralchain/oracle-data
```

## Usage

```typescript
import {
  getProviderData,
  getProviderAssets,
  getFieldsFromData,
  getFieldsFromAsset,
  getFieldsDiff,
  isProvider
} from '@decentralchain/oracle-data';

// Parse oracle provider data from on-chain data transaction fields
const providerData = getProviderData(dataTxFields);

// Parse oracle asset data
const assets = getProviderAssets(dataTxFields);

// Convert provider data back to data transaction fields
const fields = getFieldsFromData(providerData.content);

// Get the diff between two sets of data transaction fields
const diff = getFieldsDiff(oldFields, newFields);

// Check if a set of data transaction fields represents a provider
const provider = isProvider(dataTxFields);
```

## API

- **`getProviderData(dataTxFields)`** — Parse oracle provider data from data transaction fields
- **`getProviderAssets(dataTxFields)`** — Parse oracle asset data from data transaction fields
- **`getFieldsFromData(data)`** — Convert provider data to data transaction fields
- **`getFieldsFromAsset(data)`** — Convert asset data to data transaction fields
- **`getFieldsDiff(oldFields, newFields)`** — Get the diff between two sets of fields
- **`isProvider(dataTxFields)`** — Check if data transaction fields represent a provider

## License

MIT

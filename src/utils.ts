import { BigNumber } from '@decentralchain/bignumber';

/**
 * Convert a value to a BigNumber instance.
 *
 * If the value is already a BigNumber, it is returned as-is.
 * Otherwise, a new BigNumber is constructed from the given string or number.
 *
 * @param some - A string, number, or BigNumber value to convert.
 * @returns A BigNumber instance representing the given value.
 * @throws {Error} If the resulting BigNumber is NaN or not finite.
 */
export function toBigNumber(some: string | number | BigNumber): BigNumber {
  const result = some instanceof BigNumber ? some : new BigNumber(some);
  if (result.isNaN()) {
    throw new Error(`Invalid numeric value: ${String(some)} — cannot convert to BigNumber`);
  }
  if (!result.isFinite()) {
    throw new Error(`Non-finite numeric value: ${String(some)} — Infinity is not allowed`);
  }
  return result;
}

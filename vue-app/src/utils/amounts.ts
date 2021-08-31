import { BigNumber, BigNumberish, FixedNumber } from 'ethers'
import { commify, formatUnits } from '@ethersproject/units'

export function formatAmount(value: BigNumber, decimals: number): string {
  return FixedNumber.fromValue(value, decimals).toString()
}

export function renderTokenAmount(
  amount: BigNumber,
  maxDecimals: number,
  unitName: BigNumberish = 18
): string {
  // Convert smaller units (really large integers) to whole AOE balance (human readable floats)
  const formatted: string = formatUnits(amount, unitName).toString()
  // Parse string into float, fix to maxDecimals, then parse again to remove any trailing zeros
  const result = parseFloat(parseFloat(formatted).toFixed(maxDecimals))
  // Return "commified" result for human readability
  return commify(result)
}

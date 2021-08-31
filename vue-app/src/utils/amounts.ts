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
  let result: string

  // Convert smaller units (really large integers) to whole AOE balance (human readable floats)
  let unitsFormatted: string = formatUnits(amount, unitName).toString()
  // Whole numbers return with single trailing zero decimal; remove this
  if (unitsFormatted.substring(unitsFormatted.length - 2) === '.0') {
    unitsFormatted = unitsFormatted.substring(0, unitsFormatted.length - 2)
  }
  // Truncate decimals
  const decimalIndex = unitsFormatted.indexOf('.')
  if (decimalIndex < 0) {
    result = unitsFormatted
  } else {
    const leftOfDecimal = unitsFormatted.substring(0, decimalIndex)
    const rightOfDecimal = unitsFormatted.substring(decimalIndex + 1)
    if (rightOfDecimal.length > maxDecimals) {
      result = leftOfDecimal + '.' + rightOfDecimal.substring(0, maxDecimals)
    } else {
      result = unitsFormatted
    }
  }
  // Return "commified" result for human readability
  return commify(result)
}

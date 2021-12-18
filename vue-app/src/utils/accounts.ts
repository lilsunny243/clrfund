import { ethers } from 'ethers'
import { mainnetProvider } from '@/api/core'
import { isAddress } from '@ethersproject/address'
import axios from 'axios'
import { ipfsGatewayUrl } from '@/api/core'

export function isSameAddress(address1: string, address2: string): boolean {
  return ethers.utils.getAddress(address1) === ethers.utils.getAddress(address2)
}

// Looks up possible ENS for given 0x address
export async function ensLookup(address: string): Promise<string | null> {
  const name: string | null = await mainnetProvider.lookupAddress(address)
  return name
}

// Returns null if the name passed is a 0x address
// If name is valid ENS returns 0x address, else returns null
export async function resolveEns(name: string): Promise<string | null> {
  if (isAddress(name)) return null
  return await mainnetProvider.resolveName(name)
}

// Returns true if address is valid ENS or 0x address
export async function isValidEthAddress(address: string): Promise<boolean> {
  const resolved = await mainnetProvider.resolveName(address)
  return !!resolved
}

export async function get3BoxAvatarUrl(
  address: string
): Promise<string | null> {
  const threeBoxProfileUrl = `https://ipfs.3box.io/profile?address=${address}`
  try {
    const { data } = await axios.get(threeBoxProfileUrl)
    const profileImageHash = data.image[0].contentUrl['/']
    return `${ipfsGatewayUrl}/ipfs/${profileImageHash}`
  } catch (error) {
    return null
  }
}

export function renderAddressOrHash(
  address: string,
  digitsToShow?: number
): string {
  if (digitsToShow) {
    const beginDigits: number = Math.ceil(digitsToShow / 2)
    const endDigits: number = Math.floor(digitsToShow / 2)
    const begin: string = address.substr(0, 2 + beginDigits)
    const end: string = address.substr(address.length - endDigits, endDigits)
    return `${begin}…${end}`
  }
  return address
}

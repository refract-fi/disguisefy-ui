import { provider } from "utils/provider";
import { isAddress } from '@ethersproject/address'

export const isENS = async (address) => {
    if (!!address == false) {
      console.log("[ERROR - EMPTY] Not a valid address")
      return null
    }
    if (!(address.includes('.'))) {
      console.log("[ERROR - ENS WITHOUT PERIOD OR ADDRESS INVALID] Not a valid address")
      return null
    }
    try {
      const resolvedAddress = await provider.resolveName(address)
      if (resolvedAddress && isAddress(resolvedAddress)) {
        return resolvedAddress
      } else {
        console.log("[ERROR - ENS RESOLVED FALSE] Not a valid address")
        return null
      }
    } catch (e) {
      console.log(`[ERROR - ${e}] Request to resolve ENS failed`)
      return null
    }
  }
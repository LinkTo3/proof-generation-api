/* eslint-disable no-undef */
import config from '../config/globals'
import { InfoError } from '../helpers/errorHelper'
import errorTypes from '../config/errorTypes'
import logger from '../config/logger'

function getBridgeAPIUrl(network) {
  switch (network) {
    case 'mainnet':
    case 'cherry':
      return config.app.zkEVMMainnetURL
    case 'testnet':
    case 'blueberry':
      return config.app.zkEVMTestnetURL
    case 'cardona':
      return config.app.zkEVMNewTestnetURL
    default:
      return config.app.zkEVMMainnetURL
  }
}

/**
 *
 * @param {number} networkID
 * @param {number} depositCount
 * @param {string} network
 * @returns
 */
export async function bridge(networkID, depositCount, network) {
  const zkEVMURL = getBridgeAPIUrl(network)

  const response = await fetch(
    `${zkEVMURL}/bridge?net_id=${networkID}&deposit_cnt=${depositCount}`
  )
  const data = await response.json()

  if (response.status !== 200) {
    logger.info(`Error hitting ${zkEVMURL} bridge with networkId ${networkID} and deposit count ${depositCount} - ${JSON.stringify(data)}`)
    throw new InfoError(errorTypes.ZKEVMError, data.message)
  }
  return data
}

/**
 *
 * @param {number} networkID
 * @param {number} depositCount
 * @param {string} network
 * @returns
 */
export async function merkelProofGenerator(networkID, depositCount, network) {
  const zkEVMURL = getBridgeAPIUrl(network)

  const response = await fetch(
    `${zkEVMURL}/merkle-proof?net_id=${networkID}&deposit_cnt=${depositCount}`
  )
  const data = await response.json()

  if (response.status !== 200) {
    logger.info(`Error hitting ${zkEVMURL} merkle proof with networkId ${networkID} and deposit count ${depositCount} - ${JSON.stringify(data)}`)
    throw new InfoError(errorTypes.ZKEVMError, data.message)
  }
  return data
}

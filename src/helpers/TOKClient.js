import { Converter, POSClient, use } from '@TOKnetwork/TOKjs'
import { Web3ClientPlugin } from '@TOKnetwork/TOKjs-web3'

// install web3 plugin
use(Web3ClientPlugin)

// get TOK and TOKPoS clients from TOKjs
async function initTOK(isMainnet, version, TOKRPC, ethereumRPC) {
  const _network = isMainnet ? 'mainnet' : 'testnet'

  const TOKConfig = {
    network: _network,
    version: version,
    parent: {
      provider: ethereumRPC,
      defaultConfig: {}
    },
    child: {
      provider: TOKRPC,
      defaultConfig: {}
    },
    rootChainDefaultBlock: 'latest'
  }
  const posClient = new POSClient()
  await posClient.init(TOKConfig)
  return posClient
}

async function convert(value) {
  return Converter.toHex(value)
}

export { initTOK, convert }

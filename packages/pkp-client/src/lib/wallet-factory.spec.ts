import { PKPCosmosWallet } from '@lit-protocol/pkp-cosmos';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';
import { WalletFactory } from './wallet-factory';

import * as LITCONFIG from 'lit.config.json';
import { PKPCosmosWalletProp, PKPEthersWalletProp } from '@lit-protocol/types';

describe('WalletFactory', () => {
  it('should create an Ethereum wallet', () => {
    const ethProp: PKPEthersWalletProp = {
      controllerAuthSig: LITCONFIG.CONTROLLER_AUTHSIG,
      pkpPubKey: LITCONFIG.PKP_PUBKEY,
      rpcs: {
        eth: LITCONFIG.CHRONICLE_RPC,
        cosmos: LITCONFIG.COSMOS_RPC,
      },
    };
    const ethWallet = WalletFactory.createWallet('eth', ethProp);

    expect(ethWallet).toBeInstanceOf(PKPEthersWallet);
  });

  it('should create a Cosmos wallet', () => {
    const cosmosProp: PKPCosmosWalletProp = {
      controllerAuthSig: LITCONFIG.CONTROLLER_AUTHSIG,
      pkpPubKey: LITCONFIG.PKP_PUBKEY,
      rpcs: {
        eth: LITCONFIG.CHRONICLE_RPC,
        cosmos: LITCONFIG.COSMOS_RPC,
      },
      addressPrefix: 'cosmos',
    };
    const cosmosWallet = WalletFactory.createWallet('cosmos', cosmosProp);

    expect(cosmosWallet).toBeInstanceOf(PKPCosmosWallet);
  });

  it('should throw an error for unsupported BTC wallet', () => {
    const btcProp: any = {
      /* Bitcoin properties */
    };
    expect(() => WalletFactory.createWallet('btc', btcProp)).toThrowError(
      'BTC wallet is not supported yet'
    );
  });

  it('should throw an error for unsupported chain', () => {
    const unsupportedProp: any = {
      /* Unsupported properties */
    };
    expect(() =>
      WalletFactory.createWallet('unsupportedChain', unsupportedProp)
    ).toThrowError('Unsupported chain: unsupportedChain');
  });
});

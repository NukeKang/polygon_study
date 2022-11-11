import { InjectedConnector } from "@web3-react/injected-connector";

const supportChainIdList = [1, 1337, 80001];

const getRpcEndpoint = (chainId) => {
  const endpoints = {
    1: "mainnet",
    137: "polygon",
    80001: "mumbai",
  };

  return (
    `https://${
      endpoints[chainId] || "mainnet"
    }.infura.io/v3/c9d981d1a6814120a7cf4c76b7455edc` || process.env.INFURA_ID
  );
};

// reset WalletConnect connector
export const resetWalletConnectConnector = (connector) => {
  if (connector && connector.walletConnectProvider?.wc?.uri) {
    connector.walletConnectProvider = undefined;
  }
};

export const injected = new InjectedConnector({
  supportedChainIds: supportChainIdList,
});

export const connectorList = {
  MetaMask: injected,
};

export default connectorList;

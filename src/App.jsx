import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import ConnectWallet from "./components/Wallet/ConnectWallet";

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);

  library.pollingInterval = 8000;
  return library;
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectWallet />
    </Web3ReactProvider>
  );
};

export default App;

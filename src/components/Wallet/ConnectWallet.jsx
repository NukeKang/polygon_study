import { useWeb3React } from "@web3-react/core";
import React from "react";
import connectorList from "../lib/connectors";

const ConnectWallet = () => {
  const { activate, deactivate, active, error } = useWeb3React();

  const handleClick = (connectorName) => {
    activate(connectorList[connectorName]);
  };
  const handleDisconnect = () => {
    deactivate();
  };

  return (
    <>
      {() => {
        if (active) {
          return <button onClick={handleDisconnect}>Diconnect Wallet</button>;
        } else {
          if (!error) {
            return <button onClick={handleClick("MetaMask")}>MetaMask</button>;
          }
        }
      }}
    </>
  );
};

export default ConnectWallet;

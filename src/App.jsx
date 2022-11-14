import React, { useEffect, useState } from "react";
import { ethereum } from "./common/metamask";
import "./App.css";

const App = () => {
  const [chainId, setChainId] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccountAddress(accounts[0]);
    } catch (error) {
      console.warn(error);
    }
  };

  const addEthereumChain = async () => {
    try {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      });
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    ethereum.on("chainChanged", (chain) => {
      console.log(chain);
      setChainId(chain);
    });

    return () => {
      ethereum.removeListener("chainChanged", (chain) => {
        setChainId(chain);
      });
    };
  }, []);

  return (
    <>
      <button className="button-connect" onClick={connectWallet}>
        {accountAddress ? "Connected" : "Connect"}
      </button>
      {accountAddress && <div>내 지갑 주소: {accountAddress}</div>}
      {accountAddress && (
        <button className="button-change" onClick={addEthereumChain}>
          Polygon 네트워크 전환
        </button>
      )}
      {chainId && <div>{`Current Network: ${chainId}`}</div>}
    </>
  );
};

export default App;

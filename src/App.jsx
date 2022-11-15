import React, { useEffect, useState } from "react";
import { ethereum } from "./common/metamask";
import "./App.css";
import EhterBalanceModal from "./components/EhterBalanceModal";
import EtherTransModal from "./components/EtherTransModal";

const App = () => {
  const [chainId, setChainId] = useState("");
  const [accountAddress, setAccountAddress] = useState(null);
  const [, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleConnectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccountAddress(accounts[0]);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log("Disconnecting MetaMask...");
      setIsConnected(false);
      setAccountAddress("");
    } catch (error) {
      console.warn(error);
    }
  };

  const handleConnectOnce = async () => {
    const accounts = await ethereum
      .request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      .then(() => ethereum.request({ method: "eth_requestAccounts" }));

    setAccountAddress(accounts[0]);
  };

  const handlePersonalSign = async () => {
    try {
      console.log("Sign Authentication");

      const message = ["Please sign me in!"].join("\n\n");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      const sign = await ethereum.request({
        method: "personal_sign",
        params: [message, account],
      });
    } catch (error) {
      console.warn(error);
    }
  };

  const handleGetBalance = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [account, "latest"],
    });

    const wei = parseInt(balance, 16);
    const gwei = wei / Math.pow(10, 9);
    const eth = wei / Math.pow(10, 18);

    setEthBalance({ wei, gwei, eth });
    setShowBalanceModal(true);
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

  const handleSendTransaction = async (sender, receiver, amount) => {
    const gasPrice = "0x5208"; // 21000 Gas Price
    const amountHex = (amount * Math.pow(10, 18)).toString(16);

    const tx = {
      from: sender,
      to: receiver,
      value: amountHex,
      gas: gasPrice,
    };

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    setShowTransactionModal(false);
  };

  const handleCloseBalanceModal = () => {
    setShowBalanceModal(false);
  };

  const handleOpenTransactionModal = () => {
    setShowTransactionModal(true);
  };

  const handleCloseTransactionModal = () => {
    setShowTransactionModal(false);
  };

  useEffect(() => {
    if (typeof ethereum !== "undefined") {
      ethereum.on("accountsChanged", (accounts) => {
        console.log("Accounts Changed: ", accounts[0]);
        setAccountAddress(accounts[0]);
      });

      ethereum.on("chainChanged", (chainId) => {
        console.log("Chain ID Changed", chainId);
        setChainId(chainId);
      });
    } else {
      alert("Please install Metamask to use this service!");
    }

    return () => {
      ethereum.removeListener("chainChanged", (chainId) => {
        console.log("Chain ID Changed", chainId);
        setChainId(chainId);
      });
      ethereum.removeListener("accountsChanged", (accounts) => {
        console.log("Accounts Changed: ", accounts[0]);
        setAccountAddress(accounts[0]);
      });
    };
  }, []);

  useEffect(() => {
    setIsConnected(accountAddress ? true : false);
  }, [accountAddress]);

  return (
    <>
      {accountAddress && <div>Wallet Account: {accountAddress}</div>}
      {!accountAddress ? (
        <button onClick={handleConnectWallet}>{"Connect"}</button>
      ) : (
        <button onClick={handleDisconnect}>{"Disconnect"}</button>
      )}
      <div>
        <button onClick={handleConnectOnce}>{"Connect Once"}</button>
      </div>
      {accountAddress && (
        <>
          <button onClick={addEthereumChain}>{"Change to Polygon"}</button>
          {chainId && <div>{`Current Network: ${chainId}`}</div>}
          <div>
            <button onClick={handlePersonalSign}>{"Sign"}</button>
          </div>
          <div>
            <button onClick={handleGetBalance}>{"Get Ehter Balance"}</button>
          </div>
          <div>
            <button onClick={handleOpenTransactionModal}>{"Send Ehter"}</button>
          </div>
        </>
      )}

      {showBalanceModal && (
        <EhterBalanceModal
          handleCloseModal={handleCloseBalanceModal}
          ethBalance={ethBalance}
        />
      )}
      {showTransactionModal && (
        <EtherTransModal
          handleCloseModal={handleCloseTransactionModal}
          handleSendTransaction={handleSendTransaction}
        />
      )}
    </>
  );
};

export default App;

import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { modalStyle, inputStyle } from "../styles/styles";

import Web3 from "web3";
import { ethereum } from "../common/metamask";

const EtherTransModal = ({ handleSendTransaction, handleCloseModal }) => {
  const [form, setForm] = useState({ sender: "", receiver: "", amount: "" });
  const [selectedWallet, setSelectedWallet] = useState("");
  const [sendError, setSendError] = useState(false);
  const [receiveError, setReceiveError] = useState(false);

  const getAccount = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    ethereum.on("accountsChanged", (accounts) => {
      setSelectedWallet(accounts[0]);
    });

    setForm({
      ...form,
      sender: accounts[0],
    });

    console.log("!!", form.sender);
  };

  useEffect(() => {
    getAccount();
  }, []);

  const handleFormChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const sendTransaction = async () => {
    const checkSender = Web3.utils.isAddress(form.sender);
    const checkReceiver = Web3.utils.isAddress(form.receiver);

    if (!checkSender) setSendError(true);
    if (!checkReceiver) setReceiveError(true);

    if (selectedWallet !== form.sender) {
      alert("Please select the sender account in your MetaMask wallet!");
    }

    if (checkSender && checkReceiver && selectedWallet === form.sender) {
      setSendError(false);
      setReceiveError(false);
      handleSendTransaction(form.sender, form.receiver, form.amount);
    }
  };

  return (
    <div className="custom-modal" style={modalStyle}>
      <div
        className="close-modal-icon"
        onClick={handleCloseModal}
        style={{ position: "absolute", right: 15, top: 5 }}
      >
        <AiOutlineClose
          size={25}
          style={{ color: "blue", cursor: "pointer" }}
        />
      </div>
      <input
        isInvalid={sendError ? true : false}
        value={form.sender}
        onChange={handleFormChange}
        name="sender"
        type="text"
        placeholder="Sender's Address"
        style={inputStyle}
      />
      <input
        isInvalid={receiveError ? true : false}
        value={form.receiver}
        onChange={handleFormChange}
        name="receiver"
        type="text"
        placeholder="Receiving Address"
        style={inputStyle}
      />
      <input
        value={form.amount}
        onChange={handleFormChange}
        name="amount"
        type="text"
        placeholder="Amount in ETH"
        style={inputStyle}
      />
      <div style={{ marginTop: "40px", width: "100%", padding: "0px 20px" }}>
        <button onClick={sendTransaction} size="sm" style={{ width: "100px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default EtherTransModal;

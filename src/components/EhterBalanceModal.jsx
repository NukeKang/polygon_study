import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEthereum } from "react-icons/fa";
import { balanceModalStyle, modalHeaderStyle } from "../styles/styles";

const EhterBalanceModal = ({ ethBalance, handleCloseModal }) => {
  return (
    <div style={balanceModalStyle}>
      <div
        onClick={handleCloseModal}
        style={{ position: "absolute", right: 15, top: 5 }}
      >
        <AiOutlineClose
          size={25}
          style={{ color: "white", cursor: "pointer" }}
        />
      </div>
      <div style={modalHeaderStyle}>
        <div>
          <FaEthereum color="#871A85" size="75" />
        </div>
        <div style={{ fontSize: "56px", color: "#925BB3" }}>
          {ethBalance?.eth % 1 !== 0
            ? ethBalance?.eth.toFixed(4)
            : ethBalance?.eth}
        </div>
      </div>
      <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <div style={{ marginleft: "50px" }}>
          Gwei:
          {ethBalance?.gwei % 1 !== 0
            ? ethBalance?.gwei.toFixed(2)
            : ethBalance?.gwei}
        </div>
        <div>Wei: {ethBalance?.wei}</div>
      </div>
    </div>
  );
};

export default EhterBalanceModal;

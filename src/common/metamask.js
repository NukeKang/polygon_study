import MetaMaskSDK from "@metamask/sdk";

const MMSDK = new MetaMaskSDK();

export const ethereum = MMSDK.getProvider();

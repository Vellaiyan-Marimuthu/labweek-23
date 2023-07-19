import web3 from "web3";

// Network configuration
// ------- Mainnet  ------//
// export const CHAINID = 314;

// ------ Testnet -------//
export const CHAINID = 137;

export const WC_PROJECT_ID = "1c44507affcb859e91b14795158bbb4a";

export const IS_SIGNED_IN = "isSignedin";

export const SING_MESSAGE = "Unlock wants you to signin to verify your account";

export const IRON_OPTIONS = {
  cookieName: "siwe",
  password: "vellaiyan28022000",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
export const SIWE = {
  DOMAIN: "app.unlock-protocol.com",
  URI: "https://app.unlock-protocol.com",
  SIGN_MESSAGE: "app.unlock-protocol.com wants you to sign in with your Ethereum account:",
};
export const DOMAIN = "app.unlock-protocol.com";
export const URI = "https://app.unlock-protocol.com";

export const QR_TYPE = {
  scanner: "scanner",
  code: "code",
};

"use client";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { goerli, polygon } from "wagmi/chains";
import Header from "./Header";

const chains = [goerli];
const projectId = "1c44507affcb859e91b14795158bbb4a";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WalletConnectConfig = ({ children }) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <header>
          <Header />
        </header>
        <main>{children}</main>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};
export default WalletConnectConfig;

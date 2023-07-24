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
      <WagmiConfig config={wagmiConfig}
       explorerRecommendedWalletIds={[
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
      ]}
      >
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

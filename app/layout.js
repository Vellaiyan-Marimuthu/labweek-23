import WalletConnectConfig from "@/components/WalletConnectConfig";
import "./globals.css";

export const metadata = {
  title: "Lab-week payments",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <WalletConnectConfig children={children} />
      </body>
    </html>
  );
}

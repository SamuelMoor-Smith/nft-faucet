import { Button, LoadingDots } from "@vercel/examples-ui";
import { Web3State } from "./Web3Page";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";

export interface WalletProps {
  state: Web3State;
  variant?: "black" | "primary" | "secondary" | "ghost" | "violet" | "white" | undefined;
}

export const WalletButton: React.VFC<WalletProps> = ({ state, variant }: WalletProps) => {
  const { open, close } = useWeb3Modal();
  const [addressLoading, setAddressLoading] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    console.log(address)
    if (state !== Web3State.WalletNotConnected 
        && state !== Web3State.WrongNetwork
        && !address) {
        setAddressLoading(true);
    } else {
        setAddressLoading(false);
    }
  }, [address, state]);

  let text = "";
  if (state === Web3State.WalletNotConnected) {
    text = "Connect Wallet";
  } else if (state === Web3State.WrongNetwork) {
    text = "Switch to Goerli";
  } else {
    text = `${address?.substring(0, 4)}...${address?.substring(31)}`;
  }

  return (
    <div className="mt-12 flex justify-center">
      {addressLoading ? (
        <LoadingDots />
      ) : (
        <Button variant={variant ? variant : "black"} size="lg" onClick={() => open()}>
          {text}
        </Button>
      )}
    </div>
  );
};

'use client';

import Image from 'next/image';

import { NextLogo } from './next-logo';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dispatch, SetStateAction, useState } from 'react';
import Byline from './byline';
import { Web3State } from '../Web3Page';

import { Web3Button, useWeb3Modal } from '@web3modal/react'
import { Button } from '@vercel/examples-ui';
import { WalletButton } from '../WalletButton';
import { Chain, useAccount, useNetwork } from 'wagmi';
import { ContractManager } from '../../utils/contractManager';

export interface Web3PageProps {
  state: Web3State;
  setState: React.Dispatch<React.SetStateAction<Web3State>>;
  contractManager?: ContractManager | null,
  setContractManager?: Dispatch<SetStateAction<ContractManager | null>>
}

export const GlobalNav: React.VFC<Web3PageProps> = ({ state, setState, contractManager, setContractManager }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          onClick={() => {
            if (address == null || address == undefined) {
              setState(Web3State.WalletNotConnected);
            } else if (!chain || chain!.unsupported || !contractManager) {
              setState(Web3State.WrongNetwork);
            } else {
              setState(Web3State.MintNFTs);
            }
            close();
          }}
          href=""
          className="group flex w-full items-center gap-x-2.5"
        >
          <div className="h-7 w-7 rounded-full" >
            <Image src="/favicon.ico" width={32} height={32} alt="NFT Minter" />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            NFT Minter
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-400" />
        ) : (
          <Bars3Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={`overflow-y-auto lg:static lg:block ${isOpen ? "fixed inset-x-0 bottom-0 top-14 mt-px bg-black" : ""} ${!isOpen ? "hidden" : ""}`}
      >
        <nav className="space-y-3 px-2 py-3">
          <div>
              {/* <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                  <div>Options</div>
              </div> */}
              <div className="space-y-1">
                  <NavItem
                    close={close}
                    currentState={state}
                    desiredState={Web3State.MintNFTs}
                    setState={setState}
                    label="Mint NFTs"
                    address={address}
                    chain={chain}
                    contractManager={contractManager}
                  />
                  <NavItem
                    close={close}
                    currentState={state}
                    desiredState={Web3State.ViewNFTs}
                    setState={setState}
                    label="View NFTs"
                    address={address}
                    chain={chain}
                    contractManager={contractManager}
                  />
              </div>
          </div>
      </nav>
      <div
        className={`absolute hidden sm:block inset-x-0 bottom-3 mx-3 rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20`}
      >
        <WalletButton state={state} variant='white'/>
      </div>
      {/* <Byline className="absolute hidden sm:block" /> */}
      </div>
    </div>
  );
}

function NavItem({
  close,
  currentState,
  desiredState,
  setState,
  label,
  address,
  chain,
  contractManager
}: {
  close: () => false | void;
  currentState: Web3State;
  desiredState: Web3State;
  setState: React.Dispatch<React.SetStateAction<Web3State>>;
  label: string;
  address: string | undefined;
  chain: (Chain & {
    unsupported?: boolean | undefined;
}) | undefined;
  contractManager: ContractManager | null | undefined
}) {
  const isActive = currentState === desiredState;

  return (
    <Link
      onClick={() => {
        if (address == null || address == undefined) {
          setState(Web3State.WalletNotConnected);
        } else if (!chain || chain!.unsupported || !contractManager) {
          setState(Web3State.WrongNetwork);
        } else {
          setState(desiredState);
        }
        close();
      }}
      href=""
      className={`block font-semibold rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300 ${isActive ? "text-white" : "text-gray-400 hover:bg-gray-800"}`}
    >
      {label}
    </Link>
  );
}

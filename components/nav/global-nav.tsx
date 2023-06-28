'use client';

import Image from 'next/image';

import { NextLogo } from './next-logo';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';
import Byline from './byline';
import { Web3State } from '../Web3Page';

import { Web3Button, useWeb3Modal } from '@web3modal/react'
import { Button } from '@vercel/examples-ui';
import { WalletButton } from '../WalletButton';

export function GlobalNav({state, setState}: {state: Web3State, setState: React.Dispatch<React.SetStateAction<Web3State>>}) {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  const { open } = useWeb3Modal()

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          onClick={() => {
            setState(Web3State.MintNFTs);
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
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
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
                  />
                  <NavItem
                    close={close}
                    currentState={state}
                    desiredState={Web3State.ViewNFTs}
                    setState={setState}
                    label="View NFTs"
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
  label
}: {
  close: () => false | void;
  currentState: Web3State;
  desiredState: Web3State;
  setState: React.Dispatch<React.SetStateAction<Web3State>>;
  label: string;
}) {
  const isActive = currentState === desiredState;

  return (
    <Link
      onClick={() => {
        setState(desiredState);
        close();
      }}
      href=""
      className={clsx(
        'block font-semibold rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-400 hover:bg-gray-800': !isActive,
          'text-white': isActive,
        },
      )}
    >
      {label}
    </Link>
  );
}

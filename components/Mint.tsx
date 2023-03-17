import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ConnectWallet } from './ConnectWallet'
import { SwitchNetwork } from './SwitchNetwork'
import { UploadNft } from './UploadNft'
import { Button, LoadingDots, Text } from '@vercel/examples-ui'
import Image from 'next/image'

export enum MintState {
  Connect,
  ConfirmNetwork,
  Upload,
  ConfirmMint,
  Loading,
}

export interface MintProps {
  state: MintState;
  setState: React.Dispatch<React.SetStateAction<MintState>>;
}

export const Mint: React.VFC<MintProps> = ({ state, setState }) => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)

  const handleMint = async () => {
    try {
      setLoading(true)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="inline-block align-bottom text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle  ">
      {state === MintState.Connect && <ConnectWallet state={state} setState={setState} />}

      {state === MintState.ConfirmNetwork && <SwitchNetwork state={state} setState={setState}/>}

      {state === MintState.Upload && <UploadNft state={state} setState={setState} />}

      {state === MintState.ConfirmMint && (
        <>
          <Text variant="h2">Confirm your mint</Text>
          <Text className="mt-6">
            Your image will be minted as an ERC721 Token. It can happen that
            images stored on IPFS as it is a distributed file hosting system
            that can fail. This is still the prefered method of choice to host
            in the NFT community as it is decentralized.{' '}
            <span className="underline italic">
              This process might take up to 1 minute to complete
            </span>
          </Text>
          <section className="relative w-full pb-[20%] h-48 pb-6 mt-12">
            <Image
              className="rounded-xl"
              src="Placeholder"
              // src={String(asset?._url)}
              alt="The image that will be minted as an NFT"
              layout="fill"
              objectFit="contain"
            />
          </section>

          <section className="flex justify-center mt-6">
            <Button
              size="lg"
              variant="black"
              onClick={handleMint}
            >
              {isLoading ? <LoadingDots /> : 'Mint'}
            </Button>
          </section>
        </>
      )}
    </div>
  )
}

import { useState } from 'react'

import { Button, Text, Input } from '@vercel/examples-ui'

import { ContractManager } from '../utils/contractManager';
import { ContractProps } from './Web3Page';
import ConfirmModal from './modals/ConfirmModal';

export const MintNFTs: React.VFC<ContractProps> = ({contractManager, state}) => {

  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [numTokens, setNumTokens] = useState(0);

  const [loading, setLoading] = useState(false)

  function confirm() {
    if (Number.isInteger(numTokens)) {
      handleOpen()
    } else {
      alert("Must add integer value for number of tokens")
    }
  }

  return (
    <>
      <Text className="mt-6">
        You will now be able to mint ERC721 Tokens for the Goerli test net. Each mint will be charge in ETH (0.0001 ETH per token). (This will be confirmed before minting). {' '}
            <span className="underline italic">
              This process might take up to 1 minute to complete
            </span>
      </Text>
      <div className="flex py-8">
        <Input
          placeholder="How many tokens to mint?"
          onChange={({ currentTarget: { value } }) => setNumTokens(Number(value))}
        />
        <Button
          variant="black"
          width="120px"
          loading={loading}
          onClick={confirm}
        >
          Mint ERC721
        </Button>
      </div>
      <ConfirmModal numTokens={numTokens} setNumTokens={setNumTokens} show={show} handleClose={handleClose} setLoading={setLoading} contractManager={contractManager!}/>
    </>
  )
}


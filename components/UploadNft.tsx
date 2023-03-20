import { useState } from 'react'

import { Button, Text, Input } from '@vercel/examples-ui'

import Modal from 'react-bootstrap/Modal';
import { MintProps } from './Mint'
import { handleMint } from '../helpers/metamask.helpers';

export const UploadNft: React.VFC<MintProps> = ({ state, setState }) => {

  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [numTokens, setNumTokens] = useState(0);

  const [loading, setLoading] = useState(false)

  function confirm() {
    const requiredETH = numTokens * 10**14;
    handleOpen()
  }

  return (
    <div className="flex flex-col">
      <Text className="mt-6">
        You will now be able to mint ERC721 Tokens for the Goerli test net. Each mint will be charge in wei from your ethereum test net account. (This will be confirmed before minting). {' '}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>This transaction will cost {10**14 * numTokens} wei. Would you like to proceed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={async () => {
            handleClose()
            setLoading(true)
            await handleMint(numTokens, setNumTokens)
            setLoading(false)
          }}>
            Yes, let me mint
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}


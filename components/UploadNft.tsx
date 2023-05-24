import { useEffect, useState } from 'react'

import { Button, Text, Input } from '@vercel/examples-ui'

import Modal from 'react-bootstrap/Modal';
import { MintProps } from './Mint'
import { handleMint } from '../helpers/metamask.helpers';
import { displayTokenSVG } from '../helpers/token.helpers';
import SVGDisplay from './SVGDisplay';

export const UploadNft: React.VFC<MintProps> = ({ state, setState }) => {

  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const [numTokens, setNumTokens] = useState(0);
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [svg, setSvg] = useState<string | null>(null);

  const [loading, setLoading] = useState(false)

  function confirm() {
    if (Number.isInteger(numTokens)) {
      handleOpen()
    } else {
      alert("Must add integer value for number of tokens")
    }
  }

  const handleFetchSVG = async () => {
    const fetchedSvg = await displayTokenSVG(tokenId);
    setSvg(fetchedSvg);
  };

  return (
    <div className="flex flex-col">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>This transaction will cost {0.0001 * numTokens} ETH. Would you like to proceed?</Modal.Body>
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

      <Text className="mt-6">
        You can also view the svg associated with your ERC721 Tokens below. Simply type in the tokenId and click &apos;Display SVG&apos; to see your tokens unique SVG image. {' '}
            <span className="underline italic">
              This process might take up to 1 minute to complete
            </span>
      </Text>
      <div className="flex py-8">
        <Input
          placeholder="Please enter your tokenId"
          onChange={({ currentTarget: { value } }) => setTokenId(Number(value))}
        />
        <Button
          variant="black"
          width="120px"
          loading={loading}
          onClick={handleFetchSVG}
        >
          Display SVG
        </Button>
      </div>
      <SVGDisplay svg={svg} />
    </div>
  )
}


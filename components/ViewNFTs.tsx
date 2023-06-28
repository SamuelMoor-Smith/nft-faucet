import { useEffect, useState } from "react";
import { Button, Text, Input, LoadingDots, Link } from "@vercel/examples-ui";
import SVGDisplay from "./SVGDisplay";
import { ContractProps } from "./Web3Page";
import ViewNFTModal from "./modals/ViewNFTModal";
import { useAccount } from "wagmi";
import { Box, Divider, Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { TokenTable } from "./TokenTable";

export const ViewNFTs: React.VFC<ContractProps> = ({
  contractManager,
  loadingTokens,
}) => {
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); // State to handle modal visibility

  const tabName = ["All Tokens", "My Tokens"];
    const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (tokenId !== null) {
      handleFetchSVG();
    }
  }, [tokenId]); // Fetch the SVG whenever the tokenId changes

  const handleFetchSVG = async () => {
    if (contractManager) {
      const fetchedSvg = await contractManager.displayTokenSVG(tokenId);
      setSvg(fetchedSvg);
      setShowModal(true); // Show the modal when SVG is fetched
    }
  };

  return (
    <>
      <Text className="mt-6">
        You can also view the svg associated with your ERC721 Tokens below.
        Simply scroll through all the tokens (or only your own) in the table below and click on the token to see your tokens unique SVG image. You can also search for your particular token id via the search bar. {contractManager?.tokenCount ? `There are currently ${contractManager.tokenCount} tokens minted.` : ''}{" "}
        <span className="underline italic">
          Loading the tokens might take up to 1 minute to complete
        </span>
      </Text>
      <div className="flex py-8">
        <Input
          placeholder="Search for your tokenId"
          onChange={({ currentTarget: { value } }) => setSearchValue(value)}
        />
        {/* <Button
              variant="black"
              width="120px"
              onClick={handleFetchSVG}
            >
              Display SVG
            </Button> */}
      </div>
      {/* Toggle button */}
      <Tabs
            isFitted={true}
            colorScheme="primary"
            onChange={(index) => setTabIndex(index)}
            mt={0}
          >
            <TabList mb="1em">
              {tabName.map((name, index) => (
                <Tab
                  key={index}
                  _hover={{ color: index !== tabIndex && "primary.300" }}
                  _focus={{ outline: "none" }}
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <TokenTable loadingTokens={loadingTokens!} setTokenId={setTokenId} contractManager={contractManager!} onlyMyTokens={false} searchValue={searchValue}/>
              </TabPanel>
              <TabPanel>
                <TokenTable loadingTokens={loadingTokens!} setTokenId={setTokenId} contractManager={contractManager!} onlyMyTokens={true} searchValue={searchValue}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
      <ViewNFTModal
        svg={svg}
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setTokenId(null);
        }}
      />
    </>
  );
};

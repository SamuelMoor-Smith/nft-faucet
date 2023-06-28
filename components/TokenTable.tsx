import { LoadingDots } from "@vercel/examples-ui";
import SVGDisplay from "./SVGDisplay";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { ContractManager } from "../utils/contractManager";
import { useAccount } from "wagmi";
import { FC } from "react";

interface TokenTableProps {
  loadingTokens: boolean;
  setTokenId: Dispatch<SetStateAction<number | null>>;
  contractManager: ContractManager | null;
  onlyMyTokens: boolean;
  searchValue: string | null;
}

export const TokenTable: FC<TokenTableProps> = ({
  loadingTokens,
  setTokenId,
  contractManager,
  onlyMyTokens,
  searchValue
}) => {
  const userAddress = useAccount().address?.toString(); // Replace with the way you get the user account in your app

  const handleRowClick = async (id: number) => {
    setTokenId(id);
  };

  // Here we're filtering the tokens based on the toggle state and the owner of the token
  const tokensToDisplay = onlyMyTokens
    ? Array.from(contractManager!.allTokens).filter(
        ([id, token]) => token.owner === userAddress && (searchValue ? id.toString().startsWith(searchValue) : true)
    )
    : Array.from(contractManager!.allTokens).filter(
        ([id, token]) => searchValue ? id.toString().startsWith(searchValue) : true
    );

  if (loadingTokens) {
    return (
      <div>
        <p>The tokens are currently loading...</p>
        <LoadingDots />
      </div>
    );
  } else {
    return (
      <>
        <table className="w-full text-center bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th style={{ width: "10%" }} className="p-4 justify-center">
                Id
              </th>
              <th style={{ width: "75%" }} className="p-4 justify-center">
                Owner
              </th>
              <th style={{ width: "15%" }} className="p-4 justify-center">
                SVG
              </th>
            </tr>
          </thead>
        </table>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="w-full text-center rounded-lg overflow-hidden shadow-lg">
            <tbody>
              {tokensToDisplay.map(([id, token]) => (
                <tr
                  key={id.toString()}
                  className="border-t cursor-pointer"
                  onClick={async () => await handleRowClick(id)}
                >
                  <td style={{ width: "10%" }} className="p-4 justify-center">
                    {id}
                  </td>
                  <td style={{ width: "75%" }} className="p-4 justify-center">
                    {token.owner}
                  </td>
                  <td style={{ width: "15%" }} className="p-4 justify-center">
                    <div className="flex items-center justify-center w-full">
                      <SVGDisplay svg={token.svg} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

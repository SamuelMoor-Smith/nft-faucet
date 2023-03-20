import { ConnectWallet } from './ConnectWallet'
import { SwitchNetwork } from './SwitchNetwork'
import { UploadNft } from './UploadNft'

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

  return (
    <div className="inline-block align-bottom text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle  ">
      {state === MintState.Connect && <ConnectWallet state={state} setState={setState} />}

      {state === MintState.ConfirmNetwork && <SwitchNetwork state={state} setState={setState}/>}

      {state === MintState.Upload && <UploadNft state={state} setState={setState} />}
    </div>
  )
}

import { ethers } from 'ethers';
import React, { useState } from 'react'
import FoxNft from '../../contracts/FoxNft';
import FoxMarketplace, { NFT } from '../../contracts/FoxMarketplace';
import FoxToken from '../../contracts/FoxToken';

type Props = {
    children: React.ReactNode;
}

type contextProps = {
    provider?: ethers.providers.Web3Provider,
    signer?: ethers.providers.JsonRpcSigner,
    handleConnectWallet?: any,
    wallet?: Wallet,
    listNft?: any,
    handleGetAllNfts?: any,
    nfts?: NFT[]
}

type Wallet = {
    address: string,
    amount: number
}

export const Web3Context = React.createContext<contextProps>({ signer: undefined });

declare var window: any;

const Web3Provider = ({ children }: Props) => {
    const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();
    const [signer, setSigner] = React.useState<ethers.providers.JsonRpcSigner>();
    const [wallet, setWallet] = React.useState<Wallet>();
    const [nfts, setNfts] = useState<NFT[]>([]);

    const handleConnectWallet = async () => {
        try {
            console.log('...connecting wallet');
            if (!window.ethereum) alert("Please install metamask!")

            const provider = new ethers.providers.Web3Provider(window.ethereum, undefined);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            const tokenContract = new FoxToken(provider);

            const amount = await tokenContract.balanceOf(address);

            // const accounts = window.ethereum.request({ method: "eth_requestAccounts" });

            setSigner(signer);
            setProvider(provider);
            setWallet({ address, amount });
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    const handleGetAllNfts = async () => {
        try {
            console.log('...getting all nfts');
            if (!provider || !signer) {
                console.log('getting done');
                return;
            }

            const marketContract = new FoxMarketplace(provider);

            const nfts = await marketContract.getAllNfts();

            setNfts(nfts);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    React.useEffect(() => {
        handleGetAllNfts();
    }, [handleGetAllNfts])

    return (
        <Web3Context.Provider value={{ provider, signer, wallet, handleConnectWallet, handleGetAllNfts, nfts }}>
            {children}
        </Web3Context.Provider>
    )
}

export default Web3Provider
import React from 'react'

import { Web3Context } from '@/context/Web3Provider';
import FoxNft from '../contracts/FoxNft';
import FoxMarketplace from '../contracts/FoxMarketplace';
type Props = {}

const List = (props: Props) => {
    const { provider, signer } = React.useContext(Web3Context);

    const [id, setId] = React.useState<string>();
    const [price, setPrice] = React.useState<string>();
    const [listing, setListing] = React.useState<boolean>(false);
    const [delisting, setDelisting] = React.useState<boolean>(false);

    const listNft = async () => {
        try {
            console.log("...listing");

            if (!provider || !signer || !id || !price) {
                // console.log("Cut");
                console.log("listing done");
                return;
            }
            setListing(true);
            let txHash = ""

            const tokenId = Number(id);
            const amount = Number(price);

            const nftContract = new FoxNft(provider);
            const marketContract = new FoxMarketplace(provider);

            txHash = await nftContract.approve(marketContract._contractAddress, tokenId);
            console.log(txHash);

            txHash = await marketContract.listNft(tokenId, amount);
            console.log(txHash);

            setListing(false);
            console.log("listing done");

            alert("https://mumbai.polygonscan.com/tx/" + txHash);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    const delistNft = async () => {
        try {
            console.log("...delisting");
            setDelisting(true);
            if (!provider || !signer || !id) {
                // console.log("Cut");
                setDelisting(false);
                console.log("delisting done");
                return;
            }
            const tokenId = Number(id);
            const marketContract = new FoxMarketplace(provider);

            const txHash = await marketContract.delistNft(tokenId);
            console.log(txHash);

            setListing(false);

            setDelisting(false);
            console.log("delisting done");

            alert("https://mumbai.polygonscan.com/tx/" + txHash);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    return (
        <>
            <label className="text-black ">Input ID NFT: </label>
            <input type="text" className="bg-gray-300 my-2 py-0" onChange={(e) => setId(e.target.value)} />
            <br />
            <label className="text-black">Input Price: </label>
            <input type="text" className="bg-gray-300 mb-2 py-0" onChange={(e) => setPrice(e.target.value)} />
            <br />
            {!listing ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-full items-center mx-5" onClick={listNft}>List NFT</button>
                :
                <button className="bg-blue-700 text-white py-1 px-4 rounded-full items-center mx-5">...Listing</button>
            }
            {!delisting ?
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded-full items-center" onClick={delistNft}>Delist NFT</button>
                :
                <button className="bg-red-700 text-white py-1 px-4 rounded-full items-center">...Delisting</button>
            }
        </>
    )
}

export default List;
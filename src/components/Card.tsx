import React from 'react'

import FoxMarketplace, { NFT } from "../../contracts/FoxMarketplace";
import { shortenAddress } from '@/utils/shortenAddress';
import { Web3Context } from '@/context/Web3Provider';
import FoxToken from '../../contracts/FoxToken';

type Props = {}

const Card = ({ price, seller, image, tokenId }: NFT) => {
    const { wallet, provider } = React.useContext(Web3Context);
    const [buying, setBuying] = React.useState<boolean>(false);

    const handleBuyNft = async () => {
        try {
            console.log("...buying nft");
            if (!provider) {
                console.log("buy failed");
                return;
            }
            setBuying(true);

            const tokenContract = new FoxToken(provider);
            const marketContract = new FoxMarketplace(provider);

            let txHash = "";

            txHash = await tokenContract.approve(marketContract._contractAddress, price);
            console.log(txHash);

            txHash = await marketContract.buyNft(tokenId, price);
            console.log(txHash);

            setBuying(false);
            console.log("buying done");
        } catch (error) {
            setBuying(false);
            console.log("buy failed");
            console.log(error);
            throw new Error("No ethereum Object");
        }
    }

    return (
        <div className="bg-blue-400 m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
        >
            <div className="flex flex-col items-center w-full mt-3">
                <img
                    src={image}
                    alt="nature"
                    className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                />
                <div className="display-flex justify-start w-full mb-6 p-2">
                    <p className="text-white font-bold text-base">Seller: {shortenAddress(seller)}</p>

                    <p className="text-white font-bold text-base">Token id: {tokenId}</p>

                    <p className="text-white font-bold text-base">Price: {price} FC</p>

                    {wallet?.address == seller ?
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Owned
                        </button> :
                        !buying ?
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                onClick={handleBuyNft}
                            >
                                Buy NFT
                            </button> :
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                            >
                                ...Buying
                            </button>
                    }
                </div>


            </div>
        </div>
    )
}

export default Card
import { ethers } from "ethers";

import { BaseInterface } from "./interfaces";
import { marketABI, marketAddress } from "./abis";
import FoxNft from "./FoxNft";

const imageUri = "https://famousfoxes.com/hd/";

export type NFT = {
    price: number,
    seller: string,
    tokenId: number,
    image: string,
    listed?: boolean
}

export default class MarketContract extends BaseInterface {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, marketAddress, marketABI);
    }

    async getAllNfts(): Promise<NFT[]> {
        const items = await this._contract.getAllNfts();

        console.log(items);

        const nfts: NFT[] = items.map((item: any) => ({
            price: this._toNumber(item.price),
            seller: item.seller,
            tokenId: Number(item.tokenId),
            image: imageUri + Number(item.tokenId).toString() + ".png",
            listed: item.listed
        }))

        return nfts;
    }

    async getMyNftListed(address: string): Promise<NFT[]> {
        const nfts = await this.getAllNfts();
        return nfts.filter((p: NFT) => p.seller === address);
    }

    async listNft(tokenId: number, price: number): Promise<string> {
        const tx = await this._contract.listNft(tokenId, this._numberToEth(price), this._option);

        return await this._handleTransactionRespone(tx);
    }

    async delistNft(tokenId: number): Promise<string> {
        const tx = await this._contract.delistNft(tokenId, this._option);

        return await this._handleTransactionRespone(tx);
    }

    async updateNftPrice(tokenId: number, newPrice: number): Promise<string> {
        const tx = await this._contract.updateNftPrice(tokenId, this._numberToEth(newPrice), this._option);

        return await this._handleTransactionRespone(tx);
    }

    async buyNft(tokenId: number, price: number): Promise<string> {
        const tx = await this._contract.buyNft(tokenId, this._numberToEth(price), this._option);

        return await this._handleTransactionRespone(tx);
    }
}
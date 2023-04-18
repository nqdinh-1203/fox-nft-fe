import { Erc721 } from "./interfaces";
import { nftABI, nftAddress } from "./abis";
import { ethers } from "ethers";

export default class FoxNft extends Erc721 {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, nftAddress, nftABI);
    }

    async tokenURI(tokenId: number): Promise<string> {
        return await this._contract.tokenURI(tokenId);
    }
}
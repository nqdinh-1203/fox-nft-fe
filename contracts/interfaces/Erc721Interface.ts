import { ethers } from "ethers";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import BaseInterface from "./BaseInterface";

class Erc721 extends BaseInterface {
    constructor(provider: ethers.providers.Web3Provider, address: string, abi: ethers.ContractInterface) {
        super(provider, address, abi);
    }

    async totalSupply(): Promise<number> {
        return await this._contract.totalSupply();
    }

    async balanceOf(walletAddress: string): Promise<number> {
        const balance = await this._contract.balanceOf(walletAddress);
        return this._toNumber(balance);
    }

    async ownerOf(tokenId: string): Promise<string> {
        return await this._contract.ownerOf(tokenId);
    }

    async getApproved(tokenId: string | number): Promise<string> {
        return await this._contract.getApproved(tokenId);
    }

    async approve(toAddress: string, tokenId: string | number) {
        const approveTx: TransactionResponse = await this._contract.approve(toAddress, tokenId, this._option);

        return this._handleTransactionRespone(approveTx);
    }

    async safeTransferFrom(fromAddress: string, toAddress: string, tokenId: string | number): Promise<string> {
        const tx: TransactionResponse = await this._contract['safeTransferFrom(address, address, uint256)'](fromAddress, toAddress, tokenId, this._option);
        return await this._handleTransactionRespone(tx)
    }

    async transferFrom(fromAddress: string, toAddress: string, tokenId: string | number): Promise<string> {
        const tx: TransactionResponse = await this._contract.transferFrom(fromAddress, toAddress, tokenId, this._option);
        return await this._handleTransactionRespone(tx);
    }
}

export default Erc721;
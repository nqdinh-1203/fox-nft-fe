import { ethers } from "ethers";

import { tokenABI, tokenAddress } from "./abis";
import { Erc20 } from "./interfaces";


export default class FoxToken extends Erc20 {
    constructor(provider: ethers.providers.Web3Provider) {
        super(provider, tokenAddress, tokenABI);
    }
}
import tokenAbi from "./FoxToken.json";
import nftAbi from "./FoxNft.json";
import marketAbi from "./FoxMarketplace.json";

export const tokenABI = tokenAbi;
export const nftABI = nftAbi;
export const marketABI = marketAbi;

export const tokenAddress = "0x9B29b8a58E166Cc13d3ea8A7617f1D70528D6460";
export const nftAddress = "0x1C4997bA80af8F9fE9383Ff5Fe92066CCd254a96";
export const marketAddress = "0x3f943101fc0D8AA7D4e34B2EDb194e420CA9b5e1";

export const getRPC = (): string => {
    return "https://rpc-mumbai.maticvigil.com";
}
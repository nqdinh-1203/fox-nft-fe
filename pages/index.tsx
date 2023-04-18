import React from 'react';

import { Web3Context } from '@/context/Web3Provider';
import Card from '@/components/Card';
import { NFT } from "../contracts/FoxMarketplace";

export default function Home() {
  const { nfts, handleGetAllNfts } = React.useContext(Web3Context);

  return (
    <>
      {/* <button onClick={handleGetAllNfts}>get all</button> */}
      <div className="flex flex-wrap justify-center items-center mt-10">
        {nfts?.map((item: NFT) => (
          <Card {...item} />
        ))}
      </div>
    </>
  )
}

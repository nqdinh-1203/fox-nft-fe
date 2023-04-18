import React from 'react';
// import { ConnectButton } from "web3uikit";
import Link from "next/link";
import { Web3Context } from '@/context/Web3Provider';
import { shortenAddress } from '@/utils/shortenAddress';

type Props = {}

const Header = (props: Props) => {
    const { wallet, handleConnectWallet } = React.useContext(Web3Context);

    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className='py-4 px-4 font-bold text-3xl'>NFT Marketplace</h1>
            <div className='flex flex-column item-center'>
                <Link className='mr-4 p-6' href="/">
                    NFT Marketplace
                </Link>
                <Link className='mr-4 p-6' href="/list">
                    Sell NFT
                </Link>

                {!wallet ?
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                        onClick={handleConnectWallet}
                    >
                        Connect Wallet
                    </button> :
                    <button
                        className="bg-blue-700 text-white font-bold py-1 px-4 rounded-full items-center"
                    >
                        <div>{shortenAddress(wallet.address)}</div>
                        <div>{wallet.amount} FC</div>
                    </button>
                }

            </div>
        </nav>
    )
}

export default Header
import Head from 'next/head'

import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useWallet } from "@solana/wallet-adapter-react";
import Image from 'next/image';

import {
  shortenAddress,
} from "../utils/candy-machine";
import useCandyMachine from '../hooks/use-candy-machine';
import useWalletBalance from '../hooks/use-wallet-balance';
import Countdown from 'react-countdown';
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import randomImage1 from '../../public/assets/images/background3.jpg';
import randomImage2 from '../../public/assets/images/background4.jpg';
import randomImage3 from '../../public/assets/images/background5.jpg';
import randomImage4 from '../../public/assets/images/background6.jpg';

const randomImages = [randomImage1, randomImage2, randomImage3, randomImage4];

const styleBg1 = {
  backgroundImage: "url('../../assets/images/background1.jpg')",
}

const styleBg2 = {
  backgroundImage: "url('../../assets/images/background2.jpg')",
}

const Home = () => {
  const [balance] = useWalletBalance()
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [packCount, setPackCount] = useState<number>(2);
  const wallet = useWallet();

  const { randomImage, isSoldOut, mintStartDate, isMinting, onMint, onMintMultiple, nftsData } = useCandyMachine();

  return (
    <main className="bg-black" >
      <Toaster />
      <Head>
        <title>Halloween</title>
        <meta name="description" content="Solana Candy Machine" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <h1 className="text-white text-4xl text-center p-5">Buy Halloween</h1>

      <div className="bg-cover bg-center grid md:grid-cols-2 sm:grid-cols-1 border-t-2 border-blue-500" style={styleBg1}>

        <div className="justify-center items-center">
          <div className="m-10 border-2 border-blue-500 rounded">
            <Image
              src={randomImages[randomImage]}
              layout="responsive"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center m-10 bg-black bg-opacity-80 rounded">
          <div className="flex space-x-5 mt-5">
            <WalletMultiButton  />
          </div>

          {wallet.connected &&
            <p className="text-white mt-5">Address: {shortenAddress(wallet.publicKey?.toBase58() || "")}</p>
          }

          {wallet.connected &&
            <>
              <p className="text-white m-1">Balance: {(balance || 0).toLocaleString()} SOL</p>
              <p className="text-white m-1">Available : {nftsData.itemsRemaining}</p>
              <p className="text-white m-1">Minted: {nftsData.itemsRedeemed}</p>
              <p className="text-white m-1">Total : {nftsData.itemsAvailable}</p>
            </>
          }

          {wallet.connected &&
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-6/12 mt-5"
              disabled={isSoldOut || isMinting || !isActive}
              onClick={onMint}
            >
              {isSoldOut ? (
                "SOLD OUT"
              ) : isActive ?
                <span>MINT {isMinting && 'LOADING...'}</span> :
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsActive(true)}
                  onComplete={() => setIsActive(true)}
                  renderer={renderCounter}
                />
              }
            </button>
          }

          {wallet.connected &&
            <div className="flex space-x-1 w-6/12 mt-2">
              <input type="number" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-24" 
                step={1} min={2} max={10} value={packCount} 
                onChange={(e) => { setPackCount(Number.parseInt(e.target.value)); }} 
              />
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded flex-grow"
                disabled={isSoldOut || isMinting || !isActive}
                onClick={() => onMintMultiple(packCount)}
              >
                {isSoldOut ? (
                  "SOLD OUT"
                ) : isActive ?
                  <span>MINT {packCount} NFTs {isMinting && 'LOADING...'}</span> :
                  <Countdown
                    date={mintStartDate}
                    onMount={({ completed }) => completed && setIsActive(true)}
                    onComplete={() => setIsActive(true)}
                    renderer={renderCounter}
                  />
                }
              </button>
            </div>
          }
        </div>

      </div>

      <p className="text-white text-2x1 p-5 border-b border-blue-500">
        Halloween is a holiday celebrated each year on October 31, and Halloween 2021 will occur on Sunday, October 31. The tradition originated with the ancient Celtic festival of Samhain, when people would light bonfires and wear costumes to ward off ghosts. In the eighth century, Pope Gregory III designated November 1 as a time to honor all saints. Soon, All Saints Day incorporated some of the traditions of Samhain. The evening before was known as All Hallows Eve, and later Halloween. Over time, Halloween evolved into a day of activities like trick-or-treating, carving jack-o-lanterns, festive gatherings, donning costumes and eating treats.
      </p>

      <div className="bg-cover bg-center md:p-10 sm:p-5" style={styleBg2}>

        <div className="flex flex-col justify-center items-center bg-black bg-opacity-80 rounded p-10">
          <h1 className="text-white text-4xl text-center p-5">RoadMap</h1>

          <div className="border-b border-dashed border-white p-5 md:w-8/12 sm:w-100">
            <p className="text-white text-2x1 p-5">
              15 Oct
            </p>
            <p className="text-white md:pl-10 sm:pl-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula risus non interdum sollicitudin. Mauris eros tortor, dapibus ac condimentum in, aliquet vel dolor. Praesent ac velit orci. Nam vitae gravida urna. Praesent at placerat tortor. Donec efficitur in neque vitae rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet tellus eu arcu convallis fermentum. Proin feugiat, dolor nec tincidunt venenatis, sem risus dapibus enim, at ullamcorper elit nulla vitae diam. Donec dolor nibh, vestibulum eget sapien ut, sodales volutpat diam. Suspendisse sodales, nisl quis pharetra ultrices, lorem magna eleifend ex, eu posuere elit lorem vel purus. Maecenas eu magna quis lorem rutrum dictum vitae et tellus. Praesent tristique non dolor id elementum. Morbi sit amet mauris eleifend, vehicula tortor ac, posuere justo. Nunc ligula quam, tincidunt in porta non, consectetur sit amet tellus.
            </p>
          </div>

          <div className="border-b border-dashed border-white p-5 md:w-8/12 sm:w-100">
            <p className="text-white text-2x1 p-5">
              15 Oct
            </p>
            <p className="text-white md:pl-10 sm:pl-5">
              Donec id lacinia est, a efficitur nulla. Nullam at libero dolor. Vivamus justo leo, tempus at gravida vitae, congue non ligula. Aenean gravida ullamcorper consequat. Vestibulum in odio quis lacus aliquet rhoncus non elementum augue. Aliquam a vehicula nunc. Aenean tincidunt urna in lacus tempor, sit amet ultrices tellus posuere. Integer commodo, orci non pretium volutpat, arcu eros consectetur dolor, et ornare augue est posuere elit. Cras finibus interdum dui, vitae tincidunt dui lacinia ut. Morbi ligula nibh, consequat luctus justo eget, dictum sodales ligula. Proin commodo efficitur quam, eget condimentum risus euismod et. Integer eget risus mattis, bibendum velit fringilla, tempor augue. Maecenas ultricies mollis ligula quis posuere. Aliquam at pretium odio, nec fringilla odio.            </p>
          </div>

          <div className="border-b border-dashed border-white p-5 md:w-8/12 sm:w-100">
            <p className="text-white text-2x1 p-5">
              15 Oct
            </p>
            <p className="text-white md:pl-10 sm:pl-5">
              Quisque vitae pellentesque arcu, sit amet accumsan lorem. Nullam ac fringilla sapien. Nunc a efficitur felis. Donec congue nunc ut sodales ultrices. Nam non elementum augue, at ultrices orci. Sed et ornare est. Aenean fermentum, sem luctus dictum bibendum, purus augue congue nisl, sit amet pharetra magna nisl nec arcu. Suspendisse blandit diam ipsum, eget eleifend lacus posuere sit amet. Integer a imperdiet est. Integer laoreet, massa vitae cursus rhoncus, nisi sem eleifend sapien, in ultricies lectus velit quis massa. Suspendisse scelerisque tellus tellus, sed vestibulum elit rhoncus et. Sed vulputate neque sit amet lacus convallis gravida. Nam iaculis congue libero, eleifend pulvinar ante convallis ut. Proin sed massa feugiat, posuere urna vel, dapibus lorem. Sed a nulla hendrerit, tincidunt ex eget, viverra neque. Pellentesque et risus cursus, tristique sem quis, aliquet dolor.
            </p>
          </div>

          <div className="p-5 md:w-8/12 sm:w-100">
            <p className="text-white text-2x1 p-5">
              15 Oct
            </p>
            <p className="text-white md:pl-10 sm:pl-5">
              Pellentesque rutrum ipsum in dolor cursus interdum. Maecenas sed viverra nisi, ut tincidunt nisi. Integer felis ante, dictum quis quam sit amet, luctus consequat quam. Maecenas a consequat ligula, at porttitor metus. Vestibulum placerat, quam nec fermentum tristique, augue purus porttitor sem, et sodales lacus ligula at purus. Nulla facilisis urna nec magna pellentesque, placerat consequat augue condimentum. Integer ornare turpis vitae metus molestie vestibulum. Nam sed ultricies tellus. Nam at leo ex. In nec nisl sed libero accumsan lacinia. Aliquam hendrerit nisl ut est fringilla aliquet. Maecenas luctus finibus ultricies. Cras sodales volutpat eleifend. Proin posuere eget sem quis facilisis.
            </p>
          </div>
        </div>
      </div>
      
    </main>
  );
};

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <span>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </span>
  );
};

export default Home;




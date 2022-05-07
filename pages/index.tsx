import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function buy() external payable",
  "function isSaleNow() view returns(bool)",
  "function counter() view returns(uint)"
]
const contractAddress = "0x58b639746E3e848b837F842ADf3771CFc2FCA805"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {

  const tokenPrice = "450";

  const [mintNum, setMintNum] = useState(0);
  const [saleFlag, setSaleFlag] = useState(false);

  useEffect(() => {
    const setSaleInfo = async() =>{
      console.log("setSaleInfo")
  
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)  
      console.log(provider)
  
      const accounts =  await provider.send("eth_requestAccounts", []);
      
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const mintNumber = (await contract.counter()).toString() - 1;
        const saleFlag = await contract.isSaleNow();
        console.log("mintNumber", mintNumber);
        console.log("saleFlag", saleFlag);
        setMintNum(mintNumber)
        setSaleFlag(saleFlag)  
      }catch(e){
        console.log(e)
      }
    }

    // add Network
    const addChain = async() => {
      try{
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x250',
            chainName: 'Astar Network',
            nativeCurrency: {
                name: 'ASTR',
                symbol: 'ASTR',
                decimals: 592,
            },
            rpcUrls: ['https://astar.api.onfinality.io/public'],
          }],
        })
        console.log("try");
        setSaleInfo();
      }catch(Exeption){
        console.log("Astar Network already Connected");
        console.log("catch");
      }finally{
        console.log("finally");
      }
    }
    addChain();

  }, []);

  // ミントボタン用
  function MintButton() {
    console.log("MintButton")

    const MetaMuskConnect = async () =>{
      console.log("MetaMuskConnect")
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);
      await contract.buy({value: ethers.utils.parseEther(tokenPrice)});
      toast('Starting to execute a transaction')
    };
    
    return <>
    <div className="flex flex-wrap buttom justify-center bg-[url('/background.png')] bg-center bg-cover">
      <div className='px-2 py-16 lg:px-28 lg:py-28'>
        <iframe className='w-full aspect-video' width="350" height="315" src="https://www.youtube.com/embed/IzJqpMPCrKc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <div className="px-44 py-40 bg-[url('/button_area.png')] text-center bg-center bg-contain bg-no-repeat">
          <h3 className="text-xs lg:text-4xl text-white font-semibold ">NFT Initial Sale</h3>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">START DATE: May 15th</h1>
          {/*<h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">14:00(UTC) | 23:00(JST)</h1>*/}<h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">Time will be at a later date</h1>
          <h1 className="text-base lg:text-5xl pt-1 pb-2 text-white font-semibold "> {mintNum} / 10800</h1>        
          { !saleFlag && <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">Wait until the sale</h3>}
          { (saleFlag && mintNum < 4000) && <button id="mintButton" className="px-4 py-2 my-1 sm:text-lg lg:text-2xl text-white font-semibold rounded bg-[#17F46D]" onClick={MetaMuskConnect}>NFT MINT</button>}
          { (saleFlag && mintNum < 4000 && <Toaster/>)}
          { (saleFlag && mintNum >= 4000) && <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">End of sale</h3>}
      </div>
    </div>
    </>
  }

  return (
    <>
      <div className="">
      <Header />
      <Image className="min-w-full" src="/main_grap.png" alt="Main Image" width={1920} height={800}/>
      <MintButton />
      <Footer />
    </div></>
  )
} 

export default Home

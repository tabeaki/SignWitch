import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import Seo from './components/Seo'
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast'

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function totalSupply() public view virtual override returns (uint256)",
  "function publicMint() public payable",
  "function preMint() public payable",
  "function is_paused() public view returns (bool)",
  "function ownerMint(uint256 count) public onlyOwner ",
  "function is_presaleActive() public view returns (bool)",
]
const contractAddress = "0x7b2152E51130439374672AF463b735a59a47ea85"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {
  
  //const tokenPrice = "450";

  const [mintNum, setMintNum] = useState(0);
  const [paused, setpaused] = useState(false);
  const [presaleActive, setpresaleActive] = useState(false);
  const mintNumber =1;

  useEffect(() => {
    const setSaleInfo = async() =>{
      console.log("setSaleInfo")
  
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)  
      console.log(provider)
  
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const mintNumber = (await contract.totalSupply()).toString();
        const paused = await contract.is_paused();
        const presaleActive = await contract.is_presaleActive();
        console.log("mintNumber", mintNumber);
        console.log("paused", paused);
        setpresaleActive(presaleActive)
        setMintNum(mintNumber)
        setpaused(paused)  
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

    const MetaMuskConnect = async () =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const tokenPrice = "100";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      if(presaleActive == true){
        try{
          await contract.preMint({value: ethers.utils.parseEther(tokenPrice)});
          toast('Starting to execute a transaction')
        }catch(error){
          toast('Not on the whitelist Or Connect to Astar NetWork Or Out of Fund')
        }
      } else {
        try{
          await contract.publicMint({value: ethers.utils.parseEther(tokenPrice)});
          toast('Starting to execute a transaction')
        }catch(error){
          toast('Connect to Astar NetWork Or Out of Fund')
        }
      }
    };
    
    return <>
    <div className="flex flex-wrap buttom justify-center bg-[url('/background.png')] bg-center bg-cover">
      <div className='px-2 py-16 lg:px-28 lg:py-28'>
        <iframe className='w-full aspect-video' width="350" height="315" src="https://www.youtube.com/embed/IzJqpMPCrKc" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <div className="px-24 py-20 lg:px-44 lg:py-40 bg-[url('/button_area.png')] text-center bg-center bg-contain bg-no-repeat">
          <h3 className="text-xs lg:text-4xl text-white font-semibold "></h3>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">PUBLIC MINT: May 30th</h1>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold ">1:00 PM UTC | 10:00 PM JST</h1>
          <h1 className="text-sm lg:text-2xl pt-1 text-white font-semibold "> 1 Witch 100ASTR</h1>
          <h1 className="text-base lg:text-5xl pt-1 pb-2 text-white font-semibold "> 10800 / 10800</h1>        
          { paused && <h3 className="text-lg lg:text-3xl pt-1 text-white font-semibold ">Wait until the sale</h3>}
          { (!paused && presaleActive && mintNum < 10800) && <button id="mintButton" className="px-4 py-2 my-1 sm:text-sm lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-purple-600 via-purple-600 to-blue-500" onClick={MetaMuskConnect}>PUBLIC MINT</button>}
          { (!paused && presaleActive && mintNum < 10800 && <Toaster/>)}
          { (!paused && !presaleActive && mintNum < 10800) && <button id="mintButton" className="px-4 py-2 my-1 sm:text-sm lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-purple-600 via-purple-600 to-blue-500" onClick={MetaMuskConnect}>PUBLIC MINT</button>}
          { (!paused && !presaleActive && mintNum < 10800 && <Toaster/>)}
          { (!paused && mintNum >= 10800) && <h3 className="sm:text-lg lg:text-3xl pt-1 text-white font-semibold ">End of sale</h3>}
      </div>
    </div>  
    </>
  }

  return (
    <>
      <div className="">
      <Header />
      <Seo
        pageTitle={'Astar Sign Witch'}
        pageDescription={'Astar Sign Witch'}
        pageImg={'https://sign-witch.vercel.app/_next/image?url=%2Fmain_grap.png&w=3840&q=75'}
        pageImgWidth={1920}
        pageImgHeight={1005}
      />
      <Image className="min-w-full" src="/main_grap.png" alt="Main Image" width={1920} height={800}/>
      <MintButton />
      <Footer />
    </div></>
  )
} 

export default Home

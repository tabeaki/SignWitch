import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import Seo from './components/Seo'
import Header from './components/Header';
import toast, { Toaster } from 'react-hot-toast'
import {Link as Scroll} from "react-scroll"

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function totalSupply() public view virtual override returns (uint256)",
  "function is_presaleActive() public view returns (bool)",
  "function balanceOf(address owner) external view returns (uint256 balance)"
]
const contractAddress = "0x7b2152E51130439374672AF463b735a59a47ea85"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {
  
  //const tokenPrice = "450";

  const [ownerOfNum, setOwnerOfNum] = useState(0);
  const [paused, setpaused] = useState(false);
  const [presaleActive, setpresaleActive] = useState(false);

  useEffect(() => {
    const setSaleInfo = async() =>{
      console.log("setSaleInfo")
  
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)  
      console.log(provider)
  
      const accounts =  await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try{
        const ownerOfNum = 0;
        const mintNumber = (await contract.totalSupply()).toString();
        const paused = await contract.is_paused();
        const presaleActive = await contract.is_presaleActive();
        console.log("mintNumber", mintNumber);
        console.log("paused", paused);
        setpresaleActive(presaleActive)
        setOwnerOfNum(mintNumber)
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
  function OwnerOf() {
    const OwnerOf = async () =>{
      const provider = new ethers.providers.Web3Provider((window as any).ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const address = await signer.getAddress(); 
      setOwnerOfNum(await contract.balanceOf(address))
      if(ownerOfNum == 0){
        toast('There are 0 Astar Sing Witch witches in the connected wallet')
      } else {
        toast('Wallet Connected')
      }
    };
    
    return <>
      <div className="flex flex-wrap buttom justify-center bg-[url('/background.png')] bg-center bg-cover">
        { (ownerOfNum == 0) && <button className="absolute right-2 px-4 py-2 my-1 sm:text-sm lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-purple-600 via-purple-600 to-blue-500 hover:from-blue-500 hover:via-purple-600 hover:to-purple-600" onClick={OwnerOf}>Wallet Connect</button>}
        { (ownerOfNum == 0) &&  <Toaster />}
        
      </div>  
          {(() => {
          if (ownerOfNum > 0) {
            return <span>
              <div className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <Scroll to="Sagittarius" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Sagittarius</a>        
                </Scroll>
                <Scroll to="Aquarius" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Aquarius</a>        
                </Scroll>
                <Scroll to="Aries" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Aries</a>        
                </Scroll>
                <Scroll to="Cancer" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Cancer</a>        
                </Scroll>
                <Scroll to="Capricorn" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Capricorn</a>        
                </Scroll>
                <Scroll to="Gemini" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Gemini</a>        
                </Scroll>
                <Scroll to="Leo" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Leo</a>        
                </Scroll>
                <Scroll to="Libra" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Libra</a>        
                </Scroll>
                <Scroll to="Pisces" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Pisces</a>        
                </Scroll>
                <Scroll to="Scorpio" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Scorpio</a>        
                </Scroll>
                <Scroll to="Taurus" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Taurus</a>        
                </Scroll>
                <Scroll to="Virgo" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Virgo</a>        
                </Scroll>
                <Scroll to="RubblePunkz" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">RubblePunks</a>        
                </Scroll>
                <Scroll to="Tempura" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Tempura</a>        
                </Scroll>
                <Scroll to="JPYC" smooth={true} duration={600} offset={-30}>
                  <a className="my-1 text-sm font-medium text-gray-700 transition-colors duration-200 transform 
                  dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">JPYC</a>        
                </Scroll>
              </div>
              <div id="Sagittarius" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Sagittarius</h1>
                <Image className="min-w-full" src="/chara/Sagittarius0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Sagittarius1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Sagittarius2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Sagittarius3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Sagittarius4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Sagittarius5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Aquarius" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Aquarius</h1>
                <Image className="min-w-full" src="/chara/Aquarius0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aquarius1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aquarius2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aquarius3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aquarius4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aquarius5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Aries" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Aries</h1>
                <Image className="min-w-full" src="/chara/Aries0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aries1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aries2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aries3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aries4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Aries5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Cancer" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Cancer</h1>
                <Image className="min-w-full" src="/chara/Cancer0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Cancer1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Cancer2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Cancer3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Cancer4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Cancer5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Capricorn" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Capricorn</h1>
                <Image className="min-w-full" src="/chara/Capricorn0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Capricorn1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Capricorn2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Capricorn3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Capricorn4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Capricorn5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Gemini" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Gemini</h1>
                <Image className="min-w-full" src="/chara/Gemini0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Gemini1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Gemini2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Gemini3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Gemini4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Gemini5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Leo" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Leo</h1>
                <Image className="min-w-full" src="/chara/Leo0.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Leo1.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Leo2.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Leo3.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Leo4.png" alt="Main Image" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Leo5.png" alt="Main Image" width={252} height={358}/>
              </div>
              <div id="Libra" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Libra</h1>
                <Image className="min-w-full" src="/chara/Libra0.png" alt="Libra0" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Libra1.png" alt="Libra1" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Libra2.png" alt="Libra2" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Libra3.png" alt="Libra3" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Libra4.png" alt="Libra4" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Libra5.png" alt="Libra5" width={252} height={358}/>
              </div>
              <div id="Pisces" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Pisces</h1>
                <Image className="min-w-full" src="/chara/Pisces0.png" alt="Pisces0" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Pisces1.png" alt="Pisces1" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Pisces2.png" alt="Pisces2" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Pisces3.png" alt="Pisces3" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Pisces4.png" alt="Pisces4" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Pisces5.png" alt="Pisces5" width={252} height={358}/>
              </div>
              <div id="Scorpio" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Scorpio</h1>
                <Image className="min-w-full" src="/chara/Scorpio0.png" alt="Scorpio0" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Scorpio1.png" alt="Scorpio1" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Scorpio2.png" alt="Scorpio2" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Scorpio3.png" alt="Scorpio3" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Scorpio4.png" alt="Scorpio4" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Scorpio5.png" alt="Scorpio5" width={252} height={358}/>
              </div>
              <div id="Taurus" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Taurus</h1>
                <Image className="min-w-full" src="/chara/Taurus0.png" alt="Taurus0" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Taurus1.png" alt="Taurus1" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Taurus2.png" alt="Taurus2" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Taurus3.png" alt="Taurus3" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Taurus4.png" alt="Taurus4" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Taurus5.png" alt="Taurus5" width={252} height={358}/>
              </div>
              <div id="Virgo" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Virgo</h1>
                <Image className="min-w-full" src="/chara/Virgo0.png" alt="Virgo0" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Virgo1.png" alt="Virgo1" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Virgo2.png" alt="Virgo2" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Virgo3.png" alt="Virgo3" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Virgo4.png" alt="Virgo4" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/Virgo5.png" alt="Virgo5" width={252} height={358}/>
              </div>
              <div id="RubblePunkz" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold underline"><a className="px-2 py-4" href="https://twitter.com/Rubble_Punkz">RubblePunkz (Collabo witch)</a></h1>
                <Image className="min-w-full" src="/chara/Wtichcollabo_RubblePunks.png" alt="Rubble" width={252} height={358}/>
              </div>
              <div id="Tempura" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <div>
                  <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold underline"><a className="px-2 py-4" href="https://twitter.com/entirelytempura">Tempura (Collabo witch)</a></h1>
                </div>
                <Image className="min-w-full" src="/chara/Wtichcollabo_Tempura.png" alt="Rubble" width={252} height={358}/>
              </div>
              <div id="JPYC" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                <div>
                  <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold underline"><a className="px-2 py-4" href="https://twitter.com/jcam_official">JPYC (Collabo witch)</a></h1>
                </div>
                <Image className="min-w-full" src="/chara/JPYC_Aquarius.png" alt="JPYC_Aquarius" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Aries.png" alt="JPYC_Aries" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Cancer.png" alt="JPYC_Cancer" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Capricorn.png" alt="JPYC_Capricorn" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Gemini.png" alt="JPYC_Gemini" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Leo.png" alt="JPYC_Leo" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Libra.png" alt="JPYC_Libra" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Pisces.png" alt="JPYC_Pisces" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Sagittarius.png" alt="JPYC_Sagittarius" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Scopio.png" alt="JPYC_Scopio" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Taurus.png" alt="JPYC_Taurus" width={252} height={358}/>
                <Image className="min-w-full" src="/chara/JPYC_Virgo.png" alt="JPYC_Virgo" width={252} height={358}/>
              </div>
            </span>
          } 
          if (ownerOfNum == 0) {
            return <>
            <div className="justify-center bg-[url('/background.png')] bg-center bg-cover">
              <h1 className="text-sm lg:text-2xl px-10 text-white font-semibold ">Click here if you want to purchase</h1>
              <a className="text-sm px-10 lg:text-2xl pt-1 text-white underline" href="https://tofunft.com/collection/astar-sign-witch/activities" >market palace</a>
            </div>
              
            </>
          }
           })()}

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
      <OwnerOf />
    </div></>
  )
} 

export default Home

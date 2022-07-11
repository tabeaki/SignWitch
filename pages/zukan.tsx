import type { NextPage } from 'next'
import React, { useState, useEffect } from "react";
import { ethers } from "ethers"
import Image from 'next/image'
import Seo from './components/Seo'
import Header from './components/Header';
import toast, { Toaster } from 'react-hot-toast'
import {Link as Scroll} from "react-scroll"
import axios from "axios";

declare global {
  interface Window {
    ethereum: any;
  }
}

const abi = [
  "function totalSupply() public view virtual override returns (uint256)",
  "function is_presaleActive() public view returns (bool)",
  "function balanceOf(address owner) external view returns (uint256 balance)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)"
]
var obj = {SagittariusOriginalWitchRobe:false ,SagittariusSpringDormUniform:false ,SagittariusSummerDormUniform:false ,SagittariusAutumnDormUniform:false ,SagittariusWinterDormUniform:false ,SagittariusSpecialDormUniform:false,
  AquariusOriginalWitchRobe:false ,AquariusSpringDormUniform:false ,AquariusSummerDormUniform:false ,AquariusAutumnDormUniform:false ,AquariusWinterDormUniform:false ,AquariusSpecialDormUniform:false,
  AriesOriginalWitchRobe:false ,AriesSpringDormUniform:false ,AriesSummerDormUniform:false ,AriesAutumnDormUniform:false ,AriesWinterDormUniform:false ,AriesSpecialDormUniform:false,
  CancerOriginalWitchRobe:false ,CancerSpringDormUniform:false ,CancerSummerDormUniform:false ,CancerAutumnDormUniform:false ,CancerWinterDormUniform:false ,CancerSpecialDormUniform:false,
  CapricornOriginalWitchRobe:false ,CapricornSpringDormUniform:false ,CapricornSummerDormUniform:false ,CapricornAutumnDormUniform:false ,CapricornWinterDormUniform:false ,CapricornSpecialDormUniform:false,
  GeminiOriginalWitchRobe:false ,GeminiSpringDormUniform:false ,GeminiSummerDormUniform:false ,GeminiAutumnDormUniform:false ,GeminiWinterDormUniform:false ,GeminiSpecialDormUniform:false,
  LeoOriginalWitchRobe:false ,LeoSpringDormUniform:false ,LeoSummerDormUniform:false ,LeoAutumnDormUniform:false ,LeoWinterDormUniform:false ,LeoSpecialDormUniform:false,
  LibraOriginalWitchRobe:false ,LibraSpringDormUniform:false ,LibraSummerDormUniform:false ,LibraAutumnDormUniform:false ,LibraWinterDormUniform:false ,LibraSpecialDormUniform:false,
  PiscesOriginalWitchRobe:false ,PiscesSpringDormUniform:false ,PiscesSummerDormUniform:false ,PiscesAutumnDormUniform:false ,PiscesWinterDormUniform:false ,PiscesSpecialDormUniform:false,
  ScorpioOriginalWitchRobe:false ,ScorpioSpringDormUniform:false ,ScorpioSummerDormUniform:false ,ScorpioAutumnDormUniform:false ,ScorpioWinterDormUniform:false ,ScorpioSpecialDormUniform:false,
  TaurusOriginalWitchRobe:false ,TaurusSpringDormUniform:false ,TaurusSummerDormUniform:false ,TaurusAutumnDormUniform:false ,TaurusWinterDormUniform:false ,TaurusSpecialDormUniform:false,
  VirgoOriginalWitchRobe:false ,VirgoSpringDormUniform:false ,VirgoSummerDormUniform:false ,VirgoAutumnDormUniform:false ,VirgoWinterDormUniform:false ,VirgoSpecialDormUniform:false,
  TempuraTempuraRobe:false,
  SagittariusJPYCRobe:false, AquariusJPYCRobe:false, AriesJPYCRobe:false, CancerJPYCRobe:false, CapricornJPYCRobe:false, CeminiJPYCRobe:false,
  LeoJPYCRobe:false, LibraJPYCRobe:false, PiscesJPYCRobe:false, ScorpioJPYCRobe:false, TaurusJPYCRobe:false, VirgoJPYCRobe:false,
  SagittariusCryptoMaidsRobe:false, AquariusCryptoMaidsRobe:false, AriesCryptoMaidsRobe:false, CancerCryptoMaidsRobe:false, CapricornCryptoMaidsRobe:false, CeminiCryptoMaidsRobe:false,
  LeoCryptoMaidsRobe:false, LibraCryptoMaidsRobe:false, PiscesCryptoMaidsRobe:false, ScorpioCryptoMaidsRobe:false, TaurusCryptoMaidsRobe:false, VirgoCryptoMaidsRobe:false,
  RubblePunkzRubblePunkzRobe:false
}

const contractAddress = "0x7b2152E51130439374672AF463b735a59a47ea85"
const notify = () => toast('Starting to execute a transaction')

const Home: NextPage = () => {
  
  //const tokenPrice = "450";

  const [ownerOfNum, setOwnerOfNum] = useState(0);

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
        setOwnerOfNum(mintNumber)
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

      //////////////////// 図鑑機能を入れる


      console.log(await contract.tokenOfOwnerByIndex(address , 1));
      for(let i = 1; i < 500 ;i++){
        try {
          let num = await contract.tokenOfOwnerByIndex(address , i);
          let URL = await contract.tokenURI(num.toNumber());
          axios.get("https://gateway.pinata.cloud/ipfs/QmVQNm1Z5gJnCfqHEs9reX7cCu9byzs1AuqDK5SFLxQj7b/3661.json").then(res => {
            let str =res.data.attributes[1].value;
            console.log("■" + (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')));
            obj.SagittariusOriginalWitchRobe = ("SagittariusOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.SagittariusSpringDormUniform = ("SagittariusSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.SagittariusSummerDormUniform = ("SagittariusSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.SagittariusAutumnDormUniform = ("SagittariusAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.SagittariusWinterDormUniform = ("SagittariusWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.SagittariusSpecialDormUniform = ("SagittariusSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.AquariusOriginalWitchRobe = ("AquariusOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusSpringDormUniform = ("AquariusSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusSummerDormUniform = ("AquariusSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusAutumnDormUniform = ("AquariusAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusWinterDormUniform = ("AquariusWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusSpecialDormUniform = ("AquariusSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.AriesOriginalWitchRobe = ("AriesOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesSpringDormUniform = ("AriesSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesSummerDormUniform = ("AriesSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesAutumnDormUniform = ("AriesAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesWinterDormUniform = ("AriesWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesSpecialDormUniform = ("AriesSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.CancerOriginalWitchRobe = ("CancerOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerSpringDormUniform = ("CancerSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerSummerDormUniform = ("CancerSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerAutumnDormUniform = ("CancerAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerWinterDormUniform = ("CancerWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerSpecialDormUniform = ("CancerSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.CapricornOriginalWitchRobe = ("CapricornOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornSpringDormUniform = ("CapricornSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornSummerDormUniform = ("CapricornSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornAutumnDormUniform = ("CapricornAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornWinterDormUniform = ("CapricornWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornSpecialDormUniform = ("CapricornSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.GeminiOriginalWitchRobe = ("CeminiOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.GeminiSpringDormUniform = ("CeminiSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.GeminiSummerDormUniform = ("CeminiSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.GeminiAutumnDormUniform = ("CeminiAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.GeminiWinterDormUniform = ("CeminiWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.GeminiSpecialDormUniform = ("CeminiSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.LeoOriginalWitchRobe = ("LeoOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoSpringDormUniform = ("LeoSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoSummerDormUniform = ("LeoSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoAutumnDormUniform = ("LeoAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoWinterDormUniform = ("LeoWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoSpecialDormUniform = ("LeoSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.LibraOriginalWitchRobe = ("LibraOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraSpringDormUniform = ("LibraSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraSummerDormUniform = ("LibraSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraAutumnDormUniform = ("LibraAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraWinterDormUniform = ("LibraWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraSpecialDormUniform = ("LibraSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.PiscesOriginalWitchRobe = ("PiscesOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesSpringDormUniform = ("PiscesSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesSummerDormUniform = ("PiscesSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesAutumnDormUniform = ("PiscesAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesWinterDormUniform = ("PiscesWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesSpecialDormUniform = ("PiscesSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.ScorpioOriginalWitchRobe = ("ScorpioOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioSpringDormUniform = ("ScorpioSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioSummerDormUniform = ("ScorpioSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioAutumnDormUniform = ("ScorpioAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioWinterDormUniform = ("ScorpioWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioSpecialDormUniform = ("ScorpioSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.TaurusOriginalWitchRobe = ("TaurusOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusSpringDormUniform = ("TaurusSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusSummerDormUniform = ("TaurusSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusAutumnDormUniform = ("TaurusAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusWinterDormUniform = ("TaurusWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusSpecialDormUniform = ("TaurusSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.VirgoOriginalWitchRobe = ("VirgoOriginalWitchRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoSpringDormUniform = ("VirgoSpringDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoSummerDormUniform = ("VirgoSummerDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoAutumnDormUniform = ("VirgoAutumnDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoWinterDormUniform = ("VirgoWinterDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoSpecialDormUniform = ("VirgoSpecialDormUniform" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            // Collaboration frame from here
            obj.TempuraTempuraRobe = ("TempuraTempuraRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.RubblePunkzRubblePunkzRobe = ("RubblePunkzRubblePunkzRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.SagittariusJPYCRobe = ("SagittariusJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusJPYCRobe = ("AquariusJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesJPYCRobe = ("AriesJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerJPYCRobe = ("CancerJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornJPYCRobe = ("CapricornJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CeminiJPYCRobe = ("CeminiJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoJPYCRobe = ("LeoJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraJPYCRobe = ("LibraJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesJPYCRobe = ("PiscesJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioJPYCRobe = ("ScorpioJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusJPYCRobe = ("TaurusJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoJPYCRobe = ("VirgoJPYCRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            obj.SagittariusCryptoMaidsRobe = ("SagittariusCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AquariusCryptoMaidsRobe = ("AquariusCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.AriesCryptoMaidsRobe = ("AriesCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CancerCryptoMaidsRobe = ("CancerCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CapricornCryptoMaidsRobe = ("CapricornCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.CeminiCryptoMaidsRobe = ("CeminiCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LeoCryptoMaidsRobe = ("LeoCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.LibraCryptoMaidsRobe = ("LibraCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.PiscesCryptoMaidsRobe = ("PiscesCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.ScorpioCryptoMaidsRobe = ("ScorpioCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.TaurusCryptoMaidsRobe = ("TaurusCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;
            obj.VirgoCryptoMaidsRobe = ("VirgoCryptoMaidsRobe" == (res.data.attributes[0].value + str.replaceAll(/\s+/g, '')))? true : false ;

            console.log("obj.SagittariusWinterDormUniform=" + obj.SagittariusWinterDormUniform);
          });
          // fetch(URL) //api
          // .then(res => res.json()) 
          // .then(json => {
          //   console.log(json);
          // });

        } catch {
          break; 
        } 
      }
      console.log('aaaaa');


      ////////////////////
      if(ownerOfNum == 0){
        toast('There are 0 Astar Sing Witch witches in the connected wallet')
      } else {
        toast('Wallet Connected')
      }
    };
    
    return <>
      <div className="flex flex-wrap buttom justify-center bg-[url('/background.png')] bg-center bg-cover">
      <button className="absolute right-2 px-4 py-2 my-1 sm:text-sm lg:text-2xl text-white font-semibold rounded bg-gradient-to-r from-purple-600 via-purple-600 to-blue-500 hover:from-blue-500 hover:via-purple-600 hover:to-purple-600" onClick={OwnerOf}>Wallet Connect</button>
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
                {(obj.SagittariusOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Sagittarius0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.SagittariusSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Sagittarius1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.SagittariusSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Sagittarius2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.SagittariusAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Sagittarius3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.SagittariusWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Sagittarius4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.SagittariusSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Sagittarius5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Aquarius" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.AquariusOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Aquarius0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Aquarius1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Aquarius2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Aquarius3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Aquarius4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Aquarius5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Aries" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.AriesOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Aries0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Aries1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Aries2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Aries3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Aries4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Aries5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Cancer" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.CancerOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Cancer0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Cancer1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Cancer2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Cancer3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Cancer4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Cancer5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Capricorn" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.CapricornOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Capricorn0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Capricorn1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Capricorn2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Capricorn3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Capricorn4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Capricorn5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Gemini" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.GeminiOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Gemini0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.GeminiSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Gemini1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.GeminiSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Gemini2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.GeminiAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Gemini3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.GeminiWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Gemini4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.GeminiSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Gemini5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Leo" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.LeoOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Leo0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Leo1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Leo2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Leo3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Leo4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Leo5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Libra" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.LibraOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Libra0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Libra1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Libra2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Libra3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Libra4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Libra5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Pisces" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.PiscesOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Pisces0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Pisces1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Pisces2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Pisces3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Pisces4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Pisces5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Scorpio" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.ScorpioOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Scorpio0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Scorpio1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Scorpio2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Scorpio3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Scorpio4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Scorpio5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scorpio5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Taurus" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.TaurusOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Taurus0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Taurus1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Taurus2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Taurus3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Taurus4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Taurus5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Virgo" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.VirgoOriginalWitchRobe == true) ? <Image className="min-w-full" src="/chara/Virgo0.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo0.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoSpringDormUniform == true) ? <Image className="min-w-full" src="/chara/Virgo1.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo1.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoSummerDormUniform == true) ? <Image className="min-w-full" src="/chara/Virgo2.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo2.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoAutumnDormUniform == true) ? <Image className="min-w-full" src="/chara/Virgo3.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo3.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoWinterDormUniform == true) ? <Image className="min-w-full" src="/chara/Virgo4.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo4.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoSpecialDormUniform == true) ? <Image className="min-w-full" src="/chara/Virgo5.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo5.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="RubblePunkz" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.RubblePunkzRubblePunkzRobe == true) ? <Image className="min-w-full" src="/chara/Wtichcollabo_RubblePunks.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/RubbleWitch.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="Tempura" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.TempuraTempuraRobe == true) ? <Image className="min-w-full" src="/chara/Wtichcollabo_Tempura.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Tempura.png" alt="Main Image" width={252} height={358}/>}
              </div>
              <div id="JPYC" className="justify-center bg-[url('/background.png')] bg-center bg-cover">
                {(obj.SagittariusJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Aquarius.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aquarius JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AquariusJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Aries.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Aries JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.AriesJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Cancer.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Cancer JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CancerJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Capricorn.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Capricorn JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CapricornJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Gemini.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Gemini JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.CeminiJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Leo.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Leo JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LeoJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Libra.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Libra JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.LibraJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Pisces.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Pisces JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.PiscesJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Sagittarius.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Sagittarius JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.ScorpioJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Scopio.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Scopio JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.TaurusJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Taurus.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Taurus JPYC.png" alt="Main Image" width={252} height={358}/>}
                {(obj.VirgoJPYCRobe == true) ? <Image className="min-w-full" src="/chara/JPYC_Virgo.png" alt="Main Image" width={252} height={358}/> : <Image className="min-w-full" src="/NoChara/Virgo JPYC.png" alt="Main Image" width={252} height={358}/>}
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

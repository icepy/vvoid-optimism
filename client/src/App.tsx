import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import HelloJSON from './abi/Hello.json';

const contractAddress = '0xF98bE2eE83151283D0bA34A2cEBB349bBBB9d783';
const helloABI = HelloJSON.abi;

function App() {
  
  const [helloTotal, setHelloTotal] = useState(0)

  const getTotal = async() =>{
    try{
      const { ethereum } = window as any;
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloContract = new ethers.Contract(contractAddress, helloABI, signer);
        const total = await helloContract.getHelloTotal();
        setHelloTotal(total.toNumber());
      }
    }catch(e){

    }
  }

  const reduce = async() => {
    try{
      const { ethereum } = window as any;
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloContract = new ethers.Contract(contractAddress, helloABI, signer);
        await helloContract.reduce();
        const total = await helloContract.getHelloTotal();
        setHelloTotal(total.toNumber());
      }
    }catch(e){

    }
  }
  
  useEffect(() => {
    if (helloTotal === 0){
      getTotal();
    }
    console.log('hello total', helloTotal)
  }, [helloTotal]);

  return (
    <div className="App">
      <button onClick={reduce}>减</button>
    </div>
  );
}

export default App;

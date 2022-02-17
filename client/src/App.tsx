import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from './contract';
import HelloJSON from './abi/Hello.json';
import './App.css';

const helloABI = HelloJSON.abi;

function App() {
  
  const [helloTotal, setHelloTotal] = useState(0)

  const getTotal = async() =>{
    try{
      const { ethereum } = window as any;
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const helloContract = new ethers.Contract(CONTRACT_ADDRESS, helloABI, signer);
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
        const helloContract = new ethers.Contract(CONTRACT_ADDRESS, helloABI, signer);
        await helloContract.reduce();
        const total = await helloContract.getHelloTotal();
        setHelloTotal(total.toNumber());
      }
    }catch(e){

    }
  }

  const onReduceResultEvent = (from: string, timestamp: ethers.BigNumber, message: ethers.Event) => {
    console.log('from', from);
    console.log('timestamp', timestamp);
    console.log('message', message);
    console.log('sender address', message.args![0]);
    console.log('result', message.args![1].toNumber());
  }
  
  useEffect(() => {
    let helloContract: any = null; 

    if (helloTotal === 0){
      getTotal();
    }
    console.log('hello total', helloTotal);
    const { ethereum } = window as any;
    if (ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      helloContract = new ethers.Contract(CONTRACT_ADDRESS, helloABI, signer);
      helloContract.on('HelloReduceResult', onReduceResultEvent);
    }
    return () => {
      if (helloContract){
        helloContract.off('HelloReduceResult', onReduceResultEvent);
      }
    }

  }, [helloTotal]);

  return (
    <div className="App">
      <button onClick={reduce}>减</button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Image from './components/Image';
import Buttons from './components/Buttons';
import { URLArr } from './images';
function App() {
  const [idx,setIdx]=useState(Math.floor(URLArr.length/2))
  function changeIdx(i:string){
    if (i=="+"){
      if(idx+1 == URLArr.length){

        setIdx(0)
      }
      else{
        setIdx(idx+1)
      }
    }
    else if (i=="-"){
      if(idx-1<0){

        setIdx(URLArr.length-1)
      }
      else{
        setIdx(idx-1)
      }
    }
    
  
  }
  return (
    <div className="App">
      <Image source={URLArr[idx]}/>
      <Buttons changeIdx={changeIdx}/>
    </div>
  );
}

export default App;

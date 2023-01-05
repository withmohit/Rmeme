import React from 'react'
import "./header.css"
import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


export default function Form() {

  const [MImage, Imf]= React.useState({
    topText:"",
    bottomText:"",
    MImageUrl:""
  })
  const [memeArray, memeChange]= React.useState([])

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(internal => memeChange(internal.data.memes))
  },[]
  )

  const imf=memeArray[Math.floor(Math.random() * memeArray.length)];
  function getMemeImg(){
    Imf(prevData=> ({
      ...prevData,
      MImageUrl:imf.url
    }))
  }

  function handleChange(event){
    const {name,value}=event.target;
    Imf(prevData => ({
      ...prevData,
      [name]:value
    }))
  
  }
  const OverallMeme=useRef();
  function Capture(dom) {
    domtoimage.toBlob(dom)
    .then(function (blob) {
        window.saveAs(blob, 'mohitNreact.png');
    });
    
  }

  return (
    <>
    <div className='Form'>
      <table>
        <td>
        <input placeholder='Upper Content'
        name="topText"
        value={MImage.topText}
        onChange={handleChange}
        />


        </td>
        <td>
        <input placeholder='Lower Content'
        name="bottomText"
        value={MImage.bottomText}
        onChange={handleChange}/>
        </td>
        </table>
        <button className='button-36' onClick={getMemeImg}>😎 Get a new Image</button>
    </div>
    <div className='generated' ref={OverallMeme}>
        <img className='imgPic' src={MImage.MImageUrl}/>
        <h2 className='top-text'>{MImage.topText}</h2>
        <h2 className='bottom-text'>{MImage.bottomText}</h2>
    </div>

    <button className='button-36' onClick={()=>Capture(OverallMeme.current)}>📥 Downlaod</button>
    
    {/* <h1>hiiii</h1> */}
    </>
  )
}

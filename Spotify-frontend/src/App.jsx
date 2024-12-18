import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import {useRef} from 'react';
import { Playercontext } from './context/Playercontext';
const App = () => {

  const {audioRef,track,allsongs}=useContext(Playercontext);

  return (
    <div className='h-screen bg-black'>
      {
      allsongs? 
      <>
      <div className='h-[90%] flex'>
      <Sidebar />
      <Display />
        </div>
        <div>
          <Player />
          <audio ref={audioRef} src={track? track.file:""} preload='auto'></audio>
        </div>
        </>:
        null
      }
    
    </div>
  )
}

export default App

import React, { useContext } from 'react'
import Navbar from './Navbar'

import Albums from './Albums'
import LatestSongs from './LatestSongs';
import { Playercontext } from '../context/Playercontext';

function createAlbum(album){

return (
    <div className='mb-5'>
        {/* we cannot access props.key , so i agained passed id to access using props.id */}
    <Albums id={album._id} key={album._id} image={album.image} desc={album.desc} name={album.name} />
    </div>);
  

}
function createhits(album){
    return (
        <div className='mb-5'>
        <LatestSongs id={album._id} key={album._id} image={album.image} desc={album.desc} name={album.name} />
        </div>);
      
    
    }

const Displayhome = () => {
  const {allsongs,allalbums}=useContext(Playercontext);
  return (
    <div>
      <Navbar />
      <div>
     
        <div className='flex overflow-auto'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        {allalbums.map(createAlbum)}
        </div>

        <div className='flex overflow-auto'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest hits</h1>
        {allsongs.map(createhits)}
        </div>
    
      
      </div>
    </div>
  )
}

export default Displayhome

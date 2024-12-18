import React, { useContext, useEffect } from 'react'
import { useRef } from 'react'
import { Routes ,Route,useLocation} from 'react-router-dom'
import Displayhome from './Displayhome'
import Albumpage from './Albumpage'
import { albumsData } from '../assets/assets'
import Songpage from './Songpage'
import { Playercontext } from '../context/Playercontext'


const Display = () => {
const {allalbums}=useContext(Playercontext);
  const refelement=useRef();
  const location=useLocation();
  console.log(location);
  const isAlbum=location.pathname.includes("album");
  const albumid = isAlbum ? location.pathname.split('/').pop() : null;
  console.log(isAlbum);
  const album = isAlbum && allalbums ? allalbums.find((x) => x._id === albumid) : null;
  const bgcolor = album ? album.bgcolor : "";
useEffect(()=>{
if(isAlbum){
  refelement.current.style.background=`${bgcolor}`
}
else{
   refelement.current.style.background=`#121212`
}
})



  return (
    <div ref={refelement} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<Displayhome />} />
        <Route path='/album/:id' element={<Albumpage album={allalbums.find((x)=>(x._id===albumid))}/>} />
     
      </Routes>
    </div>
  )
}

export default Display

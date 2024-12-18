import React, { useContext } from 'react'
import { Playercontext } from '../context/Playercontext'


const LatestSongs = (props) => {
   const {playwithid}=useContext(Playercontext);
  return (
    <div onClick={()=>playwithid(props.id)} className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
    <img className='rounded' src={props.image} alt="" />
    <p className='font-bold mt-2 mb-1'>{props.name}</p>
    <p className='text-slate-200 text-sm '>{props.desc}</p>
   
  </div>
  )
}

export default LatestSongs
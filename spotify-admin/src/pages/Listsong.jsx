import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Listsong = () => {
const [data,setdata]=useState([]);
const fetchsongs=async()=>{
  try{
    const response=await axios.get('http://localhost:7000/api/song/list');
    if(response.data.success)
    setdata(response.data.songs);
  }

catch(error){
  toast.error("error");
}
};

const removesong=async(id)=>{


  try{
    const idtosend=id;
    const response=await axios.post('http://localhost:7000/api/song/remove',{id:idtosend});
    if(response.data.success){
      toast.success("song removed");
      fetchsongs();
    }
  }
  catch(error){
    toast.error("error");
  }


}
useEffect(()=>{
  fetchsongs();
})

  return (
    <div>
     <p>
      All Songs list
     </p>
     <br />
     <div>
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
    <b>Image</b>
    <b>Name</b>
    <b>Album</b>
    <b>Duration</b>
    <b>Action</b>
      </div>
      {data.map((item,index)=>{
        return <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <p onClick={()=>removesong(item._id)} className='cursor-pointer'>x</p>
          </div>
      })}
     </div>
    </div>
  )
}

export default Listsong

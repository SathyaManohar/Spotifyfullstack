import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
const Listalbum = () => {
  const [data,setdata]=useState([]);

  const fetchdata=async()=>{
    try{
      const response=await axios.get('http://localhost:7000/api/album/list');
      console.log(response);
      if(response.data.status==="success"){
       
        setdata(response.data.message);
      }
      else{
        toast.error("something went wrong");
      }
    }
    catch(error){
toast.error("error");
    }
  }

  const removealbum=async(id)=>{
    try{
      const idtosend=id;
const response=await axios.post('http://localhost:7000/api/album/remove',{id:idtosend});
if(response.data.status==='success'){
  toast.success("Album removed");
  fetchdata();
}
else{
  toast.error("Something went wrong");
}

    }
    catch(error){
toast.error("Error");
    }
  }
  useEffect(()=>{
    fetchdata();
  })
  return (
    <div>
     <p>
      All Albums list
     </p>
     <br />
     <div>
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
    <b>Image</b>
    <b>Name</b>
    <b>Description</b>
    <b>Album color</b>
    <b>Action</b>
      </div>
      {data.map((item,index)=>{
        return <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
         <p style={{backgroundColor:item.bgcolor,textAlign:'center'}}>album</p>

            <p onClick={()=>removealbum(item._id)} className='cursor-pointer'>x</p>
          </div>
      })}
     </div>
    </div>
  )
}

export default Listalbum

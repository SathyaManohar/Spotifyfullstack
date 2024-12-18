import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const Addalbum = () => {
 
  
  const [albumname,setalbumname]=useState("");
  const [albumdesc,setalbumdesc]=useState("");
  const [albumimage,setalbumimage]=useState(false);
  const [bgcolor,setbgcolor]=useState('#121212');
  const [loading,setloading]=useState(false);


  const submithandler=async(e)=>{
//to prevent reloading the webpage
setloading(true);
e.preventDefault();
try{
const formdata=new FormData();

formdata.append('name',albumname);
formdata.append('desc',albumdesc);
formdata.append('bgcolor',bgcolor);
formdata.append('image',albumimage);

const response=await axios.post('http://localhost:7000/api/album/add',formdata);
console.log(response.data);
if(response.data.success){
  toast.success("Album added");
  setalbumname("");
  setalbumdesc("");
  setalbumimage(null);
  setbgcolor('#121212');
  
  
}
else{
toast.error("Error, cannot add song")
}
setloading(false);
}
catch(error){
toast.error("Error");
setloading(false);
}

  }
  return loading?(
    <div className='grid min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-t-gray-800 rounded-full animate-spin'>

      </div>

    </div>
  ): (
    <form onSubmit={submithandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex gap-8'>
      
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e)=>setalbumimage(e.target.files[0])} type="file" name="image" id="image" accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer'  src={albumimage?URL.createObjectURL(albumimage):assets.upload_area} alt="" />
          </label>
        </div>
      </div>
      <div>
        <p>Album name</p>
        <input onChange={(e)=>setalbumname(e.target.value)} value={albumname} className='bg-transparent outline-green-60 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' placeholder='Type Here' type="text" id="name" required />
      </div>
      <div>
        <p>Album Description</p>
        <input onChange={(e)=>setalbumdesc(e.target.value)} value={albumdesc} className='bg-transparent outline-green-60 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' placeholder='Type Here' type="text" id="desc" required />
      </div>
<div className='flex flex-col gap-2.5'>
<p>BackgroundColour</p>
<input onChange={(e)=>setbgcolor(e.target.value)} type="color" />
</div>

<button type='submit'className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' >ADD</button>
    </form>
  )
}

export default Addalbum

import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const Addsong = () => {
  const [image,setimage]=useState(false);
  const [song,setsong]=useState(false);
  const [songname,setsongname]=useState("");
  const [songdesc,setsongdesc]=useState("");
  const [album,setalbum]=useState('none');
  const [loading,setloading]=useState(false);
  const [albumdata,setalbumdata]=useState([]);

  const submithandler=async(e)=>{
//to prevent reloading the webpage
setloading(true);
e.preventDefault();
try{
const formdata=new FormData();

formdata.append('name',songname);
formdata.append('desc',songdesc);
formdata.append('image',image);
formdata.append('audio',song);
formdata.append('album',album);

const response=await axios.post('http://localhost:7000/api/song/add',formdata);
if(response.data.status==="success"){
  toast.success("Song added");
  setsongname("");
  setsongdesc("");
  setimage(false)
  setsong(false);
  setalbum("none");
  
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

  };

  const loadalbums=async()=>{
    try{
      const response=await axios.get('http://localhost:7000/api/album/list');
 
      console.log("response",response.data.message);
      console.log(response.data.message.length);
      for(var i=0;i<response.data.message.length;i++){
        console.log(response.data.message[i].name);
      }
      if(response.data.status==="success"){
        setalbumdata(response.data.message);
      }
      else{
        toast.error("Something error occured");
      }
    }
    catch(error){
      toast.error("Error");
    }
  };
useEffect(()=>{
  loadalbums();
},[])

const createoption=(info)=>{
return  <option key={info._id} >{info.name}</option>
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
            <p>Upload song</p>
            <input onChange={(e)=>setsong(e.target.files[0])} type="file" id='song' accept='audio/*' hidden />
            <label htmlFor="song">
              <img  src={ song? assets.upload_added: assets.upload_song} className='w-24 cursor-pointer' alt="" />
            </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" name="image" id="image" accept='image/*' hidden />
          <label htmlFor="image">
            <img className='w-24 cursor-pointer'  src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
        </div>
      </div>
      <div>
        <p>Song name</p>
        <input onChange={(e)=>setsongname(e.target.value)} value={songname} className='bg-transparent outline-green-60 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' placeholder='Type Here' type="text" id="name" required />
      </div>
      <div>
        <p>Song Description</p>
        <input onChange={(e)=>setsongdesc(e.target.value)} value={songdesc} className='bg-transparent outline-green-60 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)] ' placeholder='Type Here' type="text" id="desc" required />
      </div>
<div className='flex flex-col gap-2.5'>
<p>Album</p>
<select className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]' value={album} onChange={(e) => setalbum(e.target.value)}>
<option value="none">None</option>
{albumdata.map(createoption)}
</select>
</div>

<button type='submit'className='text-base bg-black text-white py-2.5 px-14 cursor-pointer' >ADD</button>
    </form>
  )
}

export default Addsong

// import React, { useContext, useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import { useParams } from 'react-router-dom';

// import { Playercontext } from '../context/Playercontext';

// const Albumpage = () => {
//   const { id } = useParams(); 
//   console.log(id);
//   const {playwithid,allalbums,allsongs}=useContext(Playercontext);
// const [albumdata,setalbumdata]=useState(null);
  
//  useEffect(()=>{
//   albumdata.map((item)=>{
// if(item._id===id){
//   setalbumdata(item);
// }
//   })
//  })
 




//   function filllist(songobj) {
//     return (
//       <div  
//       onClick={()=>playwithid(songobj._id)}
//         key={songobj._id}
//         className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
//       >
//         <p className="text-white">
//           <b className="mr-4 text-[#a7a7a7]">{songobj._id + 1}</b>
//           <img className="inline w-10 mr-5" src={songobj.image} alt="" />
//           {songobj.name}
//         </p>
//         <p>{albumdata.name}</p> 
//         <p>Added 5 days Ago</p>
//         <p className='text-[15px] text-center'>{songobj.duration}</p>
//       </div>
//     );
//   }

//   return albumdata? (
//     <div>
//       <Navbar />
//       <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
//         <img className="w-48 rounded" src={albumdata.image} alt="" />
        
//         <div className="flex flex-col">
//           <p>Playlist</p>
//           <h2 className="text-sxl font-bold mb-4 md:text-7xl">{albumdata.name}</h2>
         
//           <h4>{albumdata.desc}</h4>

//           <p className="mt-2">
//             <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
//             <b>Spotify</b>
//             * 1,23,432 likes *50 songs about-3 hr 30 min
//           </p>
//         </div>
//       </div>
//       <div className="grid frid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
//         <p className="mr-4">
//           <b>#</b>Title
//         </p>
//         <p>Album</p>
//         <p className="hidden sm:block">Date Added</p>
//         <img className="m-auto w-4" src={assets.clock_icon} alt="" />
//       </div>
//       <hr />
//       {/* Map over the list of songs */}
//       {allsongs.map(filllist)}
//     </div>
//   ):null;
// };

// export default Albumpage;
import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, assets, songsData } from '../assets/assets';
import { Playercontext } from '../context/Playercontext';

const Albumpage = () => {
  const { id } = useParams();
  const { playwithid, allalbums, allsongs } = useContext(Playercontext);
  const [albumdata, setAlbumData] = useState(null); // Default to null to handle loading state

  useEffect(() => {
    // Find the album by ID from allalbums
    const album = allalbums.find((item) => item._id === id);
    setAlbumData(album); // Set album data once found
  }, [id, allalbums]); // Depend on id and allalbums

  function filllist(songobj) {
    return (
      <div
        onClick={() => playwithid(songobj._id)}
        key={songobj._id}
        className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
      >
        <p className="text-white">
          <b className="mr-4 text-[#a7a7a7]">{songobj._id + 1}</b>
          <img className="inline w-10 mr-5" src={songobj.image} alt="" />
          {songobj.name}
        </p>
        <p>{albumdata?.name}</p> {/* Conditional rendering to avoid error when albumdata is not yet set */}
        <p>Added 5 days Ago</p>
        <p className="text-[15px] text-center">{songobj.duration}</p>
      </div>
    );
  }

  return albumdata ? (
    <div>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumdata.image} alt="" />

        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-sxl font-bold mb-4 md:text-7xl">{albumdata.name}</h2>

          <h4>{albumdata.desc}</h4>

          <p className="mt-2">
            <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
            <b>Spotify</b>
            * 1,23,432 likes * 50 songs about-3 hr 30 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p className="mr-4">
          <b>#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {/* Map over the list of songs */}
      {allsongs.filter((item)=>item.album===albumdata.name).map(filllist)}
    </div>
  ) : (
    <div>Loading...</div> // Display loading message while data is being fetched
  );
};

export default Albumpage;


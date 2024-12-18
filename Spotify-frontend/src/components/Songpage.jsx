import React from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { albumsData, assets, songsData } from '../assets/assets';

const Songpage = (props) => {
 

  return (
   
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={props.image} alt="" />
        <h4>{props.desc}</h4>
        <p>{props.name}</p>
       
       </div>
    
  );
};

export default Songpage;

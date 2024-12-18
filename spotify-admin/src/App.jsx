import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom'
import Addalbum from './pages/Addalbum'
import Addsong from './pages/Addsong'
import Listalbum from './pages/Listalbum'
import Listsong from './pages/Listsong'
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Playlist from './pages/Playlist';
const App = () => {
  return (
    <div className='flex items-start min-h-screen' >
<ToastContainer /> 

<Sidebar />
<div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
<Navbar />
<div className='pt-8 pl-1 sm:pt-12 sm:pl-12'>

<Routes>
  <Route path='/add-song' element={<Addsong/>} />
  <Route path='/add-album' element={<Addalbum/>} />
<Route path='/list-song' element={<Listsong/>} />
<Route path='/list-album' element={<Listalbum/>} />
<Route path='/add-songto-playlist' element={<Playlist/>} />
</Routes>
</div>
</div>
      
    </div>
  )
}

export default App

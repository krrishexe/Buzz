import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './components/SetAvatar'
import Video from './pages/Video'
import socketContextProvider from './providers/SocketContextProvider'


function App() {

  return (
    <socketContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Chat />} />
          <Route path='/video' element={<Video />} />
          <Route path='/SetAvatar' element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </socketContextProvider>
  )
}

export default App

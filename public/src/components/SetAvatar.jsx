import { useNavigate } from 'react-router-dom'
import loader from '../assets/loader.gif'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer'


function SetAvatar() {

  const api = "https://api.multiavatar.com/45678944"
  const navigate = useNavigate()

  const [avatars, setAvatars] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(undefined)
  const [isLoading, setIsLoading] = useState([true])

  useEffect(()=>{
    if(!localStorage.getItem('chat-app-user')){
      navigate('/login')
    }
  })

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined){
      toast.error('please select an avatar', {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      })
    }
    else {
      console.log(selectedAvatar)
      const user = await JSON.parse(localStorage.getItem('chat-app-user'))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar],
      })
      console.log(data)
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user))
        navigate('/')
      }
      else{
        toast.error('Error setting avatar. Please try again', {
          position: 'bottom-right',
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        })
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}?apikey=${import.meta.env.API_KEY}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData()
  }, [])

  return (
    <>
      {
        isLoading ? ( <div style={{ backgroundColor: "#131324" }} className='flex justify-center items-center flex-col gap-12 h-screen w-screen '>
          <img src={loader} alt="" />
        </div> )
          :
          (
            <div style={{ backgroundColor: "#131324" }} className='flex justify-center items-center flex-col gap-12 h-screen w-screen '>
              <div>
                <h1 className='text-white'>Pick an avatar as your profile picture</h1>
              </div>
              <div className='flex gap-8'>
                {
                  avatars.map((avatar, index) => {
                    return (
                      <div key={avatar} className={`border-4 p-1 border-solid border-transparent  rounded-full flex justify-center items-center duration-500 transition-all ${selectedAvatar === index ? 'border-4 border-solid border-violet-500' : ""}`}>
                        <img className='h-24' src={`data:image/svg+xml;base64,${avatar}`} onClick={() => { setSelectedAvatar(index) }} alt="" />

                      </div>
                    )
                  })}
              </div>
              <button onClick={setProfilePicture} className='text-white bg-violet-500 px-8 py-4 border-none font-bold text-lg cursor-pointer rounded-lg uppercase hover:bg-violet-400 transition-colors duration-200'>
                Set as Profile Picture
              </button>
            </div>
          )
      }
        <ToastContainer />
    </>
  )
}

export default SetAvatar

import { useNavigate } from 'react-router-dom'
import {BiVideo} from 'react-icons/bi'

function Videocall() {
    const navigate = useNavigate()

    const handleClick = async () =>{
        navigate('/video')
    }
  return (
    <button onClick={handleClick} className='flex justify-center items-center p-2 rounded-lg bg-violet-400 border-none cursor-pointer text-xl'>
      <BiVideo className='text-white' />
    </button>
  )
}

export default Videocall

import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from "../assets/logo.svg"
import { videoSchema } from "../models/index"
import { useFormik } from 'formik'
import { toast, ToastContainer } from 'react-toastify'



function Video() {

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    videoId: '',
  }

  const { errors, values, handleBlur, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: videoSchema,
    onSubmit: (values, action) => {
      console.log(values)
      action.resetForm()
    }
  })

  const handleOnClick = () => {

    errors.username && touched.username ? (
      toast.error(errors.username, {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      })
    ) : null

    errors.videoId && touched.videoId ? (
      toast.error(errors.videoId, {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
      })
    ) : null

  }

  return (
    <>
      <div style={{ backgroundColor: '#131234' }} className='h-screen w-screen flex flex-col justify-center gap-1 items-center '>
        <form style={{ backgroundColor: '#00000076' }} className='flex flex-col gap-8 rounded-3xl px-20 py-12' onSubmit={handleSubmit}>

          <div className=" rounded-lg brand flex items-center gap-4 justify-center">
            <img className='h-10' src={logo} alt="" />
            <h1 className='text-white uppercase'>Buzz</h1>
          </div>

          <input className='bg-transparent p-2 border-2 rounded-md border-blue-400 text-white w-full text-base focus:border-purple-400 focus:outline-none' name='username' type="text" placeholder='username' value={values.username} onBlur={handleBlur} onChange={handleChange} min={3} />


          <input className='bg-transparent p-2 border-2 rounded-md border-blue-400 text-white w-full text-base focus:border-purple-400 focus:outline-none' name='password' type="password" placeholder='Enter videoId' onBlur={handleBlur} value={values.password} onChange={handleChange} />

          <div className="button-container">
            <div className="dog">
              <div className="tail"></div>
              <div className="body"></div>
              <div className="head">
                <div className="eyes">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
                <div className="nuzzle">
                  <div className="mouth">
                    <div className="tongue"></div>
                  </div>
                  <div className="nose">
                    <div className="nostrils"></div>
                    <div className="highlight"></div>
                  </div>
                </div>
              </div>
              <div className="ears">
                <div className="left"></div>
                <div className="right"></div>
              </div>
            </div>

            <button className='text-white w-full bg-violet-500 px-8 py-4 border-none font-bold text-lg cursor-pointer rounded-sm uppercase hover:bg-violet-400 transition-colors duration-200' type='submit' onClick={handleOnClick}>Join Videochat</button>

            <div className="paw"></div>
            <div className="paw top"></div>
          </div>

          <span className='text-white uppercase'>Dont have an account ? <Link className='text-violet-700 no-underline font-bold' to="/register">Register</Link> </span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Video

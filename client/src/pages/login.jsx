import * as React from 'react';
import Navbar from '../components/navbar';
import {useState} from 'react';
import axios from 'axios';
import Footer from '../components/footer';



export default function SignIn() {

        const [data, setData] = useState({email: '', password: ''});
        const [error, setError] = useState(null);

        const handleChange = (e) => {
            setData({...data, [e.target.name]: e.target.value})
        }
      
        const handleSubmit = async (e) => {
          console.log("clicked")
          console.log(data);
            e.preventDefault();
            try {
              const res = await axios.post('http://localhost:5080/api/auth/login', {
                email: data.email,
                password: data.password
              });

              localStorage.setItem("token", res.data);
              window.location = "/browse";
              console.log(res.data);
              // Save the access token to local storage or perform any necessary actions
              // Redirect the user to the desired page (e.g., home/dashboard)
            } catch (error) {
              setError(true);
              console.log(error);
            }
          };
        

  return (
    
<section className="w-full h-screen relative">
<Navbar/>


  <img
    alt=""
    aria-hidden="true"
    data-uia="nmhp-card-hero+background+image"
    src="https://assets.nflxext.com/ffe/siteui/vlv3/ce221d7a-8901-41d9-b726-3ea2efe3a650/0b3dc3ab-67fa-49bd-9d78-c6557c01e5b4/US-en-20230703-popsignuptwoweeks-perspective_alpha_website_small.jpg"
    srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/ce221d7a-8901-41d9-b726-3ea2efe3a650/0b3dc3ab-67fa-49bd-9d78-c6557c01e5b4/US-en-20230703-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce221d7a-8901-41d9-b726-3ea2efe3a650/0b3dc3ab-67fa-49bd-9d78-c6557c01e5b4/US-en-20230703-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce221d7a-8901-41d9-b726-3ea2efe3a650/0b3dc3ab-67fa-49bd-9d78-c6557c01e5b4/US-en-20230703-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
    className="w-full h-full object-cover"
  />
  <div className="w-full h-full bg-black absolute top-0 md:opacity-50"></div>

  <div className="absolute top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full md:h-[700px] md:w-[460px]">
  
  <div className="relative w-full h-full">
    <div className="before:absolute rounded-lg before:inset-0 before:bg-black before:opacity-70 before:content-['']"></div>
      <div className="absolute inset-0 flex justify-center">

        <div className="text-white w-[75%]">

          <div className='w-full'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-[29px] mt-[6em] md:mt-16 mb-7 font-bold'>Sign In</h2>
            {error && <div className='h-[75px] rounded-lg w-full pl-5 pr-5 pt-2 text-[13px] bg-[#e38233]'>
              <p>Sorry, we can't find an account with this email address. Please try again or <a className='underline' href='/signup'>create a new account.</a></p>
              </div>}

              <div className='mt-4'>

                      <label className='relative cursor-pointer'>
                      <input
                        type="text"
                        placeholder="Input"
                        className='h-[50px] w-full text-[15px] pl-[19px] pt-4 text-gray-300 rounded-lg bg-[#313131] border-none placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:outline-none !important focus:ring-transparent focus:border-none' 
                        id="email" name="email"
                        value={data.email}
                        onChange= {handleChange}
                        />
                          <span className='text-[14px] text-gray-300 text-opacity-70 absolute mt-[14px] left-4 transition duration-200 input-text'>Email Address</span>
                      </label>
             </div>

             <div className='mt-4'>

            <label className='relative cursor-pointer'>
            <input
              type="password"
              placeholder="Input"
              className='h-[50px] w-full text-[15px] pl-[16px] pt-4 text-gray-300 rounded-lg bg-[#313131] border-none placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:outline-none !important focus:ring-transparent focus:border-none' 
              id="password" name="password"
              value={data.password}
              onChange= {handleChange}
              />
                <span className='text-[14px] text-gray-300 text-opacity-70 absolute mt-[14px] left-4 transition duration-200 input-text'>Password</span>
            </label>
            </div>

            


            <button type="submit" className="text-white bg-[#DB0012] w-full h-[50px] mt-10 rounded-lg">Sign in</button>

            <div className='w-full mt-4'>

              <div className='w-full flex justify-between'>
                  <div className='text-[11px] flex'>
                      <input type='checkbox' className='bg-[#313131] hover:cursor-pointer'></input>
                    <p className='ml-2 text-gray-400'>Remember me</p>
                  </div>
                  <p className='text-[11px] text-gray-400 hover:underline hover:cursor-pointer'>Need Help?</p>
              </div>

              <div>
                <h2 className='mt-16  md:mt-4 text-[15px] text-gray-400'>New to Netflix? <a href='/signup' className='text-white hover:underline hover:cursor-pointer'>Sign up now.</a></h2>

                <p className='text-[12px] mt-4 text-gray-400'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='text-blue-500'>Learn more.</span></p>
              </div>

            </div>

            </form>

          </div>
     
  
          

        </div>
              
      </div>
  </div>
</div>

 
<div className='absolute bottom-0 w-full -translate-y-[14em] md:translate-y-0 md:border-0 border-t-2 border-[#4f4f4f] h-[15em] md:opacity-70  bg-black'>
        <div className='text-gray-300 p-8 opacity-40 md:opacity-80'>
          <h2 >Questions? Call <span className='underline'>1-844-505-2993</span></h2>
          <div className='grid underline text-[13px] mt-7 grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4'>
            <p>FAQ</p>
            <p>Help Center</p>
            <p>Netflix Shop</p>
            <p>Terms of Use</p>
            <p>Privacy</p>
            <p>Cookie Preferences</p>
            <p>Corporate Information</p>
            <p>Do Not Sell or Share My Personal Information</p>
            
          </div>
        </div>
      </div>

</section>

  );
}


// export default function login() {
//     return (
//         <div>
//             <h1>Login Page</h1>
            
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="username">Username</label>
//                 <input type="text" id="username" name="username" placeholder="Username" value={data.username} onChange= {handleChange}/>
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" />
//                 <button onClick={handleSubmit}>Login</button>
//             </form>
//         </div>
//     )

// }
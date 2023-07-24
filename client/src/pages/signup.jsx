import * as React from 'react';
import {useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {

    const hasToken = localStorage.getItem('token') !== null;

    const [next, setNext] = useState(false);


    const handleNext = () =>{
      setNext(!next);

      setTimeout(() => {
        window.location = "/signup1";
      }, 300);
    
    }
    const logout = async () => {
  
      localStorage.removeItem('token');
      window.location.href = "/login";
    
    };


  return (
    <div className='w-full h-screen  flex justify-center items-center bg-white'>
        <nav>
            <div className="flex absolute top-0 left-0 right-0 flex-wrap pb-[2px] items-center border-b-2 justify-between  mx-auto" style={{ zIndex: 1000 }}>
                
                  <div className="items-center w-full  md:order-1">
                    <ul className="flex justify-between items-center font-medium md:p-0 mt-4 rounded-lg md:space-x-8 md:mt-0 md:border-0">
                  <li><a className="flex items-center">
                    <img src="../netflix.png" className=" h-[40px] md:h-[110px] ml-6" alt=" Logo" />
                  </a></li>
                    

                    {hasToken ? (
                        <li className=" flex items-center justify-center">
                          <a onClick={logout} className="mr-3 text-xl pr-4 rounded md:p-0 ">
                            Sign Out
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a href="/login" className="text-white">
                            <button
                              type="button"
                              className="text-black text-[14px] md:text-[20px] px-5 mr-10 py-2.5 text-center"
                            >
                              Sign In
                            </button>
                          </a>
                        </li>
                      )}

                    </ul>
                  </div>

            
                </div>
        </nav>

        <div className={`w-[360px] -translate-y-44 mt-[10em] 2xl:mt-[0em] flex flex-col justify-center items-center ${!next ? '' : "-translate-x-[50px] opacity-0 transition-all duration-200"}`} >
          <div className='w-full flex justify-center mb-6'><CheckCircleOutlineIcon sx={{fontSize:"50px", color:"#ee3d3d"}}/></div>
          
          <p className='text-center text-[12px]'>STEP <span>1</span> OF <span>3</span></p>
          <h2 className='text-2xl text-center font-bold'>Choose your plan.</h2>
          <div className='w-[70%]'>
            <div className='flex mb-4 mt-7'><CheckIcon sx={{fontSize:"30px", color:"#ee3d3d"}}/> No commitments. cancel anytime.</div>
            <div className='flex mb-4 '><CheckIcon sx={{fontSize:"30px", color:"#ee3d3d"}}/> Endless entertainment for one low price.</div>
            <div className='flex'><CheckIcon sx={{fontSize:"30px", color:"#ee3d3d"}}/> Enjoy Netflix on all your devices.</div>    
            <button type="button" className="text-white bg-[#DB0012] w-full h-[50px] mt-9 rounded-lg" onClick={handleNext}>Next</button>
         
          </div>
          
        </div>

    
        
        
        <div className='absolute bottom-0 w-full h-[15em] opacity-70 bg-gray-200'>
        <div className='text-gray-500 p-8 opacity-80'>
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

    </div>

   
  );
}
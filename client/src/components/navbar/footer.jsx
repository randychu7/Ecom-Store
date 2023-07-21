export default function footer() {
    return (
        <div className='absolute bottom-0 w-full h-[15em] opacity-70 bg-black'>
        <div className='text-gray-300 p-8 opacity-80'>
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

    )
}
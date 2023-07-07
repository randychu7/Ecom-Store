import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
export default function Hero() {
  return (
    <div className="w-full h-[45em] grid grid-cols-1 md:grid-cols-2">
      <div className="flex col-span-1 justify-center mt-[3em]">
        <div className="p-14 flex justify-center">
          <div className='w-3/4'>
          <h1 className="text-4xl md:text-6xl text-white mb-10 font-bold md:text-left text-center">
            Experience the treasure of <span className='text-orange-400'>Ethiopian</span> coffee.
          </h1>
          <p className="md:text-left text-gray-200 text-center">
            Indulge in the extraordinary essence of Ethiopian coffee with distinct flavors, captivating aromas, and centuries-old cultivation techniques, all conveniently within your reach. Each sip is a sensory journey, transporting you to the rich coffee heritage of Ethiopia.
          </p>
          <div className='flex justify-center md:justify-start'><button type="button" className="text-white 
          bg-gradient-to-br mt-6 from-orange-500 to-orange-300 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Preorder Now</button></div>
          
          </div>
        </div>
        
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <img src="../coffee-product.png" className="w-[46em] mr-8 md:mr-0 transition-all duration-300 transform hover:scale-110" alt="Logo" />
      </div>
      </div>
  
  );
}

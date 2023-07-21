import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Dropdown() {
  const [items, setItems] = useState([
    { id: 1, show: false, text: 'What is Netflix', ptext:'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want – all for one low monthly price. There\'s always something new to discover and new TV shows and movies are added every week!' },
    { id: 2, show: false, text: 'How much does Netflix cost?', ptext:'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month. No extra costs, no contracts.' },
    { id: 3, show: false, text: 'Where can i watch?', ptext:'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you\'re on the go and without an internet connection. Take Netflix with you anywhere.' },
    { id: 4, show: false, text: 'How do I cancel?', ptext:'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.' },
    { id: 5, show: false, text: 'What can I watch on Netflix?', ptext:'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.' },
    { id: 6, show: false, text: 'Is Netflix good for kids?', ptext:'The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.' },

  ]);

  const handleClick = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, show: !item.show };
      } else {
        return { ...item, show: false };
      }
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <section className=' mt-[4em] border-b-[15px] p-5 border-[#1b1b1b] justify-center'>
        <h2 className='text-white font-bold text-5xl text-center mb-8'>Frequently Asked Questions</h2>

        <div className='w-full flex flex-col justify-center items-center' style={{ zIndex: 10 }}>
          <div className=' max-w-[1200px]'>

            {items.map((item) => (
              <div key={item.id} style={{ marginBottom:'7px'}}>
                <div
                  className='bg-[#333333] mb-1 p-5 flex items-center h-[85px] transition-all duration-300 hover:bg-[#3f3f3f]'
                  onClick={() => handleClick(item.id)}
                  style={{ zIndex: 20 }}
                >
                  <p className='text-white text-2xl flex justify-between items-center w-full'>
                    <h2>{item.text}</h2>
                    <div className={`text-4xl md:text3xl transition-transform ${item.show ? 'rotate-45' : ''}`}>
                      <AddIcon sx={{fontSize:"44px"}}/>
                    </div>
                  </p>
                </div>

                <div
                  className={`w-full bg-[#333333] flex items-center ${!item.show ? 'max-h-0' : 'max-h-[20em] '}`}
                  style={{
                    transition: 'max-height 0.5s',
                    overflow: 'hidden',
                    zIndex: 15,
                  }}
                >
                  <div className='p-5'>
                    <p className='text-white text-2xl'>{item.ptext}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='text-white mt-9 flex justify-center flex-col items-center mb-[4em]'>
            <h2 className='text-[20px] mb-3 md:text-left text-center'>Ready to Watch? Enter your email to create or restart your membership.</h2>

            <div className='flex flex-col md:flex-row justify-center mt-5 items-center'>
            <label className='relative cursor-pointer'>
              <input
                type="text"
                placeholder="Input"
                className='h-[60px] w-96 text-[15px] pl-[19px] pt-4 text-white bg-black opacity-50 border-white border rounded-lg border-opacity-50 placeholder-gray-300 placeholder-opacity-0 transition duration-200 focus:outline-none !important focus:ring-transparent focus:border-white'
              />
                <span className='text-[16px] text-white text-opacity-70 absolute mt-[18px] left-4 transition duration-200 input-text'>Email address</span>
            </label>
            </div>
            
            </div>
      </section>
   
    </div>
  );
}

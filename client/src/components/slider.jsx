import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaticCarousel({first, second }) {


  return (

    <Carousel slide={false} indicators={false} cursor={false} className='overflow-hidden hover:cursor-none' style={{height:"25em"}}>

    <div className='flex h-full items-center justify-between w-[88%]'>{first}</div>

    
    <div className='flex h-full items-center justify-between w-[88%]'>{second}</div>
 
 </Carousel>
 
  );
}

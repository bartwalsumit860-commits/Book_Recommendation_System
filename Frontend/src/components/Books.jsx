import React, { useEffect, useState } from 'react'
import Book from './Book';
import axios from 'axios';
import { motion } from 'framer-motion';
const Books = () => {
  const [books,setBooks] = useState([]);

  useEffect(()=>{
    const fetchTopBooks= async ()=>{
      try {
        const res = await axios.get('http://127.0.0.1:8000/popular');
        if(res){
          setBooks(res.data);
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchTopBooks();
  },[]);

  return (
    < motion.div className='w-full h-full mx-auto grid grid-cols-4 gap-8 my-8 px-4 items-center'>
{
    books.map((book,index)=>
     
        <motion.div  key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Book  book={book}/> 
        </motion.div>
        //passing book as propss
    )
}
    </motion.div>
  )
}

export default Books
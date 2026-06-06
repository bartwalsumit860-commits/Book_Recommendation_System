import React from 'react'
import Navbar from './shared/Navbar'
import Books from './Books'

const Home = () => {
  return (
    <div>
        <Navbar/>

        <div className='max-w-3xl mx-auto bg-yellow-500 py-2 text-center my-10 rounded-xl'>
        <h1 className='text-lg font-bold'>Top 50 Books</h1>
        </div>


        <Books/>
    </div>
  )
}

export default Home
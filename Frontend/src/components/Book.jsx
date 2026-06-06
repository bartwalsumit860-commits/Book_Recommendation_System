import React from 'react'

const Book = ({ book }) => {
  return (
    <div className='flex h-full w-full flex-col rounded-xl border border-gray-200 bg-white  shadow-sm transition-shadow hover:shadow-lg'>
      <div className='p-4'>
        <h1 className="text-lg font-extrabold bg-gradient-to-r from-blue-800 to-green-600 bg-clip-text text-transparent line-clamp-2 h-15">
          {book["Book-Title"]}
        </h1>
        <div className="flex items-center flex-col my-2">

          <img src={book["Image-URL-M"]} alt="Book Image" className='w-55 h-60' />
        </div>
      </div>
      <div className=" bg-gray-300 w-full h-full rounded-b-xl px-3 pb-2">
        <p className='text-md text-gray-700 mt-2'>Author Name: <span className='text-md font-medium'>{book["Book-Author"]}</span></p>
        <p className='text-md text-gray-700 mt-2'>Votes: <span className='text-md font-medium'>{book["num_ratings"]}</span></p>
        <p className='text-md text-gray-700 mt-2'>Rating: <span className='text-md font-medium'>{Math.round(book["avg_ratings"])}</span></p>
      </div>
    </div>
  )
}

export default Book
import React from 'react'

const Alerta = ({ children }) => {
  return (
    <div className='text-center my-4 bg-red-600 font-bold p-3 uppercase
    text-white rounded-md'> 
       {children}
   </div>
  )
}

export default Alerta
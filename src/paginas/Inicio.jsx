import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

  const [ clinetes, setClientes ] = useState([])

  useEffect( () => {
      const obtenerclientesAPI = async () => {
        try{
            const url = "http://localhost:4000/clientes"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            setClientes(resultado)
        } catch (error) {
          console.log(error)
        }


      }
      obtenerclientesAPI()

  }, [])

  return (
    <>
    <h1 className='font-black text-4xl text-green-700'>Clientes</h1>
    <p className='mt-3'>Administra Tus Clinetes</p>

    <table className='w-full mt-5 table-auto shadow bg-white'>

      <thead className='bg-green-600 text-white'>
          <tr>
            <th className='p-2'>Nombre</th>
            <th className='p-2'>Contacto</th>
            <th className='p-2'>Empresa</th>
            <th className='p-2'>Acciones</th>
          </tr>
      </thead>

      <tbody>
        {clinetes.map(cliente => (
            <Cliente 
              key={cliente.id}
              cliente={cliente}
            />
        ))}
      </tbody>

    </table>
</>
  )
}

export default Inicio
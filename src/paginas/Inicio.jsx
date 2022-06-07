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

  const handleEliminar = async id => {
    const confirmar = confirm("Deseas Eliminar este Cliente ?")
    
    if(confirmar) {
        try {
          const url = `http://localhost:4000/clientes/${id}`
          const respuesta = await fetch(url, {
            method : 'DELETE'
          })
          await respuesta.json()

          const arrayClientes = clinetes.filter( cliente => cliente.id !== id)
          setClientes(arrayClientes)

        } catch (error) {
          console.log(error)
        }
      }
  }

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
              handleEliminar={handleEliminar}
            />
        ))}
      </tbody>

    </table>
</>
  )
}

export default Inicio
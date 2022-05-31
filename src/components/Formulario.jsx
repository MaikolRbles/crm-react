import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {
    
    const navigate = useNavigate()

    const nuevoClienteSchema = yup.object().shape({
            nombre: yup.string()
                        .min(3, 'El Nombre es muy Corto')
                        .max(20, 'El Nombre es muy Largo')
                        .required("El Nombre del Cliente es Obligatorio"),
            empresa: yup.string()
                        .required('El Empresa del Cliente es Obligatorio'),
            email: yup.string()
                        .email('Email No Valido')
                        .required('El Email del Cliente es Obligatorio'),
            telefono: yup.number()
                        .positive('Numero No valido')
                        .integer('Numero No valido') 
                        .typeError('El Numero no es Valido')                       
    })

    const handleSudmit = async ( valores) => {
        try {
            const url = 'http://localhost:4000/clientes'

            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)

            navigate('/clientes')

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='bg-white mt-10 px-5 py-5 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl text-center uppercase'>Agregar Cliente</h1>

        <Formik 
            initialValues={{
                nombre: '',
                empresa: '',
                email: '',
                telefono: '',
                notas: '',
            }}
            onSubmit={ async( values,{resetForm} ) => {
                await handleSudmit(values)

                resetForm()
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors, touched }) => {                
                return (
            <Form
                className='mt-10'
            
            >
            <div className='mb-4'>
                <label 
                        className='text-gray-800'
                        htmlFor='nombre'            
                    >Nombre:</label>
                    <Field 
                        id='nombre'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Nombre del Cliente'
                        name='nombre'
                    />

                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ): null }
                    
            </div>
            <div className='mb-4'>
                <label 
                        className='text-gray-800'
                        htmlFor='empresa'            
                    >Empresa:</label>
                    <Field 
                        id='empresa'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Empresa del Cliente'
                        name='empresa'
                    />
                     {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ): null }
            </div>
            <div className='mb-4'>
                <label 
                        className='text-gray-800'
                        htmlFor='email'            
                    >E-mail:</label>
                    <Field 
                        id='email'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Email del Cliente'
                        name='email'
                    />
                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ): null }
                    
            </div>
            <div className='mb-4'>
                <label 
                        className='text-gray-800'
                        htmlFor='telefono'            
                    >Telefono:</label>
                    <Field 
                        id='telefono'
                        type='tel'
                        className='mt-2 block w-full p-3 bg-gray-50'
                        placeholder='Telefono del Cliente'
                        name='telefono'
                    />
                     {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ): null }                    
            </div>
            <div className='mb-4'>
                <label 
                        className='text-gray-800'
                        htmlFor='notas'            
                    >Notas:</label>
                    <Field 
                        as='textarea'
                        id='notas'
                        type='text'
                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                        placeholder='Notas del Cliente'
                        name='notas'
                    />
            </div>
            <input 
                type='submit'
                value='Agregar Cliente'
                className='mt-5 w-full bg-green-800 p-3 rounded-md text-white uppercase font-bold
                text-lg'

            />
            </Form>
            )}}
        </Formik>
    </div>
  )
}

export default Formulario
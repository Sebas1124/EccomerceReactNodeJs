import React, { useEffect, useState } from 'react'
import { Modal, Typography } from '@mui/material';
import  Box  from '@mui/material/Box';
import Swal from 'sweetalert2';

import './modal.css'
import { fectSinToken } from './../../../helpers/fetch';

export const NewProduct = ({ closeModal, isOpen }) => {

  const [ form, setForm ] = useState({
    Product: '',
    Price: '',
    Stock: ''
  });

  const [ selectedFile, setSelectedFile ] = useState()
  const [ preview, setPreview ] = useState()

  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
}, [selectedFile])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onChangeForm = ({ target }) => {
		const { name, value } = target
		
		setForm({
			...form,
			[name]: value
		});

  }

  const imageHandler = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

  const onSubmit = async(ev) => {
		ev.preventDefault();

    const res = await fectSinToken('productos/new',{
      "image":    selectedFile,
      "Nombre":   form.Product,
      "Precio":   form.Price,
      "stock":    form.Stock,
    }, "POST")


    closeModal()

    if ( res ) {
        await Swal.fire('Completed', 'The product has been created', 'success')
        window.location.reload(true);
        }	
	}


  return (
    <Modal
        open={ isOpen }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style} className='main__modal'>
          <button className='modal__close' onClick={ closeModal }>&#9747;</button>
        <Typography id="modal-modal-title" variant="h3" component="h2">
          Crear nuevo producto
        </Typography>
          <div className="modal__container">
            <div className="product__image">
                { selectedFile &&  <img src={ preview } /> }
                <label className="custom-file-upload">
                <input type="file" name='image' id='image' accept='image/*' onChange={ imageHandler }/>
                <i className="fa fa-cloud-upload"></i> Upload Photo
              </label>
            </div>

           <div className="modal__inputs">
              <form onSubmit={ onSubmit }>
              <label>Name: </label>
                <input name='Product' type="text" value={ form.Product } onChange={ onChangeForm } />
              <label>Price: </label>
                <input name='Price' min={ 1 } minLength={ 1 } type="number" value={ form.Price } onChange={ onChangeForm } />
              <label>Stock: </label>
                <input name='Stock' min={ 1 } type="number" value={ form.Stock } onChange={ onChangeForm } />
                <button className='modal__button-form'>Create</button>
              </form>
            </div>
          </div>
        </Box>
    </Modal>
  )
}
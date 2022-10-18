import React, { useState } from 'react'
import { Modal, Typography } from '@mui/material';
import  Box  from '@mui/material/Box';
import Swal from 'sweetalert2';


import './modal.css'
import { fectSinToken } from './../../../helpers/fetch';

export const ModalComponent = ({ isOpen, product, closeModal }) => {

  const [ form, setForm ] = useState({
		Product: '',
		Price: '',
		Stock: '',
		SoldOut: false
	});

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'COP'
  });

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

  const onSubmit = async(ev) => {
		ev.preventDefault();

    const res = await fectSinToken('productos/edit',{
      "_id":      product._id,
      "image":    product.image,
      "Nombre":   form.Product    || product.Nombre,
      "Precio":   form.Price      || product.Precio,
      "Stock":    form.Stock      || product.stock,
      "SoldOut":  form.SoldOut    || product.SoldOut
    }, "PUT")

    const { products } = res;

    setForm( products )

    closeModal()

    if ( res ) {
			await Swal.fire('Completed', 'The product has been changed correctly', 'success')
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
          Editar { product.Nombre }
        </Typography>
          <div className="modal__container">

            <div className="product__image">
              <img width={ 120 } src={ require(`../../../assets/img/${ product.image }`) } alt="" />
            </div>

           <div className="modal__inputs">
              <form onSubmit={ onSubmit }>
              <label>Product: </label>
                <input name='Product' type="text" value={ form.Product } placeholder={ product.Nombre } onChange={ onChangeForm } />
              <label>Price: </label>
                <input name='Price' type="text" value={ form.Price } placeholder={ formatter.format( product.Precio ) } onChange={ onChangeForm } />
              <label>Stock: </label>
                <input name='Stock' type="text" value={ form.Stock } placeholder={ product.stock } onChange={ onChangeForm } />
                <div>
                <label>Sold Out ?</label>
                  <input name='SoldOut' type="checkbox" checked={ form.SoldOut } onChange={ onChangeForm }/>
                </div>
                <button className='modal__button-form'>Update</button>
              </form>
            </div>
          </div>
        </Box>
    </Modal>
  )
}

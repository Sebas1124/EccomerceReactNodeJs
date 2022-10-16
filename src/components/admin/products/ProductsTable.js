import React, { useState } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { ModalComponent } from './ModalComponent';
import { fectSinToken } from '../../../helpers/fetch';


const makeStyle=( status )=>{

  if( !status )
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if( status )
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }

}


export const ProductsTable = ({ products }) => {

  const [ modal, setModal ] = useState(false);
  const [ currentTask, setCurrentTask ] = useState();

  const handleUpdateTask = ( ev, product ) => {
    ev.preventDefault();
    setCurrentTask(product)
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  
  const deleteProduct = async( ev, id ) => {
    await fectSinToken('productos/delete', {"_id": id}, "DELETE");
    window.location.reload(true);
  }

  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'COP'
  });

  return (
      <div className="Table">
      <center><h3 style={{ marginTop: 3, marginBottom: 10 }}>Products</h3></center>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table style={{ overflowY: 'scroll' }} sx={{ minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Sotck</TableCell>
                <TableCell align="left">Sold Out</TableCell>
                <TableCell align="left">Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white", overflowY: 'scroll' }} >
              {
                (modal)
                  ? <ModalComponent isOpen={ modal } product={ currentTask } closeModal={ closeModal }/>
                  :products.map( ( product ) => (

                    <TableRow key={ product._id }
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell component="th" scope="product">
                            { product._id }
                        </TableCell>
                          <TableCell align="left"><img width={ 20 } src={ (product.image) ? require(`../../../assets/img/${product.image}`) : null } alt="Picture"/></TableCell>
                          <TableCell align="left">{ product.Nombre }</TableCell>
                          <TableCell align="left">{ formatter.format( product.Precio ) }</TableCell>
                          <TableCell align="left">{ product.stock }</TableCell>
                          <TableCell align="left">
                          <span className="status" style={ makeStyle( product.SoldOut ) }>{ ( product.SoldOut ) ? 'Sold Out' : `Stock: ${ product.stock }` }</span>
                          </TableCell>
                          <TableCell align="left">
                            <button style={{ marginRight: 10, background: '#30D5B7', padding: '1rem 1rem 1rem', borderRadius: 50 }} onClick={ (ev) => handleUpdateTask( ev, product ) }>Edit</button>
                            <button style={{ marginRight: 10, background: '#C8266D', padding: '1rem 1rem 1rem', borderRadius: 50}} onClick={ (ev) => deleteProduct( ev, product._id ) }>Delete</button>
                          </TableCell>
                    </TableRow>
    
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  )
}

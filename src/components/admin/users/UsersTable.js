import React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useUsers } from '../../../hooks/useUsers';


const makeStyle=( status )=>{

  if( status )
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if( !status )
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }

}

export const UsersTable = () => {

    const { users } = useUsers();

  return (
    <div className="Table">
      <h3 style={{ marginTop: 300 }}>All Users</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {
                users.map( ( user ) => (
                    <TableRow
                        key={ user._id }
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                        <TableCell component="th" scope="user">
                            { user._id }
                        </TableCell>
                            <TableCell align="left">{ user.nombre }</TableCell>
                            <TableCell align="left">{ user.email }</TableCell>
                            <TableCell align="left">
                            <span className="status" style={ makeStyle( user.online ) }>{ ( user.online ) ? 'Online' : 'Disconnected' }</span>
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

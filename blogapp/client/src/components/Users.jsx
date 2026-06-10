import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Users = () => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={123}>
              <TableCell>
                <Link to={`/notes/`}>Test</Link>
              </TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users

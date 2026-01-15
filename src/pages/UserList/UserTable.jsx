import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  TableSortLabel,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { usePermissions } from '../../hooks/usePermissions';

const UserTable = ({ users, onRefresh, handleEdit, onSort, order, orderBy }) => {
  // const [orderBy, setOrderBy] = useState('firstName');
  // const [order, setOrder] = useState('asc');
  const { hasPermission } = usePermissions();

  const canEditUser = hasPermission("EDIT");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleToggleActive = (userId) => {
    console.log('Toggle active for user:', userId);
  };

  const handleResetLink = (userId) => {
    console.log('Reset link for user:', userId);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'firstName'}
                direction={orderBy === 'firstName' ? order : 'asc'}
                onClick={() => onSort('firstName')}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'lastName'}
                direction={orderBy === 'lastName' ? order : 'asc'}
                onClick={() => onSort('lastName')}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'emailId'}
                direction={orderBy === 'emailId' ? order : 'asc'}
                onClick={() => onSort('emailId')}
              >
                Email ID
              </TableSortLabel>
            </TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:hover': { backgroundColor: '#fafafa' } }}
            >
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.emailId}</TableCell>
              <TableCell>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {user.role}
                </div>
              </TableCell>
              <TableCell>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  : '—'}
              </TableCell>
              <TableCell align="center">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {/* <Switch
                    checked={user.active}
                    onChange={() => handleToggleActive(user.id)}
                    size="small"
                    color="primary"
                  /> */}
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEdit(user.id)}
                    disabled={!canEditUser}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {/* <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton> */}
                  {/* {user.active && (
                    <button
                      style={{
                        padding: '4px 12px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        background: 'white',
                        cursor: 'pointer',
                        fontSize: '12px',
                      }}
                      onClick={() => handleResetLink(user.id)}
                    >
                      Resend Link
                    </button>
                  )} */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
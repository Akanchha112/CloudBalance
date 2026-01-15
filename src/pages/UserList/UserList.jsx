import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from './UserTable';
import './UserList.scss';
import { getUser } from '../../utils/UserApiUtil';
import { usePermissions } from '../../hooks/usePermissions';
import { PermissionGuard } from '../../components/PermissionGuard';
import { Oval } from 'react-loader-spinner';

export const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('active');
  const { canCreate, canEdit } = usePermissions();
  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUser();
      setOriginalUsers(res.data);
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch user: " + (error?.response?.data?.message || error.message))
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    if (!canCreate()) {
      alert("You don't have permission to create users");
      return;
    }
    navigate('/app/users/create');
  };

  const handleEditUser = (userId) => {
    if (!canEdit()) {
      alert("You don't have permission to edit users");
      return;
    }
    navigate(`/app/users/${userId}/edit`);
  };


  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';

    const sortedUsers = [...users].sort((a, b) => {
      if (!a[property]) return 1;
      if (!b[property]) return -1;

      return newOrder === 'asc'
        ? a[property].localeCompare(b[property])
        : b[property].localeCompare(a[property]);
    });

    setUsers(sortedUsers);
    setOrder(newOrder);
    setOrderBy(property);
  };

  const handleResetFilters = () => {
    setUsers(originalUsers); // ⬅️ restore original order
    setOrderBy(null);
    setOrder('asc');
  };

  // const filteredUsers = users.filter(user => {
  //   if (filter === 'all') return true;
  //   return user;
  // });

  return (
    <div className="users-list-page">
      <div className="page-header">
        <h1>Users</h1>
      </div>

      <div className="page-actions">
        
        <PermissionGuard action="CREATE">
          <button className="btn-primary" onClick={handleAddUser} disabled={loading}>
            Add New User
          </button>
        </PermissionGuard>

        <button className="btn-secondary" onClick={handleResetFilters} disabled={loading}>
          Reset Filters
        </button>


      </div>

      {loading ? (
        <div className="loader-wrapper">
          <Oval color="#5B8FF9" secondaryColor="#E8E8E8" height="40"
            width="40" />
        </div>
      ) : (
        <UserTable
          users={users}
          onRefresh={fetchUsers}
          handleEdit={handleEditUser}
          onSort={handleSort}
          order={order}
          orderBy={orderBy}
        />
      )}
    </div>
  );
};
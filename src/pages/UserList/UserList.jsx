import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from './UserTable';
import './UserList.scss';
import { getUser } from '../../utils/UserApiUtil';
import { usePermissions } from '../../hooks/usePermissions';
import { PermissionGuard } from '../../components/PermissionGuard';
import { FallingLines } from 'react-loader-spinner';

export const UserList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('active');
  const { canCreate, canEdit } = usePermissions();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUser();
       setTimeout(()=>{
        setUsers(res.data);
        setLoading(false);
      },2000);
      
     
    } catch (err) {
      console.error("Failed to fetch users", err);
    }finally{
      
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

  const handleResetFilters = () => {
    setFilter('active');
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user;
  });

  return (
    <div className="users-list-page">
      <div className="page-header">
        <h1>Users</h1>
      </div>
      
      <div className="page-actions">
        {/* Only show Add button if user has CREATE permission */}
        <PermissionGuard action="CREATE">
          <button className="btn-primary" onClick={handleAddUser} disabled={loading}>
            Add New User
          </button>
        </PermissionGuard>

        <button className="btn-secondary" onClick={handleResetFilters} disabled={loading}>
          Reset Filters
        </button>

        {/* <div className="filter-group">
          <label>Two-factor Authentication</label>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({users.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({users.length})
            </button>
          </div>
        </div> */}
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <FallingLines color="#5B8FF9" />
        </div>
      ) : (
      <UserTable 
        users={filteredUsers} 
        onRefresh={fetchUsers} 
        handleEdit={handleEditUser}
        canEdit={canEdit()}
      />
      )}
    </div>
  );
};
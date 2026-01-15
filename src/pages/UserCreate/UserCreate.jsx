import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from './UserForm';
import './UserCreate.scss';
import { toast } from 'react-toastify';
import { FallingLines } from 'react-loader-spinner';
import { addUser } from '../../utils/UserApiUtil';

export const UserCreate = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/app/users');
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.emailId,
        password: formData.password,
        role: formData.role,
        accountIds: formData.accountIds,
        enableSearchConfig: formData.enableSearchConfig
      };

      const res=await addUser(payload);
        toast.success("User created successfully");
        navigate("/app/users");
      
    } catch (error) {
      console.error("Error:", error?.response?.data || "Failed to create user");
      toast.error("Failed to create user: " + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-create-page">
      <div className="breadcrumb">
        <button onClick={handleBack} className="breadcrumb-link">
          Users
        </button>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Add New User</span>
      </div>

      <div className="page-header">
        <h1>Add New User</h1>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <FallingLines color="#5B8FF9" />
        </div>
      ) : (
        <UserForm onSubmit={handleSubmit} onCancel={handleBack} />
      )}
    </div>
  );
};
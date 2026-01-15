import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../UserCreate/UserForm';
// import '../UserCreate/UserCreate.scss';
import { toast } from 'react-toastify';
import { FallingLines } from 'react-loader-spinner';
import { updateUser, getUserById } from '../../utils/UserApiUtil';

export const UserEdit = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setFetchingUser(true);
      const response = await getUserById(id);

      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error("Failed to fetch user data: "+(error?.response?.data?.message || error.message))
      navigate('/app/users');
    } finally {
      setFetchingUser(false);
    }
  };

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
        role: formData.role,
        accountIds: formData.accountIds,
        enableSearchConfig: formData.enableSearchConfig
      };
      // console.log("payload",payload);
      
      await updateUser(id, payload);
      toast.success("User updated successfully");
      navigate("/app/users");
    } catch (error) {
      console.error("Error:", error?.response?.data || "Failed to update user");
      toast.error("Failed to update user: " + (error?.response?.data?.message || error.message));
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
        <span className="breadcrumb-current">Edit User</span>
      </div>

      <div className="page-header">
        <h1>Edit User</h1>
      </div>

      {fetchingUser ? (
        <div className="loader-wrapper">
          <FallingLines color="#5B8FF9" />
        </div>
      ) : loading ? (
        <div className="loader-wrapper">
          <FallingLines color="#5B8FF9" />
        </div>
      ) : (
        <UserForm 
          onSubmit={handleSubmit} 
          onCancel={handleBack}
          isEdit={true}
          initialData={userData}
        />
      )}
    </div>
  );
};
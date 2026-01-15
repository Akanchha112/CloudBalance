import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Toggle from '../../components/Toggle/Toggle';
import { getAllAccounts } from '../../utils/AccountApiUtil';
import './UserForm.scss';

const UserForm = ({ onSubmit, onCancel, isEdit = false, initialData = null }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    role: '',
    password: '',
    accountIds: [],
    enableSearchConfig: false,
  });
 
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  // Load accounts on component mount
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts();
        console.log(response);
        
        setAccounts(response.data.data || response.data || []);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        toast.error("Error fetching accounts: "+(error?.response?.data?.message || error.message))
        setAccounts([]);
      } finally {
        setLoadingAccounts(false);
      }
    };

    fetchAccounts();
  }, []);

  // Set initial data for edit mode
  useEffect(() => {
    if (isEdit && initialData) {
      const userAccounts = initialData.accounts || [];
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        emailId: initialData.emailId || '',
        role: initialData.role || '',
        password: '',
        accountIds: userAccounts.map(acc => acc.id),
        enableSearchConfig: initialData.enableSearchConfig || false,
      });
      setSelectedAccounts(userAccounts);
      console.log("selectedAccounts",selectedAccounts,initialData);
    }
  }, [isEdit, initialData]);

  const roleOptions = [
    { value: 'ADMIN', label: 'Admin' },
    { value: 'CUSTOMER', label: 'Customer' },
    { value: 'READONLY', label: 'Read Only' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // If role changes and it's not CUSTOMER, clear accounts
    if (name === 'role' && value !== 'CUSTOMER') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        accountIds: []
      }));
      setSelectedAccounts([]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAccountToggle = (account) => {
    const isSelected = selectedAccounts.some(acc => acc.id === account.id);
    
    if (isSelected) {
      const updated = selectedAccounts.filter(acc => acc.id !== account.id);
      setSelectedAccounts(updated);
      setFormData(prev => ({
        ...prev,
        accountIds: updated.map(acc => acc.accountId) //changed
      }));
    } else {
      const updated = [...selectedAccounts, account];
      setSelectedAccounts(updated);
      setFormData(prev => ({
        ...prev,
        accountIds: updated.map(acc => acc.accountId)
      }));
    }
  };

  const handleSelectAll = () => {
    const filtered = getFilteredAccounts();
    const allSelected = filtered.every(acc => 
      selectedAccounts.some(selected => selected.id === acc.id)
    );

    if (allSelected) {
      // Deselect all filtered
      const remaining = selectedAccounts.filter(selected => 
        !filtered.some(acc => acc.id === selected.id)
      );
      setSelectedAccounts(remaining);
      setFormData(prev => ({
        ...prev,
        accountIds: remaining.map(acc => acc.accountId) //changed
      }));
    } else {
      // Select all filtered
      const newSelections = filtered.filter(acc => 
        !selectedAccounts.some(selected => selected.id === acc.id)
      );
      const updated = [...selectedAccounts, ...newSelections];
      setSelectedAccounts(updated);
      setFormData(prev => ({
        ...prev,
        accountIds: updated.map(acc => acc.accountId) //changed
      }));
    }
  };

  const removeAccount = (accountId) => {
    const updated = selectedAccounts.filter(acc => acc.id !== accountId);
    setSelectedAccounts(updated);
    setFormData(prev => ({
      ...prev,
      accountIds: updated.map(acc => acc.accountId) //changed
    }));
  };

  const getFilteredAccounts = () => {
    if (!searchTerm) return accounts;
    return accounts.filter(acc => 
      acc.accountName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.accountId?.toString().includes(searchTerm)
    );
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = 'Email is invalid';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!isEdit && !formData.password) {
      newErrors.password = 'Password is required';
    }

    if (formData.role === 'CUSTOMER' && formData.accountIds.length === 0) {
      newErrors.accountIds = 'Please select at least one account for Customer role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("formData",formData);
      
      onSubmit(formData);
    }
  };

  const showAccountSelection = formData.role === 'CUSTOMER';
  const filteredAccounts = getFilteredAccounts();
  const availableCount = filteredAccounts.filter(acc => 
    !selectedAccounts.some(selected => selected.id === acc.id)
  ).length;

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-content">
        <div className="form-row">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter First Name"
            required
            error={errors.firstName}
            autoComplete="off"
          />
          
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter Last Name"
            required
            error={errors.lastName}
            autoComplete="off"
          />
        </div>

        <div className="form-row">
          <Input
            label="Email ID"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            placeholder="Enter Email ID"
            required
            error={errors.emailId}
            autoComplete="new-email"
          />

          {!isEdit && (
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              error={errors.password}
              autoComplete="new-password"
            />
          )}
          
          <Select
            label="Select Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={roleOptions}
            placeholder="Select Role"
            required
            error={errors.role}
          />
        </div>

        {showAccountSelection && (
          <div className="account-selection-section">
            <div className="section-header">
              <h3>Manage Account IDs</h3>
              {errors.accountIds && (
                <span className="error-text">{errors.accountIds}</span>
              )}
            </div>

            <div className="account-selector">
              <div className="available-accounts">
                <div className="panel-header">
                  <span className="panel-title">
                    Choose Account IDs to Associate
                  </span>
                  <span className="panel-count">{availableCount} Available</span>
                </div>

                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="select-all">
                  <label>
                    <input
                      type="checkbox"
                      checked={filteredAccounts.length > 0 && filteredAccounts.every(acc => 
                        selectedAccounts.some(selected => selected.id === acc.id)
                      )}
                      onChange={handleSelectAll}
                    />
                    <span>Select All</span>
                  </label>
                </div>

                <div className="accounts-list">
                  {loadingAccounts ? (
                    <div className="loading-state">Loading accounts...</div>
                  ) : filteredAccounts.length === 0 ? (
                    <div className="empty-state">No accounts found</div>
                  ) : (
                    filteredAccounts.map(account => {
                      const isSelected = selectedAccounts.some(acc => acc.id === account.id);
                      return (
                        <label key={account.id} className="account-item">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleAccountToggle(account)}
                          />
                          <span className="account-info">
                            {account.accountName} ({account.accountId})
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="selection-arrows">
                <div className="arrow-icon">→</div>
                <div className="arrow-icon">←</div>
              </div>

              <div className="selected-accounts">
                <div className="panel-header">
                  <span className="panel-title">Associated Account IDs</span>
                  <span className="panel-count">{selectedAccounts.length} Added</span>
                </div>

                <div className="accounts-list selected">
                  {selectedAccounts.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📁</div>
                      <p>No Account IDs Added</p>
                      <p className="empty-hint">Selected Account IDs will be shown here.</p>
                    </div>
                  ) : (
                    selectedAccounts.map(account => (
                      <div key={account.id} className="selected-account-item">
                        <span className="account-info">
                          {account.accountName} ({account.accountId})
                        </span>
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeAccount(account.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {isEdit ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
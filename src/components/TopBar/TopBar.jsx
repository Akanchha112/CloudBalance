import { useEffect, useState } from "react";
import Logo from "../../assets/Logo_Light.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import userPic from "../../assets/userPic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import { setAccounts, setSelectedAccount, clearAccounts } from "../../store/accountSlice";
import { getAccountsByRole } from "../../utils/CostExplorerApiUtil";
import "./TopBar.scss";

export const TopBar = ({ toggleSidebar }) => {
  const user = useSelector(state => state.auth.user);
  const selectedAccount = useSelector(state => state.account.selectedAccount);
  const allAccounts = useSelector(state => state.account.allAccounts);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await getAccountsByRole();
      console.log("All Accounts",response.data.data);
      
      dispatch(setAccounts(response.data.data));
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated",false);
    dispatch(clearAuth());
    dispatch(clearAccounts());
    navigate("/", { replace: true });
  };

  const handleAccountChange = (account) => {
    dispatch(setSelectedAccount(account));
    setShowAccountDropdown(false);
  };


  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={Logo} alt="Cloudkeeper Logo" className="topbar-logo" />
        <div 
          className="hamburger"
          onClick={toggleSidebar} // <-- toggle sidebar on click
        >
          ☰
        </div>

        {allAccounts.length > 0 && (
          <div className="account-selector">
            <button 
              className="account-selector-btn"
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            >
              <span className="account-label">Account:</span>
              <span className="account-name">
                {selectedAccount?.accountName || 'Select Account'}
              </span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showAccountDropdown && (
              <div className="account-dropdown">
                {allAccounts.map(account => (
                  <div
                    key={account.id}
                    className={`account-option ${selectedAccount?.id === account.id ? 'selected' : ''}`}
                    onClick={() => handleAccountChange(account)}
                  >
                    <div className="account-option-name">{account.accountName}</div>
                    <div className="account-option-id">{account.accountId}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="topbar-right">
        <div className="user-section">
          <img
            src={userPic}
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="user-text">
            <div className="welcome">Welcome</div>
            <div className="username">{user}</div>
          </div>
          
        </div>

        <button className="logout-btn" onClick={handleLogout}><LogoutIcon></LogoutIcon>  Logout </button>
      </div>
    </div>
  );
};

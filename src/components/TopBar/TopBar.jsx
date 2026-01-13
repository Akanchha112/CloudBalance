import { useEffect, useState } from "react";
import Logo from "../../assets/Logo_Light.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import userPic from "../../assets/userPic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../store/authSlice";
import "./TopBar.scss";

export const TopBar = () => {
  // const [user, setUser] = useState("");
  // const navigate=useNavigate();
  // const dispatch = useDispatch();
  

  const user = useSelector(state => state.auth.user); // ✅ Hook at top level
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated",false);
    dispatch(clearAuth());
    navigate("/", { replace: true });
  };
//is their no useeffect neededif i am redux
  // useEffect(() => {
  //   const storedUser = useSelector(state => state.auth.user);
  //   setUser(storedUser);
  // }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <img src={Logo} alt="Cloudkeeper Logo" className="topbar-logo" />
        <div className="hamburger">☰</div>
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

import Input from "../../components/Input/Input"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo_Light.png";
import { loginCall } from "../../utils/LoginApiUtil";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import "./Login.scss";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    console.log(email,typeof(email));
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    console.log(typeof(password),password);
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async () => {
    if (!validate()) return;

    try {
      const res = await loginCall(email, password);
      localStorage.setItem("isAuthenticated",true);
      localStorage.setItem("accessToken",res.data.accessToken);
      console.log("login res: ", res.data);
      
      dispatch(setAuth({
        user: res.data.firstName,
        role: res.data.role
      }));

      navigate("/app/users");
    } catch {
      setErrors("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="LoginPage">
        <img src={Logo} alt="Cloudkeeper Logo" />

        <Input
          label="Email"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: "" }));
          }}
          required
          name="Email"
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: "" }));
          }}
          required
          name="Password"
          error={errors.password}
        />

        <p className="forgot-link">Forgot Password?</p>

        <button onClick={handleClick}>LOGIN</button>
      </div>

      <div className="login-footer">
        <span>Have Questions? <a>Talk to our team</a></span>
        <span>CloudKeeper 2025 | All Rights Reserved</span>
      </div>
    </div>
  );
};

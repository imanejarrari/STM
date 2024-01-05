import React, { useState} from 'react';
import axios from 'axios';
import "./Auth.css";



const AuthForm = ({ setisLoggedIn}) => {

  const [authMode, setAuthMode] = useState('signin');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const changeAuthMode = () => {
    setAuthMode((prevMode) => (prevMode === 'signin' ? 'signup' : 'signin'));
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const endpoint = authMode === 'signin' ? '/login' : '/register';

    setFormData((prevData) => ({ ...prevData, [name]: value, endpoint }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const apiUrl = `http://localhost:5000/api/users${formData.endpoint}`;
      const response = await axios.post(apiUrl, formData);
      console.log(`${authMode} successful!`, response.data);

      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userName', response.data.name);
      setisLoggedIn(true);

      setFormData({
        name: '',
        email: '',
        password: '',
        password2: '',
      });
  
      if (authMode === 'signup') {
        setAuthMode('signin');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Server validation errors:', error.response.data);
        setErrors(error.response.data);
      } else {
        console.error('Authentication error:', error.message);
      }
    }
  };
  

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">
            {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h3>

          <div className="text-center">
            {authMode === 'signin' ? (
              <span>
                Not registered yet?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </span>
            )}
          </div>

          {authMode === 'signup' && (
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
          )}

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter email"
            />
             {errors.email && (<div className="text-danger">{errors.email}</div>)}
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Enter password"
            />
            {errors.password && (<div className="text-danger">{errors.password}</div>)}
          </div>

          {authMode === 'signup' && (
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleInputChange}
                className="form-control mt-1"
                placeholder="Confirm password"
              />
              {errors.password2 && (
                <div className="text-danger">{errors.password2}</div>
              )}
            </div>
          )}

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

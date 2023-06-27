
import React, { useState } from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import { useNavigate } from 'react-router-dom';
import { Field } from '@atlaskit/form';
import { FormFooter } from '@atlaskit/form';



const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };


 const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      
       
    setErrorMessage('');
      

     
        navigate('/admin');
      
     
    } else {
      setErrorMessage('Invalid username or password.');
    }

    setUsername('');
    setPassword('');
  };

  
    return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4">
          <h2 className="text-center mb-4">Login</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <Field name="username" label="Username" isRequired>
              {({ fieldProps }) => (
                <TextField
                  {...fieldProps}
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                />
              )}
            </Field>
            <Field name="password" label="Password" isRequired>
              {({ fieldProps }) => (
                <TextField
                  {...fieldProps}
                  type="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              )}
            </Field>
            <FormFooter>
              <Button type="submit" appearance="primary">
                Login
              </Button>
            </FormFooter>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default LoginPage;

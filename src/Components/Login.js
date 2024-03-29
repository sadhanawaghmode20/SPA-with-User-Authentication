import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({ returnTo: window.location.origin });
  };

  return (
    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
  );
}

function Login() {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user));
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container-fluid'>
      <header className='App-header'>
        {!isAuthenticated && (
          <div>
            <h3>Please log in</h3>
          </div>
        )}
        {isAuthenticated && (
          <div>
            <h3>Hello {user.name}</h3>
            <LogoutButton />
          </div>
        )}
      </header>
    </div>
  );
}

export default Login;

import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer'; 
import Welcome from '../components/Welcome';

const WelcomePage = () => {
  const { store } = useGlobalReducer();
  const userName = store.user.user?.first_name; 

  if (!userName) {
    return null;
  }
  return (
    <div className="container mt-5">
      <Welcome />
    </div>
  );
};

export default WelcomePage;
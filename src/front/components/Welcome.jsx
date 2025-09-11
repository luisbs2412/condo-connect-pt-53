import React from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer'; 

const Welcome = () => {
  const { store } = useGlobalReducer();
  const userName = store.user.user?.first_name; 
  if (!userName) {
    return null;
  }

  const currentHour = new Date().getHours();
  let greeting;


  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good morning';
  } else if (currentHour >= 12 && currentHour < 19) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good night';
  }

  return (
    <div>
      <p>{greeting}, {userName}.</p>
      
      
        <div>
          <h2 className="text-center">Welcome to CondoConnect!</h2>
          <p className="text-center">Your portal for managing and reporting condominium issues efficiently.</p> 
        </div>

    </div>
  );
};

export default Welcome;
import logo from './logo.svg';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import { MFA } from './MFA';
import awsExports from './aws-exports';
import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

Amplify.configure({
  Auth: {
    region: awsExports.REGION, 
    userPoolId: awsExports.USER_POOL_ID, 
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID, 
    authenticationFlowType: 'CUSTOM_AUTH'
  }
});

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var isVerified = false;

  const setUser = (e) => {
    console.log(e);
    setUsername(e.target.value);
  }

  const customSignInFlow = () => {
    Auth.signIn(username, password)
      .then(user => {
        isVerified = true;
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
          Auth.sendCustomChallengeAnswer(user, "Peccy")
            .then(user => {
              console.log(user);
              console.log('Verified custom challenge');
            })
            .catch(error => console.log(error));
        } 
        else {
          console.log(user);
        }
      })
  }

  return (
    <div>
      <label>Username: 
        <input type='text' value={username} onChange={(e) => setUser(e)}></input>
        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <button onClick={customSignInFlow}>Sign in</button>
      {isVerified ? <h1>Verified!</h1> : <h1>Not Verified.</h1>}
    </div>
  );
}

export default App;

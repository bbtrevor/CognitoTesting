import logo from './logo.svg';
import './App.css';
import { Amplify, Auth, SignIn } from 'aws-amplify';
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

  const customSignInFlow = () => {
    console.log(username, password);
    Auth.signIn(username, password)
      .then(user => {
        isVerified = true;
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
          // send custom challenge answer
        } 
        else {
          console.log(user);
        }
      })
  }

  return (
    <div>
      <label>Username: 
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <Button onClick={customSignInFlow}>Sign in</Button>
      {isVerified ? <h1>Verified!</h1> : <h1>Not Verified.</h1>}
    </div>
  );
}

export default App;

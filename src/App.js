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
  const [mfaCode, setMfaCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const services = {
    async handleSignIn(formData) {
      let { username, password } = formData;
      console.log("Here.");
      return Auth.signIn(username, password)
      .then(user => {
        console.log(user);
        setIsVerified(true);
        if (user.challengeName === 'CUSTOM_CHALLENGE') {
          Auth.sendCustomChallengeAnswer(user, "1234")
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
  }

  return (
    <div>
      {/* <label>Username: 
        <input type='text' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </label>
      <br/>
      <label>Password: 
        <input type='text' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </label>
      <br/>
      <label>MFA Code: 
        <input type='text' placeholder='Enter your MFA code' value={mfaCode} onChange={(e) => setMfaCode(e.target.value)}></input>
      </label>
      <br/>
      <button onClick={customSignInFlow}>Sign in</button>
      {isVerified ? <h1>Verified!</h1> : <h1>Not Verified.</h1>} */}
      <Authenticator services={services}>

      </Authenticator>
    </div>

  );
}

export default App;

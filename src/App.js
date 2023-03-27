import logo from './logo.svg';
import './App.css';
import { Amplify, SignIn } from 'aws-amplify';
import { MFA } from './MFA';
import awsExports from './aws-exports';

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

  return (
    <Authenticator hideDefault={true}>
      <SignIn/>
      <MFA/>
      <div className="App">
        <header className="App-header">
          Hello!
        </header>
      </div>
    </Authenticator>
  );
}

export default App;

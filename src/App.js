import React from 'react';
import './App.css';
import { Amplify, Auth, Hub } from 'aws-amplify';
import awsExports from './aws-exports';
import {
  Authenticator,
  SignUp,
  SignIn,
  Greetings,
  ConfirmSignUp,
  AuthPiece
} from '@aws-amplify/ui-react';
import ReCAPTCHA from 'react-google-recaptcha';


Amplify.configure({
  Auth: {
    region: awsExports.REGION, 
    userPoolId: awsExports.USER_POOL_ID, 
    userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID, 
    authenticationFlowType: 'CUSTOM_AUTH'
  }
});

class MyCustomConfirmation extends AuthPiece {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(data) {
    Auth.sendCustomChallengeAnswer(this.props.authData, data).then((user) => {
      console.log('user signed in!: ', user);
      this.changeState('signedIn', user);
    });
  }

  render() {
    if (this.props.authState === 'customConfirmSignIn') {
      return (
        <div>
          <ReCAPTCHA
            sitekey="your-client-side-google-recaptcha-key"
            onChange={this.onChange}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

class MyApp extends React.Component {
  render() {
    return (
      <div className="App">
        <Authenticator hideDefault={true}>
          <SignIn />
          <SignUp />
          <ConfirmSignUp />
          <Greetings />
          <MyCustomConfirmation override={'ConfirmSignIn'} />
        </Authenticator>
      </div>
    );
  }
}

function App() {
  return <MyApp />;
}

export default App;
import React from 'react';
import createNavigator from './routes';
import NavigationService from './services/navigation';
import {connect} from 'react-redux';

function App(props) {
  const registerService = (ref) => {
    NavigationService.setTopLevelNavigator(ref);
  };

  const {auth} = props;

  if (!auth.authChecked) {
    return null;
  }

  const Routes = createNavigator(auth.signedIn);

  return <Routes ref={registerService} />;
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(App);

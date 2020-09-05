import {NavigationActions} from 'react-navigation';

let nav;

function setTopLevelNavigator(navigatorRef) {
  nav = navigatorRef;
}

function navigate(routerName, params) {
  nav.dispatch(NavigationActions.navigate({routerName, params}));
}

export default {
  setTopLevelNavigator,
  navigate,
};

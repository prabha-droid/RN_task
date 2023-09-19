import * as React from 'react';
const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  return navigationRef.current?.goBack();
}


export default {
  navigate,
  goBack,
  navigationRef,
};
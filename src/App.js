
import React from 'react';
import AppRoute from './Router';
import { ToastProvider } from 'react-toast-notifications';
function App () {
  return (
    <ToastProvider autoDismissTimeout={7000} autoDismiss={true}>
   <AppRoute/>
   </ToastProvider>
  );
}

export default App;


import React, {Fragment} from 'react';
import { StatusBar, View, Text } from 'react-native';

// import Main from './src/screen/main';
import Navigate from './src/routes/navigation';

const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Navigate />
    </Fragment>
  );
};



export default App;

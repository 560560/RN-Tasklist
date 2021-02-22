import {StatusBar} from 'expo-status-bar';
import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import FooterContainer from './Components/Footer/FooterContainer';
import {connect, useDispatch, useSelector} from 'react-redux';
import TodosScreen from './Screens/TodosScreen';
import ProfileScreen from './Screens/ProfileScreen';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import {getConnectionStatus} from './redux/navbar-reducer';


const Main = () => {
  const dispatch = useDispatch();

  const screenToShow = useSelector(state => state.screens.screenToShow);

  const appInitializeStatus = useSelector(state => state.navbarPanel.appInitialized);

  useEffect(() => {
    dispatch(getConnectionStatus());
  }, [dispatch]);


  if (!appInitializeStatus) {
    return (
        <View>
          <ActivityIndicator size={'large'}/>
        </View>);
  }

  return (

      <View style={StyleSheet.flatten([styles.wrapper])}>

        <StatusBar style="light"/>
        <Navbar/>
        {screenToShow === 'login' ? <Login/>
            : screenToShow === 'todos'
                ? <TodosScreen renderScreen={'todos'}/>
                : screenToShow === 'doneTodos'
                    ? <TodosScreen renderScreen={'doneTodos'}/>
                    : screenToShow === 'profile' && <ProfileScreen/>
        }
        {screenToShow !== 'login' && <FooterContainer/>}

      </View>

  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#f8f8f8',
  },
  image: {
    flex: 1,
    resizeMode: 'repeat',
    justifyContent: 'center',
  },

});

export default Main;

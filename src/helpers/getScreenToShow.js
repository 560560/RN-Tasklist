import React from 'react';

import { Login } from '../components/Login';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UndoneTodosScreen } from '../screens/UndoneTodosScreen';
import { AppScreen } from './constants';
import { DoneTodosScreen } from '../screens/DoneTodosScreen';

export const getScreenToShow = (screenToShow) => {
  switch (screenToShow) {
    case AppScreen.UNDONE_TODOS:
      return <UndoneTodosScreen renderScreen={AppScreen.UNDONE_TODOS} />;
    case AppScreen.DONE_TODOS:
      return <DoneTodosScreen renderScreen={AppScreen.DONE_TODOS} />;
    case AppScreen.PROFILE:
      return <ProfileScreen />;
    case AppScreen.LOGIN:
    default:
      return <Login />;
  }
};

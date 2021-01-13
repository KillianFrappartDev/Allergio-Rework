import { createContext } from 'react';

const AuthContext = createContext({
  isLogged: false,
  isGuest: false,
  user: null,
  login: () => {},
  logout: () => {},
  setUserprofile: () => {}
});

export default AuthContext;

import {useState, useEffect} from 'react';

import './App.css';
import Routing from './routing-nav/Routing';
import Navigation from './routing-nav/Navigation';
import {decodeToken } from 'react-jwt';
import UserContext from './auth/UserContext';
import { useContext } from 'react';
import JoblyApi from './api';
import {Spinner} from 'reactstrap';
import useLocalStorage from './hooks/useLocalStorarge';
import { BrowserRouter } from 'react-router-dom';


export const TOKEN_STORAGE = 'token';
function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE)
  const [infoLoaded, setInfoLoaded] = useState(false);

  /** Effect to get current user.
   * 
   * If there is a token present in localStorage,
   * get username from token,
   * use JoblyAPI to talk to back and retrieve user obj
   */

  useEffect(() => {
    const getCurrUser = async () => {
      if (token){
        try{
          let {username} = decodeToken(token);
          let currUser = await JoblyApi.getCurrUser(username);
          setCurrentUser(currUser)
        } catch(err){
          console.error("App getUserInfo: problem loading", err);
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrUser()
  }, [token]);


  /** Handles site-wide logout */
  
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  /** Handle site-wide login */

  const login = async (data) => {
    try { 
      let result = await JoblyApi.userLogin(data);
      setToken(result);
      return {success: true};
    } catch (err) {
      console.error('Login Failed', err);
      return {success: false, err}
    }
  }

  /** Handle site-wide registration 
   * sets token upon sign up
  */

  const signup = async (data) => {
    try{
      let result = await JoblyApi.userSignup(data);
      setToken(result)
      return {success: true};
    }catch(err){
      console.error('Signup Failed', err);
      return {success: false, err};
    } 
  }
  
  /** Handle edits to account details */

  const update = async (username,data) => {
    try{
      await JoblyApi.userUpdate(username, data);
      return {success: true}
    }catch (err) {
      console.error('Update Failed', err);
      return {success: false, err}
    }
  }


  if(!infoLoaded) return <Spinner>Loading...</Spinner>


  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
    <div className="App">
      <BrowserRouter>
        <Navigation logout={logout} />
      </BrowserRouter>
      <Routing login={login} signup={signup} update={update} currentUser={currentUser.user}/>
    </div>
    </UserContext.Provider>
  );
}

export default App;

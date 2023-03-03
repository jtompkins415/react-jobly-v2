import {useState, useEffect} from 'react';

import './App.css';
import Routing from './routing-nav/Routing';
import Navigation from './routing-nav/Navigation';
import {decodeToken } from 'react-jwt'
import JoblyApi from './api';
import {Spinner} from 'reactstrap';
import useLocalStorage from './hooks/useLocalStorarge';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './auth/UserContext';


export const TOKEN_STORAGE = 'token';
function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null; 
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE)
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]))

  console.debug(
    "App",
    "infoLoaded = ", infoLoaded,
    "token = ", token, 
    "currentUser = ", currentUser
  )

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
          localStorage.setItem('currentUser', JSON.stringify(currUser));
          setCurrentUser(currUser);
          setApplicationIds(new Set(currUser.applications))
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
    localStorage.removeItem('currentUser');
    setToken(null)
    setCurrentUser(null);
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
      console.log(result);
      setToken(result.token)
      return {success: true};
    }catch(err){
      console.error('Signup Failed', err);
      return {success: false, err};
    } 
  }

  if(!infoLoaded) return <Spinner>Loading...</Spinner>

  /** Check if a job has been applied to */
  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  }
  
  /** Apply to a job: Make an API call and update set of application IDs */

  const applyToJob = async (id) => {
    if (hasAppliedToJob(id)) return;
    console.log(currentUser.user.username)
    await JoblyApi.applyToJob(currentUser.user.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  


  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
    <div className="App">
      <BrowserRouter>
        <Navigation logout={logout} />
      </BrowserRouter>
      <Routing login={login} signup={signup} currentUser={currentUser?.user}/>
    </div>
    </UserContext.Provider>

    


  );
}

export default App;

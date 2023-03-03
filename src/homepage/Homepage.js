import {useContext} from 'react';
import { UserContext } from '../auth/UserContext';
import { Button } from 'reactstrap';
import './Homepage.css'


const Homepage = () => {
    const {currentUser} = useContext(UserContext);
    

    return (
        <div className='Homepage'>
            <div className='Homepage-title-wrapper'>
                <h1> JOBLY </h1>
                <h3> ALL THE JOBS </h3>
                <h3>ALL THE PATHS</h3>
            </div>
            <div className='Homepage-body-wrapper'>
            {currentUser ? <h2>Welcome Back, {currentUser.user.firstName || currentUser.user.username}</h2>: (
                <div className='Homepage-button-wrapper'>
                    <Button
                        className='login-button'
                        href={`/login`}>
                        Login
                    </Button>
                    <Button
                        className='signup-button'
                        href={`/signup`}>
                        Sign Up
                    </Button>
                </div>
            )}
            </div>
        </div>
    )
};

export default Homepage;


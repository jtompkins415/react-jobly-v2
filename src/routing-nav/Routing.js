import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CompanyList from '../companies/CompanyList';
import CompanyDetails from '../companies/CompanyDetails';
import JobList from '../jobs/JobList'
import LoginForm from '../auth/LoginForm'
import SignupForm from '../auth/SignupForm'
import Profile from '../profiles/Profile';
import Homepage from '../homepage/Homepage';


const Routing = ({login, signup}) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/companies' element={<CompanyList />}/>
                    <Route path='/companies/:handle' element= {<CompanyDetails />}/>
                    <Route path='/jobs' element={<JobList />}/>
                    <Route path='/login' element={<LoginForm login={login} />} />
                    <Route path='/signup' element={<SignupForm signup={signup} />} />
                    <Route path='/:username' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default Routing;

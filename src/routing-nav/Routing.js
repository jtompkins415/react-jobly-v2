import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';




const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/companies' element={<CompanyList />}/>
                    <Route path='/companies/:name' element= {<CompanyDetails />}/>
                    <Route path='/jobs' element={<JobList />}/>
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/signup' element={<SignupForm />} />
                    <Route path='/:username' element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    )
};

export default Routing;

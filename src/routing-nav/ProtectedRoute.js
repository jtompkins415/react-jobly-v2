import { useContext } from "react";
import {Route, Routes, Navigate } from 'react-router-dom';
import UserContext from "../auth/UserContext";

const ProtectedRoute = ({ path, component: Component, ...rest}) => {
    const {currentUser} = useContext(UserContext);

    if(!currentUser) return <Navigate to='/login' />

    return (
        <Routes>
            <Route path={path} element={<Component {...rest} />} />
        </Routes>
       
    )

};

export default ProtectedRoute;

 
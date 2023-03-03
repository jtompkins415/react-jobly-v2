 import {createContext, useState, useEffect } from 'react';
 import { getItem, setItem } from '../helpers/storage';


 export const UserContext = createContext();

 export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(getItem('currentUser') || {});

    useEffect(() => {
        setItem('currentUser', currentUser);
    }, [currentUser]);
 }

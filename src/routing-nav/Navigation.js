import {useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
import {UserContext} from '../auth/UserContext';
import {
    Nav,
    Navbar,
    NavItem,
    NavLink,
    NavbarBrand,
    NavbarToggler,
    Collapse
} from 'reactstrap';
import './Navigation.css'


const Navigation = ({logout}) => {
    const {currentUser} = useContext(UserContext);
    

    const [isCollapsed, setIsCollapsed] = useState(true);

    const location = useLocation();
    const isHomepage = location.pathname ==='/'

    const toggleNavBar = () => setIsCollapsed(!isCollapsed);

    const loggedInNav = () => {
        return (
            <Nav navbar>
                <NavItem>
                    <NavLink href='/companies' className='nav-link'>
                        Companies
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/jobs' className='nav-link'>
                        Jobs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href={`/ProfileForm`} className='nav-link'>
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/' className='nav-link' onClick={logout}>
                        Logout
                    </NavLink>
                </NavItem>
            </Nav>
        )
    };

    const loggedOutNav = () => {
        return (
            <Nav navbar>
            <NavItem>
                <NavLink href='/login' className='nav-link'>
                    Login
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href='/signup' className='nav-link'>
                   Sign Up
                </NavLink>
            </NavItem>
        </Nav>
        )
    }
     
    return (
        <>
            <Navbar className='Navbar' light>
                {!isHomepage ? (<NavbarBrand href='/' className='nav-link'>
                    JOBLY
                </NavbarBrand>) : null}
                <NavbarToggler onClick={toggleNavBar} className="me-2"/>
                <Collapse isOpen={!isCollapsed} navbar>
                    {currentUser ? loggedInNav(): loggedOutNav()}
                </Collapse>
            </Navbar>
        </>
    )
};

export default Navigation;


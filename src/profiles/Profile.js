import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import UserContext from '../auth/UserContext'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap'


const Profile = ({update}) => {
    const navigate = useNavigate()
    const {currentUser} = useContext(UserContext);

    const {username, firstName, lastName, email} = currentUser.user;

    const [formData, setFormData] = useState({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        username: `${username}`,
        password: '',
        email: `${email}`
    })

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]:value}));     
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let result = await update(username, formData);
        if(result.success){
            return navigate('/');
        } else {
            alert('Errors: ', result.errors);
        }
    }

    return (
        <div className="Profile">
            <div className="Form-edit-wrapper">
                <Form className='form' onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label className='form-label' htmlFor='username' sm={3}> Username:</Label>
                        <Col sm={8}>
                        <Input disabled id="username" name='username' value={formData.username} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='form-label' htmlFor='firstName' sm={3}> First Name:</Label>
                        <Col sm={8}>
                        <Input id="firstName" name='firstName' value={formData.firstName} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='form-label' htmlFor='lastName' sm={3}> Last Name:</Label>
                        <Col sm={8}>
                        <Input id="lastName" name='lastName' value={formData.lastName} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className='form-label' htmlFor='email' sm={3}> Email:</Label>
                        <Col sm={8}>
                        <Input id="email" name='email' value={formData.email} onChange={handleChange} />
                        </Col>
                    </FormGroup>
                    <Button outline className="form-button" color="success">
                        Sign Up
                    </Button>
                    <Button outline className="form-button"     color='danger' href="/main">
                        Cancel
                    </Button>
                </Form>

            </div>
        </div>
    )
};

export default Profile;


import {useState, useContext} from 'react';
import {UserContext} from '../auth/UserContext'
import JoblyApi from '../api';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap'
import './Profile.css'


const Profile = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const {username, password, firstName, lastName, email} = currentUser.user

    const [formData, setFormData] = useState({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        email: `${email}`
    })

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]:value}));     
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        let updatedUser;

        try{
            updatedUser = await JoblyApi.userUpdate(username, formData);
        } catch(err){
            console.error(err);
        }

        setFormData(f => ({...f, password}))
        setSaveConfirmed(true)
        setCurrentUser(updatedUser);
    }

    return (
        <div className="Profile">
            <div className='Profile-title-wrapper'>
                <h1> Edit User Details</h1>
            </div>
            <div className="Form-edit-wrapper">
                <Form className='form' onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label className='form-label' htmlFor='username' sm={3}> Username:</Label>
                        <Col sm={8}>
                        <Input disabled id="username" name='username' placeholder={username} />
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

                    {saveConfirmed ? (<div> Update successful...</div>) : null}


                    <Button outline className="form-button">
                        Confirm Changes
                    </Button>
                </Form>

            </div>
        </div>
    )
};

export default Profile;


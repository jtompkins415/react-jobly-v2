import {useState} from 'react';
import {useNavigate, userNavigate} from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap';


const SignupForm = ({signup}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''   
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]:value}));     
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let result = await signup(formData);
        if(result.success){
            return navigate('/');
        } else {
            alert('Errors: ', result.errors);
        }
    }
    
    return (
          <div>
            <div className='form-title'>
                <h1> CREATE AN ACCOUNT </h1>
            </div>
        <Form className='form' onSubmit={handleSubmit}>
            <FormGroup row>
                <Label className="form-label" htmlFor='firstName' sm={3}>FIRST NAME: </Label>
                <Col sm={8}>
                <Input className='form-input' id='firstName' name='firstName' type='text' value={formData.firstName} onChange={handleChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="form-label" htmlFor='lastName' sm={3}>LAST NAME: </Label>
                <Col sm={8}>
                <Input className='form-input'  id='lastName' name='lastName' type='text' value={formData.lastName} onChange={handleChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="form-label" htmlFor='email' sm={3}>EMAIL: </Label>
                <Col sm={8}>
                <Input className='form-input'  id='email' name='email' type='email' value={formData.email} onChange={handleChange}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="form-label" htmlFor='username' sm={3}>USERNAME: </Label>
                <Col sm={8}>
                <Input className='form-input'  id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label className="form-label" htmlFor='password' sm={3}>PASSWORD: </Label>
                <Col sm={8}>
                <Input className='form-input'  id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
                </Col>
            </FormGroup>

            <Button outline className="form-button" color="success">
                Sign Up
            </Button>
            <Button outline className="form-button" color='danger' href="/main">
                Cancel
            </Button>
        </Form>
        </div>
    )
};

export default SignupForm;


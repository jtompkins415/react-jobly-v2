import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';
import {Spinner} from 'reactstrap';


const CompanyDetails = () => {
    const {handle} = useParams();
    const [company, setCompany] = useState(null)
    const [jobs, setJobs] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        async function getCompany(){
            let result = await JoblyApi.getCompany(handle);
            setCompany(result);
            setIsLoaded(true)
        }

        getCompany()
    }, [handle])

    if(!isLoaded) return <Spinner>Loading...</Spinner>

    console.log(company)
    const {name, description, numEmployees} = company

    return (
        <div className="CompanyDetails">
            <div className="CompanyDetails-title-wrapper">
                <h1> {name} </h1>
            </div>
            <div className="CompanyDetails-body-wrapper">
                <div>
                    {description}
                    <br/>
                    Number of Employees: {numEmployees}
                </div>
            </div>
            <div className='CompanyDetails-job-wrapper'>
                <h5>Jobs</h5>
            </div>
        </div>
    )
};

export default CompanyDetails;


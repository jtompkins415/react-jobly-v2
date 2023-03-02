import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';
import {Spinner} from 'reactstrap';
import JobCard from '../jobs/JobCard';
import './CompanyDetails.css';


const CompanyDetails = () => {
    const {handle} = useParams();
    const [company, setCompany] = useState(null)
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
    const {name, description, numEmployees, jobs} = company
    
    console.log(jobs);

    return (
        <div className="CompanyDetails">
            <div className="CompanyDetails-title-wrapper">
                <h1> {name} </h1>
            </div>
            <div className="CompanyDetails-body-wrapper">
                <div>
                    {description}
                    <br/>
                    Number of Employees: {numEmployees || "Information Not Availiable"}
                </div>
            </div>  
            
            <h5>Positions Availiable</h5>
            <div className='CompanyDetails-job-wrapper'>
              
                {jobs.length ? (
                    jobs.map(job => (
                        <JobCard 
                            key={job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            />
                    ))
                ) : (<p> No Jobs avaliable...</p>)}
            </div>
        </div>
    )
};

export default CompanyDetails;


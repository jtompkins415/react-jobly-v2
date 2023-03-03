import { useContext, useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button
} from 'reactstrap';
import {UserContext} from '../auth/UserContext';
import './JobCard.css'

const JobCard = ({id, title, salary, compName, equity, handle}) => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const {applications} = currentUser.user;
    const {hasAppliedToJob, applyToJob} = useContext(UserContext);
    const [applied, setApplied ] = useState(hasAppliedToJob(id));

    useEffect(() => {
        setApplied(hasAppliedToJob(id))
    }, [id, hasAppliedToJob]);

    const handleApply = async (evt) => {
        if(applications.includes(id)) return;
        applyToJob(id);
        setApplied(true)
    }


    return (
        
            <Card className='job-card'>
                <CardBody>
                    <CardTitle  className='job-card_name' tag='h5'>
                        {title}
                    </CardTitle>
                    <CardText className='job-card_info'>
                        {compName ? (<span>Company: <a href={`/companies/${handle}`}>{compName}</a></span> ) : (null)}
                        <br/>
                        Expected Salary: {formatSalary(salary)}
                        <br/>
                        Expected Equity: {equity}
                    </CardText>
                    <Button className='btn btn-danger font-weigh-bold text-uppercase float-right' onClick={handleApply} disabled={applications.includes(id)}>
                        {applications.includes(id) ? "Applied" : "Apply"}
                    </Button>
                </CardBody>
            </Card>
    )
};

const formatSalary = (salary) => {
    if (!salary) return 'N/A';
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--){
        digitsRev.push(salaryStr[i]);
        if(i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard;

import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button
} from 'reactstrap';
import './JobCard.css'

const JobCard = ({title, salary, compName, equity, handle}) => {
    return (
        
            <Card className='job-card'>
                <CardBody>
                    <CardTitle  className='job-card_name' tag='h5'>
                        {title}
                    </CardTitle>
                    <CardText className='job-card_info'>
                        {compName ? (<span>Company: <a href={`/companies/${handle}`}>{compName}</a></span> ) : (null)}
                        <br/>
                        Expected Salary: {salary}
                        <br/>
                        Expected Equity: {equity}
                    </CardText>
                </CardBody>
            </Card>
    )
};

export default JobCard;

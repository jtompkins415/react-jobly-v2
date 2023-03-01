import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button
} from 'reactstrap';
import './CompanyCard.css'

const CompanyCard = ({name, description, handle}) => {
    return (
        
            <Card className='company-card'>
                <CardBody>
                    <CardTitle  className='company-card_name' tag='h5'>
                        {name}
                    </CardTitle>
                    <CardText className='company-card_description'>
                        {description}
                    </CardText>
                    <Button
                        color='primary'
                        href={`/companies/${handle}`}
                        >
                        Company Page
                    </Button>
                </CardBody>
            </Card>
    )
};

export default CompanyCard;


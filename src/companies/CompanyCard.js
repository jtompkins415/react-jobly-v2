import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    Button
} from 'reactstrap';

const CompanyCard = ({name, description, handle}) => {
    return (
        
            <Card style={{width: '18rem'}}>
                <CardBody>
                    <CardTitle tag='h5'>
                        {name}
                    </CardTitle>
                    <CardText>
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


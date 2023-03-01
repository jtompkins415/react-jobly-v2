import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import JoblyApi from '../api';


const CompanyDetails = () => {
    const {handle} = useParams();
    const [company, setCompany] = useState(null)

    useEffect(() => {
        async function getCompany(){
            let result = await JoblyApi.getCompany(handle);
            setCompany(result);
        }

        getCompany()
    }, [handle])

    

    return (
        <div className="CompanyDetails">
            <div className="CompanyDetails-title-wrapper">
                <h1> Company Details </h1>
            </div>

        </div>
    )
};

export default CompanyDetails;


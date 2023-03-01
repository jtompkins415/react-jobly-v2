import {useState, useEffect} from 'react';
import {CardGroup, Spinner} from 'reactstrap';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';

const CompanyList = () => {
    const [companies, setCompanies] = useState(null)
    
    
    useEffect(() => {
        search();
     }, [])

     const search = async (name) => {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies)
     }

    
     console.log(companies)

     if(!companies) return <div><Spinner color='warning'/></div>
    

    return (
        <div className="CompanyList">
            <div className="CompanyList-title-wrapper">
                <h1> Companies </h1>
            </div>
            <SearchForm searchFor={search} />
            {companies.length ? (
                <CardGroup>
               {companies.map(comp => (
                <CompanyCard
                    key={comp.handle}
                    handle={comp.handle}
                    name={comp.name}
                    description={comp.description}
                    logoUrl={comp.logoUrl} />
            ))}
            </CardGroup>) : (
                <p>Sorry, no results were found</p>
            )}
        </div>
    )
};

export default CompanyList;


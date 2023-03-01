import {useState, useEffect} from 'react';
import {CardGroup, Spinner} from 'reactstrap';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

const CompanyList = () => {
    const [companies, setCompanies] = useState(null)
    
    
    useEffect(() => {
        search();
     }, [])

     const search = async (name) => {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies)
     }

     if(!companies) return <div><Spinner color='warning'/></div>
    

    return (
        <div className="CompanyList">
            <div className="CompanyList-title-wrapper">
                <h1> Companies </h1>
            </div>
            <div className='CompanyList-searchbar-wrapper'>
                <SearchForm searchFor={search} />
            </div>
            <div className='CompanyList-companies-wrapper'>
                {companies.length ? (
                    companies.map(comp => (
                        <CompanyCard
                            key={comp.handle}
                            handle={comp.handle}
                            name={comp.name}
                            description={comp.description}
                            logoUrl={comp.logoUrl} />
                    ))
                ): (<p>Sorry, No results found...</p>)}
            </div>
        </div>
    )
};

export default CompanyList;


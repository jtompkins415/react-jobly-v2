import {useState, useEffect} from 'react'
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api';
import { Spinner } from 'reactstrap';
import JobCard from './JobCard';
import './JobList.css'

const JobList = () => {
    const [jobs, setJobs] = useState(null)

    useEffect(() => {
        search()
    }, [])

    const search = async (title) => {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if(!jobs) return <Spinner>Loading...</Spinner>

    console.log(jobs)

    return (
        <div className="JobList">
            <div className='JobList-title-wrapper'>
                <h1> Jobs </h1>
            </div>
            <div className='JobList-searchbar-wrapper'>
                <SearchForm searchFor={search} />
            </div>
            <div className='JobList-jobs-wrapper'>
                {jobs.length ? (
                    jobs.map(job => (
                        <JobCard
                            key={job.id}
                            handle={job.companyHandle}
                            compName={job.companyName}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity * 100 || 0} />
                    ))
                ): (<p>Sorry, No results found...</p>)}
            </div>
        </div>
    )
};

export default JobList;


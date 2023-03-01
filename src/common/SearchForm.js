import {useState} from 'react';


const SearchForm = ({searchFor}) => {
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchFor(searchTerm.trim() || null);
        setSearchTerm(searchTerm.trim());
    }

    const handleChange = (evt) => {
        setSearchTerm(evt.target.value);
    }

    return (
        <div className='SearchForm'>
            <form className="form-inline" onSubmit={handleSubmit}>
                <input 
                    className='form-control form-control-lg flex-grow-1'
                    name="searchTerm"
                    placeholder='Enter search here..'
                    value={searchTerm}
                    onChange={handleChange}/>
                <button type='submit' className='btn btn-lg btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    )
};

export default SearchForm;
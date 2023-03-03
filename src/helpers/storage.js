 /** Helper functions to interact with local storage */

/** Set Item in local storage
 */

const setItem = (key, value) => {
    try{
        localStorage.setItem(key, JSON.stringify(value));
    }catch(error) {
        console.error(`Error setting ${key} to ${value} in localStorage`)
    }
};

/** Get Item from local storage */

const getItem = (key) => {
    try{
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch(err) {
        console.error(`Error getting ${key} from localStorage:`, err);
        return null;
    }
};

/** Remove item from local storage */

const removeItem = (key) => {
    try{
        localStorage.removeItem(key);
    }catch(err){
        console.error(`Error removing ${key} from localStorage:`, err)
    }
};

export {
    setItem,
    getItem,
    removeItem
}
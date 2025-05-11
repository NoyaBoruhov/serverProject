import React, { useState } from 'react';

function SearchPosts({ setSearch }) {
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
 
    return (
        <>
            <select name="search" id="sort" value={searchType} onChange={({ target }) => setSearchType(target.value)} >
                <option value="">ללא</option>
                <option value="id">מספר מזהה</option>
                <option value="title">כותרת</option>
            </select>
            {searchType && (
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={({ target }) => setSearchValue(target.value)}
                />
            )}
            <button onClick={() => setSearch({ type: searchType, value: searchValue })}>
                חפש
            </button>
        </>
    );
}

export default SearchPosts;
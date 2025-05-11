import React, {useState } from 'react';

function SortSearchTodos({ handleSortChange, sortOption, setSearch }) {
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    return <>
        מיין לפי:
        <select name="sort" id="sort" value={sortOption} onChange={({ target }) => handleSortChange(target.value)}>
            <option value="id">מספר מזהה</option>
            <option value="alphabetical">אלפבתי</option>
            <option value="random">אקראי</option>
            <option value="completed">ביצוע</option>
        </select>
        חפש לפי:
        <select name="search" id="sort" value={searchType} onChange={({ target }) => {setSearchType(target.value)}}>
            <option value="">ללא</option>
            <option value="id">מספר מזהה</option>
            <option value="alphabetical">כותרת</option>
            <option value="completed">ביצוע</option>
        </select>
        {searchType !== 'completed' ?
            <input type="text" name="search" placeholder="Search..." onChange={({ target }) => setSearchValue(target.value)} />
            : <input type="checkbox" checked={!!searchValue}  onChange={() => setSearchValue((prev) => !prev)} // שינוי הערך
        />}
        <button onClick={() => setSearch({ type: searchType, value: searchValue })}>Search</button>

    </>
}

export default SortSearchTodos;

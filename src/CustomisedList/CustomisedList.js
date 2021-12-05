import React, { Component, useState, useEffect } from "react";
import ListItem from "../common/ListItem";

function CustomisedList () {
    const [list, setList] = useState({})
    const [country, setCountry] = useState('USA')

    function getData(){
        fetch('/country-content', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({country})
        }).then(res => res.json()).then(data=>setList(data));
        // fetch('/language').then(res => res.json()).then(data=>setList(data))
    }


    useEffect(async () => {
        getData()
    },[]);

    function handleChange (e) {
        setCountry(e.target.value)
        let loc = e.target.value
        fetch('/country-content', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({country:loc})
        }).then(res => res.json()).then(data=>setList(data));
    }


    return(
        <div id="my-list">
            <div className="section">
                <h2>Content specific to {country}</h2>
                <select onChange={handleChange} value={country}>
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                    <option value="England">England</option>
                </select>
            </div>
            <div className="section">
                {/* <h3 className="mb-5 text-center">All Content</h3> */}
                <div className="content d-flex">
                    {Object.keys(list).length ? list.list.rows.map(item=><ListItem item={item} />): ''}
                </div>
            </div>

        </div>
    )

}

export default CustomisedList;
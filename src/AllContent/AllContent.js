import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";

function AllContent () {  
    const [allMovies, setAllMovies] = useState({})
   
    useEffect(async () => {
        fetch('/all-movies').then(res => res.json()).then(data=>setAllMovies(data))
    },[]);

    return (
        <div className="" id="all-content">
            <div className="section">
                <h3 className="mb-5 text-center">All Content</h3>
                <div className="content d-flex">
                    {Object.keys(allMovies).length ? allMovies.content.rows.map(item=><ListItem item={item} />): ''}
                </div>
            </div>
        </div>
    );
}

export default AllContent;



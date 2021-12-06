import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";

function Search () {  
    const [result, setResult] = useState([])
   
    // useEffect(async () => {
    //     fetch('/search').then(res => res.json()).then(data=>setQuery(data))
    // },[]);
    function handleChange(e){
        console.log(e.target.value)
        // setQuery(e.target.value)
        fetch('/search', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'query':(e.target.value).toLowerCase()})
        }).then(res => res.json()).then(d=>setResult(d.rows))
    }

    function getSearchResults(){
        console.log('search')
        // fetch('/seatch', {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).then(res => res.json()).then(d=>console.log(Object.values(d)));
    }

    console.log(result)

    return (
        <div className="" id="search">
            <div className="search-bar">
                <input onChange={handleChange} placeholder="Search titles..."/>
                {/* <a onClick={getSearchResults} className="search btn btn-warning" role="button" aria-haspopup="true" tabindex="0">
                    Search Movies
                    <img height="30px" src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png'/>
                </a> */}
            </div>
            {result && result.length? 
                <div id="search-results">
                    {result.map((item)=>
                        <div className="search-res d-flex justify-content-between p-2">
                            <img height="50px" src = 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'/>
                            <div className="desc d-flex justify-content-between align-items-center">
                                <p>{item['CONTENTNAME']}</p>
                                <p>{item['AVERAGERATING'].toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </div>
            :null
            }

        </div>
    )

}

export default Search;



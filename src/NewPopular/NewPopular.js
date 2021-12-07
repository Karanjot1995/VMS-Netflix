import React, { useState, useEffect } from "react";
// import ListItem from "../common/ListItem";

function NewPopular () {  
    const [result, setResult] = useState([])
   
    // useEffect(async () => {
    //     fetch('/search').then(res => res.json()).then(data=>setQuery(data))
    // },[]);
    // function handleChange(e){
    //     console.log(e.target.value)
    //     // setQuery(e.target.value)
    //     fetch('/search', {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({'query':(e.target.value).toLowerCase()})
    //     }).then(res => res.json()).then(d=>setResult(d.rows))
    // }


    return (
        <div className="pt-50" id="new-popular">
            <h1 className="pt-50 text-center">Under Development :)</h1>
        </div>
    )

}

export default NewPopular;



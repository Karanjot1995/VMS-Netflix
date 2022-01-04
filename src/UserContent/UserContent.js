import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import SliderSection from "../common/Slider/SliderSection";

function UserContent () {
    const [userData, setUserData] = useState({})

    function getData(){
        fetch(`${BASE_API_URL}/api/user-list`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({userid:21001})
        }).then(res=>res.json()).then(data=>
            setUserData(data)
        )
    }


    useEffect(async () => {
        getData()
    },[]);

    // function handleChange (e) {
    //     setCountry(e.target.value)
    //     let loc = e.target.value
    //     fetch('/api/country-content', {
    //         method: "POST",
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({country:loc})
    //     }).then(res => res.json()).then(data=>setList(data));
    // }

    console.log(userData)


    if(userData.userContent && userData.userContent.length){
        return (
            <div className="pt-50" id="movies">
                <SliderSection list={userData.userContent}/>
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default UserContent;
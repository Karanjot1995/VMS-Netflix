import React, { Component, useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Home () {
    const [allMovies, setAllMovies] = useState({})
    const [bestRated, setBestRated] = useState({})

    const [rating, setRating] = useState(9)
    let textInput = React.createRef();


    function getData(){
        fetch('/all-movies').then(res => res.json()).then(data=>setAllMovies(data))
        fetch('/best-rated', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rating:9})
        }).then(res => res.json()).then(data=>setBestRated(data));
        // fetch('/best-rated').then(res => res.json()).then(data=>setBestRated(data))
    }

    function changeRating(){
        setRating(textInput.current.value)
        console.log(rating)
        fetch('/best-rated', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rating:textInput.current.value})
        }).then(res => res.json()).then(data=>setBestRated(data));
    }


    useEffect(async () => {
        getData()
    },[]);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows:true
    };

    console.log(bestRated)
 
    if(Object.keys(allMovies).length){
        return (
            <div className="home pt-50">
                <div className="section border-btm">
                    <h3 className="mb-5 text-center">Top 5 Rated Movies</h3>
                    {Object.keys(allMovies).length ? 
                    <Slider className="mb-5" {...settings}>
                        {allMovies.topRated.rows.map(item=><ListItem item={item} />)}
                    </Slider>
                    : ''}
                </div>
                <div className="section text-center">
                    <h3 className="mb-5">Rating above {rating} ({Object.keys(bestRated).length ? bestRated.bestRated.rows.length:''})</h3>
                    <p className="mb-5"><span>Select best rated movies above </span><input ref={textInput} defaultValue={rating} type="number"/><button onClick={()=>changeRating()}>Submit</button></p>
                    {Object.keys(bestRated).length ? 
                    <Slider {...settings}>
                        {bestRated.bestRated.rows.map(item=><ListItem item={item} />)}
                    </Slider>
                    : ''}
                </div>
                {/* <div className="section">
                    <h3 className="mb-5 text-center">All Movies</h3>
                    {Object.keys(allMovies).length ? 
                    <Slider {...settings}>
                        {allMovies.content.rows.map(item=><ListItem item={item} />)}
                    </Slider>
                    : ''}
                </div> */}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default Home;
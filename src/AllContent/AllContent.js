import React, { useState, useEffect } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../common/SlickArrow";
import SliderSection from "../common/Slider/SliderSection";
import { BASE_API_URL } from "../utils/constants";

function AllContent () {  
    const [allMovies, setAllMovies] = useState({})

   
    useEffect(async () => {
        // let hash = 	data.map((item)=>hash[item['GENRE']]?hash[item['GENRE']].push(item) : hash[item['GENRE']] = [item])
        fetch(`${BASE_API_URL}/api/all-movies`).then(res => res.json()).then(data=> {
            let hash = {}
            console.log(data)
            if(data.content && data.content.length){
                data.content.map((item)=>hash[item['Genre']] ? hash[item['Genre']].push(item) : hash[item['Genre']] = [item]);
                setAllMovies(hash)
            }
        })
    },[]);

    console.log(allMovies)

    var settings = {
        dots: false,
        arrows:true,
        touchMove:true,
        draggable:true,        
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />    
    };

    if(Object.keys(allMovies).length){
        return (
            <div className="pt-50" id="all-content">
                {Object.keys(allMovies).length && Object.keys(allMovies).map(genre=>
                    <SliderSection list={allMovies[genre]} genre={genre}/>
                )}
            </div>
        )
    }else{
        return <div className="text-center pt-100 text-light">Loading...</div>
    }

}

export default AllContent;



import React, { useRef, useState, useEffect } from "react";
import ListItem from "../ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

// import Slider from "react-slick";
// import { NextArrow, PrevArrow } from "../SlickArrow";
// import SliderSection from "../Slider/SliderSection";


function Explore (props) {  
    const [content, setContent] = useState([])
    const {genre,title, closeModal} = props
    const ref = useRef(null);

    useEffect(async () => {
        let c = []
        // let hash = 	data.map((item)=>hash[item['GENRE']]?hash[item['GENRE']].push(item) : hash[item['GENRE']] = [item])
        fetch(`${BASE_API_URL}/api/all-content`).then(res => res.json()).then(data=> {
            if(data.content && data.content.length){
                for(let g of genre){
                    data.content.map((item)=> item['Genre'].includes(g)?c.push(item):'');
                }
                setContent(c)
            }
        })
    },[]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            closeModal()
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
    console.log(genre,content)
    

    if(genre){
        return (
            <div className="explore-section" id="explore">
                <div className="explore-content mt-4" ref={ref}>
                    <a className="close-modal" onClick={()=>closeModal()}><IoIosCloseCircleOutline className="close-icon"/></a>
                    {content.length? 
                    <>
                    <h3 className="e-title text-capitalize">{props.title}</h3>
                    <div className="content d-flex">
                        <div className="content-list d-flex flex-wrap">
                        { content.map(item=><ListItem mrgBtm={'mb-5'} item={item} />)}
                        </div>
                    </div>
                    </>
                    :
                    <h3 className="e-title text-capitalize">Loading...</h3>
                    }
                                      
                </div>
            </div>
        )
    }else{
        return(
            <div className="explore-section" id="explore">
                <div className="explore-content mt-3">
                    <h3>Sorry, no content yet!</h3>
                </div>
            </div>
        ) 
    }

}

export default Explore;



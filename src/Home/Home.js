import { Component } from "react";
import ListItem from "../common/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Header from "../common/Header";

class Home extends Component {
    render(){
        let arr = [
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'},
            {title:'The Gotfather 1'}
        ]
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows:true
        };
        
        return (
            <div className="Home">
                <Header/>
                <div className="section">
                    <Slider {...settings}>
                        {arr.map(item=><ListItem item={item} />)}
                    </Slider>
                    {/* <ul className="d-flex">
                        {arr.map(item=><ListItem item={item}/>)}
                    </ul> */}
                </div>
            </div>
          );
    }

}

export default Home;
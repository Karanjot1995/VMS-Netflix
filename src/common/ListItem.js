import { Component } from "react";


class ListItem extends Component {
    render(){
        console.log(this.props)
        const props = this.props
       
        return (
            <div className="list-item">
                <a href={`/content/${props.item['CONTENTID']}`} className="content-link">
                <div className="text-center border m-5 p-3">
                   <img width={'100px'} heigth={'100px'} src={'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'}/>
                   {props.item['CONTENTNAME']? <p className="title">{props.item['CONTENTNAME']}</p>:''}
                   {props.item['AVERAGERATING']? <p>{props.item['AVERAGERATING'].toFixed(1)}/10</p>:''}
                   {props.item['AVGRATING']? <p>{props.item['AVGRATING'].toFixed(1)}/10</p>:''}
                </div>
                </a>
            </div>

          );
    }

}

export default ListItem;
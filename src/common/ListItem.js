import { Component } from "react";



class ListItem extends Component {
    render(){
        console.log(this.props)
        const props = this.props
       
        return (
            <div className="list-item">
                <div>
                   <img width={'100px'} heigth={'100px'} src={'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'}/>
                   <p>{props.item.title}</p>
                </div>
            </div>
          );
    }

}

export default ListItem;
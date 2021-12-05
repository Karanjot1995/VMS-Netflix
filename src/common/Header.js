import { Component } from "react";

class Header extends Component {
    render(){
        console.log(this.props)
        const props = this.props
       
        return (
            <div className="main-header" role="navigation">
                <a aria-label="Netflix" className="logo icon-logoUpdate active" href="/browse"></a>
                <ul className="navigation d-flex align-items-center justify-content-around">
                    <li className="navigation-tab">
                        <a className="current active" href="/">Home</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/customers">Customers</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/all-content">All Content</a>
                    </li>
                    {/* <li className="navigation-tab">
                        <a href="/browse/genre/34399">Movies</a>
                    </li> */}
                    <li className="navigation-tab">
                        <a href="/latest">New &amp; Popular</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/my-list">My List</a>
                    </li>
                    <li className="navigation-menu d-flex">
                        <input/>
                        <a className="search btn btn-warning" role="button" aria-haspopup="true" tabindex="0">
                            <img height="30px" src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png'/>
                        </a>
                    </li>
                </ul>

            </div>
          );
    }

}

export default Header;



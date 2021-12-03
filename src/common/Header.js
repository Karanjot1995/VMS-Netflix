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
                        <a className="current active" href="/browse">Home</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/browse/genre/83">Customers</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/browse/genre/34399">Movies</a>
                    </li>
                    {/* <li className="navigation-tab">
                        <a href="/browse/genre/34399">Movies</a>
                    </li> */}
                    <li className="navigation-tab">
                        <a href="/latest">New &amp; Popular</a>
                    </li>
                    <li className="navigation-tab">
                        <a href="/browse/my-list">My List</a>
                    </li>
                    <li className="navigation-menu d-flex">
                        <input/>
                        <a className="search btn btn-warning" role="button" aria-haspopup="true" tabindex="0">
                            <img height="30px" src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/VisualEditor_-_Icon_-_Search-big_-_white.svg/1200px-VisualEditor_-_Icon_-_Search-big_-_white.svg.png'/>
                        </a>
                    </li>
                </ul>
                {/* <div className="secondary-navigation">
                    <div className="nav-element">
                        <div className="searchBox">
                            <button className="searchTab" tabindex="0" aria-label="Search" data-uia="search-box-launcher"><span className="icon-search"></span></button>
                        </div>
                    </div>
                    <div className="nav-element">
                        <span className="notifications">
                            <button className="notifications-menu" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">
                                <span className="icon-button-notification"></span>
                                <span className="notification-pill">6</span>
                            </button>
                        </span>
                    </div>
                    <div className="nav-element">
                        <div className="account-menu-item">
                            <div className="account-dropdown-button">
                                <a href="/YourAccount" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-label="">
                                    <span className="profile-link" role="presentation">
                                        <img className="profile-icon" src="https://occ-0-114-116.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" alt=""/>
                                    </span>
                                </a>
                                <span className="caret" role="presentation"/>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
          );
    }

}

export default Header;



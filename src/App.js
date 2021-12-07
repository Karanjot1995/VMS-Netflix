import React, { useState, useEffect } from "react";
import AllContent from './AllContent/AllContent';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header'
import Customers from './Customers/Customers'
import CustomisedList from './CustomisedList/CustomisedList'
import NewPopular from './NewPopular/NewPopular';
import Content from './common/Content';




function App() {
  const [content, setAllContent] = useState({})
   
  useEffect(async () => {
      fetch('/all-movies').then(res => res.json()).then(data=>setAllContent(data.content))
  },[]);

  console.log(content.rows)


  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/all-content" element={<AllContent/>} />  
        <Route path="/latest" element={<NewPopular/>} />              
        <Route path="/my-list" element={<CustomisedList/>} />  
        <Route path={`/content/:id`} element={<Content/>} />  

        {/* <Route path={`/content/${item['CONTENTID']}`} render={() => <Content/> */}
        {/* {content.rows && content.rows.length? 
        content.rows.map((item)=><Route path={`/content/${item['CONTENTID']}`} render={() => (
          <Content {...content.rows} authed={true} />
        )}/>)
        :null
        }  */}
              
      </Routes>
         
    </div>
  );
}

export default App;

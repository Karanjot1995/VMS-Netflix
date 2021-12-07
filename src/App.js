import AllContent from './AllContent/AllContent';
import Home from './Home/Home';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header'
import Customers from './Customers/Customers'
import CustomisedList from './CustomisedList/CustomisedList'
import NewPopular from './NewPopular/NewPopular';


function App() {

  // onclick=()=>{
  //   alert('Hey Banana!')
  // }

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/customers" element={<Customers/>} />
        <Route path="/all-content" element={<AllContent/>} />  
        <Route path="/latest" element={<NewPopular/>} />              
        <Route path="/my-list" element={<CustomisedList/>} />         
      </Routes>
         
    </div>
  );
}

export default App;

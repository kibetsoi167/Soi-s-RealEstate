import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addplots from './components/Addplots';
import Getplots from './components/Getplots';
import MpesaPayment from './components/MpesaPayment';
import Mycarousel from './components/Mycarousel';



function App() {
  return (
    <Router>
    <div className="App">
      <div className='App-header'>
        <h1 className='text-primary'>Welcome To Soi's RealEstate services</h1>
        </div>
        {/* links to connect the routes */}
        <nav>
          <Link to='/Signup'className="btn btn-outline-success ms-2">Signup</Link>
          <Link to='/Signin'className="btn btn-outline-success ms-2">Signin</Link> 
          <Link to='/Getplots'className="btn btn-outline-success ms-2">Get plots</Link> 
          <Link to='/Addplots'className="btn btn-outline-success ms-2">Add plots</Link> 
          <Link to='/Mycarousel'className="btn btn-outline-success ms-2">Mycarousel</Link>
        </nav>
        <Routes>
          <Route path='/signup'element={<Signup/>}/>
          <Route path='/signin'element={<Signin/>}/>
          <Route path='/addplots'element={<Addplots/>}/>
          <Route path='/Getplots'element={<Getplots/>}/>
          <Route path='/Mpesapayment'element={<MpesaPayment/>}/> 
          <Route path='/Mycarousel'element={<Mycarousel/>}/> 
        </Routes>
      
     
    </div>
    </Router>
  );
}

export default App;

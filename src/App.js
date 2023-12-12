import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import MainContents from './pages/mainpage/MainContents'
import CompanyDetails from './pages/company/CompanyDetails';
import Recommendation from './pages/recommendation/Recommendation';
import CreateResume from './pages/createresume/CreateResume';

function App() { 



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* 메인 */}
          <Route index element={<MainContents/>}/>
          
          <Route path='/companyDetails' element={<CompanyDetails />} />
          <Route path='/recommendation' element={<Recommendation />} />
          <Route path='/createResume' element={<CreateResume />} />
          
        </Route>


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

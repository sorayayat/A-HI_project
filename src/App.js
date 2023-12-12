import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import MainContents from './pages/mainpage/MainContents'
import Interview from './pages/Interview/Interview';

function App() { 



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* 메인 */}
          <Route index element={<MainContents/>}/>

          <Route path='/interview' element={<Interview/>}/>

        </Route>
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;

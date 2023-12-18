import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import MainContents from './pages/mainpage/MainContents'
import CompanyDetails from './pages/company/CompanyDetails';
import Recommendation from './pages/recommendation/Recommendation';
import LoginForm from './pages/login/LoginForm';
import JoinForm from './pages/join/JoinForm';
import FindForm from './pages/find/FindForm';
import MemberUpdate from './pages/memberUpdate/MemberUpdate';
import Withdrawal from './pages/withdrawal/Withdrawal';
import Mypage from './pages/mypage/Mypage';
import Inspection from './pages/inspection/Inspection';
import CompanyList from './pages/company/CompanyList';
import Interview from './pages/Interview/Interview';
import CreateResume from './pages/createresume/CreateResume';
import ChatbotMain from './pages/chatbot/ChatbotMain';
import CompanyRegist from './pages/company/CompanyRegist';
import WriteInfo from './pages/company/WriteInfo';
import JoinFormCompany from './pages/join/JoinFormCompany';

function App() { 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* 메인 */}
          <Route index element={<MainContents/>}/>

          <Route path='/companyDetails' element={<CompanyDetails />} />
          <Route path='/recommendation' element={<Recommendation />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/joinForm" element={<JoinForm />} />
          <Route path="/findForm" element={<FindForm />} />
          <Route path="/member_update" element={<MemberUpdate />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/chatbot" element={<ChatbotMain/>} />
          <Route path="/joinFormCompany" element={<JoinFormCompany/>} />



          <Route path='/companyDetails' element={<CompanyDetails />} />
          <Route path='/recommendation' element={<Recommendation />} />
          <Route path='/inspection' element={<Inspection/>}/>
          <Route path='/companyList' element={<CompanyList />} />
          
          <Route path='/interview' element={<Interview/>}/>
          <Route path='/createResume' element={<CreateResume/>}/>
          <Route path='/companyList/companyRegist' element={<CompanyRegist/>}/>
          <Route path='/companyList/companyRegist/writeInfo' element={<WriteInfo/>}/>
          
          

        </Route>       
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;

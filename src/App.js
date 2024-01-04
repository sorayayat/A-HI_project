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
import CompanyUpdate from './pages/memberUpdate/CompanyUpdate';
import SearchPage from './pages/searchpage/SearchPage';
import InspectionDetail from './pages/inspection/InspectionDetail';
import InspectionMain from './pages/inspection/InspectionMain';
import InterviewSpring from './pages/InterviewSpring/InterviewSpring';
import { ProtectedRoute } from './pages/login/ProtectedRoute';
import ChangePwd from './pages/changePwd/ChangePwd';
import Verify from './pages/verify/Verify';
import RankModal from './pages/InterviewSpring/RankModal';
function App() { 



return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/* 메인 */}
        <Route index element={<MainContents/>}/>

        <Route path='/companyDetails/:postingCode' element={<CompanyDetails />} />
        <Route path='/recommendation' element={<Recommendation />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/joinForm" element={<JoinForm />} />
        <Route path="/findForm" element={<FindForm />} />
        
        <Route path="/chatbot" element={<ChatbotMain/>} />
        <Route path="/joinFormCompany" element={<JoinFormCompany/>} />


        <Route path='/companyDetails' element={<CompanyDetails />} />
        <Route path='/recommendation' element={<Recommendation />} />
        <Route path='/inspection' element={<InspectionMain/>}/>
        <Route path='/inspection/modify' element={<Inspection/>}/>
        <Route path='/inspection/detail/:resumeCode' element={<InspectionDetail/>}/>
        <Route path='/companyList' element={<CompanyList />} />
        
        <Route path='/interview' element={<Interview/>}/>
        <Route path='/createResume' element={<CreateResume/>}/>
        <Route path='/companyList/companyRegist' element={<CompanyRegist/>}/>
        <Route path='/companyList/companyRegist/writeInfo' element={<WriteInfo/>}/>
        <Route path='/SearchPage' element={<SearchPage/>}/>
        <Route path='/interviewSpring' element={<InterviewSpring/>}/>
        
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/rank' element={<RankModal/>}/>
        <Route path='/withdrawal' element={
        <ProtectedRoute>
        <Withdrawal />
        </ProtectedRoute>}/>
         
        <Route path='/changePwd' element={
        <ProtectedRoute>
          <ChangePwd/>
        </ProtectedRoute>}/>
        <Route path='/mypage' element={
        <ProtectedRoute>
        <Mypage />
        </ProtectedRoute>}/>
      <Route path='/member_update' element={
          <ProtectedRoute roles={['ROLE_MEMBER']}>
            <MemberUpdate />
          </ProtectedRoute>
        }/>
        <Route path='/companyUpdate' element={
          <ProtectedRoute roles={['ROLE_COMPANY']}>
            <CompanyUpdate />
          </ProtectedRoute>
        }/>
      </Route>       
    </Routes>
  </BrowserRouter>


);
}

export default App;

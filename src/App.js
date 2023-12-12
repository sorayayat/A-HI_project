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
        </Route>



      </Routes>
    </BrowserRouter>
  );
}

export default App;

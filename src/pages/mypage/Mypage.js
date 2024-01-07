import {  Route, Routes } from "react-router-dom";
import { ProtectedRoute } from '../login/ProtectedRoute';
import Withdrawal from '../withdrawal/Withdrawal';
import PostingLike from '../potingLike/PostinLike';
import ChangePwd from '../changePwd/ChangePwd';
import MemberUpdate from '../memberUpdate/MemberUpdate';
import CompanyUpdate from '../memberUpdate/CompanyUpdate';
import MyLink from './MyLink';


const Mypage = () => {
    return (
        <>
        <MyLink />
        <Routes>
  <Route index element={<ProtectedRoute><PostingLike/></ProtectedRoute>} />
  <Route path='withdrawal' element={<Withdrawal />} />
  <Route path='changePwd' element={<ChangePwd/>} />
  <Route path='member_update' element={<ProtectedRoute roles={['ROLE_MEMBER']}><MemberUpdate /></ProtectedRoute>} />
  <Route path='companyUpdate' element={<ProtectedRoute roles={['ROLE_COMPANY']}><CompanyUpdate /></ProtectedRoute>} />
  <Route path='postingLike' element={<ProtectedRoute><PostingLike/></ProtectedRoute>} />
</Routes>


    </>
    );
};

export default Mypage;
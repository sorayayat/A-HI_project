import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInspectionResumeAPI } from "../../apis/inspectionAPICalls";
import style from './static/css/InspectionResume.module.css';

function InspectionResume()
{
    const resume = useSelector(state => state.resume);
    const dispatch = useDispatch();
    
    useEffect(
        () =>
        {
            dispatch(callInspectionResumeAPI());
        },
        []
    )



    return(
        <div className={style.BackGround}>
            <h2 className={style.title}>회원의 이력서</h2>
            <div className={style.resume_back_griund}>
                <div className={style.resume}>
                    <h2>HI</h2>
                    <h2>이력서 제목제목제목</h2>
                </div>
            </div>
        </div>
    )
}

export default InspectionResume;
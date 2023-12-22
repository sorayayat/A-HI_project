import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInspectionResumeAPI } from "../../apis/inspectionAPICalls";


function InspectionResume()
{
    const resume = useSelector((state) => state.inspectionReducer.resume);
    const dispatch = useDispatch();

    console.log(resume ? resume: "none Date");
    useEffect(
        () =>
        {
            dispatch(callInspectionResumeAPI());
        },
        []
    )



    return(
        // <div className={style.BackGround}>
        //     <h2 className={style.title}>회원의 이력서</h2>
        //     <div className={style.resume_back_ground}>
        //         <table className={style.resume_list}>
        //             <thead>
        //                 <tr>
        //                     <th>자소서 번호</th>
        //                     <th>자소서 제목</th>
        //                     <th>자소서 생성일</th>
        //                     <th>자소서 수정일</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {resume?.data.map((res) => (
        //                     <tr key={res.resumeCode}>
        //                         <td>{res.resumeCode}</td>
        //                         <td>{res.resumePath}</td>
        //                         <td>{res.createDate}</td>
        //                         <td>{res.modifyDate}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
        <h2>he</h2>
    )
}

export default InspectionResume;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callInspectionResumeAPI, callResumeDetailAPI } from "../../apis/inspectionAPICalls";

function InspectionDetail()
{
    const navigate = useNavigate();
    const dispach = useDispatch();
    const params = useParams();


    // useEffect(() =>{
    //     dispach(callResumeDetailAPI(params.resumeCode));

    // },[])

    return(
        <div>
            <h1>Hellow fk World</h1>
        </div>
    )
}

export default InspectionDetail;
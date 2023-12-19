import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callInspectionResumeAPI } from "../../apis/inspectionAPICalls";

function InspectionResume()
{
    const resume = useSelector(state => state.resume);
    const dispatch = useDispatch();
    
    useEffect(
        () =>
        {
           // dispatch(callInspectionResumeAPI());
        },
        []
    )



    return(
        <div>
            <h2>hello world다 그지 꺵꺵이야</h2>
        </div>
    )
}

export default InspectionResume;
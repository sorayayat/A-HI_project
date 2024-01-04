import { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./static/css/inspectionDetail.module.css";

function InspectionChoice(){

    const modify = useSelector((state) => state.inspectionReducer.modify);
    const resume = useSelector((state) => state.inspectionReducer.resume);

    useEffect(() =>{
        console.log(modify);
    },[])

    return(
        <>
        {
            modify?.data &&
            <div>
                <div className={style.resumeBack}>
                <h1 className={style.resumeTitle}>수정 팁</h1>
                    <div className={style.personalInformation}>
                        <h4>{modify.data.gptAnswer}</h4>
                    </div>
                    <div className={style.selfTitleBoder}>
                    {
                        modify.data.index === 99 &&
                        <>
                        <h2 className={style.selfTitle}><span>NEW </span>자기소개서</h2>
                        <div className={style.selfIntroduction}>
                        {
                            modify.data.SelfIntroduction.map((self , index) =>(
                                <div key={index} className={style.selfInfo}>
                                    <h3>{self.title}</h3>
                                    <p>{self.content}</p>
                                    <p className={style.Line}></p>
                                </div>
                        ))}
                        </div>
                        </>
                    }
                    {
                        modify.data.index !== 99 &&
                        <>
                        <h2 className={style.selfTitle}>자기소개서</h2>
                        <div className={style.selfIntroduction}>
                        {
                            resume.data.SelfIntroduction.map((self , index) =>(
                            <div key={index} className={style.selfInfo}>
                                <h3>{self.title}</h3>
                                <p>{self.content}</p>
                                <p className={style.Line}></p>
                            </div>
                        ))}
                        </div>
                        </>
                    }  
                    </div>
                    <button>저장</button>
                    <button>돌아가기</button>
                </div>
            </div>
        }
        </>
    )
}

export default InspectionChoice;
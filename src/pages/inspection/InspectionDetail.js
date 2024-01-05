import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callInspectionResumeAPI, callResumeDetailAPI } from "../../apis/inspectionAPICalls";
import style from "./static/css/inspectionDetail.module.css";
import ModifyModal from "./modal/ResumeModifyModal";

function InspectionDetail()
{
    const resume = useSelector((state) => state.inspectionReducer.resume);
    const [modifySelf , setModifySelf] = useState([{}]);
    const [number , setNumber] = useState({});
    const [isModalOpen , setIsModalOpen] = useState(false);


    const onClickHandler = (SelfIntroduction , index) =>{
        if( !isModalOpen )
            setIsModalOpen(true);
        setModifySelf([{
            SelfIntroduction : SelfIntroduction
        }]);
        setNumber({
            "index" : index
        });
    }

    console.log(number);
    useEffect(() =>{
        if(!isModalOpen)
            setModifySelf(undefined);
    },[isModalOpen])

    return(
        <>
        {
            resume?.data &&
            <div>
                {
                    isModalOpen && 
                    <div>
                        <ModifyModal setModifyIsModalOpen={setIsModalOpen}
                                     modifyIsModalOpen={isModalOpen} 
                                     modifyInfo={modifySelf[0]}
                                     modifyIndex={number.index} />
                    </div>
                }
                <div className={style.resumeBack}>
                <h1 className={style.resumeTitle}>{resume.data.PersonalInformation.name}님의 이력서</h1>
                    <div className={style.personalInformation}>
                        <p className={style.personalText}>이름 : {resume.data.PersonalInformation.name}</p>
                        <p className={style.personalText}>생년 월일 : {resume.data.PersonalInformation.dateOfBirth}</p>
                        <p className={style.personalText}>성별 : {resume.data.PersonalInformation.gender}</p>
                        <p className={style.personalText}>응시 분야 : {resume.data.PersonalInformation.department}</p>
                        <p className={style.personalText}>응시 직급 : {resume.data.PersonalInformation.position}</p>
                    </div>
                    <div className={style.selfTitleBoder}>
                        <h2 className={style.selfTitle}>자기소개서</h2>
                        <button className={style.modiftBtn1}
                                onClick={() => onClickHandler(resume?.data.SelfIntroduction , 99) }>전체 수정</button>
                    </div>
                    <div className={style.selfIntroduction}>
                        {resume.data.SelfIntroduction.map((self , index) =>(
                            <div key={index} className={style.selfInfo}>
                                <h3>{self.title}</h3>
                                <button className={style.modiftBtn2}
                                    onClick={ () => onClickHandler(self , index)}>수정</button>
                                <p>{self.content}</p>
                                <p className={style.Line}></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default InspectionDetail;
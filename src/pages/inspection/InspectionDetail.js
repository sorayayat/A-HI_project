import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callInspectionResumeAPI, callResumeDetailAPI } from "../../apis/inspectionAPICalls";
import style from "./static/css/inspectionDetail.module.css";
import styles from "./Card.module.css";
import ModifyModal from "./modal/ResumeModifyModal";
import Swal from "sweetalert2";

function InspectionDetail()
{
    const resume = useSelector((state) => state.inspectionReducer.resume);
    const [modifySelf , setModifySelf] = useState([{}]);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const navgaite = useNavigate();
    const Toast = Swal.mixin({
        toast: true,
        position: 'ri',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
    });

    console.log(resume?.data)
    const onClickHandler = (SelfIntroduction , index) =>{
        if( !isModalOpen )
            setIsModalOpen(true);
        setModifySelf({
            "SelfIntroduction" : SelfIntroduction, 
            "Skills" : resume?.data.Skills,
            "index" : index
        });
        
    }

    useEffect(() =>{
        if(!resume?.data){
            Toast.fire({
                icon: 'error',
                title: "이력서 가 존재하지않습니다.\n 메인페이지로 이동합니다. "
            }).then(() =>{
                navgaite("/")
            })
        }
    },[resume])

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
                                     selfIntroduction={modifySelf} />
                    </div>
                }
            <h1 className={styles.title}>제목 : {resume.data.title}</h1>
            <div className={[styles.container]} >
                    <div className={styles.contentArea}>
                        <div className={styles.Contect}>
                            <h5 className={styles.text}>CONTECT</h5>
                            <p className={styles.text}>{resume.data.PersonalInformation.email}</p>
                            <p className={styles.text}>{resume.data.PersonalInformation.phone}</p>
                            <p className={styles.text}>{resume.data.PersonalInformation.github}</p>
                        </div>
                        <p className={styles.Line}></p>
                        <div className={styles.Education}>
                            <h5 className={styles.text}>EDUCATION</h5>
                            <p className={styles.text}>{resume.data.PersonalInformation.education}</p>
                        </div>
                        <p className={styles.Line}></p>
                        <div className={styles.Awards}>
                            <h5 className={styles.text}>AWARDS & CERTIFICATIONS</h5>
                            {

                            resume.data?.AwardsCertifications.map((awa) => (
                                <p className={styles.text}>{awa}</p>
                            ))
                            }
                        </div>
                        <p className={styles.Line}></p>
                    </div>
                    <div className={styles.content}>
                        {/* 카드 내 흰색 부분 영역 */}
                        <h3 className={styles.text}>이름 : {resume.data.PersonalInformation.name}</h3>
                        <h3 className={styles.text}>{resume.data.PersonalInformation.position}</h3>
                        <p className={styles.Line}></p>
                        <h3 className={styles.text}>SKILLS</h3>
                        <div className={styles.skillDev}>
                        {resume.data.Skills.map((skille) =>(
                            <p className={styles.text}>{skille}</p>
                        ))}
                        </div>
                        <p className={styles.Line}></p>
                        <div className={styles.ExperienceDev}>
                        <h3 className={styles.text}>EXPERIENCE</h3>
                            {
                            resume.data.Experience.map((exp) =>(
                            <>
                                <h5 className={styles.text}>{exp.company}</h5>
                                <h6 className={styles.text}>{exp.duration}</h6>
                            </>
                            ))
                            }
                        </div>
                        <p className={styles.Line}></p>
                        <div className={styles.ProjectsDev}>
                        <h3 className={styles.text}>Projects</h3>
                            {
                            resume.data.Projects.map((project) =>(
                                <>
                                <h5 className={styles.text}>{project.ProjectsTitle}</h5>
                                <h6 className={styles.text}>{project.ProjectsContent}</h6>
                                </>
                            ))
                            }
                        </div>
                        <>
                        <p className={styles.Line}></p>
                        </>
                    </div>
                    <div className={styles.selfContent}>
                        <p className={styles.Line}></p>
                        <h3>자기소개서</h3>
                        <button className={styles.modiftBtn1}
                                onClick={() => onClickHandler(resume?.data.SelfIntroduction , 99) }>전체 수정</button>
                        <p className={styles.Line}></p>
                        <dev className={styles.selfDev}>
                        {
                            resume.data.SelfIntroduction.map((self , index) =>(
                                <div key={index} className={styles.self}>
                                    <button className={styles.modiftBtn2}
                                        onClick={ () => onClickHandler(self , index)}>수정</button>
                                    <h4 className={styles.selfTitle}>{self.title}</h4>
                                    <p className={styles.selfText}>{self.content}</p>
                                </div>
                            ))
                        }
                    </dev>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default InspectionDetail;
import React, { useEffect, useState } from "react";
import styles from "./Card.module.css";
import { useSelector } from "react-redux";

const Card = () => {

  const resume = useSelector((state) => state.inspectionReducer.resume);
  const [modifySelf , setModifySelf] = useState([{}]);
  const [number , setNumber] = useState({});
  const [isModalOpen , setIsModalOpen] = useState(false);


  const onClickHandler = (SelfIntroduction , index) =>{
      if( !isModalOpen )
          setIsModalOpen(true);
      setModifySelf(SelfIntroduction);

      setNumber({
          "index" : index
      });
  }
  console.log(resume)
  useEffect(() =>{
      console.log("modifySelf : " ,modifySelf)
  },[modifySelf])

  useEffect(() =>{
      if(!isModalOpen)
          setModifySelf(undefined);
  },[isModalOpen])

  return (
    <>
      {/* 카드 위에 제목을 추가 */}
      <h1 className={styles.title}>자기소개서 냥냥냥냥</h1>
      <div className={[styles.container]} >
        <div className={styles.contentArea}>
          <div className={styles.Contect}>
            <h5 className={styles.text}>CONTECT</h5>
            <p className={styles.text}>{resume.data.PersonalInformation.email}</p>
            <p className={styles.text}>{resume.data.PersonalInformation.phone}</p>
            <p className={styles.text}>{resume.data.PersonalInformation.github}</p>
          </div>
          <div className={styles.Education}>
            <h5 className={styles.text}>EDUCATION</h5>
            <p className={styles.text}>{resume.data.PersonalInformation.education}</p>
          </div>
          <div className={styles.Awards}>
            <h5 className={styles.text}>AWARDS & CERTIFICATIONS</h5>
            {
              resume.data.awardsCertifications.map((awa) => (
                <p className={styles.text}>{awa}</p>
              ))
            }
          </div>
        </div>
        <div className={styles.content}>
          {/* 카드 내 흰색 부분 영역 */}
          <h3 className={styles.text}>{resume.data.PersonalInformation.name}</h3>
          <h3 className={styles.text}>{resume.data.PersonalInformation.position}</h3>
          <h3 className={styles.text}>SKILLS</h3>
            <div className={styles.skillDev}>
              {resume.data.Skills.map((skille) =>(
                <p className={styles.text}>{skille}</p>
              ))}
            </div>
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
        </div>
        <div>
          <h3>자기소개서</h3>
          {
            resume.data.SelfIntroduction.map((self , index) =>(
              <div key={index}>
               <h3 className={styles.text}>{self.title}</h3>
                <p className={styles.text}>{self.content}</p>
              </div>
            ))
          }
        </div>
      </div>

    </>
  );
};

export default Card;

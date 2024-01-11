import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./static/css/inspectionDetail.module.css";
import btnStyle from "./static/css/ResumeModifyModal.module.css";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { callImageToPdfAPI } from "../../apis/inspectionAPICalls";



function InspectionChoice(){

    const modify = useSelector((state) => state.inspectionReducer.modify);
    const resume = useSelector((state) => state.inspectionReducer.resume);
    const newResume = useSelector((state) => state.inspectionReducer.newResume); 
    const [modifySelf , setModifySelf] = useState({});
    const [btn , setBtn] = useState(false); 
    const divRef = useRef();
    const dispatch = useDispatch();

    console.log(modify?.data)
    useEffect(() =>{    
        if(modify.data?.index !== 99){
            console.log(modify.data.SelfIntroduction);
            const upData = resume.data.SelfIntroduction.map((state , index) =>{
                if(index === modify.data.index){
                    return{
                        ...state,
                        content : modify?.data?.SelfIntroduction.content,
                        title : modify?.data?.SelfIntroduction.title
                    };
                }
            });
            setModifySelf(upData);
        }
        setModifySelf(resume?.data?.SelfIntroduction);
        console.log(modifySelf)

    },[modify])


    useEffect(() =>{
        if(newResume?.data && newResume?.status === 200 && btn == true){
            const byteCharacters = atob(newResume.data.pdf);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length;i++){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray],{ type: "application/pdf" });
            saveAs(blob,newResume.data.title + ".pdf");
            setBtn(false);
        }
    },[newResume])

    const saveBtnHandler = async () =>{
        if(!divRef.current) return;
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        try{
            const div = divRef.current;
            const canvas = await html2canvas(div, { scale : 1});
            const formData = new FormData();
            canvas.toBlob((blob) =>{
                if(blob !== null){
                    formData.append("resumeCode" , resume.data.resumeCode);
                    formData.append("memberId", userInfo.id);
                    formData.append("image", blob , "test.png");
                    dispatch(callImageToPdfAPI(formData));
                }     
            })
            setBtn(true);
        }
        catch(error){
            console.error("Error converting div to image:", error);
        }
    }

    return(
        <>
        {
            modify?.data &&
            <div>
                <div className={style.resumeBack} ref={divRef}>
                    <h1 className={style.resumeTitle}>수정 팁</h1>
                    <div className={style.personalInformation}>
                        <h4>{modify.data.gptAnswer}</h4>
                    </div>
                    <div className={style.selfTitleBoder}>
                    {
                        modify.data.index === 99 &&
                        <>
                        <h2 className={style.selfTitle}>자기소개서</h2>
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
                </div>
                <div className={btnStyle.btnBox}>
                    <button className={btnStyle.saveBtn} onClick={saveBtnHandler}>저장</button>
                    <button className={btnStyle.cencelBtn} onClick={null}>취소</button>
                </div>
            </div>
        }
        </>
    )
}

export default InspectionChoice;
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./static/css/inspectionDetail.module.css";
import btnStyle from "./static/css/ResumeModifyModal.module.css";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { callImageToPdfAPI } from "../../apis/inspectionAPICalls";



function InspectionChoice(){

    const modify = useSelector((state) => state.inspectionReducer.modify);
    const resume = useSelector((state) => state.inspectionReducer.resume);
    const divRef = useRef();
    const dispatch = useDispatch();


    useEffect(() =>{
        console.log(modify);
    },[])

    const saveBtnHandler = async () =>{
        if(!divRef.current) return;

        try{
            const div = divRef.current;
            const canvas = await html2canvas(div, { scale : 1});
            const formData = new FormData();
            canvas.toBlob((blob) =>{
                if(blob !== null){
                    formData.append("resumeCode" , resume.data.resumeCode);
                    formData.append("image", blob , "test.png");

                    dispatch(callImageToPdfAPI(formData));
                }     
            })


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
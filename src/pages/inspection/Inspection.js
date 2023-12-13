import { useState , useEffect } from "react";
import { useDispatch } from "react-redux";
import { callInspectionAskAPI } from "../../apis/inspectionAPICalls";
import { postAsk } from "../../modules/inspectionModule";
import Swal from "sweetalert2";
import style from "./static/css/inspection.module.css"

function Inspection()
{
    const [isInspection, setIsInspection] = useState(false); // 수정 | 검수 전환 버튼
    const [title,setTitle] = useState("검수"); // 제목
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }});
    

    const onClickModifyBtnHandler = () =>
    {
        if(!isInspection){
            setIsInspection(!isInspection)
            setTitle("수정")
        }
        else{
            setIsInspection(!isInspection)
            setTitle("검수")
        }
    }

    const onChangeHandler = (e) =>
    {
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }

    const onResultClickHandler = () =>
    {
        if(form?.introductionTitle && form?.keyword && form?.content){
            dispatch(callInspectionAskAPI(form));
        }
        else{
            Toast.fire({
                icon : 'error',
                title : "정보 미입력"
            });
        }
    }


    return(
        <div className={style.background}>
            <h1>{title}</h1>
            <div className="btn">
                {!isInspection && <button onClick={ onClickModifyBtnHandler}>수정하기</button>}
                {isInspection && <button onClick={ onClickModifyBtnHandler}>검수하기</button>}
            </div>
            <div className={style.inspectionBackGround1}>   
                <div className={style.textArae}>
                    <h2 className={style.mainGuide}>{title} 받을 자소서 제목</h2>
                    <p className={style.subGuide}>자소서 전체를 {title} 받을 시 자기소개서이라고 작성해주시면 됍니다.</p>         
                    <input
                        name="introductionTitle"
                        className={style.introductionTitle}
                        placeholder="자기소개서 제목"
                        value={form ? form.introductionTitle : "" }
                        onChange={ onChangeHandler }
                    />
                </div>   
                <div className={style.textArae}>
                    <h2 className={style.mainGuide}>{title} 받을 기준의 키워드 입력</h2>
                    <p className={style.subGuide}>지원할 회사의 기술 스택 혹은 성실,열정</p>    
                    <input
                        name="keyword"
                        className={style.keyWord}
                        placeholder="키워드 입력"
                        value={form ? form.keyword : ""}
                        onChange={ onChangeHandler }
                    />
                </div> 
                <div className={style.textArae}>
                    <h2 className={style.mainGuide}>{title}받을 자소서 내용</h2>
                    <p className={style.subGuide}>자소서 전체를 검수 받을 시 자기소개서 전부를 작성해주시면 됍니다.</p>  
                    <textarea
                        name="content"
                        className={style.content}
                        placeholder="내용을 입력해주세요"
                        value={form ? form.content : ""}
                        onChange={ onChangeHandler }
                    />
                </div>
                <button className={style.checkBtn} onClick={ onResultClickHandler}>확인하기</button>                 
            </div>
            <div className={style.line}></div>
            <div className={style.inspectionBackGround2}>
                <h1>결과</h1>
                <textarea
                    name="result" 
                    className={style.resultTextArea}
                    placeholder="결과없음"
                    readOnly
                    value={form?.result}
                    onChange={ onChangeHandler }
                />
                <div className={style.resultBtn}>
                    <button 
                        className={style.saveBtn}
                    >저장</button>
                    <button
                        className={style.cancellBtn}
                    >취소</button>
                </div>

            </div>
        </div>
    )
}

export default Inspection;
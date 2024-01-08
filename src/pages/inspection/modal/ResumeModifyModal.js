import { useEffect, useRef, useState } from "react";
import style from "../static/css/ResumeModifyModal.module.css";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { callModifyResumeAPI } from "../../../apis/inspectionAPICalls";
import { useNavigate } from "react-router";


function ResumeModifyModal({ setModifyIsModalOpen , modifyIsModalOpen , selfIntroduction  , modifyIndex}){

    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type , setType] = useState("");
    const [form , setForm ] = useState({});
    const [updateForm , setUpdateForm] = useState({});
    const Toast = Swal.mixin({
        toast: true,
        position: 'ri',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }});

    useEffect(() =>{
        setType("modify");  
    },[]);

    useEffect(() => {
        const clickOutside = (e) => {
          if (modifyIsModalOpen && ref.current && !ref.current.contains(e.target)) {
            setModifyIsModalOpen(false);
            setForm(undefined);
          }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
          document.removeEventListener("mousedown", clickOutside);
        };
      }, [modifyIsModalOpen]);

    const onChangeSelectHandler = (e) =>{
        setType([e.target.value])
    }

    const onChangeHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onCallAPIBtn = () =>{
            if(!form.direction){
                Toast.fire({
                    icon : 'error',
                    title : "수정내역 미입력"
                });
            }
            else if(!form.eligibility){
                Toast.fire({
                    icon : 'error',
                    title : "지원자격 미입력"
                });
            }
            else if(!form.skill){
                Toast.fire({
                    icon : 'error',
                    title : "기술스택 미입력"
                });
            }
            else{
                if(modifyIndex !== 99){
                    setUpdateForm({
                        ...form,
                        "type" : type,
                        selfIntroduction : [selfIntroduction]
                    });
                }
                else{
                    setUpdateForm({
                        ...form,
                        "type" : type,
                        selfIntroduction : selfIntroduction
                    });
                }
            }
        }
    
    useEffect(() =>{
        if(updateForm?.direction){
            console.log("updateForm : " , updateForm)
            dispatch(callModifyResumeAPI(updateForm , modifyIndex)).then((result) => {
                console.log(result)
                if(result.status === 200){
                    navigate("/inspection/choice")
                }});
        }

    },[updateForm])


    const onCancellBtn = () =>{
        setForm(undefined);
        setModifyIsModalOpen(false);
    }
    
    console.log(form);
    return(
        <div className={style.backGround}>
            <div className={style.contentBack} ref={ref}>
                <div className={style.contentIn}>
                <h1 className={style.title}>요구 사항</h1>
                <h2 className={style.way}>Option</h2>
                    <div className={style.selectDev}>
                        <select className={style.select} name="way" onChange={ onChangeSelectHandler }>
                            <option className={style.option} value="modify">첨삭</option>
                            <option className={style.option} value="inspection">검수</option>
                        </select>
                    </div>
                    <div className={style.inputText}>
                        <h3>보유한 기술 스택</h3>
                        <textarea
                            name="skill"
                            placeholder="보유한 기술 스택 입력"
                            value={form ? form.skill : "" }
                            onChange={ onChangeHandler }
                            className={style.input}
                        />
                        <h3>지원할 기업의 지원 자격</h3>
                        <textarea
                            name="eligibility"
                            placeholder="지원 자격 입력"
                            value={form ? form.eligibility : "" }
                            onChange={ onChangeHandler }
                            className={style.input}
                        />
                        <h3>수정 방향</h3>
                        <textarea
                            name="direction"
                            placeholder="어떤식으로 수정하고 싶은지 입력 "
                            value={form ? form.direction : "" }
                            onChange={ onChangeHandler }
                            className={style.input}
                        />
                    </div>
                    <div className={style.btnBox}>
                        <button className={style.saveBtn} onClick={onCallAPIBtn}>저장</button>
                        <button className={style.cencelBtn} onClick={onCancellBtn}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeModifyModal;
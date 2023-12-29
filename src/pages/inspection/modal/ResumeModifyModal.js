import { useEffect, useRef, useState } from "react";
import style from "../static/css/ResumeModifyModal.module.css";


function ResumeModifyModal({ setModifyIsModalOpen , modifyIsModalOpen , setModifyInfo }){

    const ref = useRef();
    const [way , SetWay] = useState("첨삭");
    const [form , setForm ] = useState({});

    useEffect(() => {
        const clickOutside = (e) => {
          if (modifyIsModalOpen && ref.current && !ref.current.contains(e.target)) {
            setModifyIsModalOpen(false);
          }
        };
        document.addEventListener("mousedown", clickOutside);
        return () => {
          document.removeEventListener("mousedown", clickOutside);
        };
      }, [modifyIsModalOpen]);

    const onChangeSelectHandler = (e) =>{
        SetWay({
            [e.target.name] : [e.target.value]
        })
    }

    const onChangeHandler = (e) =>{
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }

    console.log(form ? form : "null");
    
    
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
                        <button className={style.saveBtn}>저장</button>
                        <button className={style.cencelBtn}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeModifyModal;
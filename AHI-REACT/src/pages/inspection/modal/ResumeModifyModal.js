import { useEffect, useRef, useState } from "react";
import style from "../static/css/ResumeModifyModal.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { callGetEligibility, callModifyResumeAPI, callPostingSearch } from "../../../apis/inspectionAPICalls";
import { useNavigate } from "react-router";
import LoadingScreen from "../../Interview/LoadingScreen";

const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} style={{ color: '#3674EA' }}>{part}</span>
                ) : (
                    part // 일치하지 않는 텍스트는 기본 스타일로 렌더링
                )
            )}
        </span>
    );
};

function ResumeModifyModal({ setModifyIsModalOpen, modifyIsModalOpen, selfIntroduction }) {

    const ref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postings = useSelector(state => state.inspectionReducer.postings);
    const Rcontent = useSelector(state => state.inspectionReducer.content);
    const [form, setForm] = useState({});
    const [updateForm, setUpdateForm] = useState({});
    const [search, setSearch] = useState("");
    const [eligibility, setEligibility] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState([])
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [content, setContent] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [isEligibility , setIsEligibility] = useState(false)

    const regex = /[가-힣]|[a-zA-Z]{4,}/;
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

    useEffect(() =>{
        setIsPosting(false);
    },[])


    useEffect(() => {
        if (selfIntroduction?.Skills){
            setForm({
                skill : selfIntroduction.Skills 
            });
        }
    },[selfIntroduction])

    useEffect(() => {
        if(Rcontent?.job){
            setIsPosting(true);
            setIsEligibility(false)
            setEligibility(Rcontent);
            setForm({
                eligibility : Rcontent,
                skill: selfIntroduction.Skills
            });
        }
    },[Rcontent]);

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


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    console.log(updateForm);
    const onCallAPIBtn = () => {
        if (!form.direction) {
            Toast.fire({
                icon: 'error',
                title: "수정내역 미입력"
            });
        }
        else if (!form.eligibility) {
            Toast.fire({
                icon: 'error',
                title: "지원자격 미입력"
            });
        }
        else if (!form.skill) {
            Toast.fire({
                icon: 'error',
                title: "기술스택 미입력"
            });
        }
        else {
            if (selfIntroduction.index !== 99) {
                setUpdateForm({
                    ...form,
                    selfIntroduction: [selfIntroduction.SelfIntroduction]
                });
            }
            else {
                setUpdateForm({
                    ...form,
                    selfIntroduction: selfIntroduction.SelfIntroduction
                });
            }
        }
    }

    useEffect(() => {
        if (updateForm?.direction) {
            setIsLoading(true);
            dispatch(callModifyResumeAPI(updateForm, selfIntroduction.index)).then((result) => {
                if (result.status === 200) {
                    setIsLoading(false);
                    navigate("/inspection/choice")
                }
            });
        }

    }, [updateForm])


    const onCancellBtn = () => {
        setForm(undefined);
        setModifyIsModalOpen(false);
    }

    const searchPosting = (event) => {
        const value = event.target.value;
        setSearch(value);

        if (value && regex.test(value)) {
            const filteredResults = title.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults);
            setShowDropDown(true);
        } else {
            setSearchResults([]);
            setShowDropDown(false);
        }

    };

    const handleResultClick = (result) => {
        if(result !== undefined){
            setContent(result?.content);
            setShowDropDown(false);
        }
    }

    useEffect(() => {
        if(content !== ''){
            setIsEligibility(true);
            dispatch(callGetEligibility(content));
        }

    }, [content])


    useEffect(() => {
        if (regex.test(search)) {
            dispatch(callPostingSearch(search))
        }
    }, [search])

    return (
        <>
            {
                isLoading && (
                    <div className={style.loadingIndicator}>
                        <div className={style.spinner}></div>
                    </div>
                )
            }
            {
                !isLoading &&
                <div className={style.backGround}>
                    <div className={style.contentBack} ref={ref}>
                        <div className={style.contentIn}>
                            <h1 className={style.title}>요구 사항</h1>
                            {/* <h2 className={style.way}>Option</h2>
                    <div className={style.selectDev}>
                        <select className={style.select} name="way" onChange={ onChangeSelectHandler }>
                            <option className={style.option} value="modify">첨삭</option>
                            <option className={style.option} value="inspection">검수</option>
                        </select>
                    </div> */}
                            <div className={style.inputText}>
                                <h3>보유한 기술 스택</h3>
                                <textarea
                                    name="skill"
                                    placeholder={selfIntroduction.Skills}
                                    value={form ? form.skill : selfIntroduction.Skills}
                                    onChange={onChangeHandler}
                                    className={style.input}
                                />
                                <h3>지원할 기업의 지원 자격</h3>
                                {
                                    !isPosting &&
                                    <input
                                        name="eligibility"
                                        placeholder="지원할 공고 입력"
                                        value={search}
                                        onChange={searchPosting}
                                        className={style.searchBox}
                                    />
                                }
                                {
                                    isEligibility &&          
                                    <div className={style.loadingModal}>
                                        <div className={style.spinner}></div>
                                    </div>
                                }
                                {showDropDown &&
                                    <div className={style.searchResults}>
                                        {postings?.data.map((posting, index) => (
                                            <div key={index} className={style.searchResultItem} onClick={() => handleResultClick(posting)}>
                                                {highlightText(posting.postingTitle, search)}
                                            </div>
                                        ))}
                                    </div>
                                }
                                {
                                    isPosting &&
                                    <dev className={style.skilles}>
                                        <p className={style.skill}>{eligibility.job}</p>
                                        <p className={style.skill}>{eligibility.eligibility}</p>
                                        <p className={style.skill}>{eligibility.knowledge}</p>
                                        <p className={style.skill}>{eligibility.skills}</p>
                                    </dev>

                                }
                                <h3>수정 방향</h3>
                                <textarea
                                    name="direction"
                                    placeholder="어떤식으로 수정하고 싶은지 입력 "
                                    value={form ? form.direction : ""}
                                    onChange={onChangeHandler}
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
            }
        </>

    )
}

export default ResumeModifyModal;
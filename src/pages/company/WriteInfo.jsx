import style from './WriteInfo.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { useLocation, useNavigate  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callPostingAPI, calltestAPI } from '../../apis/postingAPICalls';

function WriteInfo() {

    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const location = useLocation();
    const navigate = useNavigate ();
    const dataObject = location.state ? location.state.dataObject : null;

    const companyCodeJSON  = sessionStorage?.getItem("userInfo")

    const parsedData = JSON.parse(companyCodeJSON);

    const companyCode = parsedData?.companyEntity?.companyId;

    const memberCode = parsedData?.id;

    useEffect(() => {
        document.body.classList.add(style.companyRegistBody);
        window.scrollTo(0, 0)
        return () => {
            document.body.classList.remove(style.companyRegistBody);
        };
    }, []);

    const handleChange = (value) => {
        setContent(value);
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 서식 버튼들
            ['link', 'image'], // 링크, 이미지, 비디오 삽입 버튼들
            [{ list: 'ordered' }, { list: 'bullet' }], // 순서 있는 리스트, 순서 없는 리스트 버튼
            ['clean'], // 모든 서식 제거 버튼
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image', 'video',
    ];

    const editorStyle = {
        height: '500px', // 높이 조정
        width: '1000px',   // 너비 조정

        borderRadius: '4px', // 테두리 모서리를 둥글게
        background: 'white',


    };

    const onClickHandler = () => {
        const formData = new FormData();
    
        const fullAddress = dataObject.q1 + " " + dataObject.q3 + " " + dataObject.detailAddress;
    
        formData.append("postingTitle" , dataObject.postingTitle)
        formData.append("location", fullAddress);
        formData.append("education", dataObject.education);
        formData.append("selectedCareer", JSON.stringify(dataObject.selectedCareer));
        formData.append("selectedConditions", JSON.stringify(dataObject.selectedConditions));
        formData.append("position", dataObject.selectedJob);
        formData.append("selectedSkills", JSON.stringify(dataObject.selectedSkills));
        formData.append("content", content);
        formData.append("endDate" , dataObject.date)
        formData.append("closingForm", dataObject.deadLine)
    
        console.log("content:", formData.get("content"));
    
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    
        dispatch(callPostingAPI({
            form: formData,
            companyCode : companyCode,
            navigate :navigate
        }));
        
    }
    

    return (
        <>
            <div className={style.mainContainer}>
                
                <div className={style.quillContainer}>
                    <div className={style.title}>상세 정보</div>
                    <ReactQuill
                        value={content}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        style={editorStyle}
                    />
                    
                </div>

                <button className={style.registButton} onClick={ onClickHandler }>등록</button>
            </div>
        </>
    )
}

export default WriteInfo
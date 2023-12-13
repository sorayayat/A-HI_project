import style from './WriteInfo.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react"
function WriteInfo() {

    const [content, setContent] = useState('');

    useEffect(() => {
        document.body.classList.add(style.companyRegistBody);

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

                <button className={style.registButton}>등록</button>
            </div>
        </>
    )
}

export default WriteInfo
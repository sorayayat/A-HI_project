import {useState } from 'react';
import { useNavigate } from 'react-router';
import style from './static/css/inspectionMain.module.css'
import logo from './static/image/logo.png'


function InspectionMain()
{
    const navigate = useNavigate();
    const [dragging, setDragging] = useState(false);
    const [file,setFile] = useState([]);
    const [droppedFiles, setDroppedFiles] = useState([]);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(true);
        const files = Array.from(e.dataTransfer.files)
        setFile(prevFile => ([...prevFile, ...files]));
        console.log('asd',e.dataTransfer.files);
        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);
        setDroppedFiles(prevFiles => [...prevFiles, ...fileNames]); // 이전 파일 목록에 새 파일 추가

    };

    const databaseSelectBtnHandler = () =>
    {
        navigate('/inspection/myResume');
    }

    return(
    <>
     <div className={style.container}>
                
        <img className={style.logo} src={logo} alt="로고" />
        
        <div className={style.attachedFile}>
            <div className={ style.uploadBox}  onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
             style={{
                border: '2px dashed #ccc',
                textAlign: 'center',
                backgroundColor: dragging ? 'gray' : 'white',
                    }}>
            <p>{dragging ? '' : '여기로 파일을 드래그하세요'}</p>
            {droppedFiles && (
                <div >
                    {droppedFiles.map((fileName, index) => (
                    <p key={index}>{fileName}</p>
                    ))}   
                </div>
                    )}
            </div>
        </div>

            <button className={style.recommendationButton}>PDF 파일로 자소서 평가 받기</button>
            <h1 className={style.noResume}>등록된 이력서가 있다면?</h1>
            <button className={style.resumeButton}
                onClick={ () => databaseSelectBtnHandler()}
                >
                    내 이력서 확인
            </button>
            <h2 className={style.noResume}>이력서 확인!</h2>
     </div>
    </>
    )

}

export default InspectionMain;
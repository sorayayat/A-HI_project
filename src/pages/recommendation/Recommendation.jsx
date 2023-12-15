import style from './Recommendation.module.css'
import { useState } from 'react'
import logo from './images/다운로드.png'
import {Link} from "react-router-dom"



function Recommendation() {


    const [dragging, setDragging] = useState(false);
    const [file, setfile] = useState([]);
    const [droppedFiles, setDroppedFiles] = useState([]);


    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(true);

        const files = Array.from(e.dataTransfer.files)

        setfile(prevFile => ([...prevFile, ...files]));


        console.log('asd',e.dataTransfer.files);

        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);

        setDroppedFiles(prevFiles => [...prevFiles, ...fileNames]); // 이전 파일 목록에 새 파일 추가

    };

    return (
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

                <button className={style.recommendationButton}>공고 추천하기</button>

                <h1 className={style.noResume}>이력서가 없으시다면?</h1>

                <button className={style.resumeButton}>이력서 작성 바로가기</button>

                <h2 className={style.noResume}>AI로 이력서를 작성 해보세요!</h2>
            </div>

            

        </>    
    )
}


export default Recommendation;
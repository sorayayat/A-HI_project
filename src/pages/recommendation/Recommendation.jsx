import style from './Recommendation.module.css'
import { useState, useEffect } from 'react'
import logo from './images/KakaoTalk_20231218_121636945 (2).jpg'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { callRecommendationResume } from '../../apis/recommendationAPICalls';
import RecommendationModal from './RecommendationModal';
import { postRecommendation } from '../../modules/recommendationModules';






function Recommendation() {


    const [dragging, setDragging] = useState(false);
    const [file, setfile] = useState();
    const [droppedFiles, setDroppedFiles] = useState();
    const dispatch = useDispatch();
    const selectPosting = useSelector(state => state.recommendationReducer);
    useEffect(() => {
        dispatch(postRecommendation({}))
    }, [])


    const selectPostingData = selectPosting?.response?.data

    console.log(selectPostingData, "sadasd");


    const [isModalOpen, setIsModalOpen] = useState(false);



    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(true);

        const files = Array.from(e.dataTransfer.files)

        setfile(files);


        console.log('asd', e.dataTransfer.files);

        const fileNames = files.map(file => file.name);
        console.log('드롭한 파일:', fileNames);

        setDroppedFiles(fileNames); // 이전 파일 목록에 새 파일 추가

    };

    const onClickRecommendationHandler = () => {

        const formData = new FormData();

        console.log("gd", file[0]);

        formData.append("file", file[0])



        dispatch(callRecommendationResume({

            file: formData

        }))


        setIsModalOpen(true)


    }



    return (
        <>


            <div className={style.container}>

                <img className={style.logo} src={logo} alt="로고" />

                <div className={style.attachedFile}>
                    <div className={style.uploadBox} onDragOver={(e) => e.preventDefault()}
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

                <button className={style.recommendationButton} onClick={onClickRecommendationHandler}>공고 추천하기</button>

                <h1 className={style.noResume}>이력서가 없으시다면?</h1>

                <Link to="/createResume" className={style.resumeButton}>이력서 작성 바로가기</Link>

                <h2 className={style.noResume}>AI로 이력서를 작성 해보세요!</h2>

                {
                    isModalOpen && <RecommendationModal selectPostingData={selectPostingData} />
                }
            </div>



        </>
    )
}


export default Recommendation;
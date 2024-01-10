import style from "./RecommendationModal.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRecommendationResume } from "../../apis/recommendationAPICalls";
import { LoadingSpiner } from '../../other/LoadingSpiner';
import { useNavigate } from "react-router";

function RecommendationModal({ selectPostingData, closeModal }) {

    const navigate = useNavigate();




    const handleOverlayClick = (event) => {
        // Check if the click is outside the modal content
        if (event.target.classList.contains(style.modalOverlay)) {
            closeModal();
        }
    };

    console.log(selectPostingData, "모달까지 도착완료");

    const onClickPostingHandler = (posting) => {

        const url = `/companyDetails/${posting.postingCode}`
        console.log(posting, "posting");

        navigate(url, { state: { posting } });

    }

    if (selectPostingData === undefined) {
        return (
            <div className={style.modalOverlay}>
                <div className={style.recommendationContainer}>
                    <LoadingSpiner />
                </div>
            </div>
        );
    }

    return (
        <div className={style.modalOverlay} onClick={handleOverlayClick}>
            <div className={style.recommendationContainer}>

                <div className={style.recommendationTitle}>공고 추천</div>

                {selectPostingData.map((posting, index) => (
                    <div key={index} className={style.companyDetails} onClick={() => onClickPostingHandler(posting, index)} >
                        <div className={style.companyTitle}>
                            <div><strong>{posting.postingTitle}</strong></div>
                            <div>{posting.endDate}</div>
                        </div>
                        <div className={style.condition}>
                            <div>{posting.location}</div>
                            <div>{posting.education}</div>
                            <div>{posting.closingForm}</div>
                        </div>
                    </div>
                ))}
                <div className={style.postingList}></div>
            </div>
        </div>
    );
}

export default RecommendationModal;

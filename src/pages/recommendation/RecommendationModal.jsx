import style from "./RecommendationModal.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRecommendationResume } from "../../apis/recommendationAPICalls";
import { LoadingSpiner } from '../../other/LoadingSpiner';

function RecommendationModal({selectPostingData ,closeModal}) {


    const handleOverlayClick = (event) => {
        // Check if the click is outside the modal content
        if (event.target.classList.contains(style.modalOverlay)) {
            closeModal();
        }
    };

    console.log(selectPostingData, "모달까지 도착완료");

    // if (selectPostingData.selectPostingData === undefined) {
    //     return (
    //         <div className={style.modalOverlay}>
    //             <div className={style.recommendationContainer}>
    //                 <LoadingSpiner />
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className={style.modalOverlay} onClick={closeModal}>
            <div className={style.recommendationContainer}>
                
                <div className={style.recommendationTitle}>공고 추천</div>
                <div className={style.companyDetails}>
                    <div className={style.companyTitle}>
                        <div><strong>[기업부설 연구소] 웹 백엔드 개발자</strong></div>
                        <div>2023/04/13</div>
                    </div>
                    <div className={style.condition}>
                        <div>서울시 강북구 수유동</div>
                        <div>학력무관</div>
                        <div>채용시 마감</div>
                    </div>
                </div>
                <div className={style.companyDetails}>
                    <div className={style.companyTitle}>
                        <div><strong>1325351</strong></div>
                        <div>1235123</div>
                    </div>
                    <div className={style.condition}>
                        <div>13523512</div>
                        <div>3512135</div>
                        <div>2413124</div>
                    </div>
                </div>
                <div className={style.companyDetails}>
                    <div className={style.companyTitle}>
                        <div><strong>1325351</strong></div>
                        <div>1235123</div>
                    </div>
                    <div className={style.condition}>
                        <div>13523512</div>
                        <div>3512135</div>
                        <div>2413124</div>
                    </div>
                </div>
                {selectPostingData?.selectPostingData?.map((posting, index) => (
                    <div key={index} className={style.companyDetails}>
                        <div className={style.companyTitle}>
                            <div><strong>{posting.postingTitle}1</strong></div>
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

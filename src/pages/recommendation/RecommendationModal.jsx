import style from "./RecommendationModal.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callRecommendationResume } from "../../apis/recommendationAPICalls";

function RecommendationModal(selectPostingData) {


    console.log(selectPostingData, "모달까지 도착완료");




    return (
        <>



            <div className={style.modalOverlay}>
                <div className={style.recommendationContainer}>
                    <div className={style.recommendationTitle}>공고 추천</div>
                    {selectPostingData?.selectPostingData?.map((posting, index) => (
                        <div key={index} className={style.companyDetails}>
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

        </>
    )
}


export default RecommendationModal
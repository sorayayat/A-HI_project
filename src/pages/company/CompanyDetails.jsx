import style from './CompanyDetails.module.css'
import { useEffect } from 'react';

function CompanyDetails() {

    useEffect(() => {
        
        document.body.classList.add(style.companyDetailsBody);

        return () => {

        document.body.classList.remove(style.companyDetailsBody);
        };
    }, []); 
    

    return (
        <>

        
            

        <div className={style.mainContainer}>

            <div className={style.companyInfoContainer}>

                <div className={style.titleText1}><p>제목들어갈곳</p></div>
                <div className={style.titleText2}><p>지원 자격</p></div>
                <div className={style.titleText3}><p>근무 조건</p></div>
            </div>

            <button className={style.sendButton}>입사지원</button>

            <div className={style.detailsContainer}>
                <div className={style.details}>
                    상세정보
                </div>
            </div>

            <div className={style.companyProfileContainer}>
                <div className={style.companyInfomation}>
                    
                </div>
            </div>

        </div>

        
        </>    
    )


}


export default CompanyDetails
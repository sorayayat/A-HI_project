import style from './CompanyDetails.module.css'

function CompanyDetails() {

    return (
        <>
        <div className={style.mainContainer}>

            <div className={style.companyInfoContainer}>

                <div className={style.titleText1}>제목들어갈곳</div>
                <div className={style.titleText2}>지원 자격</div>
                <div className={style.titleText3}>근무 조건</div>
            </div>

            <div className={style.detailsContainer}></div>

            <div className={style.companyProfileContainer}></div>

        </div>
        </>    
    )


}


export default CompanyDetails
import styles from './AiServices.module.css';
import { PaperIcon } from './Icons';
import { PDFIcon } from './Icons';
import Interview from '../Interview/Interview';
import React, {useState} from 'react';

const AiServices = () => {

    return (
        <>
            {/* 검색div와 서비스div사이 간격 */}
            <div className={styles.aiServiceTopMargin}/>
            {/* 타이틀 및 서비스버튼 */}
            <div className={styles.aiServiceContents}>
                <div className={styles.aiServiceTitle}>
                    <div><h1>회원님을 위한 맞춤형 AI 서비스</h1></div>
                </div>
                <div className={styles.aiServiceBox}>
                    <div className={styles.boxWrapper}>
                        <ul className={styles.boxList}>
                            <li className={styles.boxBanner}>
                                <article className={styles.box}>
                                    {/* 서비스 1 - 자소서 초안 작성 */}
                                    <div className={styles.boxTitle}>
                                        <h2>자소서 초안 작성</h2>
                                    </div>
                                    {/* 아이콘 */}
                                    <div className={styles.paperIcon}>
                                    <PaperIcon/>
                                    </div>
                                    {/* 텍스트 */}
                                    <div className={styles.boxText}>
                                        <h4>AI 챗봇과 대화를 통해<br/>이력서 초안을 만들어보세요</h4>
                                    </div>
                                </article>
                            </li>
                            <li className={styles.boxBanner}>
                                <article className={styles.box}>
                                    {/* 서비스 2 - 이력서 PDF 검수 */}
                                    <div className={styles.boxTitle}>
                                        <h2>이력서 PDF 검수</h2>
                                    </div>
                                    {/* 아이콘 */}
                                    <div className={styles.pdfIcon}>
                                    </div>
                                    {/* 텍스트 */}
                                    <div className={styles.boxText}>
                                        <h4>이력서를 PDF로 첨부하여<br/>AI 챗봇에게 첨삭받아보세요</h4>
                                    </div>      
                                </article>
                            </li>
                            <li className={styles.boxBanner}>
                                <article className={styles.box}>
                                    <div className={styles.boxTitle}>
                                        <h2>면접 예상 질문</h2>
                                    </div>
                                    <div className={styles.headIcon}></div>
                                    <div className={styles.boxText}>
                                        <h4>AI 챗봇과 면접 예상 질문에<br/>대비해보세요</h4>
                                    </div>       
                                </article>
                            </li>
                            <li className={styles.boxBanner}>
                                <article className={styles.box}>
                                    {/* 서비스 4 - 맞춤 공고 추천 */}
                                    <div className={styles.boxTitle}>
                                        <h2>맞춤 공고 추천</h2>
                                    </div>
                                    {/* 아이콘 */}
                                    <div className={styles.speakerIcon}>

                                    </div>
                                    {/* 텍스트 */}
                                    <div className={styles.boxText}>
                                        <h4>이력서의 기술 스택과<br/>관련된 맞춤형 공고를<br/>확인해보세요</h4>
                                    </div>      
                                </article>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AiServices;
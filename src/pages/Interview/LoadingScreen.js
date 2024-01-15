import React, { useEffect } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ isLoading }) => {
    
    const msg = ["REST API란? \nREST API(Representational State Transfer Application Programming Interface)는 웹 서비스에 데이터를 전송하고, 수정하며, 삭제하는 등의 작업을 할 수 있게 해주는 인터페이스입니다. 이는 HTTP 프로토콜을 사용하여 서버와 클라이언트 간의 통신을 단순화합니다. REST는 자원(데이터)의 상태를 전송하는 방식에 초점을 맞추고 있습니다.",
    "클라우드 컴퓨팅(Cloud Computing)이란?\n클라우드 컴퓨팅은 인터넷을 통해 서버, 스토리지, 데이터베이스, 네트워킹, 소프트웨어 등의 컴퓨팅 서비스를 제공하는 것을 말합니다. 사용자는 필요에 따라 이러한 자원을 원격으로 사용하고, 비용을 지불하게 됩니다. 이는 물리적인 하드웨어 관리의 필요성을 줄여줍니다.",
    "머신 러닝(Machine Learning)이란?\n머신 러닝은 컴퓨터가 경험을 통해 스스로 학습하고 개선하는 인공 지능의 한 분야입니다. 데이터를 분석하고, 패턴을 인식하며, 예측을 하는 데 사용됩니다. 이는 수동 코딩 없이도 컴퓨터가 예측이나 결정을 할 수 있게 해줍니다."];
    
    let msgindex = 0;

    useEffect(() => {
        let interval;

        if (isLoading) {
            const updateMessage = () => {
                document.getElementById("loadingMessage").innerText = msg[msgindex];
                msgindex = (msgindex + 1) % msg.length;
            };

            // 5초마다 메시지 업데이트
            interval = setInterval(updateMessage, 5000);
        }

        // 컴포넌트가 언마운트되거나 isLoading 상태가 변경될 때 인터벌 해제
        return () => clearInterval(interval);
    }, [isLoading]); // 의존성 배열에 isLoading 추가

    if (!isLoading) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.loading}>
                <div className={styles.loadingBarProgres}></div>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <div className={styles.msg} id="loadingMessage"></div>
        </div>
    );
};

export default LoadingScreen;

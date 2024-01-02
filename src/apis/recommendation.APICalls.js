
import { POST_RECOMMENDATION } from '../modules/recommendationModules';


const FAST_SERVER_IP = `${process.env.REACT_APP_FAST_APP_SERVER_IP}`;
const FAST_SERVER_PORT = `${process.env.REACT_APP_FAST_APP_SERVER_PORT}`;

const SPRING_SERVER_IP = `${process.env.REACT_APP_SPRING_APP_SERVER_IP}`;
const SPRING_SERVER_PORT = `${process.env.REACT_APP_SPRING_APP_SERVER_PORT}`;

const FAST_PRE_URL =`http://${FAST_SERVER_IP}:${FAST_SERVER_PORT}/recommendation`
const SPRING_PRE_URL = `http://${SPRING_SERVER_IP}:${SPRING_SERVER_PORT}/recommendation`


export const callRecommendationResume = ({ file }) => {


    const requestURL = `${FAST_PRE_URL}/resume`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'POST',
            
            body: file
            
        }).then(response => response.json());

        
        dispatch({ type: POST_RECOMMENDATION, payload: result });

        
    };
};
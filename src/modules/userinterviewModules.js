import { createActions , handleActions } from "redux-actions";

const initialState = [];

const GET_USERINTERVIEW = "userinterview/GET_USERINTERVIEW";

export const {userinterview : {getuserinterview}} = createActions({
    [GET_USERINTERVIEW] : res => res,

})

const userinterviewReduer = handleActions({
    [GET_USERINTERVIEW] : (state, {payload}) => ({userinterview : payload})

}, initialState);

export default userinterviewReduer;
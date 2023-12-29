// reducers/authReducer.js
import { LOGIN, LOGOUT } from './authActions';

const initialState = {
    isLoggedIn: false,
    email: "",
    // companyId: "",
    // memberId:"",
    // name:"",
    // phoneNumber:"",
    // company:"",
    // companyType:"",
    // employeesNumber:"",
    // establishmentDate:"",
    // companyHomepage:"",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                email: action.payload.email,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                email: "",
            };
        default:
            return state;
    }
};

export default authReducer;
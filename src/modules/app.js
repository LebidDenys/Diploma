export const FETCH_DATA = 'app/FETCH_DATA';
export const CHANGE_YEAR = 'app/CHANGE_YEAR';
export const CHANGE_MONTH = 'app/CHANGE_MONTH';
export const CREATE_MEASUREMENT = 'app/CREATE_MEASUREMENT';
export const EDIT_MEASUREMENT = 'app/EDIT_MEASUREMENT';
export const DELETE_MEASUREMENT = 'app/DELETE_MEASUREMENT';
export const LOG_IN = 'app/LOG_IN';
export const LOG_OUT = 'app/LOG_OUT';
export const MARKER_CLICK = 'app/MARKER_CLICK';


const initialState = {
    loadingStatus: '',
    error: '',
    measurements: [],
    year: 2018,
    month: 'dec',
    isAuth: true,
    userData: {},
    selectedMeasurementId: ''
};

export default (state = initialState, action) => {
    switch (action.type) {

        case LOG_IN:
            return {
                ...state,
                userData: action.payload.userData,
                isAuth: true
            };

        case LOG_OUT:
            return {
                ...state,
                userData: {},
                isAuth: false
            };

        case FETCH_DATA:
            return {
                ...state,
                measurements: action.payload.data
            };

        case CHANGE_YEAR:
            return {
                ...state,
                year: action.payload.year
            };

        case CHANGE_MONTH:
            return {
                ...state,
                month: action.payload.month
            };

        case CREATE_MEASUREMENT:
            return {
                ...state,
                measurements: [
                    ...state.measurements,
                    action.payload.measurement
                ]
            };

        case EDIT_MEASUREMENT:
            const updatedMeasurement = action.payload.measurement;
            return {
                ...state,
                measurements: state.measurements.map(
                    measurement =>
                        measurement._id === updatedMeasurement._id
                            ? updatedMeasurement : measurement
                )
            };

        case DELETE_MEASUREMENT:
            console.log(action.payload)
            return {

            };

        case MARKER_CLICK:
            return {
                ...state,
                selectedMeasurementId: action.payload.markerId
            };

        default:
            return state
    }
}


export const fetchData = ( data ) => {
    return dispatch => {
        dispatch({
            type: FETCH_DATA,
            payload: {
                data
            }
        });
    }
};

export const changeYear = ( year ) => {
    return dispatch => {
        dispatch({
            type: CHANGE_YEAR,
            payload: {
                year
            }
        });
    }
};

export const changeMonth = ( month ) => {
    return dispatch => {
        dispatch({
            type: CHANGE_MONTH,
            payload: {
                month
            }
        });
    }
};

export const createMeasurement = ( measurement ) => {
    return dispatch => {
        dispatch({
            type: CREATE_MEASUREMENT,
            payload: {
                measurement
            }
        });
    }
};

export const editMeasurement = ( measurement ) => {
    return dispatch => {
        dispatch({
            type: EDIT_MEASUREMENT,
            payload: {
                measurement
            }
        });
    }
};

export const deleteMeasurement = ( measurementId ) => {
    return dispatch => {
        dispatch({
            type: DELETE_MEASUREMENT,
            payload: {
                measurementId
            }
        });
    }
};

export const logIn = ( userData ) => {
    return dispatch => {
        dispatch({
            type: LOG_IN,
            payload: {
                userData
            }
        });
    }
};

export const markerClick = ( markerId ) => {
    return dispatch => {
        dispatch({
            type: MARKER_CLICK,
            payload: {
                markerId
            }
        });
    }
};

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LOG_OUT,
        });
    }
};


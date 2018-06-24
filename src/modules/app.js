export const FETCH_MEASUREMENTS = 'app/FETCH_DATA';
export const FETCH_POINTS = 'app/FETCH_POINTS';
export const CHANGE_YEAR = 'app/CHANGE_YEAR';
export const CHANGE_MONTH = 'app/CHANGE_MONTH';
export const CREATE_MEASUREMENT = 'app/CREATE_MEASUREMENT';
export const EDIT_MEASUREMENT = 'app/EDIT_MEASUREMENT';
export const DELETE_MEASUREMENT = 'app/DELETE_MEASUREMENT';
export const LOG_IN = 'app/LOG_IN';
export const LOG_OUT = 'app/LOG_OUT';

const filterMeasurements = (arr, key, value) => {
    return arr.filter(item => item[key] === value)
};

const initialState = {
    measurements: [],
    points: [],
    selectedMeasurements: [],
    year: 2018,
    month: 'dec',
    isAuth: true,
    userData: {},
};

export default (state = initialState, action) => {
    let selectedMeasurements;
    let measurements;

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

        case FETCH_MEASUREMENTS:
            selectedMeasurements = filterMeasurements(action.payload.data, 'year', state.year);
            selectedMeasurements = filterMeasurements(selectedMeasurements, 'month', state.month);
            return {
                ...state,
                measurements: action.payload.data,
                selectedMeasurements
            };

        case FETCH_POINTS:
            return {
                ...state,
                points: action.payload.data,
            };

        case CHANGE_YEAR:
            return {
                ...state,
                year: action.payload.year,
                selectedMeasurements: filterMeasurements(state.selectedMeasurements, 'year', action.payload.year)
            };

        case CHANGE_MONTH:
            return {
                ...state,
                month: action.payload.month,
                selectedMeasurements: filterMeasurements(state.selectedMeasurements, 'month', action.payload.month)
            };

        case CREATE_MEASUREMENT:
            measurements = [...state.measurements, action.payload.measurement];
            selectedMeasurements = filterMeasurements(measurements, 'year', state.year);
            selectedMeasurements = filterMeasurements(selectedMeasurements, 'month', state.month);
            return {
                ...state,
                measurements,
                selectedMeasurements
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
            measurements = state.measurements.filter(item => item._id !== action.payload.measurementId);
            selectedMeasurements = filterMeasurements(measurements, 'year', state.year);
            selectedMeasurements = filterMeasurements(selectedMeasurements, 'month', state.month);
            return {
                ...state,
                measurements,
                selectedMeasurements
            };

        default:
            return state
    }
}


export const fetchMeasurements = ( data ) => {
    return dispatch => {
        dispatch({
            type: FETCH_MEASUREMENTS,
            payload: {
                data
            }
        });
    }
};

export const fetchPoints = ( data ) => {
    return dispatch => {
        dispatch({
            type: FETCH_POINTS,
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

export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LOG_OUT,
        });
    }
};


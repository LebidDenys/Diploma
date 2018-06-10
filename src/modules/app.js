import MEASUREMENTS from './measurements'
export const FETCH_DATA = 'app/FETCH_DATA';
export const CHANGE_YEAR = 'app/CHANGE_YEAR';
export const CHANGE_MONTH = 'app/CHANGE_MONTH';
export const CREATE_MEASUREMENT = 'app/CREATE_MEASUREMENT';

const initialState = {
    measurements: MEASUREMENTS,
    year: 2012,
    month: 'dec'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                measurements: action.payload
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

        default:
            return state
    }
}

export const fetchData = ({ measurements }) => {
    return dispatch => {
        dispatch({
            type: FETCH_DATA,
            payload: {
                measurements
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

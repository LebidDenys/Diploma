export const FETCH_DATA = 'app/FETCH_DATA';

const initialState = {
    points: [
        {
            id: 1,
            lat: 50.4508,
            lng: 30.5289,
            year: 2017,
            month: 'jun',
            lead: 14.34,
            cadmium: 12.65,
            zinc: 34.2323,
            copper: 23.23,
            chrome: 98.87,
            nikel: 43.435
        },
        {
            id: 2,
            lat: 49.979,
            lng: 36.23,
            year: 2017,
            month: 'jul',
            lead: 12.34,
            cadmium: 16.65,
            zinc: 23.2323,
            copper: 54.23,
            chrome: 23.87,
            nikel: 76.435
        },
        {
            id: 3,
            lat: 49.831,
            lng: 24.047,
            year: 2017,
            month: 'aug',
            lead: 67.34,
            cadmium: 16.65,
            zinc: 23.2323,
            copper: 54.23,
            chrome: 23.87,
            nikel: 76.435
        },
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                points: action.payload
            };

        default:
            return state
    }
}

export const fetchData = () => {
    return dispatch => {
        dispatch({
            type: FETCH_DATA,
            payload: {
                points: [1, 2 , 3]
            }
        });
    }
};

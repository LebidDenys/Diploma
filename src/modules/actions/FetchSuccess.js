//define action within an action creator
function FetchSuccess(streams) {
    const FETCH_Success = 'FETCH_Success'
    return {
        type: FETCH_SUCCESS,
        status: "success",
        streams
    }
}
export default FetchSuccess

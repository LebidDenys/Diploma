import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import { loadState, saveState } from './modules/localStorage'

export const history = createHistory()

const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    composedEnhancers
)

store.subscribe(() => {
    saveState({
        app: {
            year: 2015,
            month: 'dec',
            userData: store.getState().app.userData,
            isAuth: store.getState().app.isAuth,
        }
    });
});

export default store

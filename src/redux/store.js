import { createStore,applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middleWare = [logger];
const Store = createStore(rootReducer,applyMiddleware(...middleWare))


export default Store;
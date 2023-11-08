// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

// Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Saga
import createSagaMiddleware from 'redux-saga';
import { takeLatest, takeEvery, put } from 'redux-saga/effects';

// Server
import axios from 'axios';

// Style
import './index.css';

const sagaMiddleware = createSagaMiddleware()

function* rootSaga() {
  yield takeLatest('FETCH_EXAMPLE', fetchExample)
}

function* fetchExample() {
  try {
    console.log('in try')

    const example = yield axios.get('/example');
    console.log('result of GET:', example.data)
    
    yield put({ type: 'SET_EXAMPLE', payload: example.data})
    console.log('put completed')
  } catch {
    console.log('error in example generator')
  }
}

const exampleReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXAMPLE':
      return action.payload
    default:
      return state
  }
}


const store = createStore(
  combineReducers({
    exampleReducer,
  }), 
  applyMiddleware(
    sagaMiddleware,
    logger
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
sagaMiddleware.run(rootSaga);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
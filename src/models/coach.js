import { routerRedux } from 'dva/router';
import {
  queryTags,
  queryCoach,
  updateCoach,
  queryAuthority,
  queryCommunication,
  queryActivity,
  querySchool,
  updateAuthority,
  queryCourse,
} from '../services/api';

export default {
  namespace: 'coach',
  state: {
    tags: [],
    data: {
      list: [],
      pagination: {},
    },
    authorityData: {
      list: [],
      pagination: {},
    },
    currentData: {
      list: [],
      pagination: {},
    },
    communicationData: {
      list: [],
      pagination: {},
    },
    activityData: {
      list: [],
      pagination: {},
    },
    schoolData: {
      list: [],
      pagination: {},
    },
    qrCodeData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCoach, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchAuthrotys({ payload }, { call, put }) {
      const response = yield call(queryAuthority, payload);
      yield put({
        type: 'saveAuthority',
        payload: response,
      });
      yield put(routerRedux.push('/useradmin/coach-authority'));
    },
    *fetchCommunications({ payload }, { call, put }) {
      const response = yield call(queryCommunication, payload);
      yield put({
        type: 'saveCommunications',
        payload: response,
      });

      yield put(routerRedux.push('/useradmin/coach-communications'));
    },
    *fetchaActivity({ payload }, { call, put }) {
      const response = yield call(queryActivity, payload);
      yield put({
        type: 'saveActivities',
        payload: response,
      });

      yield put(routerRedux.push('/useradmin/coach-activities'));
    },
    *fetchSchool(_, { call, put }) {
      const response = yield call(querySchool);
      yield put({
        type: 'saveSchools',
        payload: response,
      });
    },
    *fetchQRCode(_, { call, put }) {
      const response = yield call(queryCourse);
      yield put({
        type: 'saveQRCode',
        payload: response,
      });
      yield put(routerRedux.push('/useradmin/coach-qrcode'));
    },
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
    *setStatus({ payload, callback }, { call, put }) {
      const response = yield call(updateCoach, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *viewDetail({ payload }, { call, put }) {
      const response = yield call(queryCoach, payload);
      yield put({
        type: 'viewDetailData',
        payload: response,
      });
      yield put(routerRedux.push(`/useradmin/coach-detail`));
    },
    *updateAuthority({ payload, callback }, { call, put }) {
      const response = yield call(updateAuthority, payload);
      yield put({
        type: 'updateAuthority',
        payload: response,
      });
      if (callback) callback();
    },
    // *viewAuthorityList({ payload, callback }, { call, put }) {
    //   const response = yield call(queryAuthority, payload);
    //   yield put({
    //     type: 'saveAuthority',
    //     payload: response,
    //   });
    //   // if (response.status === 'ok') {
    //   //   yield put(routerRedux.push('/useradmin/coach-authority'));
    //   // }
    //   yield put(routerRedux.push('/useradmin/coach-authority'));
    //   if (callback) callback();
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    saveAuthority(state, action) {
      return {
        ...state,
        authorityData: action.payload,
      };
    },
    saveCommunications(state, action) {
      return {
        ...state,
        communicationData: action.payload,
      };
    },
    saveActivities(state, action) {
      return {
        ...state,
        activityData: action.payload,
      };
    },
    updateAuthority(state, action) {
      return {
        ...state,
        updateAuthorityResult: action.payload,
      };
    },
    saveSchools(state, action) {
      return {
        ...state,
        schoolData: action.payload,
      };
    },
    saveQRCode(state, action) {
      return {
        ...state,
        qrCodeData: action.payload,
      };
    },
    viewDetailData(state, action) {
      return {
        ...state,
        currentData: action.payload,
      };
    },
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};

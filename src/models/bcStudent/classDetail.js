import { fetchbcStudentActivityRecord } from '../../services/api';

export default {
  namespace: 'classDetail',
  state: {
    recordList: {},
  },
  effects: {
    *fetchclassDetail(_, { call, put }) {
      // 拉取课程记录
      const response = yield call(fetchbcStudentActivityRecord);
      yield put({
        type: 'setState',
        payload: { recordList: response.bcStudentActivityRecord.data },
      });
    },
    *fetchclassDetailMore(_, { call, put }) {
      // 拉取更多课程记录
      const response = yield call(fetchbcStudentActivityRecord);
      yield put({
        type: 'recordMore',
        payload: response.bcStudentActivityRecord.data,
      });
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    recordMore(state, { payload }) {
      return {
        ...state,
        recordList: [...state.recordList, ...payload],
      };
    },
    clear() {
      return {
        recordList: {},
      };
    },
  },
};

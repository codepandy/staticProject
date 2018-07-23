import { fetchbcStudentActivityRecord } from '../../services/api';

export default {
  namespace: 'activityDetail',
  state: {
    recordList: {},
  },
  effects: {
    *fetchActivityRecord(_, { call, put }) {
      // 拉取活动记录
      const response = yield call(fetchbcStudentActivityRecord);
      yield put({
        type: 'setState',
        payload: { recordList: response.bcStudentActivityRecord.data },
      });
    },
    *fetchActivityRecordMore(_, { call, put }) {
      // 拉取活动记录
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

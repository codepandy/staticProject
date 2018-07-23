import { fetchbcStudentActivityRecord } from '../../services/api';

export default {
  namespace: 'bcAllDetail',
  state: {
    connectRecordVisible: false,
    writeConnectRecord: '', // 沟通记录
  },

  effects: {
    *fetchActivityRecord(_, { call, put }) {
      // 拉取活动记录
      const response = yield call(fetchbcStudentActivityRecord);
      yield put({
        type: 'save',
        payload: response,
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
    clear() {
      return {};
    },
  },
};

import { fakeChartData } from '../../services/api';

export default {
  namespace: 'newAddConnect',

  state: {
    connectRecordVisible: false,
    writeConnectRecord: '', // 沟通记录
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
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
      return {
        connectRecordVisible: false,
        writeConnectRecord: '', // 沟通记录
      };
    },
  },
};

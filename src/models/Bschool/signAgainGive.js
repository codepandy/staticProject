import { fakeChartData } from '../../services/api';

export default {
  namespace: 'signAgainGive',

  state: {
    signAgainGiveVisible: false,

    signAgainGiveTitle: '',
    signAgainGiveShowSign: false, // 是否展示签约数据

    writeSignCode: '',
    writeSignTime: '',
    writeSignBackOrganization: '',
    writeSingBackTeacherA: '',
    writeSingBackTeacherB: '',
    writeSingBackTeacherC: '',

    confirmLoadding: false,
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
        signAgainGiveVisible: false,
      };
    },
  },
};

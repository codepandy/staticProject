import { fakeChartData } from '../../services/api';

export default {
  namespace: 'bschoolBasicInfo',

  state: {
    basicInfoEditVisible: false,

    writeSchoolName: '',
    writeOrganization: '',
    writeOrigin: '',
    writeAdminer: '',
    writeProvice: '',
    writeIphone: '',
    writeModel: '',
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
        writeSchoolName: '',
        writeOrganization: '',
        writeOrigin: '',
        writeAdminer: '',
        writeProvice: '',
        writeIphone: '',
        writeModel: '',
      };
    },
  },
};

import { fakeChartData } from '../../services/api';

export default {
  namespace: 'allDetail',

  state: {
    teacherAccount: '', // 输入的教练账号
    addTeacherAccountVisible: false,

    editTeacherRemarksVisible: false, // 编辑备注信息
    editTeacherRemarks: '',

    editStudentSituationVisible: false, // 编辑学生情况
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *submitAddSchoolInfo(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'submitAddSchoolInfo',
        payload: {
          salesData: response.salesData,
        },
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
        writeOrganization: 1,
        writeOrigin: 1,
        writeAdminer: '',
        writeProvice: 1,
        writeIphone: '',
        writeModel: '',
      };
    },
  },
};

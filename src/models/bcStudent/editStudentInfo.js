import { queryBschoolSearchData, fetchbcStudentActivityRecord } from '../../services/api';

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default {
  namespace: 'editStudentInfo',

  state: {
    writeStudentName: '',
    writeRegisterTime: '',
    writeTrialAccount: '',
    writeStudentConnect: '',

    writeStudentAttendSchool: '',

    writeStudentForSchool: '',
    writeStudentForOrigination: '',
    writeStudentIsSign: '',

    highestAward: '',
    selfConfess: '',
    graduateForPlace: '',

    basicInfoEditVisible: false, //  学生基本信息编辑
    editStudentConfirmLoading: false, // 学生基本信息弹窗提交表单

    basicInfo: {},
  },

  effects: {
    *submitStudentInfo(_, { put, call }) {
      // 提交学生基本信息
      yield put({
        type: 'setState',
        payload: {
          editStudentConfirmLoading: true,
        },
      });
      const response = yield call(queryBschoolSearchData);
      yield call(delay, 200);
      yield put({
        type: 'setState',
        payload: {
          basicInfoEditVisible: false,
          editStudentConfirmLoading: false,
          response,
        },
      });
    },
    *fetch(_, { call, put }) {
      const response = yield call(fetchbcStudentActivityRecord);
      yield put({
        type: 'setState',
        payload: {
          basicInfo: response.basicInfo.data,
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
        writeStudentName: '',
        writeRegisterTime: '',
        writeTrialAccount: '',
        writeStudentConnect: '',

        writeStudentAttendSchool: '',

        writeStudentForSchool: '',
        writeStudentForOrigination: '',
        writeStudentIsSign: '',

        highestAward: '',
        selfConfess: '',
        graduateForPlace: '',
      };
    },
  },
};

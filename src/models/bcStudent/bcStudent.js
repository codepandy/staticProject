import { queryBschoolSearchData, fetchbcStudentActivityRecord } from '../../services/api';

const delay = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export default {
  namespace: 'bcStudent', // 我们所有的 dispatch 都是通过这个namespace定位过来的。 所以当请求不通，要注意。
  state: {
    querySearchData: [],

    provices: [],
    organization: [],
    origin: [],

    signCeremony: [],

    confirmSearchStudentInfo: false, // 查询按钮的loadding效果

    selectProvices: '',
    selectOrganization: '',
    selectOrigin: '',
    selectSignCeremony: '',
    writeStudentInfo: '',
  },
  effects: {
    *fetchSearchData(_, { call, put }) {
      //  `{callback}` 替换成 `_` 就是没有参数
      const response = yield call(queryBschoolSearchData); // fakeChartData 是定义的service 里面放出的可调用的方法

      if (response.schoolLists.code === 1) {
        yield put({
          // effects里面触发action的方法是yield put
          type: 'updateSearchData',
          payload: response.schoolLists.data,
        });
        yield put({
          // effects里面触发action的方法是yield put
          type: 'setState',
          payload: {
            provices: response.provices.data,
            organization: response.organization.data,
            origin: response.origin.data,
            signCeremony: response.signCeremony.data,
          },
        });
      }
      const responseTbale = yield call(fetchbcStudentActivityRecord); // fakeChartData 是定义的service 里面放出的可调用的方法
      yield put({
        // effects里面触发action的方法是yield put
        type: 'setState',
        payload: {
          querySearchData: responseTbale.querySearchData.data,
        },
      });
    },
    *searchStudentInfoList(_, { call, put }) {
      //  `{callback}` 替换成 `_` 就是没有参数
      yield put({
        type: 'setState',
        payload: { confirmSearchStudentInfo: true },
      });
      const response = yield call(queryBschoolSearchData); // fakeChartData 是定义的service 里面放出的可调用的方法
      yield call(delay, 200);
      if (response.schoolLists.code === 1) {
        yield put({
          // effects里面触发action的方法是yield put
          type: 'setState',
          payload: {
            confirmSearchStudentInfo: false,
            querySearchData: response.schoolLists.data,
            provices: response.provices.data,
            organization: response.organization.data,
            origin: response.origin.data,
            signCeremony: response.signCeremony.data,
          },
        });
      }
    },
  },
  // updateSearchData 是通过type 进行调用. 名字要相互对应
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        querySearchData: [],

        provices: [],
        organization: [],
        origin: [],
        signCeremony: [],

        selectProvices: '',
        selectOrganization: '',
        selectOrigin: '',
        selectSignCeremony: '',
        writeStudentInfo: '',
      };
    },
  },
};
//     // 同时进行多个异步http调用，当最慢的http调用完成后得到返回结果，程序继续向下执行，相当于Promise.all方法
//   // effects里面调用services的方法是yield call
//   const [clientsResponse, filtersResponse] = yield [
//     call(queryClientList, payload),
//     call(queryFilterOptions)
//   ]

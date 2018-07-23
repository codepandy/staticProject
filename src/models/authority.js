import { routerRedux } from 'dva/router';
import { queryAccount, queryRole, queryMenu, queryUserMenu, updateAccount } from '../services/api';

export default {
  namespace: 'authority',
  state: {
    accountData: {
      list: [],
      pagination: {},
    },
    roleData: {
      list: [],
      pagination: {},
    },
    menuData: {
      list: [],
      pagination: {},
    },
    userRole: {
      id: '',
      name: '',
      userMenus: [],
    },
    oldUserRole: {
      id: '',
      name: '',
      userMenus: [],
    },
  },

  effects: {
    *fetchAcount({ payload }, { call, put }) {
      const response = yield call(queryAccount, payload);
      yield put({
        type: 'saveAcounts',
        payload: response,
      });
    },
    *editAcount({ payload }, { call }) {
      yield call(updateAccount, payload);
    },
    *fetchRole({ payload }, { call, put }) {
      const response = yield call(queryRole, payload);
      yield put({
        type: 'saveRoles',
        payload: response,
      });
    },
    *addRole({ payload }, { call, put }) {
      yield put(routerRedux.push('/authority/role-edit'));
      if (payload) {
        const response = yield call(queryUserMenu, payload);
        yield put({
          type: 'saveUserMenus',
          payload: response,
        });
      }
    },
    *editRoleName({ payload }, { put }) {
      yield put({
        type: 'saveRoleName',
        payload,
      });
    },
    *delRole({ payload }, { call }) {
      yield call(queryRole, payload);
    },
    *refreshRoleDetail(_, { put }) {
      yield put({
        type: 'saveRefreshRoleDetail',
      });
    },
    *fetchMenuList({ payload }, { call, put }) {
      const response = yield call(queryMenu, payload);
      yield put({
        type: 'saveMenus',
        payload: response,
      });
    },

    *setUserMenu({ payload }, { put }) {
      yield put({
        type: 'setUserMenus',
        payload,
      });
    },
  },

  reducers: {
    saveAcounts(state, action) {
      return {
        ...state,
        accountData: action.payload,
      };
    },
    saveRoles(state, action) {
      return {
        ...state,
        roleData: action.payload,
      };
    },
    saveMenus(state, action) {
      return {
        ...state,
        menuData: action.payload,
      };
    },
    saveUserMenus(state, action) {
      return {
        ...state,
        userRole: action.payload,
        oldUserRole: JSON.parse(JSON.stringify(action.payload)),
      };
    },
    setUserMenus(state, action) {
      const { payload } = action;
      const { userMenus } = state.userRole;

      if (payload.checked) {
        userMenus.push(payload.id);
        if (payload.isParent) {
          (payload.subMenu || []).forEach(item => {
            userMenus.push(item.id);
          });
        }
      } else {
        let index = userMenus.findIndex(item => item === payload.id);
        if (index !== -1) userMenus.splice(index, 1);
        if (payload.isParent) {
          (payload.subMenu || []).forEach(subMenu => {
            index = userMenus.findIndex(item => item === subMenu.id);
            if (index !== -1) userMenus.splice(index, 1);
          });
        }
      }

      return {
        ...state,
      };
    },
    saveRoleName(state, action) {
      const { userRole } = state;
      userRole.name = action.payload;
      return {
        ...state,
      };
    },
    saveRefreshRoleDetail(state) {
      const { userRole, oldUserRole } = state;
      userRole.userMenus = JSON.parse(JSON.stringify(oldUserRole.userMenus));
      return {
        ...state,
      };
    },
  },
};

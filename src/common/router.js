import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/useradmin/b-school': {
      component: dynamicWrapper(app, ['bschool'], () =>
        import('../routes/Useradmin/BSchool/index')
      ),
    },
    '/useradmin/b-school/info': {
      component: dynamicWrapper(app, ['bschool', 'Bschool/bschoolBasicInfo'], () =>
        import('../routes/Useradmin/BSchool/BSchool')
      ),
    },
    '/useradmin/b-school/detail': {
      name: '详情',
      component: dynamicWrapper(app, ['Bschool/bschoolBasicInfo'], () =>
        import('../routes/Useradmin/BSchool/bSchoolDetail/index')
      ),
    },
    '/useradmin/b-school/all-detail/:schoolId': {
      component: dynamicWrapper(
        app,
        ['bschoolBasicInfo', 'Bschool/allDetail', 'Bschool/newAddConnect', 'Bschool/signAgainGive'],
        () => import('../routes/Useradmin/BSchool/bSchoolDetail/basicInfo')
      ),
    },
    '/useradmin/b-school/detail/sign-detail/:schoolId': {
      name: '历史签约数据',
      component: dynamicWrapper(app, ['Bschool/signDetail'], () =>
        import('../routes/Useradmin/BSchool/bSchoolDetail/signDetail')
      ),
    },
    '/useradmin/b-school/detail/connect-detail/:schoolId': {
      name: '历史沟通记录',
      component: dynamicWrapper(app, ['Bschool/connectDetail'], () =>
        import('../routes/Useradmin/BSchool/bSchoolDetail/connectDetail')
      ),
    },
    '/useradmin/b-school/detail/activity-detail/:schoolId': {
      name: '历史活动记录',
      component: dynamicWrapper(app, ['Bschool/activityDetail'], () =>
        import('../routes/Useradmin/BSchool/bSchoolDetail/activityDetail')
      ),
    },
    // '/useradmin/b-school/detail/activities-detail': {
    //   name: '历史活动记录',
    //   component: dynamicWrapper(app, ['chart'], () =>
    //     import('../routes/Useradmin/BSchool/BSchoolSignDetail')
    //   ),
    // },
    '/useradmin/b-c-student': {
      component: dynamicWrapper(app, ['bcStudent/bcStudent'], () =>
        import('../routes/Useradmin/bcStudent/bcStudent')
      ),
    },
    '/useradmin/b-c-student-detail/:schoolId': {
      component: dynamicWrapper(app, ['bcStudent/bcAllDetail', 'bcStudent/editStudentInfo'], () =>
        import('../routes/Useradmin/bcStudent/basicInfo')
      ),
    },
    '/useradmin/b-c-student-activity-detail': {
      component: dynamicWrapper(app, ['bcStudent/activityDetail'], () =>
        import('../routes/Useradmin/bcStudent/activityDetail')
      ),
    },
    '/useradmin/b-c-student-class-detail': {
      component: dynamicWrapper(app, ['bcStudent/classDetail'], () =>
        import('../routes/Useradmin/bcStudent/classDetail')
      ),
    },
    '/useradmin/b-c-student-connect-detail': {
      component: dynamicWrapper(app, ['bcStudent/connectDetail'], () =>
        import('../routes/Useradmin/bcStudent/connectDetail')
      ),
    },

    '/useradmin/coach-to-B': {
      component: dynamicWrapper(app, ['coach'], () =>
        import('../routes/CoachToB/route-coach-list')
      ),
    },
    '/useradmin/coach-detail': {
      component: dynamicWrapper(app, ['coach'], () =>
        import('../routes/CoachToB/route-coach-detail')
      ),
    },
    '/useradmin/coach-authority': {
      component: dynamicWrapper(app, ['coach'], () =>
        import('../routes/CoachToB/route-authority-list')
      ),
    },
    '/useradmin/coach-communications': {
      component: dynamicWrapper(app, ['coach'], () =>
        import('../routes/CoachToB/route-communication-list')
      ),
    },
    '/useradmin/coach-activities': {
      component: dynamicWrapper(app, ['coach'], () =>
        import('../routes/CoachToB/route-activity-list')
      ),
    },
    '/useradmin/coach-qrcode': {
      component: dynamicWrapper(app, ['coach'], () => import('../routes/CoachToB/route-qr-code')),
    },
    '/authority/account-list': {
      component: dynamicWrapper(app, ['authority'], () =>
        import('../routes/Authority/route-account-list')
      ),
    },
    '/authority/role-list': {
      component: dynamicWrapper(app, ['authority'], () =>
        import('../routes/Authority/route-role-list')
      ),
    },
    '/authority/role-edit': {
      component: dynamicWrapper(app, ['authority'], () =>
        import('../routes/Authority/route-role-edit')
      ),
    },
    '/teachResearch/knowledge-target': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/TargetSystem/route-knowledge-target')
      ),
    },
    '/teachResearch/make-material': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/MakeMaterial/route-material-list')
      ),
    },
    '/teachResearch/edit-material/:id?': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/MakeMaterial/route-material-edit')
      ),
    },
    '/teachResearch/source-list': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/MakeMaterial/route-source-list')
      ),
    },
    '/teachResearch/knowledge-list': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/KnowledgeSystem/route-knowledge-system-list')
      ),
    },
    '/teachResearch/knowledge-list-edit/:id': {
      component: dynamicWrapper(app, ['teachResearch'], () =>
        import('../routes/TeachResearch/KnowledgeSystem/route-knowledge-system-edit')
      ),
    },

    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () =>
        import('../routes/Profile/AdvancedProfile')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};

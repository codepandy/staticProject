import { stringify } from 'qs';
import request from '../utils/request';

export async function queryBschoolSearchData() {
  //  b端教练
  return request('/api/bSchoolSearchData');
}

//  b/c端学生 (活动记录)
export async function fetchbcStudentActivityRecord() {
  return request('/api/bcStudentActivityRecord');
}

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function getAccountLogin(params) {
  return request(`/api/login/login?${stringify(params)}`);
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// export async function queryMenus() {
//   return request('/api/menus');
// }
export async function queryMenus() {
  return request('/api/user/listMenus');
}

export async function queryCoach(params) {
  return request(`/api/coach?${stringify(params)}`);
}

export async function updateCoach(params) {
  return request(`/api/coach`, {
    method: 'POST',
    body: params,
  });
}

export async function queryAuthority(params) {
  return request(`/api/authority?${stringify(params)}`);
}

export async function updateAuthority(params) {
  return request(`/api/authority`, {
    method: 'POST',
    body: params,
  });
}

export async function queryCommunication(params) {
  return request(`/api/communication?${stringify(params)}`);
}

export async function queryActivity(params) {
  return request(`/api/activity?${stringify(params)}`);
}

export async function querySchool(params) {
  return request(`/api/school?${stringify(params)}`);
}

export async function queryCourse(params) {
  return request(`/api/course?${stringify(params)}`);
}

export async function queryAccount(params) {
  return request(`/api/account?${stringify(params)}`);
}

export async function updateAccount(params) {
  return request(`/api/account`, {
    method: 'POST',
    body: params,
  });
}

export async function queryRole(params) {
  return request(`/api/role?${stringify(params)}`);
}

export async function queryMenu(params) {
  return request(`/api/menu?${stringify(params)}`);
}

export async function queryUserMenu(params) {
  return request(`/api/userMenu?${stringify(params)}`);
}

export async function listMainHierarchy() {
  return request(`/library/mainHierarchy/listMainHierarchy`);
}

export async function queryKnowledgeSystem(params) {
  return request(`/library/hierarchy/listHierarchy?${stringify(params)}`);
}
export async function queryKnowledgeTarget(params) {
  return request(`/library/mainHierarchy/getPointTree?${stringify(params)}`);
}
export async function deleteNodes(params) {
  return request(`/library/delKnowledgeTarget?${stringify(params)}`);
}

export async function updateTreeNode(params) {
  return request(`/library/hierarchy/setPoint?${stringify(params)}`);
}

export async function addMainPoint(params) {
  return request(`/library/mainHierarchy/addMainPoint?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function editMainPointName(params) {
  return request(`/library/mainHierarchy/editMainPointName?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function moveMainPoint(params) {
  return request(`/library/mainHierarchy/moveMainPoint?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function addHierarchy(params) {
  return request(`/library/hierarchy/addHierarchy?${stringify(params)}`, {
    method: 'POST',
  });
}

export async function queryHierarchyTree(params) {
  return request(`/library/hierarchy/getPointTree?${stringify(params)}`);
}

export async function queryHierarchyTreeUse(params) {
  return request(`/library/hierarchy/getPointTreeUse?${stringify(params)}`);
}

export async function getTagItemByNameBatch(params) {
  return request(`/library/tag/getTagItemByNameBatch?${stringify(params)}`);
}

export async function getSource(params) {
  return request(`/library/sourceList?${stringify(params)}`);
}

export async function addAndSubmitQuestionContent(params) {
  return request(`/library/question/addAndSubmitQuestionContent?id=${params.id}`, {
    method: 'POST',
    body: JSON.stringify(params.content),
  });
}

export async function getSourceYearByType(params) {
  return request(`/library/tag/listSourceYear?${stringify(params)}`);
}

export async function getSourceByNameAndYear(params) {
  return request(`/library/tag/listSourceByNameAndYear?${stringify(params)}`);
}

export async function addSourceItem(params) {
  return request(`/library/tag/addSourceItem`, {
    method: 'POST',
    body: params,
  });
}

export async function addTarget(payload) {
  return request(`/library/question/addAndSubmitQuestionTag?id=${payload.id}`, {
    method: 'POST',
    body: payload.params,
  });
}

export async function saveTopicVerify(params) {
  return request(`/library/question/checkQuestion?id=${params}`, {
    method: 'POST',
  });
}

export async function saveTopicAudit(params) {
  return request(`/library/question/auditQuestion?id=${params}`, {
    method: 'POST',
  });
}

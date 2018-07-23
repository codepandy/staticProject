export const getBcStudentlList = (req, res) => {
  res.json({
    bcStudentActivityRecord: {
      message: '',
      code: 1,
      data: [
        {
          attendTime: '时间：2017-12-231 ',
          attendPlace: '爱尖子杯夏令营',
          atteddDescrite: '参与情况描述',
        },
        {
          attendTime: '时间：2017-12-232 ',
          attendPlace: '爱尖子杯夏令营',
          atteddDescrite: '参与情况描述',
        },
        {
          attendTime: '时间：2017-12-233 ',
          attendPlace: '爱尖子杯夏令营',
          atteddDescrite: '参与情况描述',
        },
        {
          attendTime: '时间：2017-12-234 ',
          attendPlace: '爱尖子杯夏令营',
          atteddDescrite: '参与情况描述',
        },
      ],
    },
    querySearchData: {
      code: '1',
      message: '成功！',
      data: [
        {
          studentId: 1234,
          studentName: '高思教育',
          studentIphone: 130000000001,
          attendSchool: '学校（高中）',
          belongTOSchool: '合作',
          signTime: '2018.05.18',
          trialAccount: 1,
          studentOrigin: '活动',
          highestAward: '省一',
          selfRecruit: '/',

          graduatePlace: '清华',
          coursesNumber: 12,
          historyCourses: 12,

          currentReading: '是',
          compeleteCoursesRate: '15%',
          latestLoginTime: '2018.05.18',
          studentStatus: '禁用',
        },
      ],
    },
    basicInfo: {
      code: '1',
      message: '成功！',
      data: {
        studentName: '1234',
        ContactMode: '18045008979',
        signTime: '2018-05-21',
        trialAccount: '非',
        studentOrigin: '学校-结构',
        provice: '山西',
        city: '临汾市',
        attendSchool: '北京一中',

        highestAward: '省一',
        selfRecruit: '/',
        graduatePlace: '清华',
      },
    },
  });
};
export default { getBcStudentlList };

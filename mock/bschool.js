export const getBschoolList = (req, res) => {
  res.json({
    provices: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: '北京',
        },
        {
          resultKey: 2,
          resultValue: '山东',
        },
        {
          resultKey: 3,
          resultValue: '天津',
        },
      ],
    },
    city: {
      code: '1',
      message: '成功！',
      data: [
        {
          resultKey: 1,
          resultValue: '山西',
          children: [
            {
              resultKey: 1,
              resultValue: '临汾',
            },
          ],
        },
        {
          resultKey: 2,
          resultValue: '河北',
          children: [
            {
              resultKey: 12,
              resultValue: '邯郸',
            },
          ],
        },
      ],
    },
    organization: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: '全部',
        },
        {
          resultKey: 2,
          resultValue: '学校—高中',
        },
        {
          resultKey: 3,
          resultValue: '学校—初中',
        },
        {
          resultKey: 4,
          resultValue: '机构',
        },
      ],
    },
    origin: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: '渠道来源1',
        },
        {
          resultKey: 2,
          resultValue: '渠道来源2',
        },
        {
          resultKey: 3,
          resultValue: '渠道来源3',
        },
      ],
    },
    competitionGrade: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: 'A',
        },
        {
          resultKey: 2,
          resultValue: 'B',
        },
        {
          resultKey: 3,
          resultValue: 'C',
        },
      ],
    },
    selfGrade: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: 'A',
        },
        {
          resultKey: 2,
          resultValue: 'B',
        },
        {
          resultKey: 3,
          resultValue: 'C',
        },
      ],
    },
    examGrade: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: 'A',
        },
        {
          resultKey: 2,
          resultValue: 'B',
        },
        {
          resultKey: 3,
          resultValue: 'C',
        },
      ],
    },
    signCeremony: {
      message: '',
      code: 1,
      data: [
        {
          resultKey: 1,
          resultValue: '当前没签约',
        },
        {
          resultKey: 2,
          resultValue: '当前签约',
        },
      ],
    },
    schoolLists: {
      message: '',
      code: 1,
      data: [
        {
          schoolId: 1,
          schoolName: '学校名称',
          schoolType: '学校（高中）',
          schoolOrigin: '合作',
          schoolModel: '集体观看',
          schoolAdmin: '小尖子',
          shoolIphone: '130000000001',
          schoolEnterTime: '2018.05.18',
          schoolHistory: '2',
          schoolCurrent: '是',
          schoolExpireTime: '2019.10.01',
          schoolCurrentTeacher: 5,
          schoolCurrentStudent: 10,
          schoolRecentlyConnect: '2019.10.01',
        },
      ],
    },
  });
};
export default { getBschoolList };

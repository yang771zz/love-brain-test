
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "暧昧对象半小时没回消息，你的第一反应是？",
    options: [
      { id: 'A', text: "Ta肯定在忙，我也忙我的去", score: 0 },
      { id: 'B', text: "拿起手机看好几次，心神不宁", score: 10 },
      { id: 'C', text: "反复翻看之前的聊天记录，怀疑说错话", score: 20 },
      { id: 'D', text: "已经脑补了一出Ta出意外或不爱我的大戏", score: 30 }
    ]
  },
  {
    id: 2,
    text: "为了见对方一面，你愿意坐多久的高铁？",
    options: [
      { id: 'A', text: "超过2小时就算了，让Ta来见我", score: 0 },
      { id: 'B', text: "3-5小时可以接受", score: 10 },
      { id: 'C', text: "半个中国都能跨越，只要能见上一面", score: 20 },
      { id: 'D', text: "哪怕Ta在南极，我挖地洞也要过去", score: 30 }
    ]
  },
  {
    id: 3,
    text: "对方说了一句：“我想喝奶茶”，此时你还没发工资：",
    options: [
      { id: 'A', text: "回复：好巧，我也想喝，你请我？", score: 0 },
      { id: 'B', text: "忍痛买一杯送过去", score: 10 },
      { id: 'C', text: "立刻借钱也要给Ta点个全家桶外卖", score: 20 },
      { id: 'D', text: "自己吃泡面，把所有积蓄都给Ta转过去", score: 30 }
    ]
  },
  {
    id: 4,
    text: "如果你的朋友都说Ta是个渣男/渣女，你会？",
    options: [
      { id: 'A', text: "立刻冷静分析，随时准备撤退", score: 0 },
      { id: 'B', text: "半信半疑，观察一段时间", score: 10 },
      { id: 'C', text: "觉得他们不理解，我们要一起证明爱情", score: 20 },
      { id: 'D', text: "绝交！全世界都在嫉妒我们的真爱", score: 30 }
    ]
  },
  {
    id: 5,
    text: "吵架后对方提了分手，你的状态是？",
    options: [
      { id: 'A', text: "分就分，下一个更乖", score: 0 },
      { id: 'B', text: "难过两天，然后正常生活", score: 10 },
      { id: 'C', text: "写千字长文挽回，各种卑微求原谅", score: 20 },
      { id: 'D', text: "感觉天塌了，没Ta我真的活不下去", score: 30 }
    ]
  },
  {
    id: 6,
    text: "Ta突然夸了一句某位明星很好看，你会：",
    options: [
      { id: 'A', text: "确实好看，我也喜欢", score: 0 },
      { id: 'B', text: "默默照着那个明星的风格改穿搭", score: 10 },
      { id: 'C', text: "审美博主的改造方案已经在收藏夹里了", score: 20 },
      { id: 'D', text: "陷入深深的自卑，觉得自己是世界上最丑的人", score: 30 }
    ]
  },
  {
    id: 7,
    text: "你对另一半社交账号的掌握程度：",
    options: [
      { id: 'A', text: "互不干涉，谁还没点隐私", score: 0 },
      { id: 'B', text: "偶尔会翻翻看", score: 10 },
      { id: 'C', text: "不仅掌握账号，还能根据点赞判断Ta想出轨谁", score: 20 },
      { id: 'D', text: "每天视奸Ta所有社交平台，连互关列表都背下来了", score: 30 }
    ]
  },
  {
    id: 8,
    text: "如果另一半要求你辞掉现在很好的工作去Ta的城市：",
    options: [
      { id: 'A', text: "拒绝，事业是我的命根子", score: 0 },
      { id: 'B', text: "考虑一下，如果那边有更好的机会再去", score: 10 },
      { id: 'C', text: "犹豫很久，但最终还是会为了爱奔波", score: 20 },
      { id: 'D', text: "立刻写辞职报告，爱情面前工资算个屁", score: 30 }
    ]
  },
  {
    id: 9,
    text: "你认为“Ta出轨了，但承诺会改”这句话的真实度：",
    options: [
      { id: 'A', text: "0%，狗改不了吃屎", score: 0 },
      { id: 'B', text: "20%，看表现再决定分不分", score: 10 },
      { id: 'C', text: "80%，只要Ta肯回来，什么都好说", score: 20 },
      { id: 'D', text: "100%，Ta一定是被外面的狐狸精勾引了", score: 30 }
    ]
  },
  {
    id: 10,
    text: "你会在社交平台上发多少关于另一半的内容？",
    options: [
      { id: 'A', text: "几乎不发，生活是自己的", score: 0 },
      { id: 'B', text: "偶尔秀个恩爱", score: 10 },
      { id: 'C', text: "朋友圈几乎被Ta刷屏了", score: 20 },
      { id: 'D', text: "Ta是我的唯一信仰，不发Ta发谁？", score: 30 }
    ]
  },
  {
    id: 11,
    text: "当你们对未来规划产生严重分歧时，你会：",
    options: [
      { id: 'A', text: "坚持自我，不行就散", score: 0 },
      { id: 'B', text: "双方各退一步，协商解决", score: 10 },
      { id: 'C', text: "委屈自己，顺从Ta的所有安排", score: 20 },
      { id: 'D', text: "完全放弃人生目标，Ta说什么就是什么", score: 30 }
    ]
  },
  {
    id: 12,
    text: "Ta忘记了你们的一周年纪念日：",
    options: [
      { id: 'A', text: "提醒Ta，让Ta补个大礼", score: 0 },
      { id: 'B', text: "有点生气，冷战半天", score: 10 },
      { id: 'C', text: "反思是不是自己记错了，或者自己不够好", score: 20 },
      { id: 'D', text: "哭得死去活来，觉得Ta不爱我了但还是舍不得分", score: 30 }
    ]
  },
  {
    id: 13,
    text: "哪怕Ta现在失业、欠债还打游戏，你觉得：",
    options: [
      { id: 'A', text: "这种烂泥扶不上墙，赶紧跑", score: 0 },
      { id: 'B', text: "帮Ta一段时间，不行再撤", score: 10 },
      { id: 'C', text: "Ta是怀才不遇，我要做Ta最后的避风港", score: 20 },
      { id: 'D', text: "这就是纯爱！我们要陪Ta吃苦，我们要感动中国", score: 30 }
    ]
  },
  {
    id: 14,
    text: "只要Ta一个电话，无论你在做什么：",
    options: [
      { id: 'A', text: "等我忙完再说", score: 0 },
      { id: 'B', text: "尽量快点处理完去找Ta", score: 10 },
      { id: 'C', text: "立刻抛下手里重要的事情奔向Ta", score: 20 },
      { id: 'D', text: "哪怕在开会、在睡觉、在珠穆朗玛峰，也要秒回秒到", score: 30 }
    ]
  },
  {
    id: 15,
    text: "你是否觉得自己离不开对方？",
    options: [
      { id: 'A', text: "地球照转，谁离了谁都行", score: 0 },
      { id: 'B', text: "会难过一阵，但能活下去", score: 10 },
      { id: 'C', text: "离了Ta我的人生就失去了意义", score: 20 },
      { id: 'D', text: "我是寄生在Ta身上的灵魂，Ta死了我也没了", score: 30 }
    ]
  }
];

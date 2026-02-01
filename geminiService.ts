
import { GoogleGenAI, Type } from "@google/genai";
import { TestResult } from "../types.ts";

// 分数段兜底文案库 - 恢复至用户喜爱的“经典野菜梗”版本
const FALLBACK_RESULTS = {
  RATIONAL: [
    {
      level: "人间清醒大宗师",
      nickname: "理智边界守门人",
      description: "你的理智简直像极了极地冰川，寒冷、坚硬且无懈可击。多巴胺的波动永远无法撼动逻辑的根基。你清楚地知道爱情只是生活的锦上添花，而非救命稻草。",
      advice: "保持这份清醒，你就是自己的神。",
      warning: "智者不入爱河，建设美丽祖国。"
    }
  ],
  LOVE_BRAIN: [
    {
      level: "挖野菜圣体",
      nickname: "王宝钏分钏",
      description: "2026年了，你的恋爱脑甚至还比去年更强韧了。你这辈子可能就是为挖野菜而生的，建议你直接去山里承包两亩地，别在爱河里淹死了。",
      advice: "别碰手机，先去把反诈APP更新到最新版。",
      warning: "王宝钏看了你都要连夜把野菜地让给你。"
    },
    {
      level: "理智绝缘体",
      nickname: "恋爱脑顶级钉子户",
      description: "对方画个饼你能吃三年，对方画个圈你能跳一辈子。这种牺牲精神，建议去申报世界非物质文化遗产，或者直接去王宝钏对面挖野菜。",
      advice: "多看普法短剧，少看霸道总裁爱上我。",
      warning: "脑子里全是水，正好可以用来洗野菜。"
    }
  ]
};

export const analyzeResult = async (totalScore: number, answers: string[]): Promise<TestResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const isLoveBrain = totalScore > 150;

  // 强化“野菜”和“王宝钏”主题的提示词
  const prompt = `
    这名用户正在参加一个“恋爱脑程度测试”。
    当前年份：2026年。
    总分为 ${totalScore} 分 (满分 450)。
    用户的回答关键词如下: ${answers.join(', ')}。
    
    请根据分值和回答，给出一段深度分析：
    
    1. 如果分数较低 (${totalScore} <= 150)，说明用户非常理智：
       - 语气：正面、推崇独立性。
       - 内容：夸奖其强大的自我意识，称其为“人间清醒”。
       
    2. 如果分数较高 (${totalScore} > 150)，说明用户有恋爱脑倾向：
       - 语气：犀利、毒舌、深度使用“挖野菜”、“王宝钏”、“恋爱脑”等经典网络热梗。
       - 内容：毫不留情地讽刺其在感情中的卑微，重点突出“为了恋爱可以去挖野菜”的荒诞感。
    
    要求：
    - 在代指对方时，必须使用“Ta”这个词。
    - 针对恋爱脑 (${totalScore} > 150)，深度分析中必须包含“挖野菜”相关的调侃。
    - 禁止使用死亡、葬礼等极端词汇。
    - 禁止使用医疗、临床、医生等相关医疗背景词汇。
    
    要求返回 JSON 格式：
    - level: 等级名称
    - nickname: 搞怪昵称 (高分必须和“野菜”或“王宝钏”相关)
    - description: 深度分析 (约80-100字)
    - advice: 避雷指南 (一句话)
    - warning: 醒脑金句 (一句狠话或赞美语)
  `;

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request Timeout")), 12000)
  );

  try {
    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              level: { type: Type.STRING },
              nickname: { type: Type.STRING },
              description: { type: Type.STRING },
              advice: { type: Type.STRING },
              warning: { type: Type.STRING }
            },
            required: ["level", "nickname", "description", "advice", "warning"]
          }
        }
      }),
      timeoutPromise
    ]) as any;

    const result = JSON.parse(response.text.trim());
    return {
      ...result,
      score: totalScore
    };
  } catch (error) {
    console.error("Gemini analysis failed, using fallback:", error);
    const pool = isLoveBrain ? FALLBACK_RESULTS.LOVE_BRAIN : FALLBACK_RESULTS.RATIONAL;
    const fallback = pool[Math.floor(Math.random() * pool.length)];
    return {
      ...fallback,
      score: totalScore
    };
  }
};

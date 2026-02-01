
import React, { useState, useMemo, useRef } from 'react';
import { AppState, TestResult } from './types';
import { QUESTIONS } from './constants';
import { analyzeResult } from './services/geminiService';
import html2canvas from 'html2canvas';

// Components
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full h-1 bg-rose-50 rounded-full overflow-hidden mb-4">
    <div 
      className="h-full bg-gradient-to-r from-rose-300 to-rose-500 transition-all duration-500 ease-out"
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [resultPageIndex, setResultPageIndex] = useState(0);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => {
    setState(AppState.QUIZ);
    setCurrentQuestionIndex(0);
    setScores([]);
    setSelectedAnswers([]);
    setResultPageIndex(0);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setScores(prev => prev.slice(0, -1));
      setSelectedAnswers(prev => prev.slice(0, -1));
    }
  };

  const handleAnswer = (score: number, answerText: string) => {
    const newScores = [...scores, score];
    const newAnswers = [...selectedAnswers, answerText];
    setScores(newScores);
    setSelectedAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      processResults(newScores, newAnswers);
    }
  };

  const processResults = async (finalScores: number[], finalAnswers: string[]) => {
    setState(AppState.ANALYZING);
    const totalScore = finalScores.reduce((a, b) => a + b, 0);
    const analysis = await analyzeResult(totalScore, finalAnswers);
    setResult(analysis);
    setState(AppState.RESULT);
  };

  const generatePoster = async () => {
    if (!posterRef.current || isGenerating) return;
    
    setIsGenerating(true);
    try {
      await document.fonts.ready;
    } catch(e) {}

    try {
      const el = posterRef.current;
      
      const canvas = await html2canvas(el, {
        useCORS: true,
        scale: 3, 
        backgroundColor: '#fffcfc', 
        logging: false,
        allowTaint: true,
        width: el.offsetWidth,
        height: el.offsetHeight,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `恋爱脑报告-${result?.nickname}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate poster:', err);
      alert('保存失败，请截图保存');
    } finally {
      setIsGenerating(false);
    }
  };

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  return (
    <div className="h5-container p-4 sm:p-6 h-screen overflow-hidden flex flex-col bg-[#fffcfc] relative">
      {/* 首页 */}
      {state === AppState.HOME && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700 w-full relative">
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 pointer-events-none flex items-center justify-center opacity-[0.05]">
            <svg viewBox="0 0 24 24" fill="#fb7185" className="w-full h-auto">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <div className="w-full max-w-[340px] border-2 border-rose-100/60 py-12 px-8 rounded-[3rem] relative bg-white/30 backdrop-blur-sm flex flex-col items-center shadow-xl shadow-rose-100/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 shadow-sm">
               <span className="text-[9px] font-black text-rose-400 uppercase tracking-[0.2em]">Diagnostic Lab</span>
            </div>

            <div className="mb-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-rose-50 animate-float">
                <i className="fa-solid fa-heart-pulse text-rose-400 text-3xl"></i>
              </div>
            </div>

            <h1 className="text-3xl font-black mb-2 gradient-text text-center tracking-tight">恋爱脑等级测试</h1>
            <p className="text-rose-300 text-[10px] tracking-[0.2em] font-bold mb-10 uppercase text-center">Bio-Scan v2.0</p>
            
            <div className="glass-card rounded-3xl p-6 w-full border border-white text-center">
              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-medium">
                智者不入爱河，笨蛋不听劝阻。<br />
                <span className="text-rose-500 font-bold block mt-1">“有些坑，总得跳了才知道深浅。”</span>
              </p>
              <button 
                onClick={startQuiz}
                className="w-full py-4 font-black text-white bg-rose-500 rounded-full active:scale-95 shadow-xl shadow-rose-100 hover:bg-rose-600 transition-all text-sm tracking-widest"
              >
                开启鉴定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 答题页 */}
      {state === AppState.QUIZ && (
        <div className="flex-1 flex flex-col justify-center w-full animate-in slide-in-from-bottom-4 duration-500">
          <div className="w-full max-w-[340px] mx-auto p-6 rounded-[2.5rem] border-2 border-rose-100 bg-white shadow-2xl shadow-rose-100/20 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-rose-400 font-black text-[10px] uppercase tracking-widest">Section {currentQuestionIndex + 1}</span>
              {currentQuestionIndex > 0 && (
                <button onClick={handleBack} className="text-[10px] text-stone-400 font-bold flex items-center hover:text-rose-400">
                  <i className="fa-solid fa-rotate-left mr-1"></i> 返回
                </button>
              )}
            </div>
            <ProgressBar current={currentQuestionIndex + 1} total={QUESTIONS.length} />
            <h2 className="text-lg font-bold text-stone-800 mb-8 text-center leading-relaxed">{currentQuestion.text}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.score, option.text)}
                  className="w-full text-left p-4 rounded-2xl border border-rose-50 bg-white shadow-sm hover:border-rose-300 transition-all active:scale-[0.98] flex items-center group"
                >
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-400 flex items-center justify-center mr-3 font-bold text-xs group-hover:bg-rose-500 group-hover:text-white transition-colors">{option.id}</div>
                  <span className="text-stone-600 font-medium text-xs leading-snug">{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 分析中 */}
      {state === AppState.ANALYZING && (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse py-20">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute inset-0 border-2 border-rose-50 border-t-rose-400 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-base font-bold text-stone-700 mb-1">正在剥离感性成分...</h3>
          <p className="text-stone-400 text-[9px] uppercase tracking-widest">AI NEURAL ANALYSIS</p>
        </div>
      )}

      {/* 结果页 */}
      {state === AppState.RESULT && result && (
        <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in duration-700 overflow-hidden">
          {/* 海报捕获容器 */}
          <div 
            ref={posterRef}
            className="w-full flex-1 flex flex-col items-center justify-center relative p-4 bg-[#fffcfc]"
            style={{
              backgroundImage: 'radial-gradient(#ffe4e6 0.8px, transparent 0.8px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* 背景心形装饰 */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 -z-10 pointer-events-none flex items-center justify-center opacity-[0.03]">
              <svg viewBox="0 0 24 24" fill="#fb7185" className="w-[80%] h-auto">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            {/* 拍立得卡片核心区域 */}
            <div 
              data-poster-container
              className={`bg-white rounded-xl result-card-shadow relative overflow-hidden border border-stone-100 w-full max-w-[320px] flex flex-col h-auto aspect-[3/4.2] max-h-[85vh] transition-all duration-300 ${resultPageIndex === 0 ? 'p-1.5 pb-5' : 'p-3 pb-8'}`}
            >
              <div className={`flex-1 bg-white border border-stone-50 rounded-sm flex flex-col relative overflow-hidden ${resultPageIndex === 0 ? 'p-2.5' : 'p-4'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-rose-500"></div>
                
                <div data-poster-body className="relative flex-1 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-5 h-5 rounded bg-rose-500 flex items-center justify-center text-white text-[8px]">
                        <i className="fa-solid fa-microchip"></i>
                      </div>
                      <span className="text-stone-900 font-black text-[9px] uppercase tracking-tighter">Diagnostic Data</span>
                    </div>
                  </div>

                  {resultPageIndex === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden py-1">
                      {/* 得分显示区域 */}
                      <div className="relative flex flex-col items-center py-4 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center -z-10">
                          <div className="w-32 h-32 border border-dashed border-rose-100 rounded-full animate-[spin_60s_linear_infinite]"></div>
                        </div>
                        <span className="text-rose-500 font-black text-[10px] tracking-tight mb-1 opacity-80">恋爱脑鉴定结果：</span>
                        <div className="flex items-baseline">
                          <span className="text-7xl font-black text-stone-900 leading-none tracking-tighter">{result.score}</span>
                          <span className="text-stone-300 font-bold text-xs ml-1">/ 450</span>
                        </div>
                      </div>

                      {/* 昵称显示区域 - 下移并放大 */}
                      <div className="text-center w-full mt-4 mb-6">
                        <h2 className="font-black text-stone-900 text-2xl tracking-tight leading-tight px-4">{result.nickname}</h2>
                      </div>

                      {/* 建议区域 */}
                      <div className="w-full bg-stone-50 border border-stone-100 p-4 rounded-lg flex-shrink-0 mb-2">
                        <div className="flex items-center space-x-1.5 mb-1.5">
                          <i className="fa-solid fa-shield-heart text-rose-400 text-[9px]"></i>
                          <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Growth Advice</span>
                        </div>
                        <p className="text-[clamp(10px,2.8vw,12px)] text-stone-600 font-bold leading-relaxed">{result.advice}</p>
                      </div>

                      {/* 切换详情按钮 */}
                      <button 
                        data-html2canvas-ignore
                        onClick={() => setResultPageIndex(1)}
                        className="mt-2 text-[8px] font-black text-rose-400 uppercase tracking-widest flex items-center bg-rose-50 px-4 py-2 rounded hover:bg-rose-100 transition-colors"
                      >
                        查看详细报告
                        <i className="fa-solid fa-chevron-right ml-1.5 text-[7px]"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-2 duration-300 overflow-hidden">
                      <div className="flex-1 flex flex-col space-y-2.5 overflow-hidden">
                        <div data-analysis-card className="bg-stone-50 border border-stone-100 p-3 pt-6 rounded-lg flex-[1.6] relative flex flex-col shadow-inner overflow-hidden min-h-0">
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-stone-200/50"></div>
                          <div className="absolute top-[5px] left-4 px-2 py-0.5 bg-stone-900 text-white text-[5px] font-black rounded uppercase tracking-widest flex items-center">
                            <i className="fa-solid fa-dna mr-1 text-rose-400"></i>
                            Mechanism Scan
                          </div>
                          <div className="flex-1 flex items-center mt-1 overflow-hidden">
                            <p className="text-stone-600 text-[clamp(10px,2.8vw,11px)] leading-[1.6] font-bold text-justify px-1">
                              {result.description}
                            </p>
                          </div>
                          <div className="mt-1 flex justify-end">
                            <span className="text-[5px] text-stone-300 font-black tracking-widest uppercase">Deep Bio-Analysis</span>
                          </div>
                        </div>

                        <div data-quote-card className="bg-rose-500 p-5 rounded-lg text-white shadow-lg relative overflow-hidden flex flex-col items-center justify-center flex-1 min-h-0">
                          <i className="fa-solid fa-quote-left absolute top-2 left-2 text-xl opacity-20"></i>
                          <div className="relative z-10 w-full">
                            <p className="font-black text-[clamp(11px,3.4vw,14px)] text-center leading-relaxed px-2">“{result.warning}”</p>
                          </div>
                          <i className="fa-solid fa-quote-right absolute bottom-2 right-2 text-xl opacity-20"></i>
                        </div>
                      </div>

                      <div data-html2canvas-ignore className="mt-2 flex justify-center">
                        <button 
                          onClick={() => setResultPageIndex(0)}
                          className="text-[8px] font-black text-stone-300 uppercase tracking-widest flex items-center px-3 py-1 border border-stone-100 rounded hover:text-rose-400 transition-colors"
                        >
                          <i className="fa-solid fa-arrow-left mr-1"></i>
                          返回
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center space-x-2 opacity-30">
                <span className="text-[6px] font-black tracking-[0.3em] uppercase text-stone-400">Personal Love Report</span>
              </div>
            </div>
          </div>

          {/* 操作按钮区 */}
          <div className="w-full max-w-[320px] mb-8 grid grid-cols-2 gap-3 px-1">
            <button 
              onClick={startQuiz}
              className="py-3 bg-stone-100 text-stone-400 rounded-lg font-black text-[10px] tracking-widest active:scale-95 transition-all flex items-center justify-center hover:bg-stone-200"
            >
              RETEST
            </button>
            <button 
              onClick={generatePoster}
              disabled={isGenerating}
              className="py-3 bg-rose-500 text-white rounded-lg font-black text-[10px] tracking-widest active:scale-95 shadow-md shadow-rose-100 disabled:opacity-50 flex items-center justify-center transition-all hover:bg-rose-600"
            >
              {isGenerating ? <i className="fa-solid fa-spinner fa-spin mr-2"></i> : <i className="fa-solid fa-save mr-2"></i>}
              SAVE IMAGE
            </button>
          </div>
        </div>
      )}

      {/* 免责声明 */}
      {(state === AppState.HOME || state === AppState.RESULT) && (
        <div className="w-full mt-auto py-3 px-4 flex flex-col items-center flex-shrink-0">
          <div className="text-[7px] text-stone-200 text-center leading-relaxed font-bold uppercase tracking-tight opacity-40">
            <p>AI-DRIVEN ENTERTAINMENT ONLY • NO MEDICAL BASIS</p>
          </div>
          <div className="flex items-center justify-center space-x-2 text-stone-200 text-[7px] font-bold uppercase mt-1 opacity-30">
            <span>© 2026 LOVE LAB</span>
            <span className="w-0.5 h-0.5 bg-stone-200 rounded-full"></span>
            <span>SECURE ENCRYPTED</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

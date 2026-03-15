'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import BaziForm from './components/BaziForm';
import LifeKLineChart from './components/LifeKLineChart';
import AnalysisResult from './components/AnalysisResult';
import ThemeToggle from './components/ThemeToggle';
import ExportButton from './components/ExportButton';
import { useUser } from './components/useUser';
import { useBaziRecords } from './components/useBaziRecords';
import PrivacyConsent from './components/PrivacyConsent';
import ShareButton from './components/ShareButton';
import { UserInput, LifeDestinyResult } from './types';
import { generateLifeAnalysis } from './services/geminiService';
import { Sparkles, AlertCircle, BookOpen, Moon, Save, User } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LifeDestinyResult | null>(null);
  const [inputData, setInputData] = useState<UserInput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 用户识别
  const { userId, isLoading: userLoading } = useUser();
  const { records, saveRecord, fetchRecords } = useBaziRecords(userId);

  const handleFormSubmit = async (data: UserInput) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setSaveSuccess(false);

    try {
      const analysis = await generateLifeAnalysis(data);
      setResult(analysis);
      setInputData(data);  // 保存原始输入数据
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "命理测算过程中发生了意外错误，请重试。";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 保存命盘
  const handleSaveRecord = async () => {
    if (!result || !userId) return;

    setSaveLoading(true);
    try {
      const saveResult = await saveRecord({
        name: inputData?.name || result.analysis.summary.substring(0, 20) || '命盘',
        gender: inputData?.gender || 'unknown',
        birthYear: inputData?.birthYear ? parseInt(inputData.birthYear) : new Date().getFullYear(),
        yearPillar: result.analysis.bazi[0] || '',
        monthPillar: result.analysis.bazi[1] || '',
        dayPillar: result.analysis.bazi[2] || '',
        hourPillar: result.analysis.bazi[3] || '',
        startAge: inputData?.startAge ? parseInt(inputData.startAge) : undefined,
        firstDaYun: inputData?.firstDaYun,
        analysisResult: JSON.stringify(result.analysis),
        chartData: JSON.stringify(result.chartData),
      });

      if (saveResult) {
        setSaveSuccess(true);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <>
      <PrivacyConsent />
      <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] flex flex-col items-center relative overflow-hidden">
      {/* Ink wash background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e8e4dc] via-transparent to-[#d4cfc4] dark:from-[#1a1a1a] dark:via-transparent dark:to-[#0f0f0f]" />
      </div>

      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md border-b border-[#e5e0d8] dark:border-[#2a2a2a] py-5 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Seal stamp logo */}
            <div className="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-sm">
              <Moon className="w-6 h-6 text-[#c9a959] dark:text-[#1a1a1a]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] tracking-[0.2em]">卜算子</h1>
              <p className="text-xs text-[#8a8a8a] dark:text-[#666] tracking-[0.3em]">DESTINY DIVINATION</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[#8b7355] dark:text-[#c9a959] hover:text-[#6b5a45] dark:hover:text-[#d4b96a] text-sm transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">我的命盘</span>
            </Link>
            <div className="hidden md:block text-xs text-[#9a9a9a] dark:text-[#555] font-light tracking-wide">
               AI divination
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-12 relative z-10">

        {/* If no result, show intro and form */}
        {!result && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 animate-fade-in">
            {/* Hero text with brush stroke effect */}
            <div className="text-center max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-6 leading-tight">
                洞悉命运起伏
                <span className="block mt-2 text-[#8b7355] dark:text-[#c9a959]">预见人生轨迹</span>
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#c9a959] to-transparent mx-auto mb-6" />
              <p className="text-[#666] dark:text-[#999] text-base leading-relaxed">
                融合传统<span className="text-[#8b7355] dark:text-[#c9a959] font-medium">八字命理</span>与现代数据可视化，
                洞悉命运起伏，预见人生轨迹。
              </p>
            </div>

            {/* Tutorial link - elegant style */}
            <a
              href="/guide"
              className="group flex items-center gap-3 text-[#8b7355] dark:text-[#c9a959] hover:text-[#6b5a45] dark:hover:text-[#d4b96a] transition-colors text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span className="border-b border-[#8b7355]/30 dark:border-[#c9a959]/30 group-hover:border-[#8b7355] dark:group-hover:border-[#c9a959] pb-0.5">
                阅读使用指南
              </span>
            </a>

            <BaziForm onSubmit={handleFormSubmit} isLoading={loading} />

            {error && (
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20 px-4 py-3 rounded-md border border-red-100/50 dark:border-red-800/50 max-w-md w-full backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Results View */}
        {result && (
          <div className="animate-fade-in space-y-10">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#e5e0d8] dark:border-[#2a2a2a]">
               <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4ec]">命盘分析</h2>
               <div className="flex flex-wrap items-center gap-2 md:gap-3">
                 {saveSuccess ? (
                   <span className="text-green-600 dark:text-green-400 text-sm">已保存</span>
                 ) : (
                   <button
                     onClick={handleSaveRecord}
                     disabled={saveLoading}
                     className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg text-xs md:text-sm transition-colors disabled:opacity-50"
                   >
                     <Save className="w-3 md:w-4 h-3 md:h-4" />
                     {saveLoading ? '保存中...' : '保存命盘'}
                   </button>
                 )}
                 <ExportButton targetRef={resultsRef} />
                 {result && <ShareButton result={result} />}
                 <button
                   onClick={() => setResult(null)}
                   className="text-[#8b7355] dark:text-[#c9a959] hover:text-[#6b5a45] dark:hover:text-[#d4b96a] text-sm transition-colors"
                 >
                   ← 重新测算
                 </button>
               </div>
            </div>

            {/* Export Container */}
            <div ref={resultsRef} className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl">
            {/* The Chart */}
            <section className="space-y-4 mb-10">
              <h3 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] flex items-center gap-3">
                 <span className="w-8 h-px bg-[#c9a959]"></span>
                 人生流年走势
              </h3>
              <p className="text-xs text-[#888] dark:text-[#666]">
                红色代表<span className="text-red-600 dark:text-red-400 font-medium">吉</span>，绿色代表<span className="text-green-600 dark:text-green-400 font-medium">凶</span>
              </p>
              <LifeKLineChart data={result.chartData} />
            </section>

            {/* The Text Report */}
            <section>
               <AnalysisResult analysis={result.analysis} />
            </section>

            {/* Watermark */}
            <div className="text-center text-gray-400 dark:text-gray-500 text-xs py-6 mt-8 border-t border-gray-100 dark:border-gray-800">
              卜算子 | 八字命理可视化
            </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer - minimal */}
      <footer className="w-full py-6 mt-auto relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center flex flex-col gap-2">
          <p className="text-xs text-[#999] dark:text-[#444]">
            仅供娱乐与文化研究，请勿迷信
          </p>
          <div className="flex justify-center gap-4 text-xs">
            <Link href="/guide" className="text-[#999] dark:text-[#444] hover:text-[#c9a959] dark:hover:text-[#c9a959]">
              使用指南
            </Link>
            <Link href="/privacy" className="text-[#999] dark:text-[#444] hover:text-[#c9a959] dark:hover:text-[#c9a959]">
              隐私政策
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LifeKLineChart from '../components/LifeKLineChart';
import AnalysisResult from '../components/AnalysisResult';
import { LifeDestinyResult } from '../types';
import { Moon, Home } from 'lucide-react';

function ShareContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<LifeDestinyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const encodedData = searchParams.get('data');
      if (!encodedData) {
        setError('无效的分享链接');
        return;
      }

      const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));

      const result: LifeDestinyResult = {
        analysis: {
          bazi: decoded.bazi,
          summary: decoded.summary,
          summaryScore: decoded.summaryScore,
          industry: decoded.industry,
          industryScore: decoded.industryScore,
          wealth: decoded.wealth,
          wealthScore: decoded.wealthScore,
          marriage: decoded.marriage,
          marriageScore: decoded.marriageScore,
          health: decoded.health,
          healthScore: decoded.healthScore,
          family: decoded.family,
          familyScore: decoded.familyScore,
        },
        chartData: decoded.chartData,
      };

      setData(result);
    } catch (error) {
      console.error('Failed to parse share data:', error);
      setError('链接已过期或无效');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
          <Moon className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">{error}</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-6">请重新生成分享链接</p>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg"
        >
          <Home className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#c9a959] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] flex flex-col">
      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md border-b border-[#e5e0d8] dark:border-[#2a2a2a] py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-sm">
              <Moon className="w-5 h-5 text-[#c9a959] dark:text-[#1a1a1a]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1a1a1a] dark:text-[#e8e4dc]">卜算子</h1>
              <p className="text-xs text-[#8a8a8a] dark:text-[#666]">朋友分享的命理分析</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg text-sm"
          >
            我也算一算
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl">
          {/* Chart */}
          <section className="space-y-4 mb-10">
            <h3 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] flex items-center gap-3">
              <span className="w-8 h-px bg-[#c9a959]"></span>
              人生流年走势
            </h3>
            <p className="text-xs text-[#888] dark:text-[#666]">
              红色代表<span className="text-red-600 dark:text-red-400 font-medium">吉</span>，绿色代表<span className="text-green-600 dark:text-green-400 font-medium">凶</span>
            </p>
            <LifeKLineChart data={data.chartData} />
          </section>

          {/* Analysis */}
          <section>
            <AnalysisResult analysis={data.analysis} />
          </section>

          {/* Watermark */}
          <div className="text-center text-gray-400 dark:text-gray-500 text-xs py-6 mt-8 border-t border-gray-100 dark:border-gray-800">
            卜算子 | 八字命理可视化
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-[#999] dark:text-[#444]">
            仅供娱乐与文化研究，请勿迷信
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#c9a959] border-t-transparent rounded-full" />
      </div>
    }>
      <ShareContent />
    </Suspense>
  );
}

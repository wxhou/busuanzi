'use client';

import Link from 'next/link';
import { ArrowLeft, Sparkles, Calculator, TrendingUp, BarChart3 } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#e8e4dc] via-transparent to-[#d4cfc4] dark:from-[#1a1a1a] dark:via-transparent dark:to-[#0f0f0f]" />
      </div>

      {/* Header */}
      <header className="w-full bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md border-b border-[#e5e0d8] dark:border-[#2a2a2a] py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e4dc] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-3">
            使用指南
          </h1>
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#c9a959] to-transparent mx-auto" />
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <section className="p-6 bg-white/60 dark:bg-[#141414]/60 rounded-lg border border-[#e5e0d8] dark:border-[#2a2a2a]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-full text-white dark:text-[#1a1a1a] font-bold">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">
                  输入基础信息
                </h2>
                <p className="text-[#666] dark:text-[#888] text-sm leading-relaxed">
                  首先填写您的姓名（可选）和性别。这些信息用于确定大运的顺逆走势。
                </p>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="p-6 bg-white/60 dark:bg-[#141414]/60 rounded-lg border border-[#e5e0d8] dark:border-[#2a2a2a]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-full text-white dark:text-[#1a1a1a] font-bold">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">
                  填写四柱信息
                </h2>
                <p className="text-[#666] dark:text-[#888] text-sm leading-relaxed">
                  输入您的出生年份和四柱（年柱、月柱、日柱、时柱）。如果您不知道自己的四柱，可以使用在线排盘工具获取。
                </p>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="p-6 bg-white/60 dark:bg-[#141414]/60 rounded-lg border border-[#e5e0d8] dark:border-[#2a2a2a]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-full text-white dark:text-[#1a1a1a] font-bold">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">
                  填写大运信息
                </h2>
                <p className="text-[#666] dark:text-[#888] text-sm leading-relaxed">
                  输入起运年龄和第一步大运。大运信息决定了您人生不同阶段的运势走向。
                </p>
              </div>
            </div>
          </section>

          {/* Step 4 */}
          <section className="p-6 bg-white/60 dark:bg-[#141414]/60 rounded-lg border border-[#e5e0d8] dark:border-[#2a2a2a]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-full text-white dark:text-[#1a1a1a] font-bold">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">
                  查看分析结果
                </h2>
                <p className="text-[#666] dark:text-[#888] text-sm leading-relaxed">
                  点击「开始推演」，系统将生成您的命理图谱和分析报告。绿色代表好运势，红色代表需要注意的时期。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-[#faf9f7] dark:bg-[#141414] rounded-lg border border-[#e5e0d8] dark:border-[#2a2a2a]">
          <h3 className="text-sm font-medium text-[#8b7355] dark:text-[#c9a959] mb-3">
            温馨提示
          </h3>
          <ul className="space-y-2 text-sm text-[#666] dark:text-[#888]">
            <li>• 本测算仅供娱乐参考，请勿过度迷信</li>
            <li>• 八字命理有多种流派，本系统采用简化模型</li>
            <li>• 如需精确命盘，建议咨询专业命理师</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] dark:bg-[#c9a959] hover:bg-[#333] dark:hover:bg-[#d4b96a] text-white dark:text-[#1a1a1a] px-6 py-3 rounded-md text-sm font-medium transition-colors"
          >
            开始测算
          </Link>
        </div>
      </main>
    </div>
  );
}

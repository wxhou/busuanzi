'use client';

import { useState } from 'react';
import { Share2, Copy, Check, Link } from 'lucide-react';
import { LifeDestinyResult } from '../types';

interface ShareButtonProps {
  result: LifeDestinyResult;
}

export default function ShareButton({ result }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // 生成 base64 分享链接（数据直接编码在 URL 中）
  const generateShareLink = () => {
    try {
      const shareData = {
        bazi: result.analysis.bazi,
        summary: result.analysis.summary,
        summaryScore: result.analysis.summaryScore,
        industry: result.analysis.industry,
        industryScore: result.analysis.industryScore,
        wealth: result.analysis.wealth,
        wealthScore: result.analysis.wealthScore,
        marriage: result.analysis.marriage,
        marriageScore: result.analysis.marriageScore,
        health: result.analysis.health,
        healthScore: result.analysis.healthScore,
        family: result.analysis.family,
        familyScore: result.analysis.familyScore,
        chartData: result.chartData,
      };

      const encoded = btoa(encodeURIComponent(JSON.stringify(shareData)));
      const url = `${window.location.origin}/share?data=${encoded}`;
      setShareUrl(url);
      return url;
    } catch (error) {
      console.error('Failed to generate share link:', error);
      return '';
    }
  };

  const handleShare = async () => {
    const url = generateShareLink();
    if (!url) return;

    // 尝试使用 Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: '卜算子 - 命理分析',
          text: `我的命盘分析：${result.analysis.summary.substring(0, 50)}...`,
          url,
        });
        return;
      } catch (error) {
        // 用户取消或不支持，继续使用复制链接
      }
    }

    // 回退到复制链接
    setIsOpen(true);
  };

  const copyToClipboard = async () => {
    if (!shareUrl) {
      generateShareLink();
    }

    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg text-sm transition-colors"
      >
        <Share2 className="w-4 h-4" />
        分享
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-3 z-50">
          <div className="px-3 py-2 border-b border-gray-100 dark:border-slate-700">
            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">分享链接</p>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700 rounded-lg px-3 py-2">
              <Link className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 text-xs text-gray-600 dark:text-slate-300 bg-transparent outline-none truncate"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  复制链接
                </>
              )}
            </button>
          </div>
          <div className="px-3 py-2 text-xs text-gray-400 dark:text-slate-500">
            链接有效期 7 天
          </div>
        </div>
      )}
    </div>
  );
}

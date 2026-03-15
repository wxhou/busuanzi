'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'busuanzi_privacy_consent';

export default function PrivacyConsent() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShow(true);
    }
    setLoading(false);
  }, []);

  const handleAgree = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setShow(false);
  };

  if (loading || !show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-md w-full shadow-2xl">
        <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4">隐私提示</h2>

        <div className="text-sm text-gray-600 dark:text-slate-300 mb-6 max-h-60 overflow-y-auto">
          <p className="mb-3">
            欢迎使用卜算子！在开始之前，请您了解以下信息：
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>我们收集您的八字信息用于命理分析</li>
            <li>数据存储在您的本地设备中</li>
            <li>分析数据会发送至第三方 AI 服务进行处理</li>
            <li>本服务仅供娱乐和文化研究，请勿迷信</li>
          </ul>
          <p className="mt-3">
            详细信息请阅读 <Link href="/privacy" className="text-[#c9a959] hover:underline">隐私政策</Link>。
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAgree}
            className="flex-1 px-4 py-2 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg transition-colors"
          >
            同意并开始使用
          </button>
          <button
            onClick={() => {
              localStorage.setItem(CONSENT_KEY, 'declined');
              setShow(false);
            }}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
          >
            不同意
          </button>
        </div>
      </div>
    </div>
  );
}

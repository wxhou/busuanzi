'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../components/useUser';
import { useBaziRecords } from '../components/useBaziRecords';
import { Moon, Trash2, Edit2, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { userId, isLoading: userLoading, logout } = useUser();
  const { records, isLoading, error, fetchRecords, deleteRecord, deleteAllRecords } = useBaziRecords(userId);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (userId && !userLoading) {
      fetchRecords();
    }
  }, [userId, userLoading, fetchRecords]);

  const handleDelete = async (id: string) => {
    await deleteRecord(id);
    setDeleteConfirm(null);
  };

  const handleDeleteAll = async () => {
    await deleteAllRecords();
    setDeleteConfirm(null);
  };

  if (userLoading || isLoading) {
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
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#c9a959] rounded-sm">
              <Moon className="w-5 h-5 text-[#c9a959] dark:text-[#1a1a1a]" />
            </div>
            <span className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc]">卜算子</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="text-sm text-[#8b7355] dark:text-[#c9a959] hover:underline"
          >
            切换用户
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc]">我的命盘</h1>
          {records.length > 0 && (
            <button
              onClick={() => setDeleteConfirm('all')}
              className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              清除所有数据
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20 px-4 py-3 rounded-md mb-4">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* 命盘列表 */}
        {records.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
              <Moon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-[#666] dark:text-[#999] mb-4">暂无保存的命盘</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              开始测算
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-[#1a1a1a] dark:text-[#e8e4dc]">{record.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                      {record.year_pillar} {record.month_pillar} {record.day_pillar} {record.hour_pillar}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                      {new Date(record.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeleteConfirm(record.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>

                {/* 删除确认 */}
                {deleteConfirm === record.id && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <p className="text-sm text-gray-600 dark:text-slate-300 mb-2">确定要删除这条命盘记录吗？</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        确认删除
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-sm rounded hover:bg-gray-200 dark:hover:bg-slate-600"
                      >
                        取消
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 新增测算按钮 */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a959] hover:bg-[#b89849] text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            新增测算
          </Link>
        </div>
      </main>

      {/* 清除所有数据确认 */}
      {deleteConfirm === 'all' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-2">清除所有数据</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-4">此操作不可恢复，确定要删除所有数据吗？</p>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteAll}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                确认删除
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

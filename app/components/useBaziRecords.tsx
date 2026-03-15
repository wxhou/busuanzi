'use client';

import { useState, useCallback } from 'react';

export interface BaziRecord {
  id: string;
  user_id: string;
  name: string;
  gender: string;
  birth_year: number;
  year_pillar: string;
  month_pillar: string;
  day_pillar: string;
  hour_pillar: string;
  start_age?: number;
  first_da_yun?: string;
  analysis_result?: string;
  chart_data?: string;
  created_at: string;
}

export function useBaziRecords(userId: string | null) {
  const [records, setRecords] = useState<BaziRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取命盘列表
  const fetchRecords = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/bazi', {
        headers: { 'x-user-id': userId },
      });

      if (!response.ok) {
        throw new Error('获取命盘记录失败');
      }

      const data = await response.json();
      setRecords(data.records || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取记录失败');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 保存命盘
  const saveRecord = useCallback(async (record: {
    name: string;
    gender: string;
    birthYear: number;
    yearPillar: string;
    monthPillar: string;
    dayPillar: string;
    hourPillar: string;
    startAge?: number;
    firstDaYun?: string;
    analysisResult?: string;
    chartData?: string;
  }) => {
    if (!userId) return null;

    try {
      const response = await fetch('/api/bazi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存失败');
      }

      await fetchRecords();
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : '保存失败');
      return null;
    }
  }, [userId, fetchRecords]);

  // 删除命盘
  const deleteRecord = useCallback(async (id: string) => {
    if (!userId) return false;

    try {
      const response = await fetch(`/api/bazi/${id}`, {
        method: 'DELETE',
        headers: { 'x-user-id': userId },
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      await fetchRecords();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败');
      return false;
    }
  }, [userId, fetchRecords]);

  // 更新命盘名称
  const updateRecordName = useCallback(async (id: string, name: string) => {
    if (!userId) return false;

    try {
      const response = await fetch(`/api/bazi/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('更新失败');
      }

      await fetchRecords();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新失败');
      return false;
    }
  }, [userId, fetchRecords]);

  // 删除所有记录
  const deleteAllRecords = useCallback(async () => {
    if (!userId) return false;

    try {
      const response = await fetch('/api/bazi', {
        method: 'DELETE',
        headers: { 'x-user-id': userId },
      });

      if (!response.ok) {
        throw new Error('删除失败');
      }

      setRecords([]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除失败');
      return false;
    }
  }, [userId]);

  return {
    records,
    isLoading,
    error,
    fetchRecords,
    saveRecord,
    deleteRecord,
    updateRecordName,
    deleteAllRecords,
  };
}

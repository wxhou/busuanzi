'use client';

import { useState, useEffect, useCallback } from 'react';

const USER_ID_KEY = 'busuanzi_user_id';

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化用户 ID
  useEffect(() => {
    const storedId = localStorage.getItem(USER_ID_KEY);

    if (storedId) {
      setUserId(storedId);
      setIsLoading(false);
    } else {
      // 创建新用户
      const newId = crypto.randomUUID();
      localStorage.setItem(USER_ID_KEY, newId);
      setUserId(newId);
      setIsLoading(false);
    }
  }, []);

  // 登出（清除用户 ID）
  const logout = useCallback(() => {
    localStorage.removeItem(USER_ID_KEY);
    // 创建新用户
    const newId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, newId);
    setUserId(newId);
  }, []);

  return {
    userId,
    isLoading,
    logout,
  };
}

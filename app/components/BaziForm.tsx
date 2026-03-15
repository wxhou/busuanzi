'use client';

import React, { useState, useMemo } from 'react';
import { UserInput, Gender } from '../types';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface BaziFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const BaziForm: React.FC<BaziFormProps> = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    gender: Gender.MALE,
    birthYear: '',
    yearPillar: '',
    monthPillar: '',
    dayPillar: '',
    hourPillar: '',
    startAge: '',
    firstDaYun: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const canProceedToStep2 = () => true;

  const canSubmit = () => {
    return (
      formData.birthYear.trim() !== '' &&
      formData.yearPillar.trim() !== '' &&
      formData.monthPillar.trim() !== '' &&
      formData.dayPillar.trim() !== '' &&
      formData.hourPillar.trim() !== '' &&
      formData.startAge.trim() !== '' &&
      formData.firstDaYun.trim() !== ''
    );
  };

  const handleNext = () => {
    if (canProceedToStep2()) {
      setCurrentStep(2);
    }
  };

  const handlePrev = () => {
    setCurrentStep(1);
  };

  const daYunDirectionInfo = useMemo(() => {
    if (!formData.yearPillar) return '请输入年柱后显示';

    const firstChar = formData.yearPillar.trim().charAt(0);
    const yangStems = ['甲', '丙', '戊', '庚', '壬'];
    const yinStems = ['乙', '丁', '己', '辛', '癸'];

    let isYangYear = true;
    if (yinStems.includes(firstChar)) isYangYear = false;

    let isForward = false;
    if (formData.gender === Gender.MALE) {
      isForward = isYangYear;
    } else {
      isForward = !isYangYear;
    }

    return isForward ? '顺行' : '逆行';
  }, [formData.yearPillar, formData.gender]);

  return (
    <div className="w-full max-w-md bg-white/90 dark:bg-[#141414]/90 backdrop-blur-sm p-8 rounded-md shadow-sm border border-[#e5e0d8] dark:border-[#2a2a2a]">
      {/* Step Indicator - minimal style */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
              currentStep === 1
                ? 'bg-[#1a1a1a] dark:bg-[#c9a959] text-white dark:text-[#1a1a1a]'
                : currentStep > 1
                ? 'bg-[#c9a959] text-white'
                : 'bg-[#e5e0d8] dark:bg-[#2a2a2a] text-[#999] dark:text-[#666]'
            }`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span className={`text-xs tracking-wide ${currentStep === 1 ? 'text-[#1a1a1a] dark:text-[#c9a959]' : 'text-[#999] dark:text-[#555]'}`}>
              基础
            </span>
          </div>

          <div className={`w-8 h-px ${currentStep > 1 ? 'bg-[#c9a959]' : 'bg-[#e5e0d8] dark:bg-[#333]'}`} />

          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
              currentStep === 2
                ? 'bg-[#1a1a1a] dark:bg-[#c9a959] text-white dark:text-[#1a1a1a]'
                : 'bg-[#e5e0d8] dark:bg-[#2a2a2a] text-[#999] dark:text-[#666]'
            }`}>
              2
            </div>
            <span className={`text-xs tracking-wide ${currentStep === 2 ? 'text-[#1a1a1a] dark:text-[#c9a959]' : 'text-[#999] dark:text-[#555]'}`}>
              四柱
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-[#1a1a1a] dark:text-[#e8e4dc]">
          {currentStep === 1 ? '基础信息' : '四柱排盘'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="animate-fade-in space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#666] dark:text-[#888] mb-2">
                  姓名 <span className="text-gray-400">(可选)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#faf9f7] dark:bg-[#1a1a1a] border border-[#e5e0d8] dark:border-[#333] rounded-md text-sm text-[#1a1a1a] dark:text-[#e8e4dc] focus:border-[#c9a959] focus:ring-1 focus:ring-[#c9a959] outline-none transition-colors"
                  placeholder="可选，用于标识命盘"
                />
              </div>
              <div>
                <label className="block text-xs text-[#666] dark:text-[#888] mb-2">性别</label>
                <div className="flex bg-[#f5f3ef] dark:bg-[#1a1a1a] rounded-md p-1 border border-[#e5e0d8] dark:border-[#333]">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: Gender.MALE })}
                    className={`flex-1 py-2 rounded text-xs transition-colors ${
                      formData.gender === Gender.MALE
                        ? 'bg-[#1a1a1a] dark:bg-[#c9a959] text-white dark:text-[#1a1a1a]'
                        : 'text-[#666] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#e8e4dc]'
                    }`}
                  >
                    男
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: Gender.FEMALE })}
                    className={`flex-1 py-2 rounded text-xs transition-colors ${
                      formData.gender === Gender.FEMALE
                        ? 'bg-[#1a1a1a] dark:bg-[#c9a959] text-white dark:text-[#1a1a1a]'
                        : 'text-[#666] dark:text-[#666] hover:text-[#1a1a1a] dark:hover:text-[#e8e4dc]'
                    }`}
                  >
                    女
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Four Pillars & Da Yun */}
        {currentStep === 2 && (
          <div className="animate-fade-in space-y-4">
            {/* Four Pillars */}
            <div className="p-4 bg-[#faf9f7] dark:bg-[#141414] rounded-md border border-[#e5e0d8] dark:border-[#2a2a2a]">
              <div className="text-xs text-[#8b7355] dark:text-[#c9a959] mb-3 font-light">四柱</div>
              <div className="mb-3">
                <input
                  type="number"
                  name="birthYear"
                  required
                  min="1900"
                  max="2100"
                  value={formData.birthYear}
                  onChange={handleChange}
                  placeholder="出生年份"
                  className="w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-[#e5e0d8] dark:border-[#333] rounded text-sm text-[#1a1a1a] dark:text-[#e8e4dc] focus:border-[#c9a959] outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['yearPillar', 'monthPillar', 'dayPillar', 'hourPillar'].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    required
                    value={formData[field as keyof UserInput] as string}
                    onChange={handleChange}
                    placeholder={field === 'yearPillar' ? '年柱' : field === 'monthPillar' ? '月柱' : field === 'dayPillar' ? '日柱' : '时柱'}
                    className="px-2 py-2 bg-white dark:bg-[#1a1a1a] border border-[#e5e0d8] dark:border-[#333] rounded text-sm text-center text-[#1a1a1a] dark:text-[#e8e4dc] focus:border-[#c9a959] outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Da Yun */}
            <div className="p-4 bg-[#faf9f7] dark:bg-[#141414] rounded-md border border-[#e5e0d8] dark:border-[#2a2a2a]">
              <div className="text-xs text-[#8b7355] dark:text-[#c9a959] mb-3 font-light">大运</div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="startAge"
                  required
                  min="1"
                  max="100"
                  value={formData.startAge}
                  onChange={handleChange}
                  placeholder="起运年龄"
                  className="px-2 py-2 bg-white dark:bg-[#1a1a1a] border border-[#e5e0d8] dark:border-[#333] rounded text-sm text-center text-[#1a1a1a] dark:text-[#e8e4dc] focus:border-[#c9a959] outline-none"
                />
                <input
                  type="text"
                  name="firstDaYun"
                  required
                  value={formData.firstDaYun}
                  onChange={handleChange}
                  placeholder="第一步大运"
                  className="px-2 py-2 bg-white dark:bg-[#1a1a1a] border border-[#e5e0d8] dark:border-[#333] rounded text-sm text-center text-[#1a1a1a] dark:text-[#e8e4dc] focus:border-[#c9a959] outline-none"
                />
              </div>
              <p className="text-xs text-[#999] dark:text-[#555] mt-2 text-center">
                运向：<span className="text-[#8b7355] dark:text-[#c9a959]">{daYunDirectionInfo}</span>
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 pt-2">
          {currentStep === 2 && (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center justify-center gap-1 px-4 py-2.5 text-sm text-[#666] dark:text-[#888] hover:text-[#1a1a1a] dark:hover:text-[#e8e4dc] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              上一步
            </button>
          )}

          {currentStep === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1 bg-[#1a1a1a] dark:bg-[#c9a959] hover:bg-[#333] dark:hover:bg-[#d4b96a] text-white dark:text-[#1a1a1a] py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              <span>下一步</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !canSubmit()}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] dark:bg-[#c9a959] hover:bg-[#333] dark:hover:bg-[#d4b96a] text-white dark:text-[#1a1a1a] py-2.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>推演中...</span>
                </>
              ) : (
                <span>开始推演</span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BaziForm;

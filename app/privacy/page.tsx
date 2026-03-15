export const metadata = {
  title: '隐私政策 | 卜算子',
  description: '卜算子隐私政策',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-[#0c0c0c] py-12">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-8 text-center">隐私政策</h1>

        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4">一、我们收集的信息</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              为提供命理分析服务，我们需要收集以下信息：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 mb-4 space-y-2">
              <li>姓名（可选，用于标识您的命盘）</li>
              <li>性别</li>
              <li>出生年份</li>
              <li>八字信息（年柱、月柱、日柱、时柱）</li>
            </ul>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">二、信息使用目的</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              您提供的信息仅用于以下目的：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 mb-4 space-y-2">
              <li>生成八字命理分析报告</li>
              <li>提供人生流年走势预测</li>
              <li>保存您的命盘记录（本地存储）</li>
            </ul>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">三、数据存储与安全</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              您的命盘数据存储在本地设备（浏览器 localStorage）和本地数据库（SQLite）中。我们采取合理的安全措施保护您的数据，但请注意本地存储的数据可能因设备故障或清除缓存而丢失。
            </p>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">四、第三方服务</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              为提供 AI 命理分析服务，您的输入信息将被发送至第三方 AI 服务提供商进行处理。我们不自行存储您的命理数据用于分析。
            </p>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">五、您的权利</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              您享有以下权利：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-slate-300 mb-4 space-y-2">
              <li>知情权：了解数据处理方式</li>
              <li>删除权：可随时清除本地存储的数据</li>
              <li>拒绝权：您可选择不提供敏感信息</li>
            </ul>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">六、免责声明</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-4">
              卜算子提供的命理分析仅供娱乐和文化研究之用，不构成任何形式的命运预测或决策依据。我们不对分析结果的准确性、完整性或适用性做出任何明示或暗示的保证。
            </p>

            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#e8e4dc] mb-4 mt-8">七、联系我们</h2>
            <p className="text-gray-600 dark:text-slate-300">
              如对本隐私政策有任何疑问，请通过产品页面与我们联系。
            </p>

            <p className="text-gray-400 dark:text-slate-500 text-sm mt-8">
              更新日期：2026年3月8日
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

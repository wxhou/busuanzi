import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '人生K线 | 八字命理可视化',
  description: '结合传统八字命理与现代金融数据可视化，将您的一生运势绘制成类似股票行情的K线图',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "development" && <AgentationDev />}
      </body>
    </html>
  );
}

// Agentation 开发环境组件
function AgentationDev() {
  try {
    const { Agentation } = require('agentation');
    return <Agentation />;
  } catch {
    return null;
  }
}

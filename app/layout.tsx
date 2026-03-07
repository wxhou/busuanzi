import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';

export const metadata: Metadata = {
  title: '卜算子 | 八字命理可视化',
  description: '结合传统八字命理与现代数据可视化，洞悉命运起伏，预见人生轨迹',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
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

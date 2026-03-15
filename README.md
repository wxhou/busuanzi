# 卜算子

> 一个结合东方玄学与 AI 的生活决策助手

## 简介

卜算子是一个基于 AI 的生活分析应用，通过八字命理为用户提供人生决策建议。帮助用户在事业、财富、健康、人际关系等方面做出更明智的选择。

## 功能特性

- **AI 命理分析**: 基于八字五行理论，结合大运流年进行全方位解读
- **人生战略规划**: 提供事业、财富、健康、婚姻等方面的建议
- **数字货币运势**: 结合命理分析加密货币投资时机
- **隐私保护**: 本地数据处理，保护用户隐私

## 技术栈

- **前端**: Next.js 16 + React 19 + Tailwind CSS
- **数据库**: SQLite (better-sqlite3)
- **AI**: Gemini API / OpenAI API
- **图表**: Recharts
- **PDF 导出**: jsPDF + html2canvas

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3456

## 环境变量

```env
# 数据库密钥
DATABASE_URL=your_database_url

# Clerk 认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# AI API
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

## License

MIT

# 复盘宝 - AI智能股票复盘工具

基于「龙韵智趋」战法，专注龙头二波机会的AI股票复盘工具。

## 功能特性

- 🤖 **AI智能分析** - 基于MiniMax API的智能股票分析
- 📊 **龙韵智趋战法** - 独创六维战法体系
- 🔔 **每日复盘推送** - 自动追踪持仓，精准把握买卖点
- 🛡️ **止损规则** - 智能设置止损位，严格风险控制
- 💼 **仓位管理** - 科学仓位配比，收益最大化
- 📱 **飞书推送** - 即时消息推送，决策快人一步

## 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS 4.0 (深色科技风)
- **后端**: Next.js API Routes
- **数据库**: SQLite (better-sqlite3)
- **部署**: Render.com

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 填入必要的配置
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
fanpanbao-next/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts    # 发送验证码
│   │   │   └── verify/route.ts   # 验证登录
│   │   ├── chat/route.ts         # AI问股
│   │   └── user/status/route.ts  # 用户状态
│   ├── components/
│   │   ├── Navbar.tsx            # 导航栏
│   │   ├── Hero.tsx              # 首屏区域
│   │   ├── Features.tsx          # 功能板块
│   │   ├── Strategy.tsx          # 龙韵智趋战法
│   │   ├── Pricing.tsx           # 定价
│   │   └── Footer.tsx             # 页脚
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── auth.ts                   # JWT认证
│   └── db.ts                     # 数据库操作
├── public/
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API接口

### 认证

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/auth/login` | POST | 发送验证码 |
| `/api/auth/verify` | POST | 验证登录 |

### 功能

| 接口 | 方法 | 描述 |
|------|------|------|
| `/api/chat` | POST | AI问股 |
| `/api/user/status` | GET | 用户状态 |

## 数据库Schema

```sql
-- 用户表
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT UNIQUE NOT NULL,
  trials INTEGER DEFAULT 3,
  lifetime INTEGER DEFAULT 0,
  referral_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 聊天记录
CREATE TABLE chat_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  message TEXT,
  reply TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 验证码
CREATE TABLE verification_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 龙韵智趋战法核心原则

1. **主线确认**: 同板块≥2只同日2板=主线
2. **龙头判断**: 三板当天封板时间最早=龙头
3. **二波验证**: 连续两天首板≥5家+不跟跌
4. **买点信号**: 30分钟MA50+日K MA10±5%+缩量承接+题材异动
5. **仓位**: 3板0.25成/4板0.35成/5板0.5成
6. **止损**: 跌破日K MA10且当日收不回，等次日拉涨平仓
7. **卖出**: 涨30%-100%根据题材量能热度平仓

## 部署到Render.com

1. 创建新的Web Service
2. 连接GitHub仓库
3. 设置构建命令: `npm run build`
4. 设置启动命令: `npm start`
5. 添加环境变量

## License

MIT

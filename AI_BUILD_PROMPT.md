# AirHub-Beijing 京翼机场中枢 · 数据大屏自动构建提示词

> 将以下内容整体复制后交给任意支持代码执行的 AI（如 Kilo / Cursor / Claude / GPT），它应按计划在当前目录完成脚手架、编码、测试与质量配置，并最终自动打开浏览器展示大屏。

---

你是一位资深前端数据大屏专家。请基于以下完整规范，从零构建一个名为 **AirHub-Beijing（京翼机场中枢）** 的机场运行数据可视化大屏。项目位于当前工作目录。请严格遵循模块化开发，禁止把所有代码堆在单个文件中。最终交付物：运行 `npm run dev` 后**自动打开浏览器**，呈现一个美观、自适应、有动效的数据大屏页面。

## 一、技术栈（固定，不可擅自替换）

- 框架：Vue 3（`<script setup>` + TypeScript）
- 构建：Vite
- 图表：ECharts（`echarts` + `vue-echarts` 或按需封装）
- 大屏装饰组件：`@kjgl77/datav-vue3`（边框、装饰、飞线等；若安装失败可改用纯 CSS/SVG 自绘等价组件，并在日志中说明）
- 状态管理：Pinia（按业务模块拆分）
- 请求：Axios（统一实例 + 拦截器）
- 工具：VueUse（`@vueuse/core`，用于自适应、轮询、生命周期）

## 二、模块化目录结构（必须严格遵守）

```
src/
├─ main.ts                 # 入口，注册 pinia / datav / echarts
├─ App.vue                 # 根组件，挂载大屏容器
├─ env.d.ts
├─ api/                    # 真实接口层
│  ├─ request.ts           # axios 实例 + 拦截器（错误归一化、日志钩子）
│  ├─ flight.ts            # 航班接口
│  ├─ passenger.ts         # 客流接口
│  ├─ baggage.ts           # 行李接口
│  └─ security.ts          # 安检接口
├─ mock/                   # Mock 数据层（结构与 api 一一对应）
│  ├─ index.ts             # 导出各模块 mock 函数
│  ├─ flight.ts
│  ├─ passenger.ts
│  ├─ baggage.ts
│  └─ security.ts
├─ services/               # 数据抽象层：根据开关选择 mock 或 api
│  └─ dataService.ts       # getFlights/getPassengers/... 统一出口
├─ store/                  # Pinia 分模块
│  ├─ flight.ts
│  ├─ passenger.ts
│  ├─ baggage.ts
│  └─ security.ts
├─ composables/            # 复用逻辑（组合式函数）
│  ├─ useScreenScale.ts    # 大屏等比缩放适配（1920×1080 基准）
│  └─ usePolling.ts        # 定时刷新数据
├─ components/             # 通用组件，每个组件独立 .vue 文件
│  ├─ charts/              # 各类图表封装
│  │  ├─ BaseChart.vue     # ECharts 通用封装（resize 自适应）
│  │  ├─ FlightTrend.vue
│  │  ├─ PassengerPie.vue
│  │  ├─ BaggageBar.vue
│  │  └─ SecurityGauge.vue
│  ├─ panels/              # 面板容器（标题栏 + DataV 边框）
│  │  └─ PanelBox.vue
│  └─ header/              # 大屏头部（标题、时钟）
│     └─ ScreenHeader.vue
├─ views/
│  └─ Dashboard.vue        # 大屏主页面：组合所有组件 + 栅格布局
├─ utils/
│  └─ logger.ts            # 日志系统（分级 + 可上报预留）
├─ hooks/                  # 跨组件复用函数（与 composables 二选一划分清晰）
├─ styles/
│  ├─ variables.scss       # 主题色、间距变量
│  └─ global.scss          # 全局样式、滚动条、字体
└─ tests/                  # 测试套件（与实现文件就近或集中均可）
   ├─ logger.spec.ts
   ├─ dataService.spec.ts
   └─ useScreenScale.spec.ts
```

## 三、核心系统实现要求

### 1. 数据层与 Mock→API 切换（最重要）
- 在 `src/services/dataService.ts` 暴露统一方法：`getFlights()`、`getPassengers()`、`getBaggage()`、`getSecurity()`。
- 通过环境变量 `import.meta.env.VITE_USE_MOCK`（默认 `"true"`）决定调用 `src/mock/*` 还是 `src/api/*`。
- Mock 函数需返回 `Promise`（模拟网络延迟 200~600ms），数据形态必须与未来真实 API 一致（明确定义 TS 接口 `src/types`）。
- 切换时**只需修改 `.env` 的 `VITE_USE_MOCK=false`**，业务组件零改动。
- 在 `.env`、`.env.development`、`.env.production` 中配置该开关及 `VITE_API_BASE_URL`。

### 2. 日志系统（`src/utils/logger.ts`）
- 提供 `logger.debug/info/warn/error(msg, meta?)` 分级方法。
- 开发环境输出带颜色、带时间戳、带模块名前缀的 console；生产环境静默或写入可上报队列（预留 `report()` 接口，注释说明如何接 Sentry）。
- 在 axios 拦截器错误分支、关键数据获取失败处调用 `logger.error`。

### 3. 大屏自适应（`composables/useScreenScale.ts`）
- 以 1920×1080 为设计基准，监听 `resize`，计算 `scale = min(w/1920, h/1080)`，对容器做 `transform: scale()` 居中，保证任意分辨率不变形。

### 4. 状态管理
- 每个业务模块一个 Pinia store，持有 `data / loading / error`，并提供 `fetch()` action（内部调用 `dataService`）。

### 5. 大屏页面内容（Dashboard.vue）
请实现以下可视化区块，整体科技蓝/深空风格，带发光边框与轻微动效：
- 顶部 `ScreenHeader`：标题"京翼机场中枢 AirHub-Beijing"、实时时钟、运行状态。
- 左侧：航班起降趋势（折线/面积图 `FlightTrend`）、各区域客流占比（饼/环图 `PassengerPie`）。
- 中间：机场平面/航线示意（可用 DataV 飞线或 SVG 地图占位）、核心指标卡（今日航班、旅客吞吐、准点率、行李处理量）。
- 右侧：行李分拣量（柱状图 `BaggageBar`）、安检通行压力（仪表盘 `SecurityGauge`）。
- 底部：滚动公告/异常事件列表（用 mock 数据）。
- 数据每 5 秒通过 `usePolling` 自动刷新（mock 数据随机微变，体现"实时感"）。

## 四、测试 / 日志 / 代码质量系统

- **测试**：配置 Vitest + @vue/test-utils + jsdom。至少编写并通过：
  - `logger.spec.ts`：验证分级输出与上报钩子。
  - `dataService.spec.ts`：在 `VITE_USE_MOCK=true` 下返回结构正确的数据。
  - `useScreenScale.spec.ts`：验证缩放比例计算。
- **代码质量**：配置 `eslint`（vue-ts 推荐规则）、`prettier`、`stylelint`（scss）；`package.json` 增加 `lint` / `format` / `test` 脚本；初始化 Husky + lint-staged + commitlint（conventional commits）。
- **类型**：全程 TypeScript，`strict: true`，所有接口与组件 props 显式类型。

## 五、执行步骤（按顺序，每步完成再下一步）

1. 用 Vite 官方模板初始化 Vue3+TS 项目到当前目录（`npm create vite@latest . -- --template vue-ts`），安装依赖。
2. 安装：`echarts vue-echarts @kjgl77/datav-vue3 pinia axios @vueuse/core`，以及 devDeps：`vitest @vue/test-utils jsdom eslint prettier stylelint husky lint-staged @commitlint/cli @commitlint/config-conventional`。
3. 按第二节创建目录与所有文件，实现数据层、日志、自适应、store、组件、Dashboard。
4. 配置 Vitest、ESLint、Prettier、Stylelint、Husky（在 `package.json` 配置 `prepare` 脚本与 git hooks）。
5. 运行 `npm run lint` 确保无错误；运行 `npm run test` 确保所有测试通过。
6. 运行 `npm run dev -- --open`，**自动打开浏览器**展示大屏。确认页面无控制台报错、布局自适应、数据每 5 秒刷新。

## 六、验收标准

- [ ] 浏览器自动打开，可见完整大屏，深色科技风、无明显错位。
- [ ] 改变窗口大小，大屏等比缩放不变形。
- [ ] 数据每 5 秒自动刷新（mock 数值变化）。
- [ ] 修改 `.env` 的 `VITE_USE_MOCK` 即可在 mock / api 间切换，组件代码无需改。
- [ ] `npm run lint` 通过；`npm run test` 全部通过。
- [ ] 代码严格按模块化目录拆分，无巨型单文件。
- [ ] 控制台有分级日志输出，错误被正确记录。

完成后，向我（用户）简要汇报：使用技术栈、已实现的可视化区块、测试与质量配置情况，以及如何将 mock 切换为真实 API。

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Activity,
  ArrowRight,
  BadgePercent,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CircleCheck,
  CupSoda,
  DatabaseZap,
  Factory,
  FlameKindling,
  Gauge,
  Languages,
  LayoutDashboard,
  Leaf,
  MessageSquareText,
  MonitorSmartphone,
  PenTool,
  Puzzle,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Timer,
  Users,
  Wand2,
  Workflow,
  Zap,
} from '@lucide/vue'
import { getProjectBySlug } from '../data/projects'

const iconMap = {
  Activity,
  BarChart3,
  ChartNoAxesCombined,
  CircleCheck,
  FlameKindling,
  Gauge,
  Languages,
  MessageSquareText,
  PenTool,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
  Zap,
}

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug))
const pageStyle = computed(() => ({
  '--accent': project.value.accent,
  '--accent-soft': project.value.accentSoft,
  '--ink': project.value.ink,
  '--surface': project.value.surface,
}))
</script>

<template>
  <article
    v-if="project.id === 'smartwork'"
    id="top"
    class="project-page project-page--smartwork"
    :style="pageStyle"
  >
    <header class="site-nav">
      <div class="brand-lockup">
        <span class="brand-mark">
          <MonitorSmartphone :size="17" />
        </span>
        <span>{{ project.brand }}</span>
      </div>
      <nav aria-label="页面栏目">
        <a href="#features">功能</a>
        <a href="#process">流程</a>
        <a href="#cases">案例</a>
        <a href="#pricing">价格</a>
      </nav>
      <a class="nav-cta" href="#pricing">{{ project.primaryCta }}</a>
    </header>

    <section class="hero-section">
      <div class="hero-copy">
        <span class="eyebrow">{{ project.badge }}</span>
        <h1>
          <span v-for="line in project.heroTitleLines" :key="line">{{ line }}</span>
        </h1>
        <p>{{ project.heroText }}</p>
        <div class="tag-row">
          <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="hero-actions">
          <a class="primary-btn" href="#pricing">{{ project.primaryCta }}</a>
          <a class="secondary-btn" href="#features">{{ project.secondaryCta }}</a>
        </div>
      </div>

      <div class="hero-visual visual-dashboard" aria-label="产品视觉预览">
        <img class="hero-image" :src="project.image" :alt="`${project.brand} 页面视觉预览`" />
        <div class="dashboard-window">
          <div class="window-sidebar">
            <span v-for="item in 6" :key="item"></span>
          </div>
          <div class="window-main">
            <div class="window-topline"></div>
            <div class="metric-grid">
              <span v-for="item in 4" :key="item"></span>
            </div>
            <div class="chart-lines">
              <i v-for="item in 6" :key="item"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="stats-band">
      <div v-for="stat in project.stats" :key="stat[1]" class="stat-card">
        <strong>{{ stat[0] }}</strong>
        <span>{{ stat[1] }}</span>
      </div>
    </section>

    <section id="features" class="section-block">
      <div class="section-heading">
        <span>Product value</span>
        <h2>产品优势</h2>
        <p>这里保留了顾客看原型时最关心的模块完整度、视觉可信度和可复用空间。</p>
      </div>
      <div class="strength-grid">
        <article v-for="item in project.strengths" :key="item[0]">
          <component :is="iconMap[item[2]]" :size="23" />
          <h3>{{ item[0] }}</h3>
          <p>{{ item[1] }}</p>
        </article>
      </div>
    </section>

    <section class="section-block split-section">
      <div>
        <span class="section-kicker">Core modules</span>
        <h2>核心功能</h2>
        <p>模块按照源码售卖思路设计，既能展示完整页面，也方便后续按客户需求替换行业和文案。</p>
      </div>
      <div class="feature-list">
        <article v-for="feature in project.features" :key="feature[0]">
          <LayoutDashboard :size="20" />
          <div>
            <h3>{{ feature[0] }}</h3>
            <p>{{ feature[1] }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="process" class="section-block">
      <div class="section-heading">
        <span>Workflow</span>
        <h2>使用流程</h2>
      </div>
      <div class="process-row">
        <div v-for="(step, index) in project.process" :key="step" class="process-step">
          <strong>{{ index + 1 }}</strong>
          <span>{{ step }}</span>
        </div>
      </div>
    </section>

    <section id="cases" class="section-block">
      <div class="section-heading">
        <span>Use cases</span>
        <h2>客户案例</h2>
      </div>
      <div class="case-grid">
        <article v-for="item in project.cases" :key="item[0]">
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
        </article>
      </div>
    </section>

    <section id="pricing" class="section-block">
      <div class="section-heading">
        <span>Offer</span>
        <h2>价格方案</h2>
      </div>
      <div class="pricing-grid">
        <article v-for="(plan, index) in project.pricing" :key="plan[0]" :class="{ featured: index === 1 }">
          <h3>{{ plan[0] }}</h3>
          <p><small>¥</small>{{ plan[1] }}<span v-if="plan[1] !== '议价'"> / 套</span></p>
          <ul>
            <li v-for="item in plan[2]" :key="item">
              <CircleCheck :size="15" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <a href="javascript:;">{{ index === 1 ? '推荐选择' : '查看详情' }}</a>
        </article>
      </div>
    </section>

    <footer class="project-footer">
      <div>
        <strong>{{ project.brand }}</strong>
        <span>{{ project.type }} · {{ project.routeName }}</span>
      </div>
      <a href="#top">返回顶部</a>
    </footer>
  </article>

  <article v-else-if="project.id === 'bizpro'" id="top" class="bizpro-page" :style="pageStyle">
    <header class="biz-nav">
      <div class="brand-lockup">
        <span class="brand-mark"><Building2 :size="18" /></span>
        <span>{{ project.brand }}</span>
      </div>
      <nav aria-label="页面栏目">
        <a href="#biz-services">服务矩阵</a>
        <a href="#biz-roadmap">转型路径</a>
        <a href="#biz-cases">增长结果</a>
      </nav>
      <a class="biz-contact" href="#pricing">预约诊断</a>
    </header>

    <section class="biz-hero">
      <div class="biz-hero-copy">
        <span class="biz-label">{{ project.badge }}</span>
        <h1>
          <span>企业数字化转型</span>
          <span>一张战略作战图</span>
        </h1>
        <p>为制造、贸易、园区和服务型企业梳理流程、重建系统、沉淀数据资产，让管理层看见进度，让团队跑得更稳。</p>
        <div class="biz-actions">
          <a href="#biz-roadmap">查看转型路径 <ArrowRight :size="17" /></a>
          <a href="#pricing">获取报价</a>
        </div>
      </div>
      <div class="biz-command">
        <img :src="project.image" alt="企业数字化视觉预览" />
        <div class="command-panel">
          <span>Transformation cockpit</span>
          <strong>63%</strong>
          <small>关键流程已完成线上化</small>
        </div>
        <div class="biz-signal signal-a"></div>
        <div class="biz-signal signal-b"></div>
      </div>
    </section>

    <section class="biz-metrics">
      <article v-for="stat in project.stats" :key="stat[1]">
        <strong>{{ stat[0] }}</strong>
        <span>{{ stat[1] }}</span>
      </article>
    </section>

    <section id="biz-services" class="biz-services">
      <div class="biz-section-title">
        <span>Service matrix</span>
        <h2>不是传统官网，是一套企业服务展示系统</h2>
      </div>
      <div class="biz-service-grid">
        <article v-for="(feature, index) in project.features" :key="feature[0]">
          <component :is="[Factory, DatabaseZap, Workflow, BriefcaseBusiness][index]" :size="25" />
          <span>0{{ index + 1 }}</span>
          <h3>{{ feature[0] }}</h3>
          <p>{{ feature[1] }}</p>
        </article>
      </div>
    </section>

    <section id="biz-roadmap" class="biz-roadmap">
      <div class="biz-section-title">
        <span>Roadmap</span>
        <h2>用项目路径讲清楚交付可信度</h2>
      </div>
      <div class="roadmap-line">
        <article v-for="(step, index) in project.process" :key="step">
          <strong>{{ index + 1 }}</strong>
          <span>{{ step }}</span>
        </article>
      </div>
    </section>

    <section id="biz-cases" class="biz-case-band">
      <div>
        <span>Growth report</span>
        <h2>客户看到的不只是页面，而是业务增长叙事</h2>
      </div>
      <div class="biz-case-list">
        <article v-for="item in project.cases" :key="item[0]">
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
        </article>
      </div>
    </section>

    <section id="pricing" class="biz-offer">
      <article v-for="plan in project.pricing" :key="plan[0]">
        <h3>{{ plan[0] }}</h3>
        <strong>¥{{ plan[1] }}</strong>
        <p>{{ plan[2].join(' · ') }}</p>
      </article>
    </section>
  </article>

  <article v-else-if="project.id === 'aihub'" id="top" class="aihub-page" :style="pageStyle">
    <header class="ai-nav">
      <div class="brand-lockup">
        <span class="brand-mark"><Bot :size="18" /></span>
        <span>{{ project.brand }}</span>
      </div>
      <div class="ai-nav-pills">
        <a href="#ai-tools">Tools</a>
        <a href="#ai-flow">Flow</a>
        <a href="#pricing">Plans</a>
      </div>
    </header>

    <section class="ai-hero">
      <div class="ai-orbit">
        <span></span>
        <BrainCircuit :size="92" />
      </div>
      <div class="ai-hero-copy">
        <span class="ai-kicker">AI workspace prototype</span>
        <h1>
          <span>AI 助手工作台</span>
          <span>从提示词到交付物</span>
        </h1>
        <p>这套页面更像一个 AI 产品控制台：有对话入口、能力工具、生成流程和套餐策略，适合包装成 AI 写作、AI 办公、知识库助手源码。</p>
        <div class="ai-prompt-bar">
          <Wand2 :size="18" />
          <span>输入目标，AI 生成结果、流程和素材</span>
          <a href="#ai-tools">Run</a>
        </div>
      </div>
    </section>

    <section class="ai-console">
      <div class="chat-board">
        <div class="chat-line user">
          <span>用户</span>
          <p>帮我生成一份商品详情页卖点。</p>
        </div>
        <div class="chat-line ai">
          <span>AIHub</span>
          <p>已拆解为标题、利益点、信任背书、价格方案和行动按钮。</p>
        </div>
      </div>
      <div class="generation-card">
        <img :src="project.image" alt="AI 助手视觉预览" />
        <div>
          <strong>92%</strong>
          <span>原型可复用内容</span>
        </div>
      </div>
    </section>

    <section id="ai-tools" class="ai-tool-grid">
      <article v-for="(item, index) in project.strengths" :key="item[0]">
        <component :is="[MessageSquareText, PenTool, ChartNoAxesCombined, Languages][index]" :size="24" />
        <h3>{{ item[0] }}</h3>
        <p>{{ item[1] }}</p>
      </article>
    </section>

    <section id="ai-flow" class="ai-flow">
      <div class="ai-section-copy">
        <span>Workflow</span>
        <h2>用四步把 AI 价值说清楚</h2>
      </div>
      <div class="ai-flow-steps">
        <article v-for="(step, index) in project.process" :key="step">
          <strong>{{ String(index + 1).padStart(2, '0') }}</strong>
          <span>{{ step }}</span>
        </article>
      </div>
    </section>

    <section id="pricing" class="ai-pricing">
      <article v-for="(plan, index) in project.pricing" :key="plan[0]" :class="{ hot: index === 1 }">
        <span>{{ plan[0] }}</span>
        <strong>¥{{ plan[1] }}</strong>
        <p>{{ plan[2].join(' / ') }}</p>
      </article>
    </section>
  </article>

  <article v-else id="top" class="freshlife-page" :style="pageStyle">
    <header class="fresh-nav">
      <div class="brand-lockup">
        <span class="brand-mark"><Leaf :size="18" /></span>
        <span>{{ project.brand }}</span>
      </div>
      <nav aria-label="页面栏目">
        <a href="#fresh-benefits">卖点</a>
        <a href="#fresh-gallery">展示</a>
        <a href="#pricing">套餐</a>
      </nav>
      <a class="fresh-buy" href="#pricing"><ShoppingBag :size="17" /> 立即购买</a>
    </header>

    <section class="fresh-hero">
      <div class="fresh-copy">
        <span class="fresh-badge">Fresh drink · 单品详情页</span>
        <h1>
          <span>轻食单品详情页</span>
          <span>一屏种草下单</span>
        </h1>
        <p>和前三个 B 端页面拉开差异，这一页重点做电商转化：大商品图、价格、优惠、卖点、场景和套餐都围绕下单展开。</p>
        <div class="fresh-price">
          <strong>¥299</strong>
          <span>限时优惠 · 7 天无理由 · 1 年质保</span>
        </div>
      </div>
      <div class="fresh-product-card">
        <img :src="project.image" alt="料理机产品视觉预览" />
        <div class="fresh-coupon">
          <BadgePercent :size="18" />
          <span>今日下单立减 40</span>
        </div>
      </div>
    </section>

    <section id="fresh-benefits" class="fresh-benefits">
      <article v-for="(item, index) in project.strengths" :key="item[0]">
        <component :is="[Gauge, CupSoda, Sparkles, ShieldCheck][index]" :size="24" />
        <h3>{{ item[0] }}</h3>
        <p>{{ item[1] }}</p>
      </article>
    </section>

    <section id="fresh-gallery" class="fresh-gallery">
      <div class="fresh-section-copy">
        <span>Product scenes</span>
        <h2>用生活场景增强成交感</h2>
      </div>
      <div class="fresh-scene-grid">
        <article v-for="item in project.cases" :key="item[0]">
          <Timer :size="20" />
          <strong>{{ item[0] }}</strong>
          <span>{{ item[1] }}</span>
        </article>
      </div>
    </section>

    <section class="fresh-process">
      <article v-for="(step, index) in project.process" :key="step">
        <span>{{ index + 1 }}</span>
        <strong>{{ step }}</strong>
      </article>
    </section>

    <section id="pricing" class="fresh-pricing">
      <article v-for="(plan, index) in project.pricing" :key="plan[0]" :class="{ selected: index === 1 }">
        <h3>{{ plan[0] }}</h3>
        <strong>¥{{ plan[1] }}</strong>
        <p>{{ plan[2].join(' · ') }}</p>
        <a href="javascript:;">加入购物车</a>
      </article>
    </section>
  </article>
</template>

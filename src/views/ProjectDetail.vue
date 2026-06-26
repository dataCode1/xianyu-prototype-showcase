<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Activity,
  BarChart3,
  ChartNoAxesCombined,
  CircleCheck,
  FlameKindling,
  Gauge,
  Languages,
  LayoutDashboard,
  MessageSquareText,
  MonitorSmartphone,
  PenTool,
  Puzzle,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
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
  <article id="top" class="project-page" :class="`project-page--${project.id}`" :style="pageStyle">
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

      <div class="hero-visual" :class="`visual-${project.visual}`" aria-label="产品视觉预览">
        <img class="hero-image" :src="project.image" :alt="`${project.brand} 页面视觉预览`" />
        <template v-if="project.visual === 'dashboard'">
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
        </template>
        <template v-else-if="project.visual === 'industry'">
          <div class="city-panel">
            <span class="tower tower-a"></span>
            <span class="tower tower-b"></span>
            <span class="tower tower-c"></span>
            <div class="data-card">
              <strong>Digital OS</strong>
              <small>Strategy · Data · Delivery</small>
            </div>
          </div>
        </template>
        <template v-else-if="project.visual === 'ai'">
          <div class="ai-panel">
            <div class="prompt-card">
              <span>Prompt</span>
              <strong>生成一份产品卖点页</strong>
            </div>
            <div class="answer-card">
              <i v-for="item in 5" :key="item"></i>
            </div>
            <div class="tool-strip">
              <span>Write</span>
              <span>Code</span>
              <span>Plan</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="product-shot">
            <div class="blender">
              <span class="cup"></span>
              <span class="body"></span>
              <span class="base"></span>
            </div>
            <div class="fruit fruit-a"></div>
            <div class="fruit fruit-b"></div>
            <div class="fruit fruit-c"></div>
          </div>
        </template>
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
</template>

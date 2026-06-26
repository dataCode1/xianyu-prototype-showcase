<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ExternalLink, Maximize2, Minimize2, PackageOpen, PanelLeftClose, PanelLeftOpen } from '@lucide/vue'
import { projects } from './data/projects'

const route = useRoute()
const router = useRouter()
const immersive = ref(false)

const currentProject = computed(() => projects.find((project) => project.slug === route.params.slug) ?? projects[0])
const currentHref = computed(() => router.resolve(currentProject.value.path).href)

function toggleImmersive() {
  immersive.value = !immersive.value
}
</script>

<template>
  <div class="app-shell" :class="{ 'is-immersive': immersive }">
    <aside class="prototype-sidebar" aria-label="项目路径列表">
      <div class="sidebar-head">
        <div>
          <span class="mini-label">Xianyu Prototype</span>
          <h1>源码原型货架</h1>
        </div>
        <button type="button" class="icon-btn" @click="toggleImmersive" aria-label="切换沉浸预览">
          <PanelLeftClose v-if="!immersive" :size="19" />
          <PanelLeftOpen v-else :size="19" />
        </button>
      </div>

      <p class="sidebar-note">
        左侧保留路径名，方便客户知道当前看的源码方向；演示时可进入沉浸预览。
      </p>

      <nav class="project-list">
        <RouterLink v-for="project in projects" :key="project.id" :to="project.path" class="project-link">
          <span class="project-icon" :style="{ '--item-accent': project.accent }">
            <PackageOpen :size="18" />
          </span>
          <span>
            <strong>{{ project.menuName }}</strong>
            <small>{{ project.path }}</small>
          </span>
        </RouterLink>
      </nav>

      <div class="sidebar-foot">
        <span>当前展示</span>
        <strong>{{ currentProject.routeName }}</strong>
        <small>{{ currentProject.type }}</small>
      </div>
    </aside>

    <main class="prototype-stage">
      <div class="stage-toolbar">
        <div>
          <span>{{ currentProject.path }}</span>
          <strong>{{ currentProject.menuName }}</strong>
        </div>
        <div class="toolbar-actions">
          <a :href="currentHref" target="_blank" rel="noreferrer" class="ghost-btn">
            <ExternalLink :size="17" />
            新窗口
          </a>
          <button type="button" class="ghost-btn" @click="toggleImmersive">
            <Maximize2 v-if="!immersive" :size="17" />
            <Minimize2 v-else :size="17" />
            {{ immersive ? '退出沉浸' : '沉浸预览' }}
          </button>
        </div>
      </div>

      <div class="mobile-tabs" aria-label="移动端项目切换">
        <RouterLink v-for="project in projects" :key="project.id" :to="project.path">
          {{ project.routeName }}
        </RouterLink>
      </div>

      <section class="preview-frame">
        <RouterView />
      </section>
    </main>
  </div>
</template>

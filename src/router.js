import { createRouter, createWebHashHistory } from 'vue-router'
import ProjectDetail from './views/ProjectDetail.vue'
import { projects } from './data/projects'

const routes = [
  {
    path: '/',
    redirect: projects[0].path,
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: ProjectDetail,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: projects[0].path,
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

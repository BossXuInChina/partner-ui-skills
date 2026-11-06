import './styles/layout.css';
export { createFeatureRoutes } from './routes';
export type { WorkbenchListApi } from './pages/workbench-list/api';
export const loadFeaturePage = () => import('./pages/workbench-list/Page.vue');

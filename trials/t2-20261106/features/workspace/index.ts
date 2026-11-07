import './styles/layout.css';
export { createFeatureRoutes } from './routes';
export type { AssistantWorkspaceApi } from './pages/ai-assistant-workspace/api';
export const loadFeaturePage = () => import('./pages/ai-assistant-workspace/Page.vue');

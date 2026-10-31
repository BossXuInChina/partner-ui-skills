import { createApp } from 'vue';
import '@workbench/ui-vue3/styles.css';
import 'huawei-partner-ai-ui/styles.css';
import './styles.css';
import App from './App.vue';
import { createAppRouter } from './router';

const router = createAppRouter();
const app = createApp(App);
app.use(router);
await router.isReady();
app.mount('#app');

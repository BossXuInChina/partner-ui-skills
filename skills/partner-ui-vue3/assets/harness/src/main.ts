import { createApp } from 'vue';
import '@workbench/ui-vue3/styles.css';
// TinyRobot documents this stylesheet entry; load it before AI UI overrides.
import '@opentiny/tiny-robot/dist/style.css';
import 'huawei-partner-ai-ui/styles.css';
import './styles.css';
import '@templates/shared/layout.css';
import App from './App.vue';
import { createAppRouter } from './router';

const router = createAppRouter();
const app = createApp(App);
app.use(router);
await router.isReady();
app.mount('#app');

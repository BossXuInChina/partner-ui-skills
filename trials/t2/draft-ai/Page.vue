<script setup lang="ts">
// NEEDS REVIEW: static extraction only. This guard intentionally blocks mounting.
// Replace fixtures/helpers, add typed APIs/states and complete conversion.md before removing it.
import { GlobalMessageStack } from "@workbench/ui-vue3";
import { WorkbenchBreadcrumb } from "@workbench/ui-vue3";
import { WorkbenchButton } from "@workbench/ui-vue3";
import { WorkbenchButtonRadioGroup } from "@workbench/ui-vue3";
import { WorkbenchTable } from "@workbench/ui-vue3";
import { WorkbenchTag } from "@workbench/ui-vue3";
import { WorkbenchTopNav } from "@workbench/ui-vue3";
import { AgreementAssistantPanel } from "huawei-partner-ai-ui";
import { AssistantHostLayout } from "huawei-partner-ai-ui";
import { WorkspaceSmartCard } from "huawei-partner-ai-ui";
import { nextTick as __vue_nextTick } from "vue";
import { reactive as __vue_reactive } from "vue";
import { ref as __vue_ref } from "vue";
// TODO(conversion.md#chat): PartnerUI.mockAgreementAdapter (setup)
// TODO(conversion.md#renderers): PartnerUI.chatRenderers (setup)
// TODO(conversion.md#renderers): PartnerUI.chatRenderers (return)
// TODO(conversion.md#mount): PartnerUI.mount (mount)
// TODO(conversion.md#renderers): PartnerUI.chatRenderers (template)
throw new Error('PROTOTYPE_CONVERSION_NEEDS_REVIEW');
function __prototypeMigrationRequired(_source: string): never { throw new Error('PROTOTYPE_HELPER_NEEDS_MIGRATION'); }
const nav = __vue_reactive({
      active: 'sales',
      tabs: [{ value: 'home', label: '首页' }, { value: 'sales', label: '销售' }, { value: 'service', label: '服务' }],
      sites: [{ value: 'partner', label: '企业伙伴网站' }],
    })
    const crumbs = [{ id: 'home', label: '首页', href: '#' }, { id: 'sales', label: '销售', href: '#' }, { id: 'cur', label: '协议续签工作台' }]
    const ai = __vue_reactive({ open: true, mode: 'sidebar', full: false })
    const range = __vue_ref('90')
    const tone = { 待续签: 'warning', 审批中: 'info', 已续签: 'success' }
    const columns = [
      { key: 'name', title: '协议名称', field: 'name', primary: true, fluid: true, ellipsis: true },
      { key: 'partner', title: '合作伙伴', field: 'partner', width: 120 },
      { key: 'endDate', title: '到期日期', field: 'endDate', width: 120 },
      { key: 'amount', title: '金额', field: 'amount', width: 130, align: 'end' },
      { key: 'status', title: '状态', field: 'status', width: 100 },
    ]
    const rows = __vue_ref(agreements.map((a) => ({ ...a })))

    // ---- AI：本地模拟 adapter ----
    const adapter = /* TODO(conversion.md#chat): PartnerUI.mockAgreementAdapter */ __prototypeMigrationRequired("PartnerUI.mockAgreementAdapter")({
      agreements,
      answers: [
        { match: /续签|到期|优先/, reply: [
          '以下 **3 份协议**将在 90 天内到期，建议优先处理「华东区分销框架协议」（金额最高、剩余 31 天）：',
          { type: 'agreement-table', agreements, total: agreements.length },
          { type: 'business-navigation', title: '协议续签工作台', description: '批量发起续签', target: { target: 'renewals' } },
        ] },
        { match: /注意|风险/, reply: [
          '这份协议需要关注三点：\n\n1. **到期时间**：剩余天数不足 60 天，需尽快启动续签审批；\n2. **价格条款**：附件价格表为 2025 版，续签时建议同步更新；\n3. **负责人**：确认负责人在岗，避免审批卡点。',
        ] },
        { match: /总结|经营|摘要/, reply: { type: 'ai-summary', text: '本月续签完成率 68%，较上月提升 9 个百分点；华东区贡献最大，西南区仍有 2 份协议未启动续签。' } },
      ],
      fallback: '已收到。这是本地演示回复，未连接真实服务。可以试试问“哪些协议需要续签”。',
    })
    const welcome = [
      { id: 'w1', title: '到期协议', description: '查看即将到期需要续签的协议', query: '哪些协议需要续签' },
      { id: 'w2', title: '续签总结', description: '总结本月续签进展', query: '总结本月续签情况' },
    ]
    const pills = [{ id: 'p1', label: '到期协议' , query: '哪些协议需要续签' }, { id: 'p2', label: '续签总结', query: '总结本月续签情况' }]
    const prompts = () => [{ id: 'f1', label: '按金额排序' }, { id: 'f2', label: '生成续签提醒' }]
    
    const history = { namespace: 'pui-demo:renewal-workspace', storage: { read: async () => null, write: async () => {} } }

    const insights = [
      { id: 'i1', fragments: [{ text: '华东区分销框架协议', emphasis: 'bold' }, { text: ' 剩余 ' }, { text: '31 天', emphasis: 'data' }, { text: '，金额最高' }],
        action: { label: '去续签', navigation: { target: 'renew', params: { id: 'HT-2026-0101' } } } },
      { id: 'i2', fragments: [{ text: '西南区有 ' }, { text: '2 份', emphasis: 'data' }, { text: '协议尚未启动续签' }] },
    ]

    const panel = __vue_ref(null)
    const messages = __vue_ref([])
    const notify = (message, type = 'success') => { messages.value = [{ id: Date.now() + Math.random(), message, type }, ...messages.value] }
    async function ask(q) { ai.open = true; await __vue_nextTick(); if (panel.value?.canSendQuery()) panel.value.sendQuery(q) }
    function onRowAction({ row, action }) {
      if (action.id === 'ask') ask(`${row.name}需要注意什么`)
      if (action.id === 'renew') { row.status = '审批中'; notify(`已提交「${row.name}」续签申请`) }
    }
    function onNavigate(nav) { notify(`导航到：${nav.target}${nav.params ? ' ' + JSON.stringify(nav.params) : ''}（由页面处理路由）`, 'info') }
    function onBusiness(action) { notify(`AI 面板业务动作：${action.type} ${action.agreement?.name || ''}`, 'info') }
const agreements = rows;
</script>

<template>
<div class="host">
    <AssistantHostLayout :open="ai.open" v-model:window-mode="ai.mode" v-model:fullscreen="ai.full" sidebar-behavior="push">
      <template #navigation>
        <WorkbenchTopNav :tabs="nav.tabs" :sites="nav.sites" v-model:active-tab="nav.active" />
      </template>

      <!-- 业务区：助手切换侧栏 / 悬浮 / 全屏时保持挂载 -->
      <div class="workspace">
        <main class="pui-container pui-stack" style="padding-block: var(--wb-spacing-component-lg) var(--wb-spacing-layout-section-gap-large)">
          <WorkbenchBreadcrumb :items="crumbs" @navigate="(item, e) => e?.preventDefault()" />
          <header class="page-head">
            <div>
              <h1 class="pui-title-xl">协议续签工作台</h1>
              <p class="pui-text pui-muted">跟踪即将到期的协议并发起续签。（演示数据，AI 回复为本地模拟）</p>
            </div>
            <div class="pui-row">
              <WorkbenchButton v-if="!ai.open" appearance="secondary" @click="ai.open = true">企业AI助手</WorkbenchButton>
              <WorkbenchButton appearance="primary" @click="notify('批量续签（演示）')">批量续签</WorkbenchButton>
            </div>
          </header>

          <div class="partner-ai" style="height:auto;background:transparent">
            <WorkspaceSmartCard title="智慧洞察" :items="insights" variant="outlined"
              :tag="{ fragments: [{ text: '本周 ' }, { text: String(insights.length), emphasis: 'data' }, { text: ' 条建议' }] }"
              @navigate="onNavigate" @activate="ask('哪些协议需要优先续签')" />
          </div>

          <section class="pui-surface pui-stack">
            <div class="pui-row pui-between">
              <h2 class="pui-title-m">即将到期（{{ agreements.length }}）</h2>
              <WorkbenchButtonRadioGroup v-model="range" :items="[{ value: '30', label: '30 天内' }, { value: '90', label: '90 天内' }]" aria-label="到期范围" />
            </div>
            <WorkbenchTable caption="即将到期协议" :columns="columns" :rows="agreements" row-key="id"
              :row-actions="[{ id: 'ask', label: '问问 AI' }, { id: 'renew', label: '续签' }]" @row-action="onRowAction">
              <template #cell-status="{ row }"><WorkbenchTag :label="row.status" variant="status-subtle" size="small" :status="tone[row.status]" /></template>
            </WorkbenchTable>
          </section>
        </main>
      </div>

      <template #assistant="{ windowMode, fullscreen, toggleFullscreen, switchMode, dragStart, dragKeydown }">
        <AgreementAssistantPanel ref="panel" :adapter="adapter" :window-mode="windowMode" :fullscreen="fullscreen"
          :welcome-entries="welcome" :suggestion-pills="pills" :message-prompts="prompts" :content-renderers="/* TODO(conversion.md#renderers): PartnerUI.chatRenderers */ __prototypeMigrationRequired(&quot;PartnerUI.chatRenderers&quot;)"
          :history-options="history"
          @fullscreen-change="toggleFullscreen" @window-mode-change="switchMode"
          @window-drag-start="dragStart" @window-drag-keydown="dragKeydown"
          @workspace-navigate="onNavigate" @business-action="onBusiness">
          <template #toolbar-end><PuiAssistantCloseButton @click="ai.open = false" /></template>
        </AgreementAssistantPanel>
      </template>
    </AssistantHostLayout>
  </div>
  <GlobalMessageStack :items="messages" @dismiss="(e) => messages = messages.filter((m) => m.id !== e.id)" />
</template>

<style scoped>
/* TODO(conversion.md#layout): review source CSS and host font/layout boundaries. */
/* 宿主必须给 AssistantHostLayout 一个确定高度 */
    .host { height: 100vh; }
    .workspace { height: 100%; overflow: auto; }
    .page-head { display: flex; align-items: center; justify-content: space-between; gap: var(--wb-spacing-component-lg); }
    .page-head p { margin: var(--wb-spacing-component-xs) 0 0; }
</style>

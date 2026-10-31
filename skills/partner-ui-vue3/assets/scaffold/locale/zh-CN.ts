export const zhCN = {
  assistant: {
    close: '收起 AI 助手',
    unsupportedContent: '此消息内容暂不支持展示。',
  },
  errors: {
    CHAT_ABORTED: '已停止回复。',
    CHAT_INVALID_CONFIG: '会话配置尚未完成。',
    CHAT_ENDPOINT_REQUIRED: '请配置真实服务地址。',
    CHAT_IDEMPOTENCY_KEY_REQUIRED: '缺少业务操作标识。',
    CHAT_HTTP_ERROR: '服务请求失败，请重试。',
    CHAT_STREAM_ERROR: '回复中断，请重试。',
    CHAT_TRANSPORT_FAILED: '连接失败，请重试。',
    CHAT_SSE_JSON: '服务返回的数据格式无效。',
    CHAT_INVALID_DELTA: '服务返回的消息格式无效。',
    CHAT_SSE_CONTENT_TYPE: '服务未返回预期的流式协议。',
    CHAT_SSE_EVENT_TOO_LARGE: '服务返回的单条消息过大。',
    CHAT_EMPTY_RESPONSE: '服务未返回消息。',
    CHAT_STORAGE_UNAVAILABLE: '未配置会话存储。',
    CHAT_STORAGE_INVALID: '会话存储数据无效。',
    CHAT_STORAGE_FAILED: '会话存储失败。',
  },
} as const;

export function chatErrorMessage(code: string): string {
  return Object.prototype.hasOwnProperty.call(zhCN.errors, code)
    ? zhCN.errors[code as keyof typeof zhCN.errors]
    : zhCN.errors.CHAT_TRANSPORT_FAILED;
}

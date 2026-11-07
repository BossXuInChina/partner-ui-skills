import { computed, shallowRef } from 'vue';
import type { WorkbenchMessageProps } from '@workbench/ui-vue3';

export interface MessageInput {
  message: string;
  type?: WorkbenchMessageProps['type'];
  showClose?: boolean;
  showIcon?: boolean;
  checkboxLabel?: string;
  checkboxChecked?: boolean;
}
export type MessageItem = Readonly<MessageInput & { id: string; messageKey: string }>;
const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export function useMessages() {
  const entries = shallowRef<MessageItem[]>([]);
  let sequence = 0;
  function show(input: MessageInput): string {
    const id = `message-${++sequence}`;
    entries.value = [{ ...input, id, messageKey: id }, ...entries.value];
    return id;
  }
  function remove(id: string) {
    entries.value = entries.value.filter((item) => item.id !== id);
  }
  function dismiss(event: unknown) {
    if (
      record(event) &&
      typeof event.id === 'string' &&
      ['timeout', 'button', 'replaced'].includes(String(event.reason))
    )
      remove(event.id);
  }
  function checkbox(event: unknown) {
    if (!record(event) || typeof event.id !== 'string' || typeof event.checked !== 'boolean')
      return;
    entries.value = entries.value.map((item) =>
      item.id === event.id ? { ...item, checkboxChecked: event.checked as boolean } : item,
    );
  }
  return {
    items: computed(() => Object.freeze(entries.value.map((item) => Object.freeze({ ...item })))),
    show,
    remove,
    dismiss,
    checkbox,
    clear: () => {
      entries.value = [];
    },
  };
}
export type MessagesController = ReturnType<typeof useMessages>;

import type { AssistantDelta, AssistantPart, ChatPart, ChatDelta, PartValidator } from './types';

const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const optionalString = (value: unknown) => value === undefined || typeof value === 'string';

/** Runtime validation of the public package union; no company endpoint/schema is inferred. */
export function isAssistantPart(value: unknown): value is AssistantPart {
  if (!record(value)) return false;
  switch (value.type) {
    case 'text':
    case 'ai-summary':
      return typeof value.text === 'string';
    case 'empty-result':
      return true;
    case 'unsupported':
      return typeof value.originalType === 'string';
    case 'business-navigation': {
      const target = value.target;
      return (
        typeof value.title === 'string' &&
        optionalString(value.description) &&
        record(target) &&
        typeof target.target === 'string' &&
        (target.params === undefined ||
          (record(target.params) &&
            Object.values(target.params).every((param) => typeof param === 'string')))
      );
    }
    case 'agreement-table':
      return (
        typeof value.total === 'number' &&
        Number.isFinite(value.total) &&
        Array.isArray(value.agreements) &&
        value.agreements.every(
          (agreement) =>
            record(agreement) &&
            ['id', 'name', 'partner', 'owner', 'endDate', 'amount'].every(
              (key) => typeof agreement[key] === 'string',
            ) &&
            typeof agreement.status === 'string' &&
            ['待续签', '审批中', '已续签'].includes(agreement.status),
        ) &&
        (value.calculation === undefined ||
          (record(value.calculation) &&
            typeof value.calculation.formula === 'string' &&
            typeof value.calculation.note === 'string'))
      );
    default:
      return false;
  }
}

export function isAssistantDelta(value: unknown): value is AssistantDelta {
  return (
    record(value) &&
    (value.kind === 'text'
      ? typeof value.text === 'string'
      : value.kind === 'part' && isAssistantPart(value.part))
  );
}

/** Extensions never override validation of a known public discriminant. */
export function createPartValidator<Extension extends ChatPart = never>(
  extension?: PartValidator<Extension>,
) {
  const publicTypes: readonly AssistantPart['type'][] = [
    'text',
    'ai-summary',
    'empty-result',
    'unsupported',
    'business-navigation',
    'agreement-table',
  ];
  return (value: unknown): value is AssistantPart | Extension => {
    if (!record(value) || typeof value.type !== 'string' || !value.type.trim()) return false;
    if (publicTypes.some((type) => type === value.type)) return isAssistantPart(value);
    return extension?.(value) ?? false;
  };
}
export function createDeltaValidator<Extension extends ChatPart = never>(
  extension?: PartValidator<Extension>,
) {
  const isPart = createPartValidator(extension);
  return (value: unknown): value is ChatDelta<Extension> =>
    record(value) &&
    (value.kind === 'text'
      ? typeof value.text === 'string'
      : value.kind === 'part' && isPart(value.part));
}

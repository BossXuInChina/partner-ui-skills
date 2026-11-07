import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, createVNode as _createVNode, normalizeClass as _normalizeClass, unref as _unref, mergeProps as _mergeProps, withCtx as _withCtx, createBlock as _createBlock, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-busy"];
const _hoisted_2 = {
  key: 0,
  class: "wb-table__toolbar",
  "aria-label": "\u8868\u683C\u64CD\u4F5C\u533A"
};
const _hoisted_3 = {
  key: 0,
  class: "wb-table__title"
};
const _hoisted_4 = { class: "wb-table__toolbar-row" };
const _hoisted_5 = { class: "wb-table__toolbar-leading" };
const _hoisted_6 = {
  key: 0,
  class: "wb-table__toolbar-actions"
};
const _hoisted_7 = {
  key: 1,
  class: "wb-table__sr-only",
  role: "status",
  "aria-live": "polite"
};
const _hoisted_8 = ["aria-label"];
const _hoisted_9 = { class: "wb-table__sr-only" };
const _hoisted_10 = {
  key: 0,
  class: "wb-table__selection-column"
};
const _hoisted_11 = ["data-fixed"];
const _hoisted_12 = {
  key: 1,
  class: "wb-table__action-column"
};
const _hoisted_13 = ["rowspan", "data-fixed"];
const _hoisted_14 = ["colspan", "data-anchor-key", "data-fixed"];
const _hoisted_15 = ["rowspan", "data-fixed", "data-column-key", "aria-sort"];
const _hoisted_16 = { class: "wb-table__header-content" };
const _hoisted_17 = { class: "wb-table__header-title-host" };
const _hoisted_18 = {
  key: 0,
  class: "wb-table__header-actions"
};
const _hoisted_19 = ["disabled", "aria-label", "onClick"];
const _hoisted_20 = ["rowspan", "data-fixed"];
const _hoisted_21 = {
  key: 0,
  class: "wb-table__skeleton-body"
};
const _hoisted_22 = ["data-fixed"];
const _hoisted_23 = ["data-fixed"];
const _hoisted_24 = ["data-fixed"];
const _hoisted_25 = { key: 1 };
const _hoisted_26 = ["colspan"];
const _hoisted_27 = {
  class: "wb-table__state",
  role: "alert"
};
const _hoisted_28 = { key: 2 };
const _hoisted_29 = ["colspan"];
const _hoisted_30 = {
  class: "wb-table__state",
  role: "status"
};
const _hoisted_31 = { key: 3 };
const _hoisted_32 = ["data-fixed"];
const _hoisted_33 = ["data-fixed"];
const _hoisted_34 = ["disabled", "aria-expanded", "aria-controls", "aria-label", "onClick"];
const _hoisted_35 = {
  key: 2,
  class: "wb-table__ellipsis-host"
};
const _hoisted_36 = ["aria-describedby"];
const _hoisted_37 = ["data-fixed"];
const _hoisted_38 = {
  key: 1,
  class: "wb-table__row-actions"
};
const _hoisted_39 = {
  key: 0,
  class: "wb-table__detail-row"
};
const _hoisted_40 = ["colspan"];
const _hoisted_41 = ["id", "aria-label"];
const _hoisted_42 = {
  key: 0,
  class: "wb-table__detail-actions"
};
const _hoisted_43 = {
  key: 2,
  class: "wb-table__footer"
};
const _hoisted_44 = {
  key: 0,
  class: "wb-table__total"
};
const _hoisted_45 = {
  key: 1,
  class: "wb-table__batch",
  "aria-live": "polite"
};
const _hoisted_46 = { class: "wb-table__selection-summary" };
const _hoisted_47 = { class: "wb-table__selection-count" };
import "../shared/disclosure-motion.css";
import { resolveColumnWidths } from "./column-widths.js";
import { layoutCellWidth } from "./layout-width.js";
import { useColumnResize } from "./useColumnResize.js";
import ColumnResizeControl from "./ColumnResizeControl.vue";
import TableColumnFilter from "./TableColumnFilter.vue";
import WorkbenchIcon from "../icons/WorkbenchIcon.vue";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, useSlots, watch } from "vue";
import WorkbenchButton from "../button/WorkbenchButton.vue";
import WorkbenchCheckbox from "../choice/WorkbenchCheckbox.vue";
import WorkbenchDropdown from "../dropdown/WorkbenchDropdown.vue";
import WorkbenchLink from "../link/WorkbenchLink.vue";
import WorkbenchPagination from "../pagination/WorkbenchPagination.vue";
import TableScrollArea from "./TableScrollArea.vue";
import WorkbenchSkeletonBlock from "../skeleton/WorkbenchSkeletonBlock.vue";
import WorkbenchTooltip from "../tooltip/WorkbenchTooltip.vue";
import TableCellContent from "./TableCellContent.vue";
import "../../../../catalog/generated/asset.tokens.css";
const __sfc_main__ = {
  __name: "WorkbenchTable",
  props: {
    title: { type: String, default: "" },
    caption: { type: String, default: "" },
    ariaLabel: { type: String, default: "" },
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    rowKey: { type: [String, Function], required: true },
    selectedRowKeys: { type: Array, default: () => [] },
    sort: { type: Object, default: null },
    page: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    pageSizeOptions: { type: Array, default: () => [10, 20, 50, 100] },
    total: { type: Number, default: null },
    loading: { type: Boolean, default: false },
    errorMessage: { type: String, default: "" },
    emptyKind: {
      type: String,
      default: "initial",
      validator: (value) => ["initial", "filtered"].includes(value)
    },
    selectable: { type: Boolean, default: false },
    selectionFixed: { type: Boolean, default: false },
    actionsFixed: { type: Boolean, default: false },
    expandable: { type: Boolean, default: false },
    expandedRowKeys: { type: Array, default: () => [] },
    isRowExpandable: { type: Function, default: () => true },
    isRowSelectable: { type: Function, default: () => true },
    rowActions: { type: [Array, Function], default: () => [] },
    striped: { type: Boolean, default: false },
    resizable: { type: Boolean, default: false },
    columnWidths: { type: Object, default: void 0 },
    columnFilters: { type: Object, default: () => ({}) }
  },
  emits: [
    "update:selectedRowKeys",
    "selection-change",
    "update:sort",
    "sort-change",
    "column-filter",
    "update:columnFilters",
    "column-filter-change",
    "update:page",
    "page-change",
    "update:pageSize",
    "page-size-change",
    "update:expandedRowKeys",
    "expand-change",
    "row-action",
    "retry",
    "update:columnWidths",
    "column-width-change"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const instanceId = useId();
    const expandedKeys = computed(() => new Set(props.expandedRowKeys));
    const expansionKey = computed(
      () => normalizedColumns.value.find((column) => column.fixed === "left")?.key ?? primaryKey.value
    );
    const detailId = (row) => `table-${instanceId}-detail-${encodeURIComponent(String(keyOf(row)))}`;
    function toggleExpanded(row) {
      const key = keyOf(row);
      const expanded = !expandedKeys.value.has(key);
      emit(
        "update:expandedRowKeys",
        expanded ? [...props.expandedRowKeys, key] : props.expandedRowKeys.filter((item) => item !== key)
      );
      emit("expand-change", { row, rowKey: key, expanded });
    }
    watch(
      () => props.expandedRowKeys,
      (next, previous) => {
        for (const key of previous) {
          if (next.includes(key)) continue;
          const row = props.rows.find((item) => keyOf(item) === key);
          const detail = row && document.getElementById(detailId(row));
          if (detail?.contains(document.activeElement))
            nextTick(() => root.value?.querySelector(`[aria-controls="${detailId(row)}"]`)?.focus());
        }
      },
      { flush: "pre" }
    );
    const root = ref(null);
    const scrollArea = ref(null);
    const isOverflowing = ref(false);
    const columnWidths = ref({});
    const pixelColumns = ref([]);
    let resizeObserver, rootFontProbe;
    const normalizedColumns = computed(
      () => props.columns.filter((column) => column && column.key && column.title).slice().sort((a, b) => {
        const rank = (column) => column.fixed === "left" ? 0 : column.fixed === "right" ? 2 : 1;
        return rank(a) - rank(b);
      })
    );
    const hasGroupedHeaders = computed(
      () => normalizedColumns.value.some((column) => column.group?.key && column.group?.title)
    );
    const groupStarts = computed(
      () => new Set(
        normalizedColumns.value.flatMap((column, index, all) => {
          if (!column.group?.key || !column.group?.title || index === 0 && !props.selectable)
            return [];
          const previous = all[index - 1];
          return !previous || previous.group?.key !== column.group.key || previous.fixed !== column.fixed ? [column.key] : [];
        })
      )
    );
    const groupedHeaderRows = computed(() => {
      const top = [], bottom = [];
      for (const column of normalizedColumns.value) {
        const group = column.group;
        if (!group?.key || !group?.title) {
          top.push(column);
          continue;
        }
        bottom.push(column);
        const last = top[top.length - 1];
        if (last?.isGroupHeader && last.groupKey === group.key && last.fixed === column.fixed) {
          last.span += 1;
          if (column.fixed === "right") last.anchorKey = column.key;
        } else {
          top.push({
            isGroupHeader: true,
            groupKey: group.key,
            title: group.title,
            fixed: column.fixed,
            key: `group-${group.key}-${column.key}`,
            anchorKey: column.key,
            startKey: column.key,
            span: 1
          });
        }
      }
      return [top, bottom];
    });
    const headerRows = computed(
      () => hasGroupedHeaders.value ? groupedHeaderRows.value : [normalizedColumns.value]
    );
    const primaryKey = computed(
      () => normalizedColumns.value.find((column) => column.primary)?.key ?? normalizedColumns.value[0]?.key
    );
    const resize = useColumnResize({
      props,
      columns: normalizedColumns,
      pixelColumns,
      widths: columnWidths,
      root,
      emit
    });
    const { editorKey } = resize;
    __expose({ resetColumnWidths: resize.resetColumnWidths });
    const hasRowActions = computed(
      () => Boolean(slots["row-actions"]) || (Array.isArray(props.rowActions) ? props.rowActions.length > 0 : typeof props.rowActions === "function")
    );
    const totalColumnCount = computed(
      () => normalizedColumns.value.length + (props.selectable ? 1 : 0) + (hasRowActions.value ? 1 : 0)
    );
    const hasPagination = computed(() => Number.isFinite(props.total) && props.total >= 0);
    const accessibleCaption = computed(
      () => props.caption.trim() || props.ariaLabel.trim() || "\u6570\u636E\u8868\u683C"
    );
    const hasToolbar = computed(
      () => Boolean(props.title || slots["toolbar-leading"] || slots["toolbar-actions"])
    );
    const selectedKeySet = computed(
      () => props.selectable ? new Set(props.selectedRowKeys) : /* @__PURE__ */ new Set()
    );
    const selectableRows = computed(
      () => props.selectable ? props.rows.filter((row, index) => props.isRowSelectable(row, index)) : []
    );
    const selectedVisibleRows = computed(
      () => props.rows.filter((row) => selectedKeySet.value.has(keyOf(row)))
    );
    const selectedVisibleKeys = computed(() => selectedVisibleRows.value.map((row) => keyOf(row)));
    const allSelected = computed(
      () => selectableRows.value.length > 0 && selectableRows.value.every((row) => selectedKeySet.value.has(keyOf(row)))
    );
    const someSelected = computed(
      () => !allSelected.value && selectableRows.value.some((row) => selectedKeySet.value.has(keyOf(row)))
    );
    const initialLoading = computed(() => props.loading && props.rows.length === 0);
    const showError = computed(() => !props.loading && Boolean(props.errorMessage));
    const showEmpty = computed(() => !props.loading && !showError.value && props.rows.length === 0);
    const skeletonRows = Object.freeze([0, 1, 2, 3, 4]);
    function keyOf(row) {
      return typeof props.rowKey === "function" ? props.rowKey(row) : row?.[props.rowKey];
    }
    function cellValue(row, column) {
      const value = typeof column.field === "function" ? column.field(row) : row?.[column.field ?? column.key];
      return value === null || value === void 0 ? "" : String(value);
    }
    function columnAlign(column) {
      return column.align === "right" || column.align === "end" ? "end" : column.align === "center" ? "center" : "start";
    }
    function columnFilterValues(column) {
      return Array.isArray(props.columnFilters[column.key]) ? props.columnFilters[column.key] : [];
    }
    function changeColumnFilter(column, values, source = "option") {
      if (props.loading || showError.value) return;
      const next = { ...props.columnFilters };
      if (source === "reset-all") Object.keys(next).forEach((key) => delete next[key]);
      else if (values.length) next[column.key] = [...values];
      else delete next[column.key];
      emit("update:columnFilters", next);
      emit("column-filter-change", {
        key: column.key,
        column,
        values: [...values],
        columnFilters: next,
        source
      });
    }
    function normalizeLength(value) {
      if (Number.isFinite(value) && value >= 0) return `${value}px`;
      if (typeof value === "string" && /^\d+(?:\.\d+)?(?:px|rem|em|%|ch)$/.test(value.trim()))
        return value.trim();
      return "";
    }
    function applyColumnGeometry(element, column) {
      if (!element) return;
      const width = normalizeLength(column.width);
      const resolved = columnWidths.value[column.key];
      const resolvedWidth = resolved === void 0 ? width : `${resolved}px`;
      element.style.width = resolvedWidth;
      element.style.minWidth = resolved === void 0 ? normalizeLength(column.minWidth) || width : resolvedWidth;
      element.style.maxWidth = resolvedWidth;
      queueMeasure();
    }
    let measureQueued = false;
    function queueMeasure() {
      if (measureQueued) return;
      measureQueued = true;
      nextTick(() => {
        measureQueued = false;
        measureOverflow();
      });
    }
    function resolveTableColumnWidths(viewport) {
      if (!viewport || !root.value) return {};
      const styles = getComputedStyle(root.value);
      const selectionWidth = props.selectable ? Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-table-selection-column-width")) || 0 : 0;
      const actionWidth = hasRowActions.value ? Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-table-action-column-width")) || 0 : 0;
      const probe = document.createElement("div");
      probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;height:0;overflow:hidden";
      probe.style.width = `${viewport.clientWidth}px`;
      probe.style.font = getComputedStyle(viewport.querySelector("table")).font;
      const lengthProbe = document.createElement("div");
      probe.append(lengthProbe);
      viewport.append(probe);
      const pixels = (value) => {
        const length = normalizeLength(value);
        if (!length || length.endsWith("px")) return value;
        lengthProbe.style.width = length;
        return Number.parseFloat(getComputedStyle(lengthProbe).width) || 0;
      };
      let columns;
      try {
        columns = normalizedColumns.value.map((column) => ({
          ...column,
          width: pixels(column.width),
          minWidth: pixels(column.minWidth),
          maxWidth: pixels(column.maxWidth)
        }));
      } finally {
        probe.remove();
      }
      const padding = Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-table-cell-padding-inline")) || 0;
      const action = Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-table-header-action-icon-size")) || 0;
      const gap = Number.parseFloat(styles.getPropertyValue("--wb-asset-wb-table-header-action-gap")) || 0;
      columns = columns.map((column) => ({
        ...column,
        minWidth: props.resizable && column.resizable !== false ? Math.max(
          Number.parseFloat(column.minWidth) || 0,
          2 * padding + gap + (Number(Boolean(column.sortable)) + Number(Boolean(column.filterable))) * (action + gap)
        ) : column.minWidth
      }));
      if (JSON.stringify(pixelColumns.value) !== JSON.stringify(columns)) pixelColumns.value = columns;
      return resolveColumnWidths(
        columns,
        viewport.clientWidth - selectionWidth - actionWidth,
        primaryKey.value,
        resize.effectiveWidths.value ?? {}
      );
    }
    function measureOverflow() {
      const viewport = root.value?.querySelector(".wb-scrollarea__viewport");
      if (!viewport) return;
      const nextWidths = resolveTableColumnWidths(viewport);
      if (JSON.stringify(nextWidths) !== JSON.stringify(columnWidths.value)) {
        columnWidths.value = nextWidths;
        nextTick(measureOverflow);
        return;
      }
      const table = viewport.querySelector("table");
      const extraWidth = (props.selectable ? Number.parseFloat(
        getComputedStyle(root.value).getPropertyValue(
          "--wb-asset-wb-table-selection-column-width"
        )
      ) : 0) + (hasRowActions.value ? Number.parseFloat(
        getComputedStyle(root.value).getPropertyValue("--wb-asset-wb-table-action-column-width")
      ) : 0);
      table.style.width = `${Object.values(nextWidths).reduce((sum, width) => sum + width, extraWidth)}px`;
      table.style.minWidth = "0";
      isOverflowing.value = viewport.scrollWidth > viewport.clientWidth + 1;
      const selectionHeader = viewport.querySelector("thead .wb-table__selection-cell--header");
      const actionHeader = viewport.querySelector("thead .wb-table__action-cell--header");
      const leafHeaders = normalizedColumns.value.map(
        (column) => [...viewport.querySelectorAll("thead th[data-column-key]")].find(
          (header) => header.dataset.columnKey === String(column.key)
        )
      );
      const headers = [selectionHeader, ...leafHeaders, actionHeader].filter(Boolean);
      for (const side of ["left", "right"]) {
        let offset = 0;
        const fixedHeaders = headers.filter((header) => header.dataset.fixed === side);
        if (side === "right") fixedHeaders.reverse();
        for (const header of fixedHeaders) {
          const index = headers.indexOf(header);
          header.style.setProperty("--table-fixed-offset", `${offset}px`);
          for (const row of viewport.querySelectorAll("tbody tr:not(.wb-table__detail-row)")) {
            const cell = row.children[index];
            if (cell) cell.style.setProperty("--table-fixed-offset", `${offset}px`);
          }
          offset += layoutCellWidth(header);
        }
      }
      for (const group of viewport.querySelectorAll("thead .wb-table__group-header[data-anchor-key]")) {
        const anchor = leafHeaders.find(
          (header) => header?.dataset.columnKey === group.dataset.anchorKey
        );
        group.style.setProperty(
          "--table-fixed-offset",
          anchor?.style.getPropertyValue("--table-fixed-offset") || "0px"
        );
      }
      scrollArea.value?.measure();
    }
    function emitSelection(nextKeys, source) {
      if (!props.selectable) return;
      const visibleKeys = new Set(props.rows.map((row) => keyOf(row)));
      const next = [...new Set(nextKeys)].filter((key) => visibleKeys.has(key));
      const rows = props.rows.filter((row) => next.includes(keyOf(row)));
      emit("update:selectedRowKeys", next);
      emit("selection-change", { selectedRowKeys: next, selectedRows: rows, source });
    }
    function clearSelection(source = "clear") {
      if (!props.selectedRowKeys.length) return;
      emitSelection([], source);
    }
    function toggleAll(checked) {
      if (props.loading || showError.value) return;
      emitSelection(checked ? selectableRows.value.map((row) => keyOf(row)) : [], "page");
    }
    function toggleRow(row, checked) {
      if (props.loading || !props.isRowSelectable(row, props.rows.indexOf(row))) return;
      const key = keyOf(row);
      const next = new Set(selectedVisibleKeys.value);
      if (checked) next.add(key);
      else next.delete(key);
      emitSelection([...next], "row");
    }
    function sortDirection(column) {
      return props.sort?.key === column.key ? props.sort.direction : null;
    }
    function ariaSort(column) {
      if (!column.sortable) return void 0;
      const direction = sortDirection(column);
      return direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
    }
    function sortLabel(column) {
      const direction = sortDirection(column);
      return direction === "asc" ? `${column.title}\uFF0C\u5F53\u524D\u5347\u5E8F\uFF0C\u5207\u6362\u4E3A\u964D\u5E8F` : direction === "desc" ? `${column.title}\uFF0C\u5F53\u524D\u964D\u5E8F\uFF0C\u6062\u590D\u9ED8\u8BA4\u987A\u5E8F` : `${column.title}\uFF0C\u5207\u6362\u4E3A\u5347\u5E8F`;
    }
    function toggleSort(column) {
      if (!column.sortable || props.loading || showError.value) return;
      const direction = sortDirection(column);
      const next = direction === "asc" ? { key: column.key, direction: "desc" } : direction === "desc" ? null : { key: column.key, direction: "asc" };
      emit("update:sort", next);
      emit("sort-change", next);
    }
    function requestColumnFilter(column) {
      if (!column.filterable || props.loading || showError.value) return;
      emit("column-filter", { key: column.key, column, source: "header" });
    }
    function actionsFor(row) {
      const actions = typeof props.rowActions === "function" ? props.rowActions(row) : props.rowActions;
      return Array.isArray(actions) ? actions.filter((action) => action?.id && action?.label) : [];
    }
    function actionDisabled(action, row) {
      return props.loading || (typeof action.disabled === "function" ? action.disabled(row) : Boolean(action.disabled));
    }
    function emitRowAction(row, action, source = "direct") {
      if (!action || actionDisabled(action, row)) return;
      emit("row-action", { row, rowKey: keyOf(row), action, source });
    }
    function overflowItems(row) {
      return actionsFor(row).slice(2).map((action) => ({
        id: action.id,
        label: action.label,
        type: "action",
        disabled: actionDisabled(action, row)
      }));
    }
    function activateOverflow(row, actionId) {
      const action = actionsFor(row).find((item) => item.id === actionId);
      emitRowAction(row, action, "overflow");
    }
    async function markOverflowPanel(open) {
      if (!open) return;
      await nextTick();
      const trigger = root.value?.querySelector(
        '.wb-table__row-more [aria-expanded="true"][aria-controls]'
      );
      const panelId = trigger?.getAttribute("aria-controls");
      if (panelId) document.getElementById(panelId)?.classList.add("wb-table__overflow-panel");
    }
    function changePage(value) {
      emit("update:page", value);
      emit("page-change", value);
    }
    function changePageSize(value) {
      emit("update:pageSize", value);
      emit("page-size-change", value);
    }
    watch([() => props.page, () => props.pageSize], ([page, size], [previousPage, previousSize]) => {
      if ((page !== previousPage || size !== previousSize) && props.selectedRowKeys.length)
        clearSelection(page !== previousPage ? "external-page-change" : "external-page-size-change");
    });
    watch(
      [
        () => props.rows,
        () => props.columns,
        () => props.selectable,
        () => props.selectionFixed,
        () => props.actionsFixed
      ],
      () => nextTick(measureOverflow),
      { deep: true }
    );
    watch(resize.effectiveWidths, queueMeasure, { deep: true });
    watch(() => props.resizable, queueMeasure);
    onMounted(() => {
      if (!props.caption.trim() && !props.ariaLabel.trim())
        console.warn("[WorkbenchTable] caption \u6216 ariaLabel \u81F3\u5C11\u9700\u8981\u63D0\u4F9B\u4E00\u9879\u3002");
      resizeObserver = new ResizeObserver(measureOverflow);
      if (root.value) resizeObserver.observe(root.value);
      const viewport = root.value?.querySelector(".wb-scrollarea__viewport");
      const table = root.value?.querySelector("table");
      if (viewport) resizeObserver.observe(viewport);
      if (table) resizeObserver.observe(table);
      rootFontProbe = document.createElement("span");
      rootFontProbe.setAttribute("aria-hidden", "true");
      rootFontProbe.style.cssText = "position:absolute;left:0;top:0;width:1rem;height:0;visibility:hidden;pointer-events:none";
      root.value?.append(rootFontProbe);
      resizeObserver.observe(rootFontProbe);
      nextTick(measureOverflow);
    });
    onBeforeUnmount(() => {
      resizeObserver?.disconnect();
      rootFontProbe?.remove();
    });
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("section", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-table-prototype", {
          "has-selection": __props.selectable,
          "has-actions": hasRowActions.value,
          "has-footer": hasPagination.value || selectedVisibleKeys.value.length,
          "is-overflowing": isOverflowing.value,
          "is-striped": __props.striped,
          "is-refreshing": __props.loading && __props.rows.length > 0
        }]),
        "aria-busy": __props.loading || void 0
      }, [
        hasToolbar.value ? (_openBlock(), _createElementBlock("header", _hoisted_2, [
          __props.title ? (_openBlock(), _createElementBlock(
            "h2",
            _hoisted_3,
            _toDisplayString(__props.title),
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          _createElementVNode("div", _hoisted_4, [
            _createElementVNode("div", _hoisted_5, [
              _renderSlot(_ctx.$slots, "toolbar-leading")
            ]),
            _ctx.$slots["toolbar-actions"] ? (_openBlock(), _createElementBlock("div", _hoisted_6, [
              _renderSlot(_ctx.$slots, "toolbar-actions")
            ])) : _createCommentVNode("v-if", true)
          ])
        ])) : _createCommentVNode("v-if", true),
        __props.loading && __props.rows.length ? (_openBlock(), _createElementBlock("span", _hoisted_7, "\u6B63\u5728\u5237\u65B0\u8868\u683C\u6570\u636E")) : _createCommentVNode("v-if", true),
        _createVNode(TableScrollArea, {
          ref_key: "scrollArea",
          ref: scrollArea,
          class: "wb-table__scroll",
          label: `${accessibleCaption.value}\u6A2A\u5411\u6EDA\u52A8\u533A\u57DF`
        }, {
          default: _withCtx(() => [
            _createElementVNode("table", {
              "aria-label": __props.caption ? void 0 : __props.ariaLabel || accessibleCaption.value
            }, [
              _createElementVNode(
                "caption",
                _hoisted_9,
                _toDisplayString(accessibleCaption.value),
                1
                /* TEXT */
              ),
              _createElementVNode("colgroup", null, [
                __props.selectable ? (_openBlock(), _createElementBlock("col", _hoisted_10)) : _createCommentVNode("v-if", true),
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(normalizedColumns.value, (column) => {
                    return _openBlock(), _createElementBlock("col", {
                      key: column.key,
                      ref_for: true,
                      ref: (element) => applyColumnGeometry(element, column),
                      "data-fixed": column.fixed
                    }, null, 8, _hoisted_11);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                hasRowActions.value ? (_openBlock(), _createElementBlock("col", _hoisted_12)) : _createCommentVNode("v-if", true)
              ]),
              _createElementVNode("thead", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(headerRows.value, (headerRow, headerRowIndex) => {
                    return _openBlock(), _createElementBlock("tr", { key: headerRowIndex }, [
                      __props.selectable && headerRowIndex === 0 ? (_openBlock(), _createElementBlock("th", {
                        key: 0,
                        rowspan: hasGroupedHeaders.value ? 2 : 1,
                        class: _normalizeClass(["wb-table__selection-cell wb-table__selection-cell--header", { "is-sticky": isOverflowing.value && __props.selectionFixed }]),
                        "data-fixed": __props.selectionFixed ? "left" : void 0,
                        scope: "col"
                      }, [
                        _createVNode(WorkbenchCheckbox, {
                          "model-value": allSelected.value,
                          indeterminate: someSelected.value,
                          disabled: __props.loading || showError.value || selectableRows.value.length === 0,
                          "aria-label": "\u9009\u62E9\u5F53\u524D\u9875\u5168\u90E8\u884C",
                          "onUpdate:modelValue": toggleAll
                        }, null, 8, ["model-value", "indeterminate", "disabled"])
                      ], 10, _hoisted_13)) : _createCommentVNode("v-if", true),
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(headerRow, (column) => {
                          return _openBlock(), _createElementBlock(
                            _Fragment,
                            {
                              key: column.key
                            },
                            [
                              column.isGroupHeader ? (_openBlock(), _createElementBlock("th", {
                                key: 0,
                                class: _normalizeClass(["wb-table__group-header is-align-center", {
                                  "is-sticky": isOverflowing.value && Boolean(column.fixed),
                                  "is-group-start": groupStarts.value.has(column.startKey)
                                }]),
                                colspan: column.span,
                                "data-anchor-key": column.anchorKey,
                                "data-fixed": column.fixed,
                                scope: "colgroup"
                              }, _toDisplayString(column.title), 11, _hoisted_14)) : (_openBlock(), _createElementBlock("th", {
                                key: 1,
                                rowspan: hasGroupedHeaders.value && !(column.group?.key && column.group?.title) ? 2 : 1,
                                ref_for: true,
                                ref: (element) => applyColumnGeometry(element, column),
                                "data-fixed": column.fixed,
                                class: _normalizeClass(["wb-table__header-cell", [
                                  `is-align-${columnAlign(column)}`,
                                  {
                                    "is-primary": column.key === primaryKey.value,
                                    "is-sticky": isOverflowing.value && Boolean(column.fixed),
                                    "is-resizable": _unref(resize).canResize(column),
                                    "is-group-start": groupStarts.value.has(column.key)
                                  }
                                ]]),
                                "data-column-key": column.key,
                                scope: "col",
                                "aria-sort": ariaSort(column)
                              }, [
                                _createElementVNode("span", _hoisted_16, [
                                  _createElementVNode("span", _hoisted_17, [
                                    _ctx.$slots[`header-${column.key}`] ? _renderSlot(_ctx.$slots, `header-${column.key}`, { column }, void 0, void 0, 0) : (_openBlock(), _createBlock(WorkbenchTooltip, {
                                      key: 1,
                                      content: column.title,
                                      "overflow-only": ""
                                    }, {
                                      trigger: _withCtx(({ aria }) => [
                                        _createElementVNode(
                                          "span",
                                          _mergeProps({
                                            class: "wb-table__header-title",
                                            tabindex: "0"
                                          }, { ref_for: true }, aria),
                                          _toDisplayString(column.title),
                                          17
                                          /* TEXT, FULL_PROPS */
                                        )
                                      ]),
                                      _: 2
                                      /* DYNAMIC */
                                    }, 1032, ["content"]))
                                  ]),
                                  column.filterable || column.sortable ? (_openBlock(), _createElementBlock("span", _hoisted_18, [
                                    column.filterable ? (_openBlock(), _createBlock(TableColumnFilter, {
                                      key: 0,
                                      column,
                                      values: columnFilterValues(column),
                                      align: columnAlign(column),
                                      disabled: __props.loading || showError.value,
                                      onRequest: ($event) => requestColumnFilter(column),
                                      onChange: ($event) => changeColumnFilter(column, $event),
                                      onReset: ($event) => changeColumnFilter(column, [], "reset-column"),
                                      onResetAll: ($event) => changeColumnFilter(column, [], "reset-all")
                                    }, null, 8, ["column", "values", "align", "disabled", "onRequest", "onChange", "onReset", "onResetAll"])) : _createCommentVNode("v-if", true),
                                    column.sortable ? (_openBlock(), _createElementBlock("button", {
                                      key: 1,
                                      type: "button",
                                      class: _normalizeClass(["wb-table__header-action wb-table__sort", { "is-active": sortDirection(column) }]),
                                      disabled: __props.loading || showError.value,
                                      "aria-label": sortLabel(column),
                                      onClick: ($event) => toggleSort(column)
                                    }, [
                                      _createVNode(WorkbenchIcon, {
                                        name: "/ic_public_sort_line_14px",
                                        color: "var(--wb-color-icon-secondary)",
                                        "color-split": sortDirection(column) ? {
                                          ratio: 0.5,
                                          startColor: sortDirection(column) === "asc" ? "var(--wb-color-text-action)" : "var(--wb-color-icon-secondary)",
                                          endColor: sortDirection(column) === "desc" ? "var(--wb-color-text-action)" : "var(--wb-color-icon-secondary)"
                                        } : null
                                      }, null, 8, ["color-split"])
                                    ], 10, _hoisted_19)) : _createCommentVNode("v-if", true)
                                  ])) : _createCommentVNode("v-if", true)
                                ]),
                                _unref(resize).canResize(column) ? (_openBlock(), _createBlock(ColumnResizeControl, {
                                  key: 0,
                                  column,
                                  width: columnWidths.value[column.key],
                                  minimum: _unref(resize).boundsOf(column.key).min,
                                  maximum: _unref(resize).boundsOf(column.key).max,
                                  disabled: __props.loading || showError.value,
                                  open: _unref(editorKey) === column.key,
                                  onPointerdown: ($event) => _unref(resize).startDrag(column.key, $event),
                                  onPointermove: _unref(resize).moveDrag,
                                  onPointerup: _unref(resize).endDrag,
                                  onCancel: _unref(resize).cancelDrag,
                                  onClick: ($event) => _unref(resize).toggleEditor(column.key),
                                  onKeydown: ($event) => _unref(resize).keydown(column.key, $event),
                                  onClose: _cache[0] || (_cache[0] = ($event) => editorKey.value = null),
                                  onAdjust: ($event) => _unref(resize).changeWidth(column.key, columnWidths.value[column.key] + $event, "button"),
                                  onReset: ($event) => _unref(resize).resetColumnWidths(column.key),
                                  onResetAll: _cache[1] || (_cache[1] = ($event) => _unref(resize).resetColumnWidths())
                                }, null, 8, ["column", "width", "minimum", "maximum", "disabled", "open", "onPointerdown", "onPointermove", "onPointerup", "onCancel", "onClick", "onKeydown", "onAdjust", "onReset"])) : _createCommentVNode("v-if", true)
                              ], 10, _hoisted_15))
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      hasRowActions.value && headerRowIndex === 0 ? (_openBlock(), _createElementBlock("th", {
                        key: 1,
                        rowspan: hasGroupedHeaders.value ? 2 : 1,
                        class: _normalizeClass(["wb-table__action-cell wb-table__action-cell--header", { "is-sticky": isOverflowing.value && __props.actionsFixed }]),
                        "data-fixed": __props.actionsFixed ? "right" : void 0,
                        scope: "col"
                      }, " \u64CD\u4F5C ", 10, _hoisted_20)) : _createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              initialLoading.value ? (_openBlock(), _createElementBlock("tbody", _hoisted_21, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(_unref(skeletonRows), (rowIndex) => {
                    return _openBlock(), _createElementBlock("tr", { key: rowIndex }, [
                      __props.selectable ? (_openBlock(), _createElementBlock("td", {
                        key: 0,
                        class: _normalizeClass(["wb-table__selection-cell", { "is-sticky": isOverflowing.value && __props.selectionFixed }]),
                        "data-fixed": __props.selectionFixed ? "left" : void 0
                      }, null, 10, _hoisted_22)) : _createCommentVNode("v-if", true),
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(normalizedColumns.value, (column) => {
                          return _openBlock(), _createElementBlock("td", {
                            key: column.key,
                            ref_for: true,
                            ref: (element) => applyColumnGeometry(element, column),
                            "data-fixed": column.fixed,
                            class: _normalizeClass({
                              "is-primary": column.key === primaryKey.value,
                              "is-sticky": isOverflowing.value && Boolean(column.fixed)
                            })
                          }, [
                            _createVNode(WorkbenchSkeletonBlock, { animated: true })
                          ], 10, _hoisted_23);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      hasRowActions.value ? (_openBlock(), _createElementBlock("td", {
                        key: 1,
                        class: _normalizeClass(["wb-table__action-cell", { "is-sticky": isOverflowing.value && __props.actionsFixed }]),
                        "data-fixed": __props.actionsFixed ? "right" : void 0
                      }, [
                        _createVNode(WorkbenchSkeletonBlock, { animated: true })
                      ], 10, _hoisted_24)) : _createCommentVNode("v-if", true)
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : showError.value ? (_openBlock(), _createElementBlock("tbody", _hoisted_25, [
                _createElementVNode("tr", null, [
                  _createElementVNode("td", {
                    class: "wb-table__state-cell",
                    colspan: totalColumnCount.value
                  }, [
                    _createElementVNode("div", _hoisted_27, [
                      _cache[4] || (_cache[4] = _createElementVNode(
                        "strong",
                        null,
                        "\u6570\u636E\u52A0\u8F7D\u5931\u8D25",
                        -1
                        /* CACHED */
                      )),
                      _createElementVNode(
                        "span",
                        null,
                        _toDisplayString(__props.errorMessage),
                        1
                        /* TEXT */
                      ),
                      _renderSlot(_ctx.$slots, "error", { message: __props.errorMessage }, () => [
                        _createVNode(WorkbenchButton, {
                          appearance: "secondary",
                          size: "32",
                          onClick: _cache[2] || (_cache[2] = ($event) => emit("retry"))
                        }, {
                          default: _withCtx(() => [..._cache[3] || (_cache[3] = [
                            _createTextVNode(
                              "\u91CD\u65B0\u52A0\u8F7D",
                              -1
                              /* CACHED */
                            )
                          ])]),
                          _: 1
                          /* STABLE */
                        })
                      ])
                    ])
                  ], 8, _hoisted_26)
                ])
              ])) : showEmpty.value ? (_openBlock(), _createElementBlock("tbody", _hoisted_28, [
                _createElementVNode("tr", null, [
                  _createElementVNode("td", {
                    class: "wb-table__state-cell",
                    colspan: totalColumnCount.value
                  }, [
                    _createElementVNode("div", _hoisted_30, [
                      _renderSlot(_ctx.$slots, "empty", { kind: __props.emptyKind }, () => [
                        _createElementVNode(
                          "strong",
                          null,
                          _toDisplayString(__props.emptyKind === "filtered" ? "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u6570\u636E" : "\u6682\u65E0\u6570\u636E"),
                          1
                          /* TEXT */
                        ),
                        _createElementVNode(
                          "span",
                          null,
                          _toDisplayString(__props.emptyKind === "filtered" ? "\u8BF7\u8C03\u6574\u641C\u7D22\u6216\u7B5B\u9009\u6761\u4EF6\u540E\u91CD\u8BD5\u3002" : "\u5F53\u524D\u8FD8\u6CA1\u6709\u53EF\u4EE5\u5C55\u793A\u7684\u4E1A\u52A1\u6570\u636E\u3002"),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ], 8, _hoisted_29)
                ])
              ])) : (_openBlock(), _createElementBlock("tbody", _hoisted_31, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(__props.rows, (row, rowIndex) => {
                    return _openBlock(), _createElementBlock(
                      _Fragment,
                      {
                        key: keyOf(row)
                      },
                      [
                        _createElementVNode(
                          "tr",
                          {
                            class: _normalizeClass(["wb-table__data-row", {
                              "is-selected": selectedKeySet.value.has(keyOf(row)),
                              "is-even": rowIndex % 2 === 1
                            }])
                          },
                          [
                            __props.selectable ? (_openBlock(), _createElementBlock("td", {
                              key: 0,
                              class: _normalizeClass(["wb-table__selection-cell", { "is-sticky": isOverflowing.value && __props.selectionFixed }]),
                              "data-fixed": __props.selectionFixed ? "left" : void 0
                            }, [
                              _createVNode(WorkbenchCheckbox, {
                                "model-value": selectedKeySet.value.has(keyOf(row)),
                                disabled: __props.loading || !__props.isRowSelectable(row, rowIndex),
                                "aria-label": `\u9009\u62E9\u7B2C ${rowIndex + 1} \u884C`,
                                "onUpdate:modelValue": ($event) => toggleRow(row, $event)
                              }, null, 8, ["model-value", "disabled", "aria-label", "onUpdate:modelValue"])
                            ], 10, _hoisted_32)) : _createCommentVNode("v-if", true),
                            (_openBlock(true), _createElementBlock(
                              _Fragment,
                              null,
                              _renderList(normalizedColumns.value, (column) => {
                                return _openBlock(), _createElementBlock("td", {
                                  key: column.key,
                                  ref_for: true,
                                  ref: (element) => applyColumnGeometry(element, column),
                                  "data-fixed": column.fixed,
                                  class: _normalizeClass([
                                    `is-align-${columnAlign(column)}`,
                                    {
                                      "is-primary": column.key === primaryKey.value,
                                      "is-sticky": isOverflowing.value && Boolean(column.fixed),
                                      "is-banded": column.banded === true,
                                      "is-group-start": groupStarts.value.has(column.key)
                                    }
                                  ])
                                }, [
                                  _createElementVNode(
                                    "div",
                                    {
                                      class: _normalizeClass(["wb-table__value", { "has-expand": __props.expandable && column.key === expansionKey.value }])
                                    },
                                    [
                                      __props.expandable && column.key === expansionKey.value ? (_openBlock(), _createElementBlock("button", {
                                        key: 0,
                                        class: "wb-table__expand",
                                        type: "button",
                                        disabled: __props.loading || !__props.isRowExpandable(row),
                                        "aria-expanded": expandedKeys.value.has(keyOf(row)),
                                        "aria-controls": detailId(row),
                                        "aria-label": `${expandedKeys.value.has(keyOf(row)) ? "\u6536\u8D77" : "\u5C55\u5F00"}\u8BE6\u60C5\uFF1A${keyOf(row)}`,
                                        onClick: ($event) => toggleExpanded(row)
                                      }, [
                                        _createVNode(WorkbenchIcon, {
                                          class: _normalizeClass(["wb-disclosure-icon wb-disclosure-icon--branch", { "is-expanded": expandedKeys.value.has(keyOf(row)) }]),
                                          name: "\u7ED3\u6784\u6811\u7BAD\u5934/\u65B9\u5411=\u5411\u53F3"
                                        }, null, 8, ["class"])
                                      ], 8, _hoisted_34)) : _createCommentVNode("v-if", true),
                                      _ctx.$slots[`cell-${column.key}`] ? (_openBlock(), _createBlock(
                                        TableCellContent,
                                        { key: 1 },
                                        {
                                          default: _withCtx(() => [
                                            _renderSlot(_ctx.$slots, `cell-${column.key}`, {
                                              row,
                                              value: cellValue(row, column),
                                              column,
                                              rowIndex
                                            })
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        },
                                        1024
                                        /* DYNAMIC_SLOTS */
                                      )) : (_openBlock(), _createElementBlock("span", _hoisted_35, [
                                        _createVNode(WorkbenchTooltip, {
                                          content: cellValue(row, column),
                                          "overflow-only": ""
                                        }, {
                                          trigger: _withCtx(({ aria }) => [
                                            _createElementVNode("span", {
                                              class: _normalizeClass(column.ellipsis ? "wb-table__ellipsis" : "wb-table__cell-content"),
                                              tabindex: "0",
                                              "aria-describedby": aria["aria-describedby"]
                                            }, _toDisplayString(cellValue(row, column)), 11, _hoisted_36)
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        }, 1032, ["content"])
                                      ]))
                                    ],
                                    2
                                    /* CLASS */
                                  )
                                ], 10, _hoisted_33);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            hasRowActions.value ? (_openBlock(), _createElementBlock("td", {
                              key: 1,
                              class: _normalizeClass(["wb-table__action-cell", { "is-sticky": isOverflowing.value && __props.actionsFixed }]),
                              "data-fixed": __props.actionsFixed ? "right" : void 0
                            }, [
                              _ctx.$slots["row-actions"] ? _renderSlot(_ctx.$slots, "row-actions", {
                                row,
                                actions: actionsFor(row),
                                emitAction: (action) => emitRowAction(row, action, "slot")
                              }, void 0, void 0, 0) : (_openBlock(), _createElementBlock("div", _hoisted_38, [
                                (_openBlock(true), _createElementBlock(
                                  _Fragment,
                                  null,
                                  _renderList(actionsFor(row).slice(0, 2), (action, actionIndex) => {
                                    return _openBlock(), _createElementBlock(
                                      _Fragment,
                                      {
                                        key: action.id
                                      },
                                      [
                                        action.type === "link" ? (_openBlock(), _createBlock(WorkbenchLink, {
                                          key: 0,
                                          class: _normalizeClass([
                                            "wb-table__row-action",
                                            actionIndex === 0 ? "wb-table__row-action--primary" : "wb-table__row-action--secondary"
                                          ]),
                                          href: action.href,
                                          disabled: actionDisabled(action, row),
                                          onClick: ($event) => emitRowAction(row, action, "direct")
                                        }, {
                                          default: _withCtx(() => [
                                            _createTextVNode(
                                              _toDisplayString(action.label),
                                              1
                                              /* TEXT */
                                            )
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        }, 1032, ["class", "href", "disabled", "onClick"])) : (_openBlock(), _createBlock(WorkbenchButton, {
                                          key: 1,
                                          class: _normalizeClass([
                                            "wb-table__row-action",
                                            actionIndex === 0 ? "wb-table__row-action--primary" : "wb-table__row-action--secondary"
                                          ]),
                                          appearance: "text",
                                          size: "28",
                                          disabled: actionDisabled(action, row),
                                          onClick: ($event) => emitRowAction(row, action, "direct")
                                        }, {
                                          default: _withCtx(() => [
                                            _createTextVNode(
                                              _toDisplayString(action.label),
                                              1
                                              /* TEXT */
                                            )
                                          ]),
                                          _: 2
                                          /* DYNAMIC */
                                        }, 1032, ["class", "disabled", "onClick"]))
                                      ],
                                      64
                                      /* STABLE_FRAGMENT */
                                    );
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                )),
                                overflowItems(row).length ? (_openBlock(), _createBlock(WorkbenchDropdown, {
                                  key: 0,
                                  class: "wb-table__row-more",
                                  size: "small",
                                  "trigger-type": "text",
                                  "text-intent": "drilldown",
                                  "panel-width": "min",
                                  items: overflowItems(row),
                                  disabled: __props.loading,
                                  "aria-label": `\u66F4\u591A\u64CD\u4F5C\uFF1A${cellValue(row, normalizedColumns.value.find((column) => column.key === primaryKey.value) ?? normalizedColumns.value[0])}`,
                                  onAction: ($event) => activateOverflow(row, $event.id),
                                  "onUpdate:open": markOverflowPanel
                                }, {
                                  trigger: _withCtx(() => [..._cache[5] || (_cache[5] = [
                                    _createTextVNode(
                                      "\u66F4\u591A",
                                      -1
                                      /* CACHED */
                                    )
                                  ])]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["items", "disabled", "aria-label", "onAction"])) : _createCommentVNode("v-if", true)
                              ]))
                            ], 10, _hoisted_37)) : _createCommentVNode("v-if", true)
                          ],
                          2
                          /* CLASS */
                        ),
                        __props.expandable && __props.isRowExpandable(row) && expandedKeys.value.has(keyOf(row)) ? (_openBlock(), _createElementBlock("tr", _hoisted_39, [
                          _createElementVNode("td", { colspan: totalColumnCount.value }, [
                            _createElementVNode("div", {
                              id: detailId(row),
                              class: "wb-table__detail",
                              role: "region",
                              "aria-label": `\u8BE6\u60C5\uFF1A${keyOf(row)}`
                            }, [
                              _renderSlot(_ctx.$slots, "expanded-content", {
                                row,
                                rowKey: keyOf(row),
                                rowIndex
                              }),
                              _ctx.$slots["expanded-actions"] ? (_openBlock(), _createElementBlock("div", _hoisted_42, [
                                _renderSlot(_ctx.$slots, "expanded-actions", {
                                  row,
                                  rowKey: keyOf(row),
                                  rowIndex
                                })
                              ])) : _createCommentVNode("v-if", true)
                            ], 8, _hoisted_41)
                          ], 8, _hoisted_40)
                        ])) : _createCommentVNode("v-if", true)
                      ],
                      64
                      /* STABLE_FRAGMENT */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ], 8, _hoisted_8)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["label"]),
        hasPagination.value || selectedVisibleKeys.value.length ? (_openBlock(), _createElementBlock("footer", _hoisted_43, [
          hasPagination.value ? (_openBlock(), _createElementBlock(
            "span",
            _hoisted_44,
            "\u5171\uFF1A" + _toDisplayString(__props.total) + " \u9879",
            1
            /* TEXT */
          )) : _createCommentVNode("v-if", true),
          selectedVisibleKeys.value.length ? (_openBlock(), _createElementBlock("div", _hoisted_45, [
            _createElementVNode("span", _hoisted_46, [
              _cache[6] || (_cache[6] = _createTextVNode(
                "\u5DF2\u9009\u4E2D\uFF1A",
                -1
                /* CACHED */
              )),
              _createElementVNode(
                "span",
                _hoisted_47,
                _toDisplayString(selectedVisibleKeys.value.length),
                1
                /* TEXT */
              ),
              _cache[7] || (_cache[7] = _createTextVNode(
                " \u9879",
                -1
                /* CACHED */
              ))
            ]),
            _renderSlot(_ctx.$slots, "batch-actions", {
              selectedRowKeys: selectedVisibleKeys.value,
              selectedRows: selectedVisibleRows.value
            })
          ])) : _createCommentVNode("v-if", true),
          hasPagination.value ? (_openBlock(), _createBlock(WorkbenchPagination, {
            key: 2,
            variant: "full",
            "model-value": __props.page,
            "page-size": __props.pageSize,
            "page-size-options": __props.pageSizeOptions,
            total: __props.total,
            disabled: __props.loading || showError.value,
            "aria-label": `${accessibleCaption.value}\u5206\u9875`,
            onChange: changePage,
            onPageSizeChange: changePageSize
          }, null, 8, ["model-value", "page-size", "page-size-options", "total", "disabled", "aria-label"])) : _createCommentVNode("v-if", true)
        ])) : _createCommentVNode("v-if", true)
      ], 10, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, { __scopeId: "data-v-60f5a800" });

import { unref as _unref, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, mergeProps as _mergeProps, withCtx as _withCtx, renderList as _renderList, createSlots as _createSlots, openBlock as _openBlock, createBlock as _createBlock } from "vue";
import { computed, useAttrs, useSlots } from "vue";
import WorkbenchTable from "../table/WorkbenchTable.vue";
import { mergePageSelection } from "./useCrossPageSelection.js";
const __sfc_main__ = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "WorkbenchTableActionsSelection",
  props: {
    caption: { type: String, default: "" },
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    selectedIds: { type: Array, required: true },
    rowKey: { type: [String, Function], default: "id" },
    sort: { type: Object, default: null },
    page: { type: Number, default: 1 },
    pageSize: { type: Number, default: 10 },
    total: { type: Number, default: null },
    selectionFixed: { type: Boolean, default: false },
    actionsFixed: { type: Boolean, default: false },
    rowActions: { type: [Array, Function], default: () => [] }
  },
  emits: [
    "update:selectedIds",
    "selection-change",
    "update:sort",
    "sort-change",
    "column-filter",
    "update:page",
    "page-change",
    "update:pageSize",
    "page-size-change",
    "row-action"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const attrs = useAttrs();
    const slots = useSlots();
    const slottedColumns = () => props.columns.filter((column) => slots[`cell-${column.key}`]);
    const visibleSelectedIds = computed(() => {
      const selected = new Set(props.selectedIds);
      return props.rows.map((row) => typeof props.rowKey === "function" ? props.rowKey(row) : row[props.rowKey]).filter((id) => selected.has(id));
    });
    function onSelectionChange(payload) {
      const next = mergePageSelection({
        pageRows: props.rows,
        selectedIds: props.selectedIds,
        rowKey: props.rowKey,
        ...payload
      });
      if (next !== props.selectedIds) emit("update:selectedIds", next);
      emit("selection-change", { ...payload, selectedIds: next });
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createBlock(WorkbenchTable, _mergeProps(_unref(attrs), {
        class: "wb-table-actions-selection",
        caption: __props.caption,
        columns: __props.columns,
        rows: __props.rows,
        "row-key": __props.rowKey,
        sort: __props.sort,
        page: __props.page,
        "page-size": __props.pageSize,
        total: __props.total,
        "selection-fixed": __props.selectionFixed,
        "actions-fixed": __props.actionsFixed,
        "row-actions": __props.rowActions,
        selectable: "",
        "selected-row-keys": visibleSelectedIds.value,
        onSelectionChange,
        "onUpdate:sort": _cache[0] || (_cache[0] = ($event) => emit("update:sort", $event)),
        onSortChange: _cache[1] || (_cache[1] = ($event) => emit("sort-change", $event)),
        onColumnFilter: _cache[2] || (_cache[2] = ($event) => emit("column-filter", $event)),
        "onUpdate:page": _cache[3] || (_cache[3] = ($event) => emit("update:page", $event)),
        onPageChange: _cache[4] || (_cache[4] = ($event) => emit("page-change", $event)),
        "onUpdate:pageSize": _cache[5] || (_cache[5] = ($event) => emit("update:pageSize", $event)),
        onPageSizeChange: _cache[6] || (_cache[6] = ($event) => emit("page-size-change", $event)),
        onRowAction: _cache[7] || (_cache[7] = ($event) => emit("row-action", $event))
      }), _createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        _ctx.$slots["toolbar-leading"] ? {
          name: "toolbar-leading",
          fn: _withCtx((slotProps) => [
            _renderSlot(_ctx.$slots, "toolbar-leading", _normalizeProps(_guardReactiveProps(slotProps || {})))
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["toolbar-actions"] ? {
          name: "toolbar-actions",
          fn: _withCtx((slotProps) => [
            _renderSlot(_ctx.$slots, "toolbar-actions", _normalizeProps(_guardReactiveProps(slotProps || {})))
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots["row-actions"] ? {
          name: "row-actions",
          fn: _withCtx((slotProps) => [
            _renderSlot(_ctx.$slots, "row-actions", _normalizeProps(_guardReactiveProps(slotProps || {})))
          ]),
          key: "2"
        } : void 0,
        _renderList(slottedColumns(), (column) => {
          return {
            name: `cell-${column.key}`,
            fn: _withCtx((slotProps) => [
              _renderSlot(_ctx.$slots, `cell-${column.key}`, _normalizeProps(_guardReactiveProps(slotProps || {})))
            ])
          };
        })
      ]), 1040, ["caption", "columns", "rows", "row-key", "sort", "page", "page-size", "total", "selection-fixed", "actions-fixed", "row-actions", "selected-row-keys"]);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});

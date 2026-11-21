import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, normalizeClass as _normalizeClass, renderSlot as _renderSlot, createTextVNode as _createTextVNode } from "vue";
const _hoisted_1 = ["aria-label", "role"];
const _hoisted_2 = {
  key: 0,
  class: "wb-chart__units"
};
const _hoisted_3 = ["width", "height", "viewBox", "aria-hidden", "role", "aria-label"];
const _hoisted_4 = ["id"];
const _hoisted_5 = { class: "wb-chart__grid" };
const _hoisted_6 = ["x1", "x2", "y1", "y2"];
const _hoisted_7 = { class: "wb-chart__axis-label" };
const _hoisted_8 = ["x", "y"];
const _hoisted_9 = ["x", "y"];
const _hoisted_10 = ["x", "y", "text-anchor", "transform"];
const _hoisted_11 = ["x", "y", "width", "height"];
const _hoisted_12 = ["x", "y", "width", "height"];
const _hoisted_13 = ["x", "y"];
const _hoisted_14 = ["d", "fill"];
const _hoisted_15 = ["d"];
const _hoisted_16 = ["cx", "cy"];
const _hoisted_17 = { class: "wb-chart__grid" };
const _hoisted_18 = ["x1", "x2", "y1", "y2"];
const _hoisted_19 = { class: "wb-chart__axis-label" };
const _hoisted_20 = ["x", "y"];
const _hoisted_21 = ["x", "y"];
const _hoisted_22 = ["x", "y", "width", "height"];
const _hoisted_23 = ["x", "y"];
const _hoisted_24 = ["cx", "cy", "r", "stroke-width"];
const _hoisted_25 = ["d", "stroke-width"];
const _hoisted_26 = ["points"];
const _hoisted_27 = ["x1", "y1", "x2", "y2"];
const _hoisted_28 = ["x", "y", "text-anchor"];
const _hoisted_29 = ["d", "stroke-width"];
const _hoisted_30 = ["d", "stroke-width"];
const _hoisted_31 = ["d", "stroke-width"];
const _hoisted_32 = ["d", "transform"];
const _hoisted_33 = ["x", "y", "text-anchor"];
const _hoisted_34 = ["points"];
const _hoisted_35 = ["x1", "y1", "x2", "y2"];
const _hoisted_36 = ["points"];
const _hoisted_37 = ["points"];
const _hoisted_38 = ["cx", "cy"];
const _hoisted_39 = ["x", "y", "text-anchor"];
const _hoisted_40 = {
  key: 1,
  class: "wb-chart__center wb-chart__center--custom-gauge"
};
const _hoisted_41 = { class: "wb-chart__center-content" };
const _hoisted_42 = { class: "wb-chart__center-value" };
const _hoisted_43 = { key: 0 };
const _hoisted_44 = {
  key: 0,
  class: "wb-chart__center-label"
};
const _hoisted_45 = {
  key: 1,
  class: "wb-chart__status"
};
const _hoisted_46 = { class: "wb-chart__tooltip-title" };
const _hoisted_47 = {
  class: "wb-chart__dot",
  viewBox: "0 0 8 8",
  "aria-hidden": "true"
};
const _hoisted_48 = {
  key: 4,
  class: "wb-chart__legend"
};
const _hoisted_49 = {
  class: "wb-chart__dot",
  viewBox: "0 0 8 8",
  "aria-hidden": "true"
};
import "../../../../foundation/generated/runtime/foundation.css";
import "../../../../catalog/generated/asset.tokens.css";
import { computed, onBeforeUnmount, onMounted, ref, useId, useSlots } from "vue";
import {
  arcPath,
  axisTicks,
  barLayout,
  formatNumber,
  gaugeAngle,
  gaugeStart,
  gaugeSweep,
  linePoints,
  niceMax,
  polar,
  radarPoints,
  ringSegments,
  sectorPath,
  seriesColor,
  smoothPath,
  stackedMax
} from "./chartGeometry.js";
const __sfc_main__ = {
  __name: "WorkbenchChart",
  props: {
    type: {
      type: String,
      default: "bar",
      validator: (value) => ["bar", "line", "area", "bar-horizontal", "donut", "pie", "gauge", "radar"].includes(value)
    },
    appearance: {
      type: String,
      default: "default",
      validator: (value) => ["default", "analysis"].includes(value)
    },
    categories: { type: Array, default: () => [] },
    series: { type: Array, default: () => [] },
    height: { type: Number, default: 240 },
    unit: { type: String, default: "" },
    unitRight: { type: String, default: "" },
    max: Number,
    maxRight: Number,
    ticks: { type: Number, default: 5 },
    barWidth: { type: Number, default: 12 },
    showValues: Boolean,
    legend: { type: Boolean, default: true },
    tooltip: { type: Boolean, default: true },
    formatter: { type: Function, default: null },
    labelRotate: Boolean,
    centerValue: { type: [String, Number], default: "" },
    centerUnit: { type: String, default: "" },
    centerLabel: { type: String, default: "" },
    showPercent: Boolean,
    thickness: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    color: { type: String, default: "" },
    segments: { type: Array, default: () => [] },
    scaleLabels: { type: Array, default: () => [] },
    gaugeMarker: { type: Boolean, default: true },
    status: { type: String, default: "" },
    indicators: { type: Array, default: () => [] },
    ariaLabel: { type: String, default: "\u56FE\u8868" }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const hasGaugeCenter = () => props.type === "gauge" && Boolean(slots["gauge-center"]);
    const id = useId();
    const root = ref(null);
    const width = ref(480);
    const hover = ref(-1);
    const pointer = ref({ x: 0, y: 0 });
    let observer = null;
    onMounted(() => {
      const measure = () => {
        if (root.value?.clientWidth) width.value = root.value.clientWidth;
      };
      measure();
      if (typeof ResizeObserver !== "undefined") {
        observer = new ResizeObserver(measure);
        observer.observe(root.value);
      }
    });
    onBeforeUnmount(() => observer?.disconnect());
    const format = (value, series) => props.formatter ? props.formatter(value, series) : formatNumber(value);
    const paint = (color) => ({ fill: color });
    const stroke = (color) => ({ stroke: color });
    const isCartesian = computed(() => ["bar", "line", "area"].includes(props.type));
    const isRing = computed(() => ["donut", "pie"].includes(props.type));
    const analysis = computed(
      () => props.appearance === "analysis" && ["donut", "gauge"].includes(props.type)
    );
    const legendItems = computed(() => {
      if (isRing.value)
        return props.series.map((item, index) => ({
          name: item.name,
          paint: paint(seriesColor(item, index))
        }));
      if (props.type === "gauge") return [];
      return props.series.map((item, index) => ({
        name: item.name,
        paint: paint(seriesColor(item, index)),
        line: (item.type ?? (props.type === "bar" ? "bar" : props.type)) !== "bar"
      }));
    });
    const leftSeries = computed(() => props.series.filter((item) => item.axis !== "right"));
    const rightSeries = computed(() => props.series.filter((item) => item.axis === "right"));
    const plot = computed(() => {
      const left = 40;
      const right = rightSeries.value.length ? 40 : 12;
      const bottom = props.labelRotate ? 48 : 28;
      return {
        x: left,
        y: 12,
        width: Math.max(10, width.value - left - right),
        height: Math.max(10, props.height - 12 - bottom)
      };
    });
    const leftMax = computed(
      () => props.max ?? niceMax(
        stackedMax(
          leftSeries.value.filter((item) => (item.type ?? props.type) === "bar"),
          props.categories
        ) || Math.max(0, ...leftSeries.value.flatMap((item) => item.data ?? [])),
        props.ticks
      )
    );
    const rightMax = computed(
      () => props.maxRight ?? niceMax(Math.max(0, ...rightSeries.value.flatMap((item) => item.data ?? [])), props.ticks)
    );
    const yTicks = computed(
      () => axisTicks(leftMax.value, props.ticks).map((value) => ({
        value,
        label: formatNumber(value),
        right: formatNumber(rightMax.value / leftMax.value * value),
        y: plot.value.y + plot.value.height - (leftMax.value > 0 ? value / leftMax.value * plot.value.height : 0)
      }))
    );
    const slot = computed(() => plot.value.width / Math.max(1, props.categories.length));
    const xLabels = computed(
      () => props.categories.map((label, index) => ({
        label,
        x: plot.value.x + slot.value * index + slot.value / 2
      }))
    );
    const bars = computed(() => {
      const entries = props.series.map((item, index) => ({ item, index })).filter(({ item }) => (item.type ?? props.type) === "bar");
      if (!entries.length) return [];
      const layout = barLayout({
        categories: props.categories,
        series: entries.map(({ item }) => item),
        plot: plot.value,
        max: leftMax.value,
        barWidth: props.barWidth
      });
      return layout.rects.map((rect) => {
        const source = entries[rect.seriesIndex];
        return {
          ...rect,
          seriesIndex: source.index,
          paint: paint(seriesColor(source.item, source.index)),
          label: format(rect.value, source.item)
        };
      });
    });
    const lines = computed(
      () => props.series.map((item, index) => ({ item, index })).filter(({ item }) => ["line", "area"].includes(item.type ?? props.type)).map(({ item, index }) => {
        const max = item.axis === "right" ? rightMax.value : leftMax.value;
        const points = linePoints({
          data: item.data,
          categories: props.categories,
          plot: plot.value,
          max
        });
        const path = smoothPath(points);
        const bottom = plot.value.y + plot.value.height;
        const area = (item.type ?? props.type) === "area" && points.length ? `${path} L${points.at(-1).x},${bottom} L${points[0].x},${bottom} Z` : "";
        const color = seriesColor(item, index);
        return {
          key: index,
          path,
          area,
          points,
          stroke: stroke(color),
          paint: paint(color),
          stopPaint: { stopColor: color },
          gradient: `${id}-area-${index}`
        };
      })
    );
    const tooltipRows = computed(
      () => hover.value < 0 ? [] : props.series.map((item, index) => ({
        name: item.name,
        value: format(item.data?.[hover.value], item),
        paint: paint(seriesColor(item, index))
      }))
    );
    const horizontal = computed(() => {
      const labelWidth = 72;
      const valueWidth = 48;
      const area = {
        x: labelWidth,
        y: 8,
        width: Math.max(10, width.value - labelWidth - valueWidth),
        height: Math.max(10, props.height - 36)
      };
      const max = props.max ?? niceMax(Math.max(0, ...props.series.flatMap((item2) => item2.data ?? [])), props.ticks);
      const rowHeight = area.height / Math.max(1, props.categories.length);
      const item = props.series[0] ?? { data: [] };
      const color = seriesColor(item, 0);
      return {
        area,
        ticks: axisTicks(max, props.ticks).map((value) => ({
          value,
          label: formatNumber(value),
          x: area.x + (max > 0 ? value / max * area.width : 0)
        })),
        rows: props.categories.map((label, index) => {
          const value = Number(item.data?.[index]) || 0;
          const barWidth = max > 0 ? value / max * area.width : 0;
          return {
            label,
            value: format(value, item),
            y: area.y + rowHeight * index + rowHeight / 2,
            x: area.x,
            width: barWidth,
            paint: paint(color)
          };
        })
      };
    });
    const ringSize = computed(() => Math.min(props.height, width.value));
    const ring = computed(() => {
      const size = ringSize.value;
      const hasElbows = analysis.value && props.showPercent && size >= 72 && width.value >= 140;
      const showCallouts = props.showPercent && (!analysis.value || hasElbows);
      const outer = hasElbows ? Math.max(0, Math.min(size / 2 - 27, width.value / 2 - 61)) : size / 2 - (showCallouts ? 36 : 4);
      const requestedThickness = props.thickness || Math.max(8, Math.round(outer * 0.16));
      const analysisThickness = Math.min(requestedThickness, Math.max(0, outer));
      const thick = props.type === "pie" ? outer : analysis.value ? analysisThickness : requestedThickness;
      const radius = analysis.value ? Math.max(0, outer - thick / 2) : outer - thick / 2;
      const cx = width.value / 2;
      const cy = size / 2;
      const gap = analysis.value ? 2 * 180 / (Math.PI * Math.max(1, radius)) : 1.5;
      const segments = ringSegments(
        props.series,
        props.type === "donut" && props.series.length > 1 ? gap : 0
      ).map((segment) => {
        const item = props.series[segment.index];
        const color = seriesColor(item, segment.index);
        const anchor = polar(cx, cy, outer + (hasElbows ? 0 : 6), segment.mid);
        const knee = polar(cx, cy, outer + (hasElbows ? 16 : 18), segment.mid);
        const side = knee.x >= cx ? "start" : "end";
        const label = hasElbows ? {
          x: side === "start" ? Math.min(knee.x + 8, width.value - 52) : Math.max(knee.x - 8, 52),
          y: knee.y
        } : knee;
        const elbowX = side === "start" ? Math.min(knee.x, label.x) : Math.max(knee.x, label.x);
        return {
          ...segment,
          name: item.name,
          path: props.type === "pie" ? sectorPath(cx, cy, outer, segment.start, segment.end) : arcPath(cx, cy, radius, segment.start, segment.end),
          stroke: stroke(color),
          paint: paint(color),
          anchor,
          label,
          side,
          leader: hasElbows ? `${anchor.x},${anchor.y} ${elbowX},${knee.y} ${label.x},${label.y}` : "",
          percentText: `${(segment.percent * 100).toFixed(segment.percent * 100 % 1 ? 2 : 0)} %`
        };
      });
      return { cx, cy, radius, thick, outer, segments, showCallouts };
    });
    const gaugeAnalysisWidth = computed(() => Math.min(width.value, props.height * 214 / 195));
    const gauge = computed(() => {
      const size = analysis.value ? gaugeAnalysisWidth.value : Math.min(props.height, width.value);
      const geometryScale = analysis.value ? size / 214 : 1;
      const thick = (props.thickness || (analysis.value ? 18 : Math.max(8, Math.round(size * 0.07)))) * geometryScale;
      const radius = size / 2 - thick / 2 - (props.scaleLabels.length ? 22 : analysis.value ? 0 : 4);
      const cx = width.value / 2;
      const cy = analysis.value ? 116.6 * geometryScale : size / 2 + size * 0.04;
      const max = props.max ?? 100;
      const end = gaugeAngle(props.value, props.min, max);
      const color = props.color || "var(--wb-color-info-primary)";
      const segments = props.segments.map((segment, index) => {
        const from = index ? props.segments[index - 1].to : props.min;
        return {
          key: index,
          path: arcPath(
            cx,
            cy,
            radius,
            gaugeAngle(from, props.min, max),
            gaugeAngle(segment.to, props.min, max)
          ),
          stroke: stroke(segment.color)
        };
      });
      const tip = polar(cx, cy, radius + thick / 2 + 4, end);
      const tipA = polar(cx, cy, radius + thick / 2 + 12, end - 4);
      const tipB = polar(cx, cy, radius + thick / 2 + 12, end + 4);
      const pointer2 = polar(cx, cy, radius + thick / 2 + 12 * geometryScale, end);
      const referenceAngle = 27;
      const scale = props.scaleLabels.map((label, index, list) => {
        const angle = gaugeStart + gaugeSweep / Math.max(1, list.length - 1) * index;
        return {
          label,
          ...polar(cx, cy, radius - thick / 2 - 14, angle),
          anchor: angle < -10 ? "start" : angle > 10 ? "end" : "middle"
        };
      });
      return {
        cx,
        cy,
        radius,
        thick,
        track: arcPath(cx, cy, radius, gaugeStart, gaugeStart + gaugeSweep),
        value: arcPath(cx, cy, radius, gaugeStart, end),
        stroke: stroke(color),
        paint: analysis.value ? void 0 : paint(color),
        marker: analysis.value ? "M-3.7,-9.8 L10.2,-2.7 Q11.5,-2 10.1,-1.4 L-0.6,2.9 Q-2,3.5 -2.3,2 L-4.7,-9 Q-5,-10.5 -3.7,-9.8 Z" : `M${tip.x},${tip.y} L${tipA.x},${tipA.y} L${tipB.x},${tipB.y} Z`,
        markerTransform: analysis.value ? `translate(${pointer2.x} ${pointer2.y}) rotate(${end - referenceAngle}) scale(${geometryScale})` : void 0,
        segments,
        scale
      };
    });
    const radar = computed(() => {
      const size = Math.min(props.height, width.value);
      const cx = width.value / 2;
      const cy = size / 2;
      const radius = size / 2 - 28;
      const step = 360 / Math.max(1, props.indicators.length);
      const rings = [0.25, 0.5, 0.75, 1].map(
        (ratio) => props.indicators.map((_, index) => polar(cx, cy, radius * ratio, step * index)).map((point) => `${point.x},${point.y}`).join(" ")
      );
      const axes = props.indicators.map((indicator, index) => {
        const end = polar(cx, cy, radius, step * index);
        const label = polar(cx, cy, radius + 14, step * index);
        return {
          key: index,
          end,
          label,
          name: indicator.name,
          anchor: Math.abs(label.x - cx) < 4 ? "middle" : label.x > cx ? "start" : "end"
        };
      });
      const shapes = props.series.map((item, index) => {
        const points = radarPoints({ indicators: props.indicators, data: item.data, cx, cy, radius });
        const color = seriesColor(item, index);
        return {
          key: index,
          points,
          polygon: points.map((point) => `${point.x},${point.y}`).join(" "),
          stroke: stroke(color),
          paint: paint(color)
        };
      });
      return { cx, cy, rings, axes, shapes };
    });
    const svgHeight = computed(() => {
      if (isCartesian.value || props.type === "bar-horizontal") return props.height;
      if (analysis.value && props.type === "gauge") return gaugeAnalysisWidth.value * 195 / 214;
      return Math.min(props.height, width.value);
    });
    const tooltipPosition = computed(() => ({
      left: `${pointer.value.x}px`,
      top: `${pointer.value.y}px`
    }));
    function onMove(event) {
      if (!isCartesian.value || !props.tooltip || !props.categories.length) return;
      const rect = root.value.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const index = Math.floor((x - plot.value.x) / slot.value);
      hover.value = index >= 0 && index < props.categories.length ? index : -1;
      pointer.value = {
        x: Math.min(x + 12, rect.width - 160),
        y: Math.max(0, event.clientY - rect.top - 24)
      };
    }
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("figure", {
        ref_key: "root",
        ref: root,
        class: _normalizeClass(["wb-chart", ["wb-chart--" + __props.type, { "is-analysis": analysis.value }]]),
        "aria-label": hasGaugeCenter() ? void 0 : __props.ariaLabel,
        role: hasGaugeCenter() ? void 0 : "img",
        onMousemove: onMove,
        onMouseleave: _cache[0] || (_cache[0] = ($event) => hover.value = -1)
      }, [
        isCartesian.value && (__props.unit || __props.unitRight) ? (_openBlock(), _createElementBlock("div", _hoisted_2, [
          _createElementVNode(
            "span",
            null,
            _toDisplayString(__props.unit),
            1
            /* TEXT */
          ),
          _createElementVNode(
            "span",
            null,
            _toDisplayString(__props.unitRight),
            1
            /* TEXT */
          )
        ])) : _createCommentVNode("v-if", true),
        (_openBlock(), _createElementBlock("svg", {
          class: "wb-chart__svg",
          width: width.value,
          height: svgHeight.value,
          viewBox: `0 0 ${width.value} ${svgHeight.value}`,
          "aria-hidden": hasGaugeCenter() ? void 0 : true,
          role: hasGaugeCenter() ? "img" : void 0,
          "aria-label": hasGaugeCenter() ? __props.ariaLabel : void 0
        }, [
          isCartesian.value ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 0 },
            [
              _createElementVNode("defs", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(lines.value, (item) => {
                    return _openBlock(), _createElementBlock("linearGradient", {
                      id: item.gradient,
                      key: item.gradient,
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1"
                    }, [
                      _createElementVNode(
                        "stop",
                        {
                          offset: "0",
                          class: "wb-chart__stop-top",
                          style: _normalizeStyle(item.stopPaint)
                        },
                        null,
                        4
                        /* STYLE */
                      ),
                      _createElementVNode(
                        "stop",
                        {
                          offset: "1",
                          class: "wb-chart__stop-bottom",
                          style: _normalizeStyle(item.stopPaint)
                        },
                        null,
                        4
                        /* STYLE */
                      )
                    ], 8, _hoisted_4);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _createElementVNode("g", _hoisted_5, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(yTicks.value, (tick) => {
                    return _openBlock(), _createElementBlock("line", {
                      key: tick.value,
                      x1: plot.value.x,
                      x2: plot.value.x + plot.value.width,
                      y1: tick.y,
                      y2: tick.y
                    }, null, 8, _hoisted_6);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _createElementVNode("g", _hoisted_7, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(yTicks.value, (tick) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "l" + tick.value,
                      x: plot.value.x - 8,
                      y: tick.y,
                      "text-anchor": "end",
                      "dominant-baseline": "middle"
                    }, _toDisplayString(tick.label), 9, _hoisted_8);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                rightSeries.value.length ? (_openBlock(true), _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  _renderList(yTicks.value, (tick) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "r" + tick.value,
                      x: plot.value.x + plot.value.width + 8,
                      y: tick.y,
                      "dominant-baseline": "middle"
                    }, _toDisplayString(tick.right), 9, _hoisted_9);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : _createCommentVNode("v-if", true),
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(xLabels.value, (item, index) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "x" + index,
                      x: item.x,
                      y: plot.value.y + plot.value.height + 16,
                      "text-anchor": __props.labelRotate ? "end" : "middle",
                      transform: __props.labelRotate ? `rotate(-35 ${item.x} ${plot.value.y + plot.value.height + 16})` : void 0
                    }, _toDisplayString(item.label), 9, _hoisted_10);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              hover.value >= 0 ? (_openBlock(), _createElementBlock("rect", {
                key: 0,
                class: "wb-chart__hover-band",
                x: plot.value.x + slot.value * hover.value + slot.value * 0.2,
                y: plot.value.y,
                width: slot.value * 0.6,
                height: plot.value.height
              }, null, 8, _hoisted_11)) : _createCommentVNode("v-if", true),
              _createElementVNode("g", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(bars.value, (item) => {
                    return _openBlock(), _createElementBlock("rect", {
                      key: item.key,
                      class: "wb-chart__bar",
                      x: item.x,
                      y: item.y,
                      width: item.width,
                      height: item.height,
                      style: _normalizeStyle(item.paint)
                    }, null, 12, _hoisted_12);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                __props.showValues ? (_openBlock(true), _createElementBlock(
                  _Fragment,
                  { key: 0 },
                  _renderList(bars.value, (item) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "v" + item.key,
                      class: "wb-chart__value",
                      x: item.x + item.width / 2,
                      y: item.y - 6,
                      "text-anchor": "middle"
                    }, _toDisplayString(item.label), 9, _hoisted_13);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : _createCommentVNode("v-if", true)
              ]),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(lines.value, (item) => {
                  return _openBlock(), _createElementBlock("g", {
                    key: item.key
                  }, [
                    item.area ? (_openBlock(), _createElementBlock("path", {
                      key: 0,
                      class: "wb-chart__area",
                      d: item.area,
                      fill: `url(#${item.gradient})`
                    }, null, 8, _hoisted_14)) : _createCommentVNode("v-if", true),
                    _createElementVNode("path", {
                      class: "wb-chart__line",
                      d: item.path,
                      style: _normalizeStyle(item.stroke)
                    }, null, 12, _hoisted_15),
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(item.points, (point, index) => {
                        return _openBlock(), _createElementBlock("circle", {
                          key: index,
                          class: _normalizeClass(["wb-chart__point", { "is-active": hover.value === index }]),
                          cx: point.x,
                          cy: point.y,
                          r: "3",
                          style: _normalizeStyle(item.stroke)
                        }, null, 14, _hoisted_16);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : __props.type === "bar-horizontal" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createElementVNode("g", _hoisted_17, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(horizontal.value.ticks, (tick) => {
                    return _openBlock(), _createElementBlock("line", {
                      key: tick.value,
                      x1: tick.x,
                      x2: tick.x,
                      y1: horizontal.value.area.y,
                      y2: horizontal.value.area.y + horizontal.value.area.height
                    }, null, 8, _hoisted_18);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _createElementVNode("g", _hoisted_19, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(horizontal.value.ticks, (tick) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "t" + tick.value,
                      x: tick.x,
                      y: horizontal.value.area.y + horizontal.value.area.height + 16,
                      "text-anchor": "middle"
                    }, _toDisplayString(tick.label), 9, _hoisted_20);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(horizontal.value.rows, (item, index) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "c" + index,
                      x: horizontal.value.area.x - 8,
                      y: item.y,
                      "text-anchor": "end",
                      "dominant-baseline": "middle"
                    }, _toDisplayString(item.label), 9, _hoisted_21);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _createElementVNode("g", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(horizontal.value.rows, (item, index) => {
                    return _openBlock(), _createElementBlock("rect", {
                      key: index,
                      class: "wb-chart__bar",
                      x: item.x,
                      y: item.y - __props.barWidth / 2,
                      width: item.width,
                      height: __props.barWidth,
                      style: _normalizeStyle(item.paint)
                    }, null, 12, _hoisted_22);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList(horizontal.value.rows, (item, index) => {
                    return _openBlock(), _createElementBlock("text", {
                      key: "v" + index,
                      class: "wb-chart__value",
                      x: item.x + item.width + 6,
                      y: item.y,
                      "dominant-baseline": "middle"
                    }, _toDisplayString(item.value), 9, _hoisted_23);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            64
            /* STABLE_FRAGMENT */
          )) : isRing.value ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 2 },
            [
              __props.type === "donut" && !analysis.value ? (_openBlock(), _createElementBlock("circle", {
                key: 0,
                class: "wb-chart__track",
                cx: ring.value.cx,
                cy: ring.value.cy,
                r: ring.value.radius,
                "stroke-width": ring.value.thick
              }, null, 8, _hoisted_24)) : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(ring.value.segments, (item) => {
                  return _openBlock(), _createElementBlock("path", {
                    key: item.index,
                    class: _normalizeClass(__props.type === "pie" ? "wb-chart__sector" : "wb-chart__arc"),
                    d: item.path,
                    "stroke-width": ring.value.thick,
                    style: _normalizeStyle(__props.type === "pie" ? item.paint : item.stroke)
                  }, null, 14, _hoisted_25);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              ring.value.showCallouts ? (_openBlock(true), _createElementBlock(
                _Fragment,
                { key: 1 },
                _renderList(ring.value.segments, (item) => {
                  return _openBlock(), _createElementBlock("g", {
                    key: "p" + item.index,
                    class: "wb-chart__callout"
                  }, [
                    item.leader ? (_openBlock(), _createElementBlock("polyline", {
                      key: 0,
                      points: item.leader,
                      fill: "none"
                    }, null, 8, _hoisted_26)) : (_openBlock(), _createElementBlock("line", {
                      key: 1,
                      x1: item.anchor.x,
                      y1: item.anchor.y,
                      x2: item.label.x,
                      y2: item.label.y
                    }, null, 8, _hoisted_27)),
                    _createElementVNode("text", {
                      x: item.label.x + (item.side === "start" ? 4 : -4),
                      y: item.label.y,
                      "text-anchor": item.side,
                      "dominant-baseline": "middle"
                    }, _toDisplayString(item.percentText), 9, _hoisted_28)
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : _createCommentVNode("v-if", true)
            ],
            64
            /* STABLE_FRAGMENT */
          )) : __props.type === "gauge" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 3 },
            [
              !gauge.value.segments.length ? (_openBlock(), _createElementBlock("path", {
                key: 0,
                class: "wb-chart__gauge-track",
                d: gauge.value.track,
                "stroke-width": gauge.value.thick
              }, null, 8, _hoisted_29)) : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(gauge.value.segments, (item) => {
                  return _openBlock(), _createElementBlock("path", {
                    key: item.key,
                    class: "wb-chart__arc",
                    d: item.path,
                    "stroke-width": gauge.value.thick,
                    style: _normalizeStyle(item.stroke)
                  }, null, 12, _hoisted_30);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              !gauge.value.segments.length ? (_openBlock(), _createElementBlock("path", {
                key: 1,
                class: "wb-chart__arc",
                d: gauge.value.value,
                "stroke-width": gauge.value.thick,
                style: _normalizeStyle(gauge.value.stroke)
              }, null, 12, _hoisted_31)) : _createCommentVNode("v-if", true),
              __props.gaugeMarker ? (_openBlock(), _createElementBlock("path", {
                key: 2,
                class: _normalizeClass(["wb-chart__marker", { "is-neutral": gauge.value.segments.length || analysis.value }]),
                d: gauge.value.marker,
                transform: gauge.value.markerTransform,
                style: _normalizeStyle(gauge.value.segments.length ? void 0 : gauge.value.paint)
              }, null, 14, _hoisted_32)) : _createCommentVNode("v-if", true),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(gauge.value.scale, (item, index) => {
                  return _openBlock(), _createElementBlock("text", {
                    key: "s" + index,
                    class: "wb-chart__scale",
                    x: item.x,
                    y: item.y,
                    "text-anchor": item.anchor,
                    "dominant-baseline": "middle"
                  }, _toDisplayString(item.label), 9, _hoisted_33);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : __props.type === "radar" ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 4 },
            [
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(radar.value.rings, (points, index) => {
                  return _openBlock(), _createElementBlock("polygon", {
                    key: "g" + index,
                    class: "wb-chart__radar-ring",
                    points
                  }, null, 8, _hoisted_34);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(radar.value.axes, (item) => {
                  return _openBlock(), _createElementBlock("line", {
                    key: "a" + item.key,
                    class: "wb-chart__radar-axis",
                    x1: radar.value.cx,
                    y1: radar.value.cy,
                    x2: item.end.x,
                    y2: item.end.y
                  }, null, 8, _hoisted_35);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(radar.value.shapes, (item) => {
                  return _openBlock(), _createElementBlock("g", {
                    key: item.key
                  }, [
                    _createElementVNode("polygon", {
                      class: "wb-chart__radar-shape",
                      points: item.polygon,
                      style: _normalizeStyle(item.paint)
                    }, null, 12, _hoisted_36),
                    _createElementVNode("polygon", {
                      class: "wb-chart__radar-outline",
                      points: item.polygon,
                      style: _normalizeStyle(item.stroke)
                    }, null, 12, _hoisted_37),
                    (_openBlock(true), _createElementBlock(
                      _Fragment,
                      null,
                      _renderList(item.points, (point, index) => {
                        return _openBlock(), _createElementBlock("circle", {
                          key: index,
                          class: "wb-chart__point is-active",
                          cx: point.x,
                          cy: point.y,
                          r: "3",
                          style: _normalizeStyle(item.stroke)
                        }, null, 12, _hoisted_38);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              (_openBlock(true), _createElementBlock(
                _Fragment,
                null,
                _renderList(radar.value.axes, (item) => {
                  return _openBlock(), _createElementBlock("text", {
                    key: "t" + item.key,
                    class: "wb-chart__axis-label wb-chart__radar-label",
                    x: item.label.x,
                    y: item.label.y,
                    "text-anchor": item.anchor,
                    "dominant-baseline": "middle"
                  }, _toDisplayString(item.name), 9, _hoisted_39);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ], 8, _hoisted_3)),
        hasGaugeCenter() ? (_openBlock(), _createElementBlock("div", _hoisted_40, [
          _createElementVNode("div", _hoisted_41, [
            _renderSlot(_ctx.$slots, "gauge-center")
          ])
        ])) : isRing.value && (__props.centerValue !== "" || __props.centerLabel) || __props.type === "gauge" ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 2,
            class: _normalizeClass(["wb-chart__center", "wb-chart__center--" + __props.type])
          },
          [
            _createElementVNode("div", _hoisted_42, [
              _createTextVNode(
                _toDisplayString(__props.type === "gauge" && __props.centerValue === "" ? format(__props.value) : __props.centerValue),
                1
                /* TEXT */
              ),
              __props.centerUnit ? (_openBlock(), _createElementBlock(
                "small",
                _hoisted_43,
                _toDisplayString(__props.centerUnit),
                1
                /* TEXT */
              )) : _createCommentVNode("v-if", true)
            ]),
            __props.centerLabel ? (_openBlock(), _createElementBlock(
              "div",
              _hoisted_44,
              _toDisplayString(__props.centerLabel),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true),
            __props.status ? (_openBlock(), _createElementBlock(
              "span",
              _hoisted_45,
              _toDisplayString(__props.status),
              1
              /* TEXT */
            )) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true),
        __props.tooltip && hover.value >= 0 && tooltipRows.value.length ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 3,
            class: "wb-chart__tooltip",
            style: _normalizeStyle(tooltipPosition.value),
            role: "status"
          },
          [
            _createElementVNode(
              "div",
              _hoisted_46,
              _toDisplayString(__props.categories[hover.value]),
              1
              /* TEXT */
            ),
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(tooltipRows.value, (item, index) => {
                return _openBlock(), _createElementBlock("div", {
                  key: index,
                  class: "wb-chart__tooltip-row"
                }, [
                  (_openBlock(), _createElementBlock("svg", _hoisted_47, [
                    _createElementVNode(
                      "circle",
                      {
                        cx: "4",
                        cy: "4",
                        r: "4",
                        style: _normalizeStyle(item.paint)
                      },
                      null,
                      4
                      /* STYLE */
                    )
                  ])),
                  _createElementVNode(
                    "span",
                    null,
                    _toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  _createElementVNode(
                    "strong",
                    null,
                    _toDisplayString(item.value),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          4
          /* STYLE */
        )) : _createCommentVNode("v-if", true),
        __props.legend && legendItems.value.length ? (_openBlock(), _createElementBlock("figcaption", _hoisted_48, [
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList(legendItems.value, (item, index) => {
              return _openBlock(), _createElementBlock("span", {
                key: index,
                class: "wb-chart__legend-item"
              }, [
                (_openBlock(), _createElementBlock("svg", _hoisted_49, [
                  _createElementVNode(
                    "circle",
                    {
                      cx: "4",
                      cy: "4",
                      r: "4",
                      style: _normalizeStyle(item.paint)
                    },
                    null,
                    4
                    /* STYLE */
                  )
                ])),
                _createTextVNode(
                  _toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : _createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
};
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});

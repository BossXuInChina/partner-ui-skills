import { defineComponent as _defineComponent } from "vue";
import { createElementVNode as _createElementVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = { class: "wb-certification-details__type" };
const _hoisted_3 = { class: "wb-certification-details__region" };
import WorkbenchTag from "../tag/WorkbenchTag.vue";
const __sfc_main__ = /* @__PURE__ */ _defineComponent({
  __name: "WorkbenchCertificationDetails",
  props: {
    details: { type: Object, required: true },
    ariaLabel: { type: String, default: "\u8BA4\u8BC1\u8BE6\u60C5" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _openBlock(), _createElementBlock("dl", {
        class: "wb-certification-details",
        "aria-label": __props.ariaLabel
      }, [
        _createElementVNode("div", _hoisted_2, [
          _cache[0] || (_cache[0] = _createElementVNode(
            "dt",
            null,
            "\u8BA4\u8BC1\u7C7B\u578B\uFF1A",
            -1
            /* CACHED */
          )),
          _createElementVNode("dd", null, [
            _createVNode(WorkbenchTag, {
              variant: "status-subtle",
              status: "alert",
              size: "small",
              label: __props.details.type
            }, null, 8, ["label"])
          ])
        ]),
        _createElementVNode("div", _hoisted_3, [
          _cache[1] || (_cache[1] = _createElementVNode(
            "dt",
            null,
            "\u5F52\u5C5E\u8BA4\u8BC1\u4EE3\u8868\u5904/\u7CFB\u7EDF\u90E8\uFF1A",
            -1
            /* CACHED */
          )),
          _createElementVNode(
            "dd",
            null,
            _toDisplayString(__props.details.region),
            1
            /* TEXT */
          )
        ]),
        _createElementVNode("div", null, [
          _cache[2] || (_cache[2] = _createElementVNode(
            "dt",
            null,
            "\u8BA4\u8BC1\u5F00\u59CB\u65F6\u95F4\uFF1A",
            -1
            /* CACHED */
          )),
          _createElementVNode(
            "dd",
            null,
            _toDisplayString(__props.details.start),
            1
            /* TEXT */
          )
        ]),
        _createElementVNode("div", null, [
          _cache[3] || (_cache[3] = _createElementVNode(
            "dt",
            null,
            "\u8BA4\u8BC1\u7ED3\u675F\u65F6\u95F4\uFF1A",
            -1
            /* CACHED */
          )),
          _createElementVNode(
            "dd",
            null,
            _toDisplayString(__props.details.end),
            1
            /* TEXT */
          )
        ]),
        _createElementVNode("div", null, [
          _cache[4] || (_cache[4] = _createElementVNode(
            "dt",
            null,
            "\u80FD\u529B\u590D\u6838\u65F6\u95F4\uFF1A",
            -1
            /* CACHED */
          )),
          _createElementVNode(
            "dd",
            null,
            _toDisplayString(__props.details.review),
            1
            /* TEXT */
          )
        ])
      ], 8, _hoisted_1);
    };
  }
});
export default /* @__PURE__ */ Object.assign(__sfc_main__, {});

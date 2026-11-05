<!-- Generated from @workbench/ui-vue3@0.2.0-prototype.20261031.1 (af939228028791e24280015c5d48a35a658d40f3) — do not edit. -->

# 图标

包：`@workbench/ui-vue3@0.2.0-prototype.20261031.1` · commit：`af939228028791e24280015c5d48a35a658d40f3` · dirty：false

资格（包内声明）：channel=development；stableEligible=false；targetProductionEligible=false；productionEligible=false。元数据和示例不授予发布或生产批准。

包内图标：1196。完整可检索条目、别名和每项真实调用 props 见 [icons.json](icons.json)。

## system

数量：890

| 导出 | 公开 props |
| --- | --- |
| WorkbenchIcon | {"name":{"type":"String","required":true},"size":{"type":["Number","String"],"default":{"kind":"undefined"}},"color":{"type":"String","default":"currentColor"},"colorSplit":{"type":"Object","default":null},"label":{"type":"String","default":""}} |
| WorkbenchSystemIcon | {"name":{"type":"String","required":true},"size":{"type":["Number","String"],"default":{"kind":"undefined"}},"color":{"type":"String","default":"currentColor"},"label":{"type":"String","default":""}} |

```json
{
  "exactSelection": "name accepts a registered key or alias; optional size selects a real same-group native variant, never an arbitrary scale",
  "color": "Only the public color API applies to colorable artwork; colorSplit exists only on WorkbenchIcon and only for monochrome icons."
}
```

## status

数量：147

| 导出 | 公开 props |
| --- | --- |
| WorkbenchStatusIcon | {"name":{"type":"String","required":true},"size":{"type":["Number","String"],"default":{"kind":"undefined"}},"label":{"type":"String","default":""}} |

```json
{
  "exactSelection": "name accepts a registered key or alias; optional size selects a real same-group native variant, never an arbitrary scale",
  "color": "The status component exposes no color override."
}
```

## file

数量：84

| 导出 | 公开 props |
| --- | --- |
| WorkbenchFileIcon | {"name":{"type":"String","default":""},"type":{"type":"String","default":""},"filename":{"type":"String","default":""},"size":{"type":["Number","String"],"default":{"kind":"undefined"}},"label":{"type":"String","default":""}} |

```json
{
  "exactSelection": "name accepts a registered key or alias; size requests only native registered variants",
  "fallbackSelection": "type or filename selects a registered type/size, default size 32; unknown extensions use unknown",
  "rendering": "The public component currently uses the registered same-type 48px artwork in the selected native layout box; renderedCanvas records this separately."
}
```

## empty

数量：24

| 导出 | 公开 props |
| --- | --- |
| WorkbenchEmptyIcon | {"name":{"type":"String","default":""},"type":{"type":"String","default":"no-data"},"size":{"type":["Number","String"],"default":{"kind":"undefined"}},"label":{"type":"String","default":""}} |

```json
{
  "exactSelection": "name accepts a registered key or alias and preserves that original export",
  "fallbackSelection": "type/size defaults to no-data/120; named icons reject another size",
  "rendering": "The type/size compatibility path uses its 64px artwork except network-error; exact per-row props deliberately select by name."
}
```

## pedestal

数量：51

| 导出 | 公开 props |
| --- | --- |
| WorkbenchPedestalIcon | {"name":{"type":"String","required":true},"label":{"type":"String","default":""}} |

```json
{
  "exactSelection": "name accepts a registered key or alias; no size or color override prop"
}
```

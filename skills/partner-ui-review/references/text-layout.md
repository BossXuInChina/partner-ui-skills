# 展开态文字与受限容器

菜单可能 Teleport 到 body，脱离页面字体继承。先实际打开，再对照公开组件的字号/字重/行高/字距与宿主字体族；body 的默认 16px/normal 不能代表默认 body-m。若缺的是宿主默认正文合同，在宿主补完整 Foundation 字阶；不要通过全局内部类选择器覆盖组件已有尺寸变体。声明 font-family 不证明字体文件已加载，还需检查网络/FontFaceSet；存在字体替代疑问时检查浏览器实际使用的字体。

快捷应用和数值卡片按实际内容容器宽度响应：保留图标、数值、单位和标签的可读空间，空间不足时减少列数或让项目整体换行。短标签保持横向阅读；长应用名可按已确认规则自然换成两行。不要把所有正文强制单行，也不要将组件内部有意的布局直接认定为业务组合违规。

`states` 对每个路由额外打开一个独立页面实例，以点击/滚动序列进入状态；证据文件带状态名，不覆盖默认态截图。`routes` 必须显式列出；点击选择器应唯一，多实例有意取首个时可用 Playwright 的 `>> nth=0`。只配置本地 UI 状态操作，不用于提交、删除或外部通信。

```json
{
  "states": [{
    "id": "page-size-menu", "routes": ["home/admin"],
    "actions": [{"click": ".wb-pagination__size-trigger"}],
    "readySelector": ".wb-pagination__size-menu"
  }],
  "textContracts": [{
    "id": "page-size-font", "selector": ".wb-pagination__size-menu button",
    "routes": ["home/admin"], "states": ["page-size-menu"],
    "font": "--wb-font-body-m", "familyFrom": "body",
    "basis": "Pagination 默认尺寸使用完整 body-m，字体族继承宿主映射"
  }, {
    "id": "quick-label", "selector": ".quick-item > .label", "routes": ["home/admin"],
    "maxLines": 2, "within": ".quick-item",
    "basis": "已确认的业务快捷应用标签最多两行，项目整体折行"
  }]
}
```

`font` 从目标作用域读取整套 Token，`familyFrom` 对照明确的字体族来源；可检查正式组件公开文字，不改变组件间距归属。`maxLines` 按真实文本 Range 行位置计数，`within` 检查文本与最近项目边界及横向内容溢出。明确违反输出 R3/R6 must-fix；缺目标/Token/容器记未验证。此检查不证明数值含义正确，也不覆盖未进入的交互状态。下标、上标或混合字号可能产生多个文本基线，应据真实内容调整契约而非盲设行数。

## 容器宽度和菜单层级

不要把浏览器宽度当作页面可用宽度。右侧检视器、导航、AI 侧栏都会压窄实际容器；`cqw` 没有对应容器时会回退到视口。先核对实际命名容器，再决定自有布局重排，不改包内尺寸 Token 掩盖容器缺失。

```json
{
  "containerProfiles": [{"id":"inspector-900","selector":"#app","width":900,"viewportWidth":1920,"routes":["trade/trade-home"]}],
  "responsiveContracts": [{
    "id":"search-contained","selector":".business-search","within":".business-toolbar","minInlineSize":200,
    "basis":"当前业务前缀与查询文本的最小可读宽度；更窄时整组另起一行"
  }, {
    "id":"search-menu-layer","selector":".wb-search__option","overlay":true,
    "routes":["trade/trade-home"],"states":["search-over-advanced"],
    "basis":"高级搜索和菜单同时打开时，所有选项仍可点击"
  }]
}
```

容器 profile 只在隔离浏览器注入指定宿主的测试宽度，不修改产品源码；截图文件记录 profile，不能与普通窗口样本互相覆盖或作为同宽基线。真实 AI 侧栏打开态仍须通过交互进入，测试 fixture 不能代替。

`within` 检查目标边框落在最近声明容器内；`minInlineSize` 为有业务依据的 CSS 像素下限，不给全站控件设统一最小宽度。文字可读性继续用 `textContracts`；表格应检查其滚动容器，不能把有意横向滚动判成整页溢出。

`overlay` 对每个实际展开选项做九点命中测试，遮挡者可以是普通标题或背景，不局限于另一个按钮。屏外、缺失或不可见目标记未验证，不按成功处理。它不能判断透明图层的所有像素合成，仍需截图核对；涉及客户端差异时在用户实际预览中复现，并用另一浏览器相同状态比对，未比对前不归因客户端。

菜单内容超出当前视口时，可在点击后配置 `{"scrollIntoView":".menu-panel"}` 记录页面滚动后的可达性。该结果仅证明滚动后未遮挡；不得将其称为组件已实现自动翻转/碰撞定位。

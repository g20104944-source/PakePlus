window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ===== 原有逻辑：处理 _blank 链接和 window.open，保持不变 =====
const hookClick = (e) => {
  const origin = e.target.closest('a')
  const isBaseTargetBlank = document.querySelector('head base[target="_blank"]')
  if (
    (origin && origin.href && origin.target === '_blank') ||
    (origin && origin.href && isBaseTargetBlank)
  ) {
    e.preventDefault()
    location.href = origin.href
  }
}
window.open = function (url, target, features) {
  location.href = url
}
document.addEventListener('click', hookClick, { capture: true })

// ===== 新增：去除桌面端左右白边 =====
const fixLayoutStyle = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: hidden !important;
  }
  body > *, #app, .app, #root, .root,
  body > div, body > main {
    max-width: none !important;
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
`
function injectFixStyle() {
  const style = document.createElement('style')
  style.id = 'pake-fix-layout'
  style.textContent = fixLayoutStyle
  document.head.appendChild(style)
}
if (document.head) {
  injectFixStyle()
} else {
  document.addEventListener('DOMContentLoaded', injectFixStyle)
}

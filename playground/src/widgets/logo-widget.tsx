import { defineComponent } from 'vue'
import { useTheme } from '@formily/antdv-designable'

const logo = {
  dark: '//img.alicdn.com/imgextra/i2/O1CN01NTUDi81fHLQvZCPnc_!!6000000003981-55-tps-1141-150.svg',
  light: 'http://castle-platform.cp.hxdi.cn/assets/logo-426c674f.png'
}

export default defineComponent({
  name: 'LogoWidget',
  setup() {
    const url = logo[useTheme().value]
    return () => (
      <div
        style={{ display: 'flex', alignItems: 'center', fontSize: 14, justifyContent: 'center' }}
      >
        <img src={url} style={{ margin: '12px 8px', height: '18px', width: 'auto' }} />
        <h2 style={{ margin: '8px 0px', color: '#0c60aa' }}>Castle 前端中台</h2>
      </div>
    )
  }
})

import { computed, defineComponent, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'
import Loading from '../loading'
import styles from './style'
import type { MonacoContainerProps } from './types'
import { monacoContainerProps } from './types'

export default defineComponent({
  props: monacoContainerProps,
  setup(props: MonacoContainerProps, { slots }) {
    const containerRef = ref(null)
    const wrapperStyle = computed<CSSProperties>(() => {
      const { width, height } = props
      return {
        ...styles.wrapper,
        width,
        height
      }
    })

    const containerStyle = computed<CSSProperties>(() => {
      // console.log('(!props.isEditorReady && styles.hide)', !props.isEditorReady && styles.hide)

      return {
        ...styles.fullWidth,
        ...(!props.isEditorReady && styles.hide)
        // ...(!props.isEditorReady && styles.hide)
      }
    })

    onMounted(() => {
      props.setContainerRef(containerRef)
    })

    return () => (
      <div style={wrapperStyle.value}>
        {!props.isEditorReady && <Loading>{slots.default?.()}</Loading>}
        <div ref={containerRef} style={containerStyle.value} class={props.className} />
      </div>
    )
  }
})

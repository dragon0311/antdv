import { defineComponent } from 'vue'
import { Simulator } from '../containers'
import { WorkspacePanel } from './WorkspacePanel'

export const ViewportPanel = defineComponent({
  name: 'DnViewportPanel',
  setup(props, { slots }) {
    return () => {
      return (
        <WorkspacePanel.Item flexable={true}>
          123
          <Simulator> {slots.default?.()} </Simulator>
        </WorkspacePanel.Item>
      )
    }
  }
})

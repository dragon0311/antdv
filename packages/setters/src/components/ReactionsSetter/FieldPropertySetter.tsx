import { TextWidget, usePrefix } from '@formily/antdv-designable'
import { Menu } from 'ant-design-vue'
import { MonacoInput } from '@formily/antdv-settings-form'
import { defineComponent, ref } from 'vue'
import { isPlainObj, reduce } from '@formily/shared'
import { FieldProperties } from './properties'

export interface IFieldProperty {
  [key: string]: string
}

export interface IFieldPropertySetterProps {
  extraLib?: string
  value?: IFieldProperty
  onChange?: (value: IFieldProperty) => void
}

const template = (code: string) => {
  if (!code) return
  return code.trim()
}

export const FieldPropertySetter = defineComponent({
  props: { value: { type: Object }, extraLib: {} },
  emits: ['change'],
  setup(props, { emit }) {
    const selectKeysRef = ref(['visible'])
    const setSelectedKeys = (value: string[]) => (selectKeysRef.value = value)
    const prefixRef = usePrefix('field-property-setter')

    const parseExpression = (expression: string) => {
      if (!expression) return ''
      return String(expression).match(/^\{\{([\s\S]*)\}\}$/)?.[1] || ''
    }

    const filterEmpty = (value) => {
      return reduce(
        value,
        (buf, value, key) => {
          if (!value || value === '{{}}') return buf
          buf[key] = value
          return buf
        },
        {} as Record<string, any>
      )
    }

    return () => {
      const prefix = prefixRef.value
      const value = { ...props.value }
      const selectKeys = selectKeysRef.value
      const currentProperty = FieldProperties.find((item) => item.key === selectKeys[0])
      return (
        <div class={prefix}>
          <Menu
            mode="vertical"
            style={{
              width: '200px',
              height: '300px',
              paddingRight: '4px',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
            selectedKeys={selectKeys}
            onSelect={(selectedKey) => {
              setSelectedKeys([selectedKey.key as string])
            }}
          >
            {FieldProperties.map((key) => {
              if (isPlainObj(key)) {
                return (
                  <Menu.Item key={key.key}>
                    <TextWidget
                      token={`SettingComponents.ReactionsSetter.${key.token || key.key}`}
                    />
                  </Menu.Item>
                )
              }
              return (
                <Menu.Item key={key}>
                  <TextWidget token={`SettingComponents.ReactionsSetter.${key}`} />
                </Menu.Item>
              )
            })}
          </Menu>
          <div class={prefix + '-coder-wrapper'}>
            <div class={prefix + '-coder-start'}>
              {`$self.${selectKeys[0]} = (`}
              <span
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  color: '#888',
                  fontWeight: 'normal'
                }}
              >
                {'//'}{' '}
                <TextWidget token="SettingComponents.ReactionsSetter.expressionValueTypeIs" /> {'`'}
                {currentProperty?.type}
                {'`'}
              </span>
            </div>
            <div class={prefix + '-coder'}>
              <MonacoInput
                key={selectKeys[0]}
                language="javascript.expression"
                extraLib={props.extraLib as string}
                helpCode={template(currentProperty?.helpCode)}
                value={parseExpression(value[selectKeys[0]])}
                height={226}
                options={{
                  lineNumbers: 'off',
                  wordWrap: 'on',
                  glyphMargin: false,
                  folding: false,
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  minimap: {
                    enabled: false
                  }
                }}
                onChange={(expression) => {
                  emit(
                    'change',
                    filterEmpty({
                      ...value,
                      [selectKeys[0]]: `{{${expression}}}`
                    })
                  )
                }}
              />
            </div>
            <div class={prefix + '-coder-end'}>{`)`}</div>
          </div>
        </div>
      )
    }
  }
})

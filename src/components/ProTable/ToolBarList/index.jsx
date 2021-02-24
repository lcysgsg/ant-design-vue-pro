import ColumnSetting from './ColumnSetting/index.vue'

export default {
  data () {
    return {
      defaultOptions: {
        density: false,
        fullScreen: true,
        reload: true,
        setting: true
      }
    }
  },
  inject: ['$refRoot'],
  props: {
    /** @name 操作栏配置 */
    columns: {
      type: Array,
      default: () => []
    },
    options: {
      type: [Object, Boolean],
      default () {
        return this.defaultOptions
      }
    }
  },
  methods: {
    fullScreenDom () {
      const fullScreen = () => {
        if (!this.$refRoot.ProTable || !document.fullscreenEnabled) {
          return
        }
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          this.$refRoot.ProTable.$el.requestFullscreen()
        }
      }
      return (
        <a-tooltip placement="top">
          <template slot="title"> 全屏 </template>
          <AIcon type={document.fullscreenElement ? 'fullscreen-exit' : 'fullscreen'} onClick={fullScreen}></AIcon>
        </a-tooltip>
      )
    },
    reloadDom () {
      return (
        <a-tooltip placement="top">
          <template slot="title"> 刷新 </template>
          <AIcon type="undo" onClick={() => this.$refRoot.STable.refresh()}></AIcon>
        </a-tooltip>
      )
    },
    settingDom () {
      return (
        <a-tooltip placement="top">
          <template slot="title"> 列设置 </template>
          <ColumnSetting
            ref="ColumnsSetup"
            options={this.columns}
            value={this.columns}
            on={{
              change: (val) => this.$emit('change:columns', val)
            }}
          />
        </a-tooltip>
      )
    }
  },

  render () {
    const options = {
      ...this.defaultOptions,
      ...this.options
    }
    if (!options.reload && !options.setting && !options.fullScreen) return
    return (
      <div>
        <a-divider type="vertical" style="margin-right: 15px;" />
        <ASpace size="middle">
          {options.reload && this.reloadDom()}
          {options.setting && this.settingDom()}
          {options.fullScreen && this.fullScreenDom()}
        </ASpace>
      </div>
    )
  }
}

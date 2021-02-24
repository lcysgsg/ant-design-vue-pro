import STable from '../Table/index'
import ToolBarList from './ToolBarList/index'

export default {
  data () {
    return {
      ProColumns: []
    }
  },
  provide () {
    return {
      $refRoot: this.$refs
    }
  },

  props: Object.assign({}, STable.props, ToolBarList.props, {
    headerTitle: {
      type: String,
      default: () => ''
    }
  }),
  watch: {
    columns: {
      immediate: true,
      handler (val) {
        this.ProColumns = val
      }
    }
  },

  methods: {
    refresh (bool = false) {
      this.$refs.STable.refresh(bool)
    },

    renderToolBar () {
      return (
        <div class="ant-pro-table-toolbar" style="padding: 0 2px;">
          <div class="ant-pro-table-toolbar-title">{this.headerTitle}</div>
          <div class="ant-pro-table-toolbar-option">
            <slot name="toolbar-right"></slot>
            {this.$scopedSlots.toolbar?.()}
            <ToolBarList
              columns={this.columns}
              options={this.options}
              on={{
                'change:columns': (columns) => (this.ProColumns = columns)
              }}
            />
          </div>
        </div>
      )
    }
  },

  render () {
    const props = {
      ...this.$props,
      columns: this.ProColumns.filter(e => e.show !== false)
    }
    return (
      <a-card ref="ProTable" body-style={{ 'padding-top': 0 }} bordered={false}>
        {this.renderToolBar()}
        <STable ref="STable" {...{ props: props }} columns={this.ProColumns}></STable>
      </a-card>
    )
  }
}

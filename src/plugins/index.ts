import { type App } from 'vue'
import { loadElementPlus } from './element-plus'
import { loadVxeTable } from './vxe-table'

export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadVxeTable(app)
}

interface TreeNode {
  id: string | number
  pId?: string | number | null
  children?: TreeNode[]
  [key: string]: any // 允许其他属性
}

interface TreeNode2 {
  children?: TreeNode[]
  [key: string]: any // 允许其他属性
}

interface FlatNode {
  id: string | number
  pId?: string | number | null
  [key: string]: any // 允许其他属性
}

/**
 * @param  {Array} collection
 * @returns {Array}
 * @description 用pId的数据格式转换成有children的数据
 */
function transformToTreeData(
  data: TreeNode[] = [],
  pId: string | number | null = null,
  pPath: string | null = null
): TreeNode[] {
  return data
    .filter((item) => item.pId === pId)
    .map((item) => ({
      ...item,
      fullPath: pPath ? `/${pPath}/${item.path}` : `/${item.path}`,
      children: transformToTreeData(data, item.id, item.path)
    }))
}

/**
 * @param {Array} collection
 * @returns {Array}
 * @description 将带children的树形结构转换成带pId的扁平结构
 */
function transformToFlatData(treeData: TreeNode[]): FlatNode[] {
  const flatData: FlatNode[] = []

  function traverse(node: TreeNode, pId: string | number | null) {
    const { id, children } = node
    flatData.push(node)

    if (children && children.length > 0) {
      children.forEach((child) => traverse(child, id))
    }
  }

  treeData.forEach((node) => traverse(node, null))

  return flatData
}

/**
 * @param {Array} collection
 * @returns {Array}
 * @description 将带children的树形结构转换成扁平结构
 */
function traverse(node: TreeNode2): Record<string, any>[] {
  let result: Record<string, any>[] = []

  node.forEach((item: Record<string, any>) => {
    result.push({ ...item })

    if (item.children && item.children.length) {
      result = result.concat(traverse(item.children))
    }
  })
  return result
}

export { transformToFlatData, transformToTreeData, traverse }
export type { FlatNode, TreeNode, TreeNode2 }

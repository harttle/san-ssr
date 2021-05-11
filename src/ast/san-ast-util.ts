/**
 * San 模板 AST 工具库
 * Spec: https://github.com/baidu/san/blob/master/doc/anode.md
 * Inspect: https://astexplorer.net/ 选择语言为 San
 * 
 * 对 san ast 做简单的处理，如果有复杂功能，建议引入 https://github.com/ecomfe/san-anode-utils
 */

import * as TypeGuards from './san-ast-type-guards'
import { ANode, ExprType, ANodeProperty } from 'san'

/**
* 获取 ANode props 数组中相应 name 的项
*/
export function getANodePropByName (aNode: ANode, name: string): ANodeProperty | undefined {
    for (const prop of aNode.props) {
        if (prop.name === name) return prop
    }
}

/**
 * 获取 ANode 的 props
 *
 * 做了一点归一化：对于布尔属性，只要 key 存在就把它的值设为 true
 */
export function parseANodeProps (aNode: ANode) {
    return aNode.props.map(prop => {
        if (
            (
                TypeGuards.isExprTextNode(prop.expr) ||
                TypeGuards.isExprStringNode(prop.expr)
            ) && prop.noValue
        ) {
            prop.expr = {
                type: ExprType.BOOL,
                value: true
            }
        }

        return prop
    })
}

/**
 * 先序遍历 ANode 树
 */
export function visitANodeRecursively (aNode: ANode, visitor: (aNode: ANode) => void) {
    visitor(aNode)
    for (const child of aNode.children || []) visitANodeRecursively(child, visitor)
}

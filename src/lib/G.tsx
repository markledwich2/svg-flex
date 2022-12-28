import {
  Children,
  cloneElement,
  ComponentProps,
  CSSProperties,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  SVGProps,
  useEffect,
} from 'react'
import computeLayout, { LayoutNode, LayoutStyle } from 'css-layout'
import { match, P } from 'ts-pattern'
import { flatTree, notNullOrEmpty, pick, keyBy } from './utils'

export const GFlex = ({ x, y, children, style, ...props }: SVGProps<SVGGElement>) => {
  // get descendant g and supported elements. Stop at G elements to let that do its own sizing
  const nodes = {
    style: { ...{ flex: 'row' }, ...style },
    children: childrenLayout(children, []),
    path: ['_root'],
  } as LayoutElement

  const keys1 = Children.toArray(children).map((c) => isValidElement(c) && c?.key)
  const keys2 = flattenedChildren(children).map((c) => c?.key)
  console.log('GFlex1', { nodes, keys1, keys2 })
  computeLayout(nodes)
  const flattened = flatTree(nodes, (n) => n.children)
  const nodeByPath = keyBy(flattened, (n) => n.path.join('|'))
  console.log('GFlex2', { nodes, flattened, nodeByPath })
  return (
    <g {...props} transform={x || y ? `translate(${x ?? 0} ${y ?? 0})` : undefined}>
      {deepClone(children, nodeByPath, [])}
    </g>
  )
}

const deepClone = (children: ReactNode, nodeByPath: Record<string, LayoutElement>, path: string[]) =>
  Children.toArray(children).map((c) => {
    if (!isValidElement(c)) return c
    const childPath = [...path, (c.key as string) ?? '']
    const node = nodeByPath[childPath.join('|')]
    const layout = node?.layout
    const style = c.props?.style as CSSProperties
    const overrideProps: { style: CSSProperties; children?: ReactNode } = {
      style: { ...layout, ...style },
    }
    console.log('clone', childPath.join('|'), { childPath, node, c, overrideProps })
    if (c.props.children) {
      overrideProps.children = deepClone(c.props.children, nodeByPath, childPath)
    }
    return cloneElement(c, overrideProps as any)
  })

const childrenLayout = (children: ReactNode, path: string[]) =>
  flattenedChildren(children)
    .map((c) => getElementLayout(c, path))
    .filter(notNullOrEmpty) as LayoutElement[]

type LayoutElement = Omit<LayoutNode, 'children'> & {
  element?: ReactElement
  path: string[]
  children: LayoutElement[]
}
const getElementLayout = (element: ReactElement, path: string[]): LayoutElement | undefined => {
  //console.log('getElementLayout', { element })
  const style = match(element)
    .with({ type: 'g' }, (g) => {
      const p = g.props as SVGProps<SVGGElement>
      return styleProps(p?.style)
    })
    .with({ type: 'rect' }, (r) => {
      const p = r.props as SVGProps<SVGRectElement>
      console.log('rect', p)
      const { width, height, x: left, y: top } = p
      return { left, top, width, height, ...styleProps(p?.style) }
    })
    .otherwise(() => undefined)
  const childPath = [...path, (element.key as string) ?? '']
  return style == null
    ? undefined
    : ({
        style,
        children: childrenLayout(element.props.children, childPath),
        element,
        path: childPath,
      } as LayoutElement)
}

const styleProps = (style?: CSSProperties): LayoutStyle =>
  style == null ? {} : pick(style, 'left', 'top', 'width', 'height')

const flattenedChildren = (children: ReactNode): ReactElement[] => {
  const unwrapFragment = match(children)
    .with({ type: Fragment }, (f: any) => f.props.children)
    .otherwise(() => children)
  const flattened = Children.toArray(unwrapFragment)
    .filter(isValidElement)
    .map((child) => (Array.isArray(child) ? child : [child]))
    .reduce((a, b) => a.concat(b), [])
  return flattened
}

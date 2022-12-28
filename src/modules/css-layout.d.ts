declare module 'css-layout' {
  import {CSSProperties} from 'react'

  export type LayoutStyle = Pick<
    CSSProperties,
    | 'width'
    | 'height'
    | 'minWidth'
    | 'minHeight'
    | 'maxWidth'
    | 'maxHeight'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'margin'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
    | 'marginBottom'
    | 'padding'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingTop'
    | 'paddingBottom'
    | 'borderWidth'
    | 'borderLeftWidth'
    | 'borderRightWidth'
    | 'borderTopWidth'
    | 'borderBottomWidth'
    | 'flexDirection'
    | 'justifyContent'
    | 'alignItems'
    | 'alignSelf'
    | 'flex'
    | 'flexWrap'
    | 'position'
  >

  export interface LayoutNode {
    style: LayoutStyle
    children?: LayoutNode[]
    layout?: Layout
  }

  export interface Layout {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
    direction: 'ltr' | 'rtl'
  }

  export default function computeLayout (nodes:LayoutNode)
}

import { describe, it, expect } from 'vitest'
import { flatTree } from './utils'

type Node = { id: string; children?: Node[] }
const tree: Node = {
  id: '1',
  children: [
    {
      id: '1a',
    },
    { id: '1b', children: [{ id: '1bx' }] },
  ],
}

// test fatTree
describe('utils', () => {
  it('flatTree', () => {
    expect(flatTree(tree, (n) => n.children).map((n) => n.id).join('|')).toBe('1|1a|1b|1bx')
  })
})

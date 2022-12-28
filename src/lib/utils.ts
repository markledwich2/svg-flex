import { match } from 'ts-pattern'

const isArray = (a: any) => Array.isArray(a)
const isObject = (o: any) => o && typeof o === 'object' && !isArray(o)

export const isNullOrEmpty = (s: any) => !notNullOrEmpty(s)
export const notNullOrEmpty = (s: any) =>
  s
    ? match(s)
        .when(isArray, (a) => a.length > 0)
        .when(isObject, (o) => Object.keys(o).length > 0)
        .otherwise(() => true)
    : false

// export const pick = <T>(o: T, ...keys: (keyof T)[]) =>
//   keys.reduce((a, c) => ({ ...a, [c]: o[c] }), {}) as Pick<T, keyof T>

export function pick<T extends object, K extends keyof T>(
  base: T,
  ...keys: K[]
): Pick<T, K> {
  const entries = keys.map((key) => [key, base[key]])
  return Object.fromEntries(entries)
}

export const flatTree = <T>(
  n: T,
  getChildren: (n: T) => T[] | undefined
): T[] => {
  const children = getChildren(n)
  return children && children.length > 0
    ? [n, ...flatMap(children, (c) => flatTree(c, getChildren))]
    : [n]
}

export const flatMap = <T, U>(arr: T[], fn: (t: T) => U[]): U[] =>
  arr.reduce((acc, t) => [...acc, ...fn(t)], [] as U[])

export const keyBy = <T, K extends string>(
  arr: T[],
  key: (t: T) => K
): Record<K, T> =>
  arr.reduce((acc, t) => ({ ...acc, [key(t)]: t }), {} as Record<K, T>)

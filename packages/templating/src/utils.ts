export function isObj(x: unknown): x is object {
    return x !== null && typeof x === "object" && !Array.isArray(x)
}

/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn<T extends Function>(value: unknown): value is T {
    return typeof value === "function"
}

/** @internal */
export function isStr(value: unknown, min = 0): value is string {
    return typeof value === "string" && size(value) >= min
}

/** @internal */
export function isNum(value: unknown): value is number {
    return Number.isFinite(value)
}

/** @internal */
export function isArr(value: unknown): value is unknown[] {
    return Array.isArray(value)
}

/** @internal */
export function size(value: unknown[] | string) {
    return value.length
}

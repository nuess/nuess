/** @internal */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFn<T extends Function>(value: unknown): value is T {
    return typeof value === "function" && value instanceof Function
}

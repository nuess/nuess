/**
 * Defines a quick `Map<strig, T>` type
 * @example
 * ```ts
 * const names: Mapped<string> = new Map()
 *
 * names.set("youyuxi", "Evan You")
 * names.set("adwher", "Andres Celis")
 * ```
 */
declare type Mapped<T> = Map<string, T>

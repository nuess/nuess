/**
 * Represents an optional value which can be {@link T} or `undefined`
 * @example
 * ```ts
 * const text0: Option<string> = "hello" // valid
 * const text1: Option<string> = undefined // also, is valid
 * ```
 */
declare type Maybe<T> = T | undefined

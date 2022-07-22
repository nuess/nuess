import { describe, test, expect } from "vitest"
import { isFn } from "./utils"

describe("isFn()", () => {
    test("can handle if value is a function", () => {
        /* eslint-disable @typescript-eslint/no-empty-function */
        expect(isFn([])).toBe(false)
        expect(isFn({})).toBe(false)
        expect(isFn(0)).toBe(false)
        expect(isFn(false)).toBe(false)
        expect(isFn(() => {})).toBe(true)
        expect(isFn(function () {})).toBe(true)
        /* eslint-enabled @typescript-eslint/no-empty-function */
    })

    test("can handle instances as non-function", () => {
        expect(isFn(new Number())).toBe(false)
        expect(isFn(new String())).toBe(false)
        expect(isFn(new Boolean())).toBe(false)
    })
})

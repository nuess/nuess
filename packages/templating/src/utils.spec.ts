import { describe, test, expect } from "vitest"
import { isArr, isFn, isNum, isObj, isStr } from "./utils"

describe("isArr()", () => {
    const cases: [unknown, boolean][] = [
        [[], true],
        ["", false],
        [0, false],
        [undefined, false],
        [null, false],
        [false, false],
    ]

    test.each(cases)("should '%j' to be a %s array", (received, expected) => {
        expect(isArr(received)).toBe(expected)
    })
})

describe("isFn()", () => {
    /* eslint-disable @typescript-eslint/no-empty-function */
    const cases: [unknown, boolean][] = [
        [() => {}, true],
        [function () {}, true],
        ["", false],
        [0, false],
        [null, false],
        [false, false],
    ]
    /* eslint-enable @typescript-eslint/no-empty-function */

    test.each(cases)(
        "should '%s' to be a %s function",
        (received, expected) => {
            expect(isFn(received)).toBe(expected)
        }
    )
})

describe("isNum()", () => {
    const cases: [unknown, boolean][] = [
        [1.1, true],
        [0, true],
        [-1, true],
        [null, false],
        [NaN, false],
        ["", false],
    ]

    test.each(cases)("should '%s' to be a %s number", (received, expected) => {
        expect(isNum(received)).toBe(expected)
    })
})

describe("isObj()", () => {
    const cases: [unknown, boolean][] = [
        [{}, true],
        [[], false],
        ["", false],
        [0, false],
        [null, false],
        [false, false],
    ]

    test.each(cases)("should '%s' to be a %s object", (received, expected) => {
        expect(isObj(received)).toBe(expected)
    })
})

describe("isStr()", () => {
    const cases: [unknown, boolean][] = [
        ["", true],
        [0, false],
        [null, false],
        [false, false],
    ]

    test.each(cases)("should '%s' to be a %s string", (received, expected) => {
        expect(isStr(received)).toBe(expected)
    })
})

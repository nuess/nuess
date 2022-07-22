import { describe, test, expect, vi } from "vitest"
import { createLogger, Threshold } from "./logger"

describe("debug()", () => {
    test("skip debug messages if threshold is higher", () => {
        const logger = createLogger({})
        const spy = vi.spyOn(console, "debug")

        logger.debug("Hello world!")
        expect(spy).not.toBeCalled()
    })

    test("print debug messages if threshold is lower", () => {
        const logger = createLogger({ threshold: Threshold.Debug })
        const spy = vi.spyOn(console, "debug")

        logger.debug("Hello world!")
        expect(spy).toBeCalled()
    })
})

describe("info()", () => {
    test("skip info messages if threshold is higher", () => {
        const logger = createLogger({ threshold: Threshold.Warning })
        const spy = vi.spyOn(console, "info")

        logger.info("Hello world!")
        expect(spy).not.toBeCalled()
    })

    test("print info messages if threshold is lower", () => {
        const logger = createLogger({ threshold: Threshold.Debug })
        const spy = vi.spyOn(console, "info")

        logger.info("Hello world!")
        expect(spy).toBeCalled()
    })
})

describe("warn()", () => {
    test("skip warn messages if threshold is higher", () => {
        const logger = createLogger({ threshold: Threshold.Error })
        const spy = vi.spyOn(console, "warn")

        logger.warn("Hello world!")
        expect(spy).not.toBeCalled()
    })

    test("print warn messages if threshold is lower", () => {
        const logger = createLogger({ threshold: Threshold.Debug })
        const spy = vi.spyOn(console, "warn")

        logger.warn("Hello world!")
        expect(spy).toBeCalled()
    })
})

describe("error()", () => {
    test("skip error messages if threshold is silent", () => {
        const logger = createLogger({ threshold: Threshold.Silent })
        const spy = vi.spyOn(console, "error")

        logger.error("Hello world!")
        expect(spy).not.toBeCalled()
    })

    test("print error messages if threshold is lower", () => {
        const logger = createLogger({ threshold: Threshold.Debug })
        const spy = vi.spyOn(console, "error")

        logger.error("Hello world!")
        expect(spy).not.toBeCalled()
    })
})

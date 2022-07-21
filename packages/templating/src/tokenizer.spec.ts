import { describe, test, expect } from "vitest"
import { Tokenizer } from "./tokenizer"

describe("scan()", () => {
    test("throws if template is not a string", () => {
        const tokenizer = new Tokenizer()
        expect(() => tokenizer.scan(null as unknown as string)).toThrow()
    })

    test("throws if open and close tag are the same", () => {
        const tokenizer = new Tokenizer({
            tags: {
                open: "|",
                close: "|",
            },
        })

        expect(() => tokenizer.scan("Hello world!")).toThrow()
    })

    test("throws if one tag container characters from another", () => {
        const tokenizer = new Tokenizer({
            tags: {
                open: "{{",
                close: "{",
            },
        })

        expect(() => tokenizer.scan("Hello world!")).toThrow()
    })

    test("returns an empty array with a empty template", () => {
        const tokenizer = new Tokenizer()

        expect(tokenizer.scan("")).toEqual([])
    })

    test("handles a computed interpolation correctly", () => {
        const tokenizer = new Tokenizer()

        expect(tokenizer.scan("Hello {{& name }}")).toEqual([
            {
                type: "plain",
                text: "Hello ",
            },
            {
                type: "computed",
                condition: "name",
            },
        ])

        expect(tokenizer.scan("{{&price}} bucks!")).toEqual([
            {
                type: "computed",
                condition: "price",
            },
            {
                type: "plain",
                text: " bucks!",
            },
        ])

        expect(tokenizer.scan("{{& firstname }} {{& lastname }}")).toEqual([
            {
                type: "computed",
                condition: "firstname",
            },
            {
                type: "plain",
                text: " ",
            },
            {
                type: "computed",
                condition: "lastname",
            },
        ])
    })

    test("handles a conditional interpolation correctly", () => {
        const tokenizer = new Tokenizer()

        expect(tokenizer.scan("{{#show}} Hello world! {{/}}")).toEqual([
            {
                type: "conditional",
                condition: "show",
                block: [
                    {
                        type: "plain",
                        text: " Hello world! ",
                    },
                ],
            },
        ])

        expect(
            tokenizer.scan("{{# showA }}{{# showB }} Show B {{/}} Show A {{/}}")
        ).toEqual([
            {
                type: "conditional",
                condition: "showA",
                block: [
                    {
                        type: "conditional",
                        condition: "showB",
                        block: [
                            {
                                type: "plain",
                                text: " Show B ",
                            },
                        ],
                    },
                    {
                        type: "plain",
                        text: " Show A ",
                    },
                ],
            },
        ])

        expect(tokenizer.scan("{{& firstname }} {{& lastname }}")).toEqual([
            {
                type: "computed",
                condition: "firstname",
            },
            {
                type: "plain",
                text: " ",
            },
            {
                type: "computed",
                condition: "lastname",
            },
        ])
    })

    test("can handle a closing tag without an open tag", () => {
        const tokenizer = new Tokenizer()

        expect(tokenizer.scan("Hello }}")).toEqual([
            {
                type: "plain",
                text: "Hello }}",
            },
        ])

        expect(tokenizer.scan("{{&hello}} world! }}")).toEqual([
            {
                type: "computed",
                condition: "hello",
            },
            {
                type: "plain",
                text: " world! }}",
            },
        ])

        expect(tokenizer.scan("{{#hello}} Hello world! }} {{/}}")).toEqual([
            {
                type: "conditional",
                condition: "hello",
                block: [
                    {
                        type: "plain",
                        text: " Hello world! }} ",
                    },
                ],
            },
        ])
    })
})

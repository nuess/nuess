import { isStr, size } from "./utils"

export type TokenType = "plain" | "computed" | "conditional"

interface BasicToken {
    type: TokenType
}

interface PlainToken extends BasicToken {
    type: "plain"
    text: string
}

interface ComputedToken extends BasicToken {
    type: "computed"
    condition: string
}

interface ConditionalToken extends BasicToken {
    type: "conditional"
    condition: string
    block: Token[]
}

export type Token = PlainToken | ComputedToken | ConditionalToken

export class Tokenizer {
    private tags: Tokenizer.Tags
    private modifiers: Tokenizer.Modifiers

    constructor(options?: Tokenizer.Options) {
        this.tags = {
            open: "{{",
            close: "}}",

            ...options?.tags,
        }

        this.modifiers = {
            computing: "&",
            conditioning: "#",
            closing: "/",

            ...options?.modifiers,
        }
    }

    public scan(template: string): Token[] {
        if (!isStr(template)) {
            throw new TypeError(
                `The template must be a string. Got a ${typeof template}`
            )
        }

        const openTag = this.tags.open
        const closeTag = this.tags.close

        if (
            !isStr(openTag, 1) ||
            !isStr(closeTag, 1) ||
            openTag.includes(closeTag) ||
            closeTag.includes(openTag) ||
            openTag === closeTag
        ) {
            throw new TypeError(
                `The open and close symbols should be two distinct non-empty strings which don't contain each other. Got "${openTag}" and "${closeTag}"`
            )
        }

        const openTagOffset = size(openTag)
        const closeTagOffset = size(closeTag)

        const tokens: Token[] = []
        const templateSize = size(template)

        let currentIndex = 0

        let lastOpenIndex = 0
        let lastCloseIndex = 0

        while (currentIndex < templateSize) {
            lastOpenIndex = template.indexOf(openTag, currentIndex)

            if (lastOpenIndex === -1) {
                tokens.push({
                    type: "plain",
                    text: template.substring(currentIndex),
                })

                break
            }

            if (lastOpenIndex > 0) {
                tokens.push({
                    type: "plain",
                    text: template.substring(currentIndex, lastOpenIndex),
                })

                currentIndex += lastOpenIndex
            }

            lastCloseIndex = template.indexOf(closeTag, lastOpenIndex)

            if (lastCloseIndex === -1) {
                throw new SyntaxError(
                    `Missing '${closeTag}' in the template for the '${openTag}' at position ${lastOpenIndex}`
                )
            }

            const interpolation = template
                .substring(lastOpenIndex + openTagOffset, lastCloseIndex)
                .trim()

            const [modifier, condition] = this.interpolate(interpolation)

            if (modifier === this.modifiers.closing) {
                currentIndex += lastCloseIndex + closeTagOffset
                continue
            }

            if (!modifier || !condition) {
                const position = lastOpenIndex + openTagOffset

                throw new SyntaxError(
                    `Invalid interpolation structure at position ${position}. Got '${interpolation}'`
                )
            }

            if (modifier === this.modifiers.computing) {
                tokens.push({
                    type: "computed",
                    condition: condition,
                })

                currentIndex += lastCloseIndex + closeTagOffset
                continue
            }

            if (modifier === this.modifiers.conditioning) {
                const closingOpenIndex = template.lastIndexOf(
                    openTag + this.modifiers.closing
                )

                const closingCloseIndex = template.lastIndexOf(closeTag)

                if (closingOpenIndex === -1 || closingCloseIndex === -1) {
                    throw new SyntaxError(
                        `Missing interpolation for close the '${condition}' condition`
                    )
                }

                const subtemplate = template.substring(
                    lastCloseIndex + closeTagOffset,
                    closingOpenIndex
                )

                const block = this.scan(subtemplate)

                tokens.push({
                    type: "conditional",
                    block: block,
                    condition: condition,
                })

                currentIndex += closingCloseIndex + closeTagOffset
                continue
            }
        }

        return tokens
    }

    private interpolate(template: string): [Maybe<string>, Maybe<string>] {
        const modifiers = Object.values(this.modifiers)

        for (const modifier of modifiers) {
            if (template.startsWith(modifier)) {
                const condition = template.substring(modifier.length)
                return [modifier.trim(), condition.trim()]
            }
        }

        return [undefined, undefined]
    }
}

export namespace Tokenizer {
    export interface Tags {
        open: string
        close: string
    }

    export interface Modifiers {
        computing: string
        conditioning: string
        closing: string
    }

    export interface Options {
        tags?: Tags
        modifiers?: Modifiers
    }
}

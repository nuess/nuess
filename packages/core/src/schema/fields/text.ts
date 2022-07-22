import { Field } from "../field"

interface TextOptions extends Field.Options {}

export class TextField extends Field<TextOptions> {
    constructor(options: TextOptions) {
        super(options)
    }
}

export function text(options?: TextOptions): TextField {
    const config: Field.Options = {
        ...options,
    }

    return new TextField(config)
}

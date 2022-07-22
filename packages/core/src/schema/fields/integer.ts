import { Field } from "../field"

interface IntegerOptions extends Field.Options {}

export class IntegerField extends Field<IntegerOptions> {
    constructor(options: IntegerOptions) {
        super(options)
    }
}

export function integer(options?: IntegerOptions): IntegerField {
    const config: Field.Options = {
        ...options,
    }

    return new IntegerField(config)
}

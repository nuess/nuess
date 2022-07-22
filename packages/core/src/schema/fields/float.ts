import { Field } from "../field"

interface FloatOptions extends Field.Options {}

export class FloatField extends Field<FloatOptions> {
    constructor(options: FloatOptions) {
        super(options)
    }
}

export function float(options?: FloatOptions): FloatField {
    const config: Field.Options = {
        ...options,
    }

    return new FloatField(config)
}

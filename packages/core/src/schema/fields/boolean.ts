import { Field } from "../field"

interface BooleanOptions extends Field.Options {}

export class BooleanField extends Field<BooleanOptions> {
    constructor(options: BooleanOptions) {
        super(options)
    }
}

export function boolean(options?: BooleanOptions): BooleanField {
    const config: Field.Options = {
        ...options,
    }

    return new BooleanField(config)
}

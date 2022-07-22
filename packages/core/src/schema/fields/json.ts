import { Field } from "../field"

interface JSONOptions extends Field.Options {}

export class JSONField extends Field<JSONOptions> {
    constructor(options: JSONOptions) {
        super(options)
    }
}

export function json(options?: JSONOptions): JSONField {
    const config: Field.Options = {
        ...options,
    }

    return new JSONField(config)
}

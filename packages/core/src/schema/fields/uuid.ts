import { Field } from "../field"

interface UUIDOptions extends Field.Options {}

export class UUIDField extends Field<UUIDOptions> {
    constructor(options: UUIDOptions) {
        super(options)
    }
}

export function uuid(options?: UUIDOptions): UUIDField {
    const config: Field.Options = {
        ...options,
    }

    return new UUIDField(config)
}

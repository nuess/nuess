import { Field } from "../field"

interface TimeStampOptions extends Field.Options {}

export class TimeStampField extends Field<TimeStampOptions> {
    constructor(options: TimeStampOptions) {
        super(options)
    }
}

export function timestamp(options?: TimeStampOptions): TimeStampField {
    const config: Field.Options = {
        ...options,
    }

    return new TimeStampField(config)
}

export abstract class Field<O extends Field.Options = Field.Options> {
    constructor(private options: O) {}
}

export namespace Field {
    export interface Options {
        label?: string
    }
}

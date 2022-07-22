import { Database } from "src/database"
import { Logger } from "src/logger"

import { Field } from "./field"

export class DataSource {
    private schema: DataSource.Schema

    constructor(options: DataSource.Options) {
        this.schema = options.schema
    }

    public async migrate() {}
}

export namespace DataSource {
    export interface Schema {
        [name: string]: Field
    }

    export interface Options {
        schema: Schema

        database: Database
        logger: Logger
    }
}

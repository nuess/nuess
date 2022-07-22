export class Database {
    constructor(private options: Database.Options) {}
}

export namespace Database {
    export interface Options {
        hostname: string
        port: number

        authentication?: {
            username: string
            password: string
        }
    }
}

export interface CreateDatabaseOptions {
    hostname?: string
    port?: number

    authentication?: {
        username: string
        password: string
    }
}

export function createDatabase(options: CreateDatabaseOptions): Database {
    const config: Database.Options = {
        hostname: options.hostname ?? "0.0.0.0",
        port: options.port ?? 1234,

        authentication: options.authentication,
    }

    return new Database(config)
}

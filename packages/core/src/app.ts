import { createLogger, CreateLoggerOptions, Logger } from "./logger"
import { createServer, CreateServerOptions, Server } from "./server"

export class App {
    public readonly server: Server
    public readonly logger: Logger

    constructor(options: App.Options) {
        this.server = createServer(options.server)
        this.logger = createLogger(options.logger)
    }
}

export namespace App {
    export interface Options {
        server: CreateServerOptions
        logger: CreateLoggerOptions
    }
}

interface CreateAppOptions {
    server?: CreateServerOptions
    logger?: CreateLoggerOptions
}

export function createApp(options: CreateAppOptions): App {
    const config: App.Options = {
        server: options.server ?? {},
        logger: options.logger ?? {},
    }

    return new App(config)
}

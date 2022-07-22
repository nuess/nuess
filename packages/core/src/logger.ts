import { gray, cyan, yellow, red } from "colorette"

export enum Threshold {
    Silent = 0,
    Error = 1,
    Warning = 2,
    Information = 3,
    Debug = 4,
}

export class Logger {
    constructor(private options: Logger.Options) {}

    public debug(message: string) {
        if (this.options.threshold >= Threshold.Debug) {
            // eslint-disable-next-line no-console
            console.debug(`${gray("debug")} ${message}`)
        }
    }

    public info(message: string) {
        if (this.options.threshold >= Threshold.Information) {
            // eslint-disable-next-line no-console
            console.info(`${cyan("info")} ${message}`)
        }
    }

    public warn(message: string) {
        if (this.options.threshold >= Threshold.Warning) {
            // eslint-disable-next-line no-console
            console.warn(`${yellow("warn")} ${message}`)
        }
    }

    public error(message: string) {
        if (this.options.threshold >= Threshold.Error) {
            // eslint-disable-next-line no-console
            console.error(`${red("error")} ${message}`)
        }
    }
}

export namespace Logger {
    export interface Options {
        threshold: Threshold
    }
}

export interface CreateLoggerOptions {
    threshold?: Threshold
}

export function createLogger(options: CreateLoggerOptions) {
    const config: Logger.Options = {
        threshold: options.threshold ?? Threshold.Information,
    }

    return new Logger(config)
}

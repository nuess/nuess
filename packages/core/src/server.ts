import http from "node:http"
import polka from "polka"

import { json, urlencoded } from "body-parser"
import { isFn } from "./utils"

export class Server {
    private server: polka.Polka

    constructor(private options: Server.Options) {
        this.server = polka()

        this.server.use(this.utils())

        this.server.use(json())
        this.server.use(urlencoded())
    }

    private utils(): Server.Middleware {
        return (req, res, next) => {
            res.status = code => {
                res.statusCode = code
            }

            res.send = data => {
                res.setHeader("content-type", "application/json")
                res.end(JSON.stringify(data))
            }

            next()
        }
    }

    public use(fn: Server.Middleware): Server {
        this.server.use(fn)
        return this
    }

    public at(path: string, fn: Server.Handler): Server {
        if (isFn(fn)) this.server.all(path, fn)
        else this.server.all(path, ...fn.middlewares, fn.handle)

        return this
    }

    public async start() {
        this.server.listen(this.options.port, this.options.host)
    }
}

export namespace Server {
    export interface Options {
        host: string
        port: number
    }

    export interface Request extends http.IncomingMessage {
        body: unknown

        params: Record<string, string>
    }

    export interface Response extends http.ServerResponse {
        status(code: number): void
        send(data: object): void
    }

    export type FnNext = (err?: Error) => void

    export type Middleware = (req: Request, res: Response, next: FnNext) => void

    export interface Router {
        middlewares: Middleware[]

        handle: Middleware
    }

    export type Handler = Middleware | Router
}

export interface CreateServerOptions {
    host?: string
    port?: number
}

export function createServer(options: CreateServerOptions) {
    const config: Server.Options = {
        host: options.host ?? "localhost",
        port: options.port ?? 1340,
    }

    return new Server(config)
}

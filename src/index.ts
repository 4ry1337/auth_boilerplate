import express, {Response, Request, Application, NextFunction} from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import {CustomError} from "./shared/exceptions"

class Server {
  public app: Application
  public server: http.Server

  constructor() {
    this.app = express()
    this.config()
    this.server = http.createServer(this.app)
    this.database()
    this.storage()
    this.routes()
  }

  public routes(): void {
    /*---- HealthCheck ----*/
    this.app.get("/api/ping", (req: Request, res: Response) => {
      const msg: string = `Server is running on port ${this.app.get("port")}`
      res.status(200).json({message: msg})
    })

    /*---- Routes ----*/

    /*---- Error Handling ----*/
    this.app.use((err: Error, req: Request, res: Response) => {
      console.log(err)
      if (err instanceof CustomError) {
        return res
          .status(err.statusCode)
          .json({message: err.message, errors: err.errorCode})
      }
    })
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000)
    this.app.use(
      cors({
        credentials: true,
      }),
    )
    this.app.use(compression())
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
  }

  public database(): void {}

  public storage(): void {
    
  }

  public start(): void {
    this.server.listen(this.app.get("port"), () => {
      console.log(`API is running at ${this.app.get("port")}`)
    })
  }
}

const server = new Server()

server.start()

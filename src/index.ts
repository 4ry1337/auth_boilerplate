import express, {Response, Request, Application, NextFunction} from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import * as dotenv from "dotenv"
import { CustomError } from "./shared/libs/exceptions"
import { authRouter, postRouter, userRouter } from "./routes"


dotenv.config()

class Server {
  private app: Application
  public server: http.Server
  constructor() {
    this.app = express()
    this.config()
    this.server = http.createServer(this.app)
    this.routes()
  }

  public routes(): void {
    /*---- HealthCheck ----*/
    this.app.get("/api/ping", (req: Request, res: Response) => {
      const msg: string = `Server is running on port ${this.app.get("port")}`
      res.status(200).json({message: msg})
    })

    /*---- Routes ----*/
    this.app.use("/api/auth", authRouter.router)
    this.app.use("/api/user", userRouter.router)
    this.app.use("/api/admin", userRouter.router)
    this.app.use("/api/news", postRouter.router)

    /*---- Error Handling ----*/
    this.app.use((err: Error, req: Request, res: Response) => {
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

  public start(): void {
    this.server.listen(this.app.get("port"), () => {
      console.log(`API is running at ${this.app.get("port")}`)
    })
  }
}

const server = new Server()

server.start()

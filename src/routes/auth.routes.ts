import {Router} from "express"
import { authController } from "../controller"

export default class AuthRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes() {
    this.router.post("/login", authController.login)

    this.router.post("/registration", authController.registration)

    this.router.get("/logout", authController.logout)

    this.router.get("/refresh", authController.refresh)
  }
}
import {Router} from "express"
import {userController} from "../controller"
import {authMiddleware} from "../middlewares"

export default class UserRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes() {
    this.router.get("/:userid", userController.getUser)
    this.router.put(
      "/:userid",
      authMiddleware.middleware,
      userController.updateUser,
    )
    this.router.delete(
      "/:userid",
      authMiddleware.middleware,
      userController.updateUser,
    )
    this.router.get("/search", userController.search)
  }
}

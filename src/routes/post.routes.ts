import {Router} from "express"
import {postController} from "../controller"

export default class PostRoutes {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }
  public routes() {
    this.router.get("/search", postController.search)
    this.router.get("/:postId", postController.getPost)
  }
}

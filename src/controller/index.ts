import AuthController from "./auth.controller"
import PostController from "./post.controller"
import UserController from "./user.controller"

const authController = new AuthController()
const userController = new UserController()
const postController = new PostController()

export {authController, userController, postController}

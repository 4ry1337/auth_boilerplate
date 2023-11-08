import AuthRoutes from "./auth.routes"
import PostRoutes from "./post.routes"
import UserRoutes from "./user.routes"

const authRouter = new AuthRoutes()
const postRouter = new PostRoutes()
const userRouter = new UserRoutes()

export {authRouter, postRouter, userRouter}

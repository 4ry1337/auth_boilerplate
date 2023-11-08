import AuthService from "./auth.service"
import PostService from "./post.service"
import TaskService from "./task.service"
import UserService from "./user.service"

const authService = new AuthService()
const userService = new UserService()
const taskService = new TaskService()
const postService = new PostService()
export {authService, userService, taskService, postService}

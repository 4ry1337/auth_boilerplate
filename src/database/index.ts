import PostRepository from "./post";
import SessionRepository from "./session";
import UserRepository from "./user";

const userRepository = new UserRepository()
const sessionRepository = new SessionRepository()
const postRepository = new PostRepository()

export {
    userRepository,
    sessionRepository,
    postRepository
}
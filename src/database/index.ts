import SessionRepository from "./session";
import UserRepository from "./user";

const userRepository = new UserRepository()
const sessionRepository = new SessionRepository()

export {
    userRepository,
    sessionRepository,
}
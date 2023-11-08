import AuthMiddleware from "./auth.middleware";
import RoleMiddleware from "./role.middelware";

const authMiddleware = new AuthMiddleware()
const roleMiddleware = new RoleMiddleware()

export {
    authMiddleware,
    roleMiddleware
}
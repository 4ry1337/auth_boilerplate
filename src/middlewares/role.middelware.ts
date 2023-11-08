import {NextFunction, Request, Response} from "express"
import {Cookies} from "../shared/enums/cookies"
import {token} from "../shared/utils/token"
import {Role} from "@prisma/client"
import { Forbidden, Unauthorized } from "../shared/libs/exceptions"

export default class RoleMiddleware {
  middleware(roles: Role[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const accessToken = req.cookies[Cookies.AccessToken]
      if (!accessToken) {
        throw new Unauthorized("Not Signed In")
      }
      const accessPayload = token.verifyAccessToken(accessToken)
      if (!accessPayload) {
        throw new Unauthorized("Not Signed In")
      }
      if(roles.includes(accessPayload.role)){
        throw new Forbidden("No Access Rights")
      }
      res.locals.token = accessToken
      next()
    }
  }
}

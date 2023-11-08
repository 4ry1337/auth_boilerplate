import {NextFunction, Request, Response} from "express"
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  NotImplemented,
  Unauthorized,
} from "../shared/libs/exceptions"
import {userService} from "../services"
import bcrypt from "bcrypt"

export default class UserController {
  async updateUser(req: Request, res: Response, next: NextFunction) {}
  async getUser(req: Request, res: Response, next: NextFunction) {}
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const {email, password, confirm} = req.body
    if (!email || !password) {
      throw new Unauthorized("Invalid credentails")
    }
    if (confirm !== "delete my account") {
      throw new BadRequest("Incorrect confrim")
    }
    const result = await userService.deleteUser(email, password)
    if (!result) {
      throw new InternalServerError()
    }
    //TODO: add redirect
    return res.status(200).end()
  }
  async search(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query
      let q: string | undefined
      let p: number | undefined
      if (typeof query.q === "string") {
        q = query.q
      }
      if (typeof query.q === "string" && !isNaN(Number(query.p))) {
        p = Number(query.p)
      }
      const users = await userService.search(q, p)
      return users
    } catch (e) {
      next(e)
    }
  }
}

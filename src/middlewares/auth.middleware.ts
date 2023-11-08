import { NextFunction, Request, Response } from 'express'
import { Cookies } from '../shared/enums/cookies'
import { Unauthorized } from '../shared/libs/exceptions/Unauthorized'
import { token } from '../shared/utils/token'


export default class AuthMiddleware {
  //TODO
  middleware(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.cookies[Cookies.AccessToken]
    if(accessToken){
        throw new Unauthorized()
    }
    accessToken = token.verifyAccessToken(accessToken)
    if (!accessToken) {
      throw new Unauthorized()
    }
    res.locals.token = accessToken
    next()
  }
}

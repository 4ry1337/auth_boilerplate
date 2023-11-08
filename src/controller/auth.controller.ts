import {v4 as uuidv4} from "uuid"
import prisma from "../database/prisma"
import {CookieOptions, NextFunction, Request, Response} from "express"
import {BadRequest, Unauthorized} from "../shared/libs/exceptions"
import {Cookies} from "../shared/enums/cookies"
import { TokenExpiration } from "../shared/constants/tokens"
import { token } from "../shared/utils/token"
import { authService } from "../services"

const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  domain: process.env.BASE_URL,
  path: "/",
}

const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Refresh * 1000,
}

const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000,
}

export default class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        throw new BadRequest("An email and a password not provided.")
      }
      const user = await authService.login(email, password)
      return res.status(200).json({user})
    } catch (e) {
      next(e)
    }
  }

  public async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const {email, password} = req.body
      if (!email || !password) {
        throw new BadRequest("An email and a password not provided.")
      }
      const registrationResult = await authService.registration(email, password)
      res.cookie(
          Cookies.AccessToken,
          registrationResult.accessToken,
          accessTokenCookieOptions,
        )
      res.cookie(
        Cookies.RefreshToken,
        registrationResult.refreshToken,
        refreshTokenCookieOptions,
      )
      return res.end()
    } catch (e) {
      next(e)
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const currentRefreshToken = token.verifyRefreshToken(
        req.cookies[Cookies.RefreshToken],
      )
      if (!currentRefreshToken) throw new Unauthorized()
      await authService.logout(currentRefreshToken)
      res.clearCookie(Cookies.AccessToken)
      res.clearCookie(Cookies.RefreshToken)
      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }
  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const currentRefreshToken = token.verifyRefreshToken(
        req.cookies[Cookies.RefreshToken],
      )
      if (!currentRefreshToken) throw new Unauthorized()
      const refreshResult = await authService.refresh(currentRefreshToken)
      res.cookie(
        Cookies.AccessToken,
        refreshResult.accessToken,
        accessTokenCookieOptions,
      )
      if (refreshResult.refreshToken)
        res.cookie(
          Cookies.RefreshToken,
          refreshResult.refreshToken,
          refreshTokenCookieOptions,
        )
      return res.status(200).end()
    } catch (e) {
      next(e)
    }
  }
}

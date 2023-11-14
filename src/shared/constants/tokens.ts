import {CookieOptions} from "express"

export enum TokenExpiration {
  Access = 5 * 60,
  Refresh = 8 * 60 * 60,
  RefreshIfLessThan = 7 * 60 * 60,
}

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  domain: process.env.BASE_URL,
  path: "/",
}

export const refreshTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Refresh * 1000,
}

export const accessTokenCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: TokenExpiration.Access * 1000,
}

import { Role } from "@prisma/client"

export interface IAccessTokenPayload {
  userId: string
  role: Role
}

export interface IAccessToken extends IAccessTokenPayload {
  exp: number
}

export interface IRefreshTokenPayload {
  userId: string
  jti: string
}

export interface IRefreshToken extends IRefreshTokenPayload {
  exp: number
}

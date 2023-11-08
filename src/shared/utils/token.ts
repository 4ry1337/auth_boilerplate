import {User} from "@prisma/client"
import {TokenExpiration} from "../constants/tokens"
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IRefreshToken,
  IAccessToken,
} from "../interfaces/tokens"
import * as jwt from "jsonwebtoken"

export class Token {
  generateAccessToken(payload: IAccessTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: TokenExpiration.Access,
    })
  }

  generateRefreshToken(payload: IRefreshTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: TokenExpiration.Refresh,
    })
  }

  async generateTokens(user: User, jti: string) {
    const accessPayload: IAccessTokenPayload = {
      userId: user.id,
      role: user.role,
    }
    const refreshPayload: IRefreshTokenPayload = {
      userId: user.id,
      jti: jti,
    }

    const accessToken = this.generateAccessToken(accessPayload)
    const refreshToken = this.generateRefreshToken(refreshPayload)

    return {accessToken, refreshToken}
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as IRefreshToken
  }

  verifyAccessToken(token: string) {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as IAccessToken
  }
}

export const token = new Token()
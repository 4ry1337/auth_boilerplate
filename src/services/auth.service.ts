import {v4 as uuidv4} from "uuid"
import bcrypt from "bcrypt"
import {
  BadRequest,
  Forbidden,
  InternalServerError,
  Unauthorized,
} from "../shared/libs/exceptions"
import { sessionRepository, userRepository } from "../database"
import { token } from "../shared/utils/token"
import { IAccessTokenPayload, IRefreshToken, IRefreshTokenPayload } from "../shared/interfaces/tokens"
import { TokenExpiration } from "../shared/constants/tokens"

export default class AuthService {
  public async refresh(currentRefreshToken: IRefreshToken) {
    const user = await userRepository.getUserById(currentRefreshToken.userId)
    if (!user) throw new Unauthorized()
    const accessPayload: IAccessTokenPayload = {
      userId: user.id,
      role: user.role,
    }
    const accessToken = token.generateAccessToken(accessPayload)
    if (!accessToken) {
      throw new InternalServerError("Unable to generate refresh token")
    }
    let refreshToken: string | undefined
    const expiration = new Date(currentRefreshToken.exp * 1000)
    const now = new Date()
    const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000
    if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
      const refreshPayload = {
        jti: currentRefreshToken.jti,
        userId: currentRefreshToken.userId,
      }
      refreshToken = token.generateRefreshToken(refreshPayload)
      if (!refreshToken) {
        throw new InternalServerError("Unable to generate refresh token")
      }
      const session = await sessionRepository.update(
        currentRefreshToken.jti,
        refreshToken,
      )
      if (!session) {
        throw new Unauthorized("Sesssion does not exist")
      }
    }
    return {accessToken, refreshToken}
  }
  public async registration(email: string, password: string) {
    const saltPower = Math.floor(Math.random() * 5) + 4
    const hashPassowrd = await bcrypt.hash(password, saltPower)
    const user = await userRepository.create(email, hashPassowrd)
    if (!user) {
      throw new BadRequest(`User with ${email} already exists`)
    }
    const jti = uuidv4()
    const tokens = await token.generateTokens(user, jti)
    if (!tokens) {
      throw new InternalServerError()
    }
    const session = await sessionRepository.create(
      user.id,
      jti,
      tokens.refreshToken,
    )
    if (!session) {
      throw new Unauthorized(`Unable to login, try again`)
    }
    return tokens
  }
  public async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email)
    if (!user) {
      throw new BadRequest(`User with ${email} not found`)
    }
    const passwordValidation = bcrypt.compareSync(password, user.password)
    if (!passwordValidation) {
      throw new Forbidden(`Invalid login credentials`)
    }
    const jti = uuidv4()
    const tokens = await token.generateTokens(user, jti)
    if (!tokens) {
      throw new InternalServerError("Unable to generate tokens")
    }
    const session = await sessionRepository.create(
      user.id,
      jti,
      tokens.refreshToken,
    )
    if (!session) {
      throw new Unauthorized(`Unable to login, try again`)
    }
    return tokens
  }

  async logout(refreshToken: IRefreshToken) {
    const session = await sessionRepository.delete(refreshToken.jti)
    if (!session) {
      throw new Unauthorized()
    }
  }
}
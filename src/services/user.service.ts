import {userRepository} from "../database"
import {Unauthorized} from "../shared/libs/exceptions"
import bcrypt from "bcrypt"

export default class UserService {
  async deleteUser(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email)
    if (!user) {
      throw new Unauthorized("Invalid credentials")
    }
    const passwordValidation = bcrypt.compareSync(password, user.password)
    if (!passwordValidation) {
      throw new Unauthorized("Invalid credentials")
    }
    return await userRepository.delete(user.id)
  }
  async search(q?: string, p?: number) {
    return await userRepository.search(q, p)
  }
  async updateProfile(bio: string) {}
}

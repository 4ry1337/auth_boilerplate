import { logger } from "../libs/logger/logger"

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.error(
      "Error message from the centralized error-handling component",
      err,
    )
  }
}
export const errorHandler = new ErrorHandler()

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ACCESS_TOKEN_SECRET: string
      readonly REFRESH_TOKEN_SECRET: string
      readonly NODE_ENV: string
      readonly PORT: number
      readonly POSTGRES_PASSWORD: string
      readonly POSTGRES_USER: string
    }
  }
}

export {}

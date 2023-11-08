declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly ACCESS_TOKEN_SECRET: string
      readonly REFRESH_TOKEN_SECRET: string
      readonly NODE_ENV: string
      readonly PORT: number
      readonly POSTGRES_PASSWORD: string
      readonly POSTGRES_USER: string
      readonly MINIO_ENDPOINT: string
      readonly MINIO_ROOT_PASSWORD: string
      readonly MINIO_ROOT_USER: string
      readonly MINIO_ACCESS_KEY: string
      readonly MINIO_SECRET_KEY: string
      readonly MINIO_PORT: number
    }
  }
}

export {}

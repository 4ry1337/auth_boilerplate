import * as Minio from "minio"

const minio = new Minio.Client({
  port: Number(process.env.MINIO_PORT!),
  endPoint: process.env.MINIO_ENDPOINT!,
  accessKey: process.env.MINIO_ACCESS_KEY!,
  secretKey: process.env.MINIO_SECRET_KEY!,
})



export default minio

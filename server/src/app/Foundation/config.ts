export const HOST = process.env.HOST ?? '127.0.0.1'
export const PORT = Number(process.env.PORT ?? 3000)

/**
 * 前端文章域名白名单（逗号分隔），例如：https://blog.example.com
 * 部署时务必通过环境变量配置，只放行自己的前端域。
 */
export const allowedOrigins: string[] = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

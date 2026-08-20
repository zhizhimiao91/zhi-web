module.exports = {
  apps: [
    {
      name: 'zhi-web-api',
      cwd: __dirname,
      script: 'dist/index.js',
      node_args: '--experimental-sqlite',
      instances: 1,
      autorestart: true,
      max_memory_restart: '300M',
      time: true,
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '3000',
        // 只放行自己的前端域名，逗号分隔，例如：https://blog.example.com
        ALLOWED_ORIGINS: '',
      },
    },
  ],
}

module.exports = {
  apps: [
    {
      name: 'frontend-gateway',
      script: 'main.js',
      cwd: './dist/apps/frontend-gateway',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'user-identity',
      script: 'main.js',
      cwd: './dist/apps/user-identity',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'node-blog',
      script    : 'index.js',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_SERVER: 'true',
        NODE_ENV: 'beta'
      },
      env_production : {
        NODE_SERVER: 'true',
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'WEB',
      script    : 'web.js'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '47.98.137.72',
      ref  : 'origin/master',
      repo : 'git@github.com:zhangxiaos/node-blog.git',
      path : '/workspace/node-blog',
      'post-deploy' : 'git pull && npm install && pm2 startOrRestart ecosystem.config.js --env production'
    },
    dev : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};

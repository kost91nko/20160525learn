  const bs = require('browser-sync').create();

  bs.init({
    port: process.env.PORT || 8080,
    ui: { port: Number(process.env.PORT || 8080) + 1 },
    watchOptions: {
        usePolling: true
    },
    server: {
      baseDir: 'public'
    }
  });

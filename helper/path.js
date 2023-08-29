const path = require('path');

/**
 * deprecated -> module.exports = path.dirname(process.mainModule.filename);
 * (mainModule | main) -> app.js entry point of the application
 * (filename) -> current file import or using
 */
module.exports = path.dirname(require.main.filename);

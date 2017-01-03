/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var requireDir = require('require-dir');
var env = process.env.NODE_ENV.trim();

global.staticDir = './webroot';
global.serverPort = 1102;
global.jsEntries = global.staticDir + '/_scripts/rwd-builder.js';
global.jsDistFile = 'bundle.js';
global.jsDistDir = global.staticDir + '/build/js/';

if(env === 'dev') {
  global.debugMode = true;
  global.isWatching = true;
} else if(env === 'publish') {
  global.debugMode = false;
  global.isWatching = false;
} else {
  global.debugMode = false;
  global.isWatching = true;
}
// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });

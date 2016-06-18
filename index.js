/**
 * Created by Alex on 6/18/2016.
 */
var fs = require('fs');
var project_dir = __dirname;
var modules_dir = project_dir + '/node_modules';
var project_pkg = require(project_dir + '/package.json');

Object.keys(project_pkg.dependencies).forEach(function (dep) {
    var module_dir = modules_dir + '/' + dep;
    var pkg = require(module_dir + '/package.json');
    project_pkg.dependencies[dep] = '^' + (pkg.version.split('-')[0]);
});
Object.keys(project_pkg.devDependencies).forEach(function (dep) {
    var module_dir = modules_dir + '/' + dep;
    var pkg = require(module_dir + '/package.json');
    project_pkg.devDependencies[dep] = '^' + (pkg.version.split('-')[0]);
});

fs.writeFileSync(project_dir + '/package.json', JSON.stringify(project_pkg, null, 4));
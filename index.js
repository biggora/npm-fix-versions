/**
 * Created by Alex on 6/18/2016.
 */
var fs = require('fs');
var project_dir = __dirname;
var modules_dir = project_dir + '/node_modules';
var project_pkg;

try {
    project_pkg = require(project_dir + '/package.json');
} catch (e) {
    console.log('It is not project directory ' + project_dir);
    process.exit(1);
}

if (project_pkg.dependencies) {
    Object.keys(project_pkg.dependencies).forEach(function (dep) {
        var module_dir = modules_dir + '/' + dep;
        var pkg = require(module_dir + '/package.json');
        project_pkg.dependencies[dep] = '^' + (pkg.version.split('-')[0]);
    });
}

if (project_pkg.devDependencies) {
    Object.keys(project_pkg.devDependencies).forEach(function (dep) {
        var module_dir = modules_dir + '/' + dep;
        var pkg = require(module_dir + '/package.json');
        project_pkg.devDependencies[dep] = '^' + (pkg.version.split('-')[0]);
    });
}

if (project_pkg.optionalDependencies) {
    Object.keys(project_pkg.optionalDependencies).forEach(function (dep) {
        var module_dir = modules_dir + '/' + dep;
        var pkg = require(module_dir + '/package.json');
        project_pkg.optionalDependencies[dep] = '^' + (pkg.version.split('-')[0]);
    });
}

fs.writeFileSync(project_dir + '/package.json', JSON.stringify(project_pkg, null, 4));
#!/usr/bin/env node
/**
 * Created by Alex on 6/18/2016.
 */
var fs = require('fs');

exports.scan = function (projectDir) {
    var project_dir = projectDir || __dirname;
    var modules_dir = project_dir + '/node_modules';
    var project_pkg;

    try {
        project_pkg = require(project_dir + '/package.json');
    } catch (e) {
        console.log('ERR: This is not project directory ' + project_dir);
        process.exit(1);
    }

    if (project_pkg.dependencies) {
        Object.keys(project_pkg.dependencies).forEach(function (dep) {
            var module_dir = modules_dir + '/' + dep;
            try {
                var pkg = require(module_dir + '/package.json');
                project_pkg.dependencies[dep] = '^' + (pkg.version.split('-')[0]);
            } catch(e) {
                console.log('WARN: module ' + dep, 'in dependencies not found in node_modules');
            }
        });
    }

    if (project_pkg.devDependencies) {
        Object.keys(project_pkg.devDependencies).forEach(function (dep) {
            var module_dir = modules_dir + '/' + dep;
            try {
                var pkg = require(module_dir + '/package.json');
                project_pkg.devDependencies[dep] = '^' + (pkg.version.split('-')[0]);
            } catch(e) {
                console.log('WARN: module ' + dep, 'in devDependencies not found in node_modules');
            }
        });
    }

    if (project_pkg.optionalDependencies) {
        Object.keys(project_pkg.optionalDependencies).forEach(function (dep) {
            var module_dir = modules_dir + '/' + dep;
            try {
                var pkg = require(module_dir + '/package.json');
                project_pkg.optionalDependencies[dep] = '^' + (pkg.version.split('-')[0]);
            } catch(e) {
                console.log('WARN: module ' + dep, 'in optionalDependencies not found in node_modules');
            }
        });
    }

    fs.writeFileSync(project_dir + '/package.json', JSON.stringify(project_pkg, null, 4));
};

// allow normal node loading if appropriate
if (!module.parent) {
    exports.scan();
}
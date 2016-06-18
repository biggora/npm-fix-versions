/**
 * Created by Alex on 6/18/2016.
 */
var fs = require('fs');
var chai = require('chai');
var testDir = __dirname + '/tmp';
var packageJSON;

chai.should();
process.chdir(testDir);

function loadPackageJSON(){
    return require(testDir + '/package.json')
}

function savePackageJSON(){
    fs.writeFileSync(testDir + '/package.json', JSON.stringify(packageJSON, null, 4));
}

describe('NPM Fix Versions:', function () {

    before(function (done) {
        packageJSON = loadPackageJSON();
        done();
    });

    after(function (done) {
        Object.keys(packageJSON.dependencies).forEach(function (dep) {
            packageJSON.dependencies[dep] = "*";
        });
        Object.keys(packageJSON.devDependencies).forEach(function (dep) {
            packageJSON.devDependencies[dep] = "*";
        });
        Object.keys(packageJSON.optionalDependencies).forEach(function (dep) {
            packageJSON.optionalDependencies[dep] = "*";
        });
        savePackageJSON();
        done();
    });

    it('before all versions should be asterix', function () {
        packageJSON.dependencies.a.should.eql('*');
        packageJSON.dependencies.b.should.eql('*');
        packageJSON.devDependencies.c.should.eql('*');
    });

    it('after all versions should be changed', function () {
        require('../index').scan(testDir);
        packageJSON.dependencies.a.should.eql('^0.0.20');
        packageJSON.dependencies.b.should.eql('^0.0.10');
        packageJSON.devDependencies.c.should.eql('^1.0.0');
    });

});

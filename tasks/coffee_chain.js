(function() {
  "use strict";
  module.exports = function(grunt) {
    var fileFinder, generateList, validFiles;
    fileFinder = require('./lib/file_finder').init(grunt);
    grunt.registerMultiTask("coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", function() {
      var options;
      options = this.options({
        dest: 'dist',
        compile: false,
        clean: false,
        keyword: '#= require',
        dirKeyword: '#= require_tree',
        separator: grunt.util.linefeed
      });
      return this.files.forEach(function(f) {
        var src;
        src = f.src.filter(function(filepath) {
          return validFiles(filepath);
        }).map(function(filepath) {
          generateList(filepath, f.dest, options);
          return grunt.file.read(filepath);
        }).join(options.separator);
        grunt.file.write(f.dest, src);
        return grunt.log.writeln("File \"" + f.dest + "\" created.");
      });
    });
    validFiles = function(filepath) {
      var file_exists;
      file_exists = grunt.file.exists(filepath);
      if (!file_exists) {
        grunt.log.warn("Source file \"" + filepath + "\" not found.");
      }
      return file_exists;
    };
    return generateList = function(filepath, dest, options) {
      var params;
      params = {
        src: grunt.file.read(filepath),
        keyword: options.keyword,
        dirKeyword: options.dirKeyword,
        dest: dest
      };
      grunt.log.writeln("Files: ", filepath, fileFinder.requiredFiles(params));
      return grunt.log.writeln("Dirs : ", filepath, fileFinder.requiredDirs(params));
    };
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/
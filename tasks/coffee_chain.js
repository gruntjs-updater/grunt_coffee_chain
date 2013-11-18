(function() {
  "use strict";
  module.exports = function(grunt) {
    return grunt.registerMultiTask("coffee_chain", "grunt's plugin to concat coffeescripts using include derective", function() {
      var clean, compile, dest, options, root, staging;
      options = this.options({
        punctuation: ".",
        separator: ", "
      });
      dest = options.dest || 'dist';
      staging = options.staging || '.tmp';
      root = options.root || 'app';
      compile = options.compile || true;
      clean = options.clean || true;
      return this.files.forEach(function(f) {
        var src;
        src = f.src.filter(function(filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn("Source file \"" + filepath + "\" not found.");
            return false;
          } else {
            return true;
          }
        }).map(function(filepath) {
          return grunt.file.read(filepath);
        }).join(grunt.util.normalizelf(options.separator));
        src += options.punctuation;
        grunt.file.write(f.dest, src);
        return grunt.log.writeln("File \"" + f.dest + "\" created.");
      });
    });
  };

}).call(this);

/*
//@ sourceMappingURL=coffee_chain.js.map
*/
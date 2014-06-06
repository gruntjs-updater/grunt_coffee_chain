#= require ./lib/compiler

module.exports = (grunt) ->
  compiler = new root.Compiler(grunt)
  grunt.registerMultiTask "coffeeChain", "grunt's task for concatenating CoffeeScript files that have 'require' directive in correct order", ->
    @files.done = this.async()
    compiler.proceed(@files)







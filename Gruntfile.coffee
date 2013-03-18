module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    regarde:
      coffee:
        files: ['coffee/**/*.coffee']
        tasks: 'coffee'

    coffee:
      compile:
        files: [
          expand: true
          cwd: 'coffee/'
          src: ['**/*.coffee']
          dest: './'
          ext: '.js'
        ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-regarde'

  grunt.registerTask 'default', ['regarde']

  grunt.event.on 'regarde:file:changed', (action, file)->
    console.log "#{file} has changed."
    

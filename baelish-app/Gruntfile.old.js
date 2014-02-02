module.exports = function(grunt) {
  var debug = true;
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dev: {
        files: {
          'build/public/app.js': ['build/app/client.js']
        },
        options: {
          debug: debug
        }
      }
    },
    hogan: {
      dev: {
        files: {
          'build/app/templates.js': ['app/templates/**/*.hjs']
        },
        options: {
          commonJsWrapper: true,
          prettify: true,
          defaultName: function(filename) {
            return filename.replace('.hjs', '').replace('app/templates/', '');
          }
        }
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, src: ['app/**'], dest: 'build/'}
        ]
      }
    },
    watch: {
      dev: {
        files: ['app/**/*.js', 'app/**/*.hjs'],
        tasks: ['dev']
      }
    },
    uglify: {
      client: {
        files: {
          'build/public/app.min.js': ['build/public/app.js']
        }
      }
    },
    minifyify: {
      client: {
        src: 'build/public/app.js',
        dest: 'build/public/app.min.js',
        map: 'build/public/app.min.map.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-hogan');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var minifyify = require('minifyify');
  var fs = require('fs');
  grunt.registerMultiTask('minifyify',
      'Minify your browserify bundle without losing the sourcemap', function()
  {
    var namespace = this.name+'.'+this.target;

    // Fetch configuration data
    this.requiresConfig(namespace+'.src', namespace+'.dest', namespace+'.map');

    var src  = grunt.config(namespace+'.src');
    var dest = grunt.config(namespace+'.dest');
    var map  = grunt.config(namespace+'.map');

    var options = grunt.config('options');

    // Run minifyify
    var done = this.async();

    var readStream  = fs.createReadStream(src);
    var writeStream = fs.createWriteStream(dest);

    readStream.on('open', function()
    {
      readStream.pipe(minifyify(options)).pipe(writeStream);
    });

    readStream.on('error', function(error)
    {
      grunt.log.writeln(error);
      done(false);
    });

    writeStream.on('finish', function()
    {
      done();
    });
  });

  grunt.registerTask('default', ['copy', 'hogan', 'browserify']);
  grunt.registerTask('dev', ['copy:dev', 'hogan:dev', 'browserify:dev', 'uglify:client']);
};
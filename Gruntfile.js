module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.initConfig({
        aws: grunt.file.readJSON('aws-keys.json'), // Read the file

        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
                secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
                region: 'eu-west-1',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5, // 5 simultaneous downloads
                copyConcurrency: 5,
                displayChangesOnly: true,
                progress: 'progressBar',
                maxRetries: 10
            },

            backup: {
                options: {
                    bucket: 'photosync.benfield.design',
                    differential: true, // Only uploads the files that have changed
                    debug: false,
                },
                files: [{
                    expand: true,
                    cwd: '../Repo/2019',
                    src: ['**'],
                    dest: 'Repo/2019',
                    stream: true
                }]
            }
        }
    })

    // Actually load this plugin's task(s).
    grunt.loadTasks('./tasks');

    // grunt.registerTask('default', ['clean', 'copy', 'create_bucket', 'aws_s3:test_local', 'mochaTest']);
    grunt.registerTask('default', ['aws_s3:backup']);

}

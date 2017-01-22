/*
    Unit Testing
*/
module.exports = function (gulp, plugin, config) {
        

        function runTest( done ) {

            var server = new plugin.karma.Server( {
                configFile: __dirname.replace('gulpfile.js\\task', 'karma.conf.js'),
                singleRun: true,
                autoWatch: false
            }, function( failCount) {
                console.log( failCount );
                if ( failCount ) {
                    plugin.notifier.notify( {
                      title: 'Unit test failed',
                      message: failCount + ' test' + (failCount > 1 ? 's' : '') + ' failed while running karma.\nCheck the command line',
                      sound: false // Only Notification Center or Windows Toasters
                    } );
                }
                done();
            } );

            server.start();

            return server;
        }

    return function ( done ) {
        plugin.glob( config.glob.test , {}, function( err, files ) {
            if ( files.length > 0 ) {
                runTest( done );
            } else {
                done();
            }
        } )
       
    };
};
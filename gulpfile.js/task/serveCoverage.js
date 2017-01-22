

module.exports = function( gulp, plugin, config ) {

    return function() {

        plugin.browserSync.init( {
            notify: false,
            online: false,
            server: {
                baseDir: './coverage/PhantomJS 1.9.8 (Windows 8 0.0.0)'
            }
        } );
    };
};
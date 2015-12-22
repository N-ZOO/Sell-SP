requirejs.config({
    baseUrl: '/scripts',
    paths: {
        module: 'module',
        page: 'page/admin',
        libs: '../libs',
        jquery: '../libs/jquery/dist/jquery',
        marked: '../libs/marked/lib/marked',
        simditor:'../libs/simditor/lib/simditor'
    },
    shim: {
        'libs/bootstrap/dist/js/bootstrap.min': ['jquery'],
        'libs/metisMenu/dist/metisMenu.min': ['jquery'],
        'module/editor-markdown': ['marked', 'libs/editor/vendor/codemirror', 'libs/editor/src/intro'],
        'simditor':['jquery','libs/simple-module/lib/module','libs/simple-hotkeys/lib/hotkeys','libs/simple-uploader/lib/uploader']
    },
    map: {
        '*': {
            css: 'libs/require-css/css'
        },
        'libs/pace/pace.min': {
            pace: 'libs/pace/pace.min'
        }
    }
});

require(['page/base']);
define(function (require, exports, module) {
    require('libs/bootstrap/dist/js/bootstrap.min');
    //--------------------------------------------------【第三方iconFont】
    require('css!libs/font-awesome/css/font-awesome.min.css');

    //--------------------------------------------------【页面加载状态】
    require('css!libs/pace/themes/blue/pace-theme-minimal.css');
    var pace = require('libs/pace/pace.min');
    pace.start({
        document: false
    });

    //--------------------------------------------------【侧栏导航管理】
    require('libs/metisMenu/dist/metisMenu.min');

    //侧栏收缩
    $('#side-menu').metisMenu();

    //--------------------------------------------------【title提示框美化】
    $('[data-toggle="tooltip"]').tooltip();

    //--------------------------------------------------【自适应布局】
    $(window).on('resize', function () {
        var topOffset = 50,
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100;
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $('#page-wrapper').css('min-height', (height) + 'px');
        }
    }).trigger('resize');

    //--------------------------------------------------【根据url展开侧栏导航】

    var url = window.location;
    $('#side-menu a').filter(function () {
        return this.href == url || url.href.indexOf(this.href) == 0;
    })
        .last().addClass('active')
        .parents('li').addClass('active');

});

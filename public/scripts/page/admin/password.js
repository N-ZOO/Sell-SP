define(function (require, exports, module) {
    require('jquery');

    //--------------------------------------------------【表单校验】
    var Verifyfrom=require('module/verifyfrom');

    var verifyfrom=new Verifyfrom({
        isBlurVerify:true,
        succeed:function(elm){
            $(elm).parent().addClass('has-success').removeClass('has-error').find('.text-danger').remove();
        },
        failure:function(elm,errorMsg){
            $(elm).parent().addClass('has-error').removeClass('has-success')
                .find('.text-danger').remove().end()
                .append('<p class="text-danger">'+errorMsg+'</p>');
        }
    });

    verifyfrom.add($('#passwordOld')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'请输入原密码'
    }]);

    verifyfrom.add($('#passwordNew1')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'请输入新密码'
    }]);

    verifyfrom.add($('#passwordNew2')[0],[{
        strategy:'isNoEmpty',
        errorMsg:'请再次输入新密码'
    }]);

    $('#submitBtn').on('click', function () {
        if(!verifyfrom.start()){
            return false;
        }
        if($('#passwordNew1').val()!==$('#passwordNew2').val()){
            verifyfrom.failure($('#passwordNew2'),'密码输入不一致');
            return false;
        }

        $.ajax({
            type: "POST",
            url: "/admin/system/password",
            async: true,
            dataType: "json",
            data: $('#passwordForm').serialize(),
            success: function (data) {
                if (!data.resultCode) {
                    alert(data.resultMsg);
                    return false;
                }
                alert(data.resultMsg);
                location.href='/admin/login'
            }
        });
    });
});
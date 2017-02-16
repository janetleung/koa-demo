var vm = new Vue({
    el: '.main',
    data: {
        username: 'Email/Telephone',
        password_fir: '',
        password_re: '',
        password1: '',
        password2: 'password',
        button: '提交注册',
        action: '/register',
        judge: true,
        tip_username: '',
        tip_password: '',
    },
    methods: {
        login: function () {
            vm.button = '登录';
            vm.action = '/login';
            vm.password1 = 'password';
            vm.password2 = '';
            vm.judge = false;
            vm.tip_username = '';
            vm.tip_password = '';
            vm.password_re = '';
            vm.password_fir = '';
        },
        register: function () {
            vm.button = '提交注册';
            vm.action = '/register';
            vm.password1 = '';
            vm.password2 = 'password';
            vm.judge = true;
            vm.tip_username = '';
            vm.tip_password = '';
            vm.password_re = '';
            vm.password_fir = '';
        },
        unique_username: function () {
            vm.tip_username = '';
            if (vm.judge === true) {
                var jqXHR = $.ajax({
                    url: '/query',
                    type : 'POST',
                    dataType: 'json',
                    data : {username : vm.username},
                    success : function (result) {
                        if (result.query === false) {
                            vm.tip_username = result.text;
                        }
                    },
                    error: function (e) {
                         vm.tip_username = '出现未知错误，请稍后重试！';
                    },
                    complete : function () {

                    },
                });
            }
        },//用户名查重
        same_password: function () {
            vm.tip_password = '';
            if (!(vm.password_fir === vm.password_re)) {
                vm.tip_password = '两次输入的密码必须一致！';
            }
        },
        submit: function (e) {
            if (vm.judge === true) {
                if (!(vm.password_fir === vm.password_re)) {
                    vm.tip_password = '两次输入的密码必须一致！';
                    e.preventDefault();
                    return;
                } else {
                    return true;
                }
            }
        },
    }
})

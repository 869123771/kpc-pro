import menu from './constant/menu'
export default {
    menu,
    SUCCESS: 200,
    tablePageInfo : {
      datas : [],
      totalRows : 0,
      pageNum : 1,
      pageSize : 10,
      opts : [10,20,30,40],
      loading : true
    },
    errorTip: {
        userNameTip: '3到16位非特殊字符',
        passwordTip: '最少6位,至少1个大写字母,1个小写字母,1个数字,1个特殊字符',
        confirmPasswordTip: '2次密码不一致',
        phoneNumberTip : '输入合法的手机号'
    },
    regPattern: {
        userNamePattern: /^[a-zA-Z_-]{3,16}$/,
        passwordPattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
        phoneNumberPattern : /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
    },
    config : {
        /**
         * @description 配置显示在浏览器标签的title
         */
        title: 'iView-admin',
        /**
         * @description token在Cookie中存储的天数，默认1天
         */
        cookieExpires: 1,
        /**
         * @description 是否使用国际化，默认为false
         *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
         *              用来在菜单中显示文字
         */
        useI18n: true,
        /**
         * @description api请求基础路径
         */
        baseUrl: {
            dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
            pro: 'https://produce.com'
        },
        /**
         * @description 默认打开的首页的路由name值，默认为home
         */
        homeName: 'home',
        loginName : 'login',
        avatarLocation : 'http://111.230.157.133:8081/static/avatar/'
    }
}


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

// 使用 router.beforeEach 注册一个全局前置守卫
router.beforeEach((to, from, next) => {
    // to 要去的路由; from 来自哪里的路由 ; next() 放行
    // 给登录用户初始化菜单
    // 用户登录成功时，把 token 存入 sessionStorage，如果携带 token，初始化菜单，放行
    if (window.sessionStorage.getItem('tokenStr')) {
        initMenu(router, store)
        next()
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

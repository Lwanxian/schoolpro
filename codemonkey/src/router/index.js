import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import Index from "../components/index.vue";
import Reg from "../components/reg.vue";
import Login from "../components/login.vue";
import Forget from "../components/forget.vue";
import Info from "../components/info.vue";
import Comment from "../components/comment.vue";
import Publish from "../components/publish.vue";
const routes = [{
        path: '/',
        name: 'index',
        component: Index,
        beforeEnter: (to, from, next) => {
            console.log(to, from);
            if (!sessionStorage.getItem("login")) {
                next("/login")
            } else {
                next();
            }

        }
    },
    {
        path: '/reg',
        name: 'reg',
        component: Reg,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/forget',
        name: 'forget',
        component: Forget,
    },
    {
        path: '/info',
        name: 'info',
        component: Info,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem("login")) {
                next("/login")
            } else {
                next();
            }
        }
    },
    {
        path: '/comment',
        name: 'comment',
        component: Comment,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem("login")) {
                next("/login")
            } else {
                next();
            }
        }
    },
    {
        path: '/publish',
        name: 'publish',
        component: Publish,
        beforeEnter: (to, from, next) => {
            if (!sessionStorage.getItem("login")) {
                next("/login")
            } else {
                next();
            }
        }
    }
]
const router = new VueRouter({
    routes,
    mode: "history",
})

export default router
"use strict";
exports.__esModule = true;
var vue_router_1 = require("vue-router");
var userLayout_vue_1 = require("@/layouts/userLayout.vue");
var MenuLayout_vue_1 = require("@/layouts/MenuLayout.vue");
var routes = [
    {
        path: '/',
        component: MenuLayout_vue_1["default"],
        redirect: '/',
        children: [
            {
                path: '/',
                name: 'Home',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "首页" */ '../views/home/index.vue'); }); }
            },
            {
                path: '/customer',
                name: 'Customer',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "customer" */ '../views/user/customer/index.vue'); }); }
            },
            {
                path: '/admin',
                name: 'Admin',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "admin" */ '../views/user/admin/index.vue'); }); }
            },
            {
                path: '/myinfo',
                name: 'Myinfo',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "myinfo" */ '../index.vue'); }); }
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "about" */ '../views/About.vue'); }); }
    },
    {
        path: '/login',
        component: userLayout_vue_1["default"],
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'Login',
                component: function () { return Promise.resolve().then(function () { return require(/* webpackChunkName: "Login" */ '../views/user/login/index.vue'); }); }
            }
        ]
    },
];
var router = vue_router_1.createRouter({
    history: vue_router_1.createWebHashHistory(),
    routes: routes
});
exports["default"] = router;

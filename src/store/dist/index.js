"use strict";
exports.__esModule = true;
var vuex_1 = require("vuex");
var index_1 = require("./modules/admin/index");
exports["default"] = vuex_1.createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        admin: index_1["default"]
    }
});

//default
import Vue from "vue";
import Router from "vue-router"

Vue.use(Router)

// Pages
import Home from '@/pages/Home'
import NotFound from '@/pages/404'
import Users from '@/pages/Users'

//Routering
export default new Router({
    //mode: 'history',//delete hash #
    routes: [
        {
            path: '/',//default page
            name: 'home',
            component: Home
        },
        {
            path: '*',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '/users',
            name: 'users',
            component: Users
        }
    ]
})
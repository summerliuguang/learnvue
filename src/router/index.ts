import { createRouter, createWebHistory } from 'vue-router'

import mainhomepage from '@/views/mainhomepage.vue'
import gamepage from '@/views/gamepage.vue'
import toolpage from '@/views/toolpage.vue'
import investigatepage from '@/views/investigatepage.vue'
import camera from '@/components/camera.vue'
import poemlist from '@/views/poemlist.vue'
import userdata from '@/views/userdata.vue'
import news from '@/views/news.vue'
import querydetail from '@/views/querydetail.vue'
import paramsdetail from '@/views/paramsdetail.vue'
import propsdetail from '@/views/propsdetail.vue'
import game2048 from '@/components/game2048.vue'
import signup from '@/views/signup.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            name: 'home',
            path: '/home',
            component: mainhomepage
        },

        {
            name: 'game',
            path: '/game',
            component: gamepage,
            redirect: '/game/2048',
            children: [
                {
                    path: '2048',
                    component: game2048
                }
            ]
        },
        {
            name: 'tool',
            path: '/tool',
            component: toolpage,
            redirect: '/tool/camera',
            children: [
                {
                    path: 'camera',
                    component: camera
                }
            ]
        },
        {
            name: 'investigate',
            path: '/investigate',
            redirect: '/investigate/userdata',
            component: investigatepage,
            children: [
                {
                    path: 'poemlist',
                    component: poemlist
                },
                {
                    path: 'userdata',
                    component: userdata
                },
                {
                    path: 'signup',
                    component: signup
                },
                {
                    path: 'news',
                    component: news,
                    children: [
                        {
                            path: 'querydetail',
                            component: querydetail,
                            props(route) {
                                return route.query
                            }
                        },
                        {
                            name: 'paramsdetail',
                            path: 'paramsdetail/:id?/:title/:content',
                            component: paramsdetail

                        },
                        {
                            name: 'propsdetail',
                            path: 'propsdetail/:id?/:title/:content',
                            component: propsdetail,
                            props: true
                        }
                    ]
                },
            ]
        }
    ]
})

export default router
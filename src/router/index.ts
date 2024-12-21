import { createRouter, createWebHistory } from 'vue-router'

import person from '@/components/person.vue'
import news from '@/views/news.vue'
import camera from '@/views/camera.vue'
import querydetail from '@/views/querydetail.vue'
import paramsdetail from '@/views/paramsdetail.vue'
import propsdetail from '@/views/propsdetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: person
        },
        {
            path: '/news',
            component: news,
            children: [
                {
                    path: 'querydetail',
                    component: querydetail,
                    props(route){
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
                    props:true
                },
                {
                    path:'/',
                    redirect:'/home'
                }
            ]
        },
        {
            name: 'cameratest',
            path: '/cameratest',
            component: camera
        }
    ]
})

export default router
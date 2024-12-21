import { createRouter, createWebHistory } from 'vue-router'

import person from '@/components/person.vue'
import news from '@/views/news.vue'
import about from '@/views/about.vue'
import newsarticle from '@/views/newsarticle.vue'
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
                    path: 'newsarticle',
                    component: newsarticle,
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
            name: 'guanyu',
            path: '/about',
            component: about
        }
    ]
})

export default router
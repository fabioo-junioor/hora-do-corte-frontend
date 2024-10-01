import { createRouter, createWebHistory } from 'vue-router';
import { Home, LoginUser, 
        CadUser, HomeUser, 
        EditUser, EditPasswordUser,
        EditProfessional } from '../pages';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/:nameUser',
        name: 'homeUser',
        component: HomeUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/loginUser',
        name: 'loginUser',
        component: LoginUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/cadUser',
        name: 'cadUser',
        component: CadUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/editUser',
        name: 'editUser',
        component: EditUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/editPasswordUser',
        name: 'editPasswordUser',
        component: EditPasswordUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/editProfessional',
        name: 'editProfessional',
        component: EditProfessional,
        beforeEnter: (_, __, next) => {
            next();
            return;
            
        }
    },
    {
        path: '/:pathMatch(.*)',
        name: 'home',
        component: Home,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'vue-school-active-link'
});

export default router;
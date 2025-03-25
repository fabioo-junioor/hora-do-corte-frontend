import { createRouter, createWebHistory } from 'vue-router';
import { Home, LoginUser, CadUser, RecoverPassUser, HomeUser, 
        EditUser, EditPasswordUser,
        EditProfessional, Reservations,
        CheckoutBuyPlan, Dashboard,
        NotFound, NotFoundUser } from '../pages';
import { getDataUser } from '../services/storage/settingSession.js';

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
            let dataUser = getDataUser();
            if(!!dataUser?.token){
                next('/reservations');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/cadUser',
        name: 'cadUser',
        component: CadUser,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!!dataUser?.token){
                next('/reservations');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/recoverPassUser',
        name: 'recoverPassUser',
        component: RecoverPassUser,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!!dataUser?.token){
                next('/reservations');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/reservations',
        name: 'reservations',
        component: Reservations,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
               next('/');
               return; 

            };
            next();
            return;

        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
                next('/');
                return;
                
            }
            next();
            return;

        }
    },
    {
        path: '/editUser',
        name: 'editUser',
        component: EditUser,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
                next('/');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/editPasswordUser',
        name: 'editPasswordUser',
        component: EditPasswordUser,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
                next('/');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/editProfessional',
        name: 'editProfessional',
        component: EditProfessional,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
                next('/');
                return;

            };
            next();
            return;
            
        }
    },
    {
        path: '/checkoutBuyPlan',
        name: 'checkoutBuyPlan',
        component: CheckoutBuyPlan,
        beforeEnter: (_, __, next) => {
            let dataUser = getDataUser();
            if(!dataUser?.token){
                next('/');
                return;

            };
            next();
            return;

        }
    },
    {
        path: '/notFoundUser',
        name: 'notFoundUser',
        component: NotFoundUser,
        beforeEnter: (_, __, next) => {
            next();
            return;

        }
    },
    {
        path: '/:pathMatch(.*)',
        name: 'notFound',
        component: NotFound,
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
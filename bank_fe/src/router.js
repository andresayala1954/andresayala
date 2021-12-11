import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Account from './components/Account.vue'
import Transaction from './components/Transaction.vue'
import Caminata_Ecologica from './components/Caminata_Ecologica.vue'
import Explora_nuestra_naturaleza from './components/Explora_nuestra_naturaleza.vue'
import Explora_lugares_reconditos from './components/Explora_lugares_reconditos.vue'
import Lugares_paradisiacos from './components/Lugares_paradisiacos.vue'
import Registrar_plan from './components/Registrar_plan'

const routes = [{
        path: '/user/logIn',
        name: "logIn",
        component: LogIn,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/home',
        name: "home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/account',
        name: "account",
        component: Account,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/caminata_ecologica',
        name: "caminata_ecologica",
        component: Caminata_Ecologica,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/explora_nuestra_naturaleza',
        name: "explora_nuestra_naturaleza",
        component: Explora_nuestra_naturaleza,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/explora_lugares_reconditos',
        name: "explora_lugares_reconditos",
        component: Explora_lugares_reconditos,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/lugares_paradisiacos',
        name: "lugares_paradisiacos",
        component: Lugares_paradisiacos,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/registrar_plan',
        name: "registrar_plan",
        component: Registrar_plan,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/transaction',
        name: "transaction",
        component: Transaction,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://mision-tic-api-gateway.herokuapp.com/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate({
            mutation: gql `
                mutation ($refresh: String!) {
                    refreshToken(refresh: $refresh) {
                        access
                    }
                }
            `,
            variables: {
                refresh: localStorage.getItem("token_refresh"),
            },
        })

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch {
        localStorage.clear();
        alert("Su sesión expiró, por favor vuelva a iniciar sesión");
        return false;
    }
}

router.beforeEach(async(to, from) => {
    var is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) return true
    if (is_auth) return { name: "home" };
    return { name: "logIn" };
})

export default router;
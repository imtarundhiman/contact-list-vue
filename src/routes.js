import VueRouter from "vue-router";
// routes 
let routes = [
    {
        path: "/",
        component: require("./components/HomeComponent.vue").default,
        meta: { pageName: 'Contacts' }
    },
    {
        path: "/detail/:userId",
        component: require("./components/UserDetailComponent.vue").default,
        meta: { pageName: 'Contact Details' }
    },
    {
        path: "/favourites",
        component: require("./components/FavouritesComponent.vue").default,
        meta: { pageName: 'Favourites' }
    },
];

export default new VueRouter({
  routes,
  linkActiveClass: "active"
});

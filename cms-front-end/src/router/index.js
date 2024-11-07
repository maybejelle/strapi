import { createRouter, createWebHistory } from "vue-router";
import DeviceOverview from "../presentation/views/DeviceOverview.vue";
import LoginPage from "../presentation/views/LoginPage.vue";
import HomePage from "../presentation/views/HomePage.vue";
import LocationOverview from "../presentation/views/LocationOverview.vue";
import RegisterPage from "../presentation/views/RegisterPage.vue";
import SettingsPage from "../presentation/views/SettingsPage.vue";
import ChangePassword from "../presentation/views/ChangePassword.vue";



const routes = [ 
  { path: "/device-overview/:id", component: DeviceOverview}, // Dynamic route for device overview
  { path: "/", component: LoginPage}, // Route for the home page},
  {path : "/homePage", component: HomePage},
  {path:"/myHome", component: LocationOverview},
  {path: '/register', component: RegisterPage},
  {path:"/settings", component: SettingsPage},
  {path:"/changePassword", component: ChangePassword},
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

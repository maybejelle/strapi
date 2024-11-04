import { createRouter, createWebHistory } from "vue-router";
import DeviceOverview from "@/components/DeviceOverview.vue"; // Adjust the path as needed
import HomePage from "../components/HomePage.vue"; // Adjust the path as needed
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import LocationOverview from "@/components/LocationOverview.vue";
import SettingsPage from "../components/SettingsPage.vue";
import ChangePassword from "../components/ChangePassword.vue";


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

import { createRouter, createWebHistory } from "vue-router";
import DeviceOverview from "@/components/DeviceOverview.vue"; // Adjust the path as needed
import HomePage from "../components/HomePage.vue"; // Adjust the path as needed


const routes = [ 
  { path: "/device-overview/:id", component: DeviceOverview}, // Dynamic route for device overview
  { path: "/", component: HomePage}, // Route for the home page},
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { defineStore } from "pinia";


export const useAuthenticatedStore = defineStore('authenticated', {
    state: () => ({
        userIsAuthenticated:false
    }),
    actions:{
        authenticateOrLogoutUser(status){
            this.userIsAuthenticated = status;
        }
    }

})
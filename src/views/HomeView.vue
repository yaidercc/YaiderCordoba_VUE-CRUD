<script>
import { renovateToken,deleteToken } from "@/logic/auth";
export default {
    beforeCreate() {

            renovateToken(localStorage.getItem("token"))
            .catch(errr=>{
                this.$router.push("/login");
            })
        
    },
    methods: {
        logout(){
            deleteToken();
            this.$router.push("/login");
        }
    }
}
</script>

<template>
    <h1>HOME</h1>
    <button @click="logout">Hola</button>
</template>

<style scoped>

</style>

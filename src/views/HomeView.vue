<script>
import { renovateToken, deleteToken, getProductsByUser } from "@/logic/auth";
export default {
    data: () => ({
        products: [],
    }),
    beforeCreate() {
        renovateToken(localStorage.getItem("token"))
            .catch(resp => {
                this.$router.push("/login");
            })
    },
    mounted() {
        // ESTABA TRAYENDO LOS PRODUCTOS DE UN USUARIO ESPECIFICO
        renovateToken(localStorage.getItem("token"))
            .then(resp => {
                const { token, usuario } = resp.data;
                const { id } = usuario;
                localStorage.setItem("token", token);
                getProductsByUser(id).
                    then(response => {
                        this.products = response.data.producto
                        console.log(this.products)
                    })  
            })
            .catch(err => {
                console.log(err);
                // this.$router.push("/login");
            })
    },

    methods: {
        logout() {
            deleteToken();
            this.$router.push("/login");
        },


    }
}
</script>

<template>
    <h1>HOME</h1>
    <button @click="logout">Hola</button>
    <p>{{ this.products }}</p>
</template>

<style scoped>

</style>

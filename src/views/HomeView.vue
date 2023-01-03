<script>
import { renovateToken, deleteToken, getProductsByUser } from "@/logic/auth";
export default {
    data: () => ({
        productos: [],
    }),
    beforeCreate: async () => {
        try {
            const resp = await renovateToken(localStorage.getItem("token"));
            const { token, usuario } = resp.data;
            const { id } = usuario;
            localStorage.setItem("token",token);
            getProductsByUser(id).
                then(response => {
                    console.log(response);
                })
        } catch (error) {
            console.log(error);
            this.$router.push("/login");
        }

    },

    methods: {
        logout() {
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

<script>
import { renovateToken, deleteToken, getProductsByUser,createProduct } from "../services/services";
import NavigationComponent from "../components/Navigation.vue";
import FormComponent from "../components/Form.vue";

export default {
    data: () => ({
        products: [],
        nombre: '',
        showModal:false,
        id_user:'',
    }),
    beforeCreate() {
        renovateToken(localStorage.getItem("token"))
            .catch(resp => {
                this.$router.push("/login");
            })
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        logout() {
            deleteToken();
            this.$router.push("/login");
        },
        handleEvent() {
            this.showModal=true;
        },
        addProduct({nombre,precio,imagen}){
            createProduct(nombre,precio,imagen,this.id_user)
            .then(resp=>{
                if(resp.data.ok){
                    this.getProducts();
                }
            })
        },
        getProducts(){
            renovateToken(localStorage.getItem("token"))
            .then(resp => {
                const { token, usuario } = resp.data;
                const { id, nombre } = usuario;
                this.nombre = nombre;
                this.id_user=id
                // localStorage.setItem("token", token);
                getProductsByUser(id).
                    then(response => {
                        this.products = response.data.producto
                        console.log(this.products)
                    })
            })
            .catch(err => {
                this.$router.push("/login");
            })
        }
    },
    name: 'HomeComponent',
    components: {
        NavigationComponent,
        FormComponent
    }
}
</script>

<template>
    <NavigationComponent nombre="yaidercc" v-on:custom-event="handleEvent" />
    <FormComponent v-on:custom-event="addProduct"/>
    <h1>HOME</h1>

    <div v-for="(value, key) in this.products">
        <p>Nombre: {{ value.nombre }}</p>
        <p>Precio: {{ value.precio }}</p>
        <p>Calificacion: {{ value.calificacion }}</p>
    </div>

</template>

<style scoped>

</style>

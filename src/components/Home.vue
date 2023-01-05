<script>
import { renovateToken, deleteToken, getProductsByUser, createProduct, updateProduct, deleteProduct } from "../services/services";
import NavigationComponent from "../components/Navigation.vue";
import FormComponent from "../components/Form.vue";

export default {
    data: () => ({
        products: [],
        nombre: '',
        showModal: false,
        id_user: '',
        isUpdating: false,
        dataProductToEdit: {}
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
            this.showModal = !this.showModal;
        },
        manageProduct({ nombre, precio, imagen }) {
            
            if (this.isUpdating) {
                updateProduct(nombre, precio, imagen, this.dataProductToEdit._id)
                    .then(resp => {
                        if (resp.data.ok) {
                            this.getProducts();
                        }
                    })
            } else {
                createProduct(nombre, precio, imagen, this.id_user)
                    .then(resp => {
                        if (resp.data.ok) {
                            this.getProducts();
                        }
                    })
            }
            this.resetValues();
        },
        getProducts() {
            renovateToken(localStorage.getItem("token"))
                .then(resp => {
                    const { token, usuario } = resp.data;
                    const { id, nombre } = usuario;
                    this.nombre = nombre;
                    this.id_user = id
                    // localStorage.setItem("token", token);
                    getProductsByUser(id).
                        then(response => {
                            this.products = response.data.producto
                        })
                })
                .catch(err => {
                    this.$router.push("/login");
                })
        },
        getProduct(id) {
            this.dataProductToEdit = this.products.filter(item => item._id == id)[0];
            this.isUpdating = true;
            this.showModal = true;
        },
        resetValues() {
            this.dataProductToEdit = {};
            this.isUpdating = false;
            this.showModal = false;
        },
        deleteProduct(id) {
            if(confirm("Estas seguro que deseas eliminar este producto")){
                deleteProduct(id)
                .then(resp => {
                    if (resp.data.ok) {
                        this.getProducts();
                    }
                })
            }
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
    <NavigationComponent v-bind:nombre="this.nombre" v-on:custom-event="handleEvent" />
    <FormComponent v-on:custom-event="manageProduct" v-if="showModal"
        v-bind:dataProductToEdit="this.dataProductToEdit" />
    <div class="container">
        <h1>Productos</h1>

        <div class="products d-flex justify-between">
            <div v-for="value in this.products">
                <img src="../assets/logo.svg" alt="">
                <p><span class="bold">Nombre: </span>{{ value.nombre }}</p>
                <p><span class="bold">Precio: </span>{{ value.precio }}</p>
                <p><span class="bold">Calificacion: </span> {{ value.calificacion }}</p>
                <button @click="getProduct(value._id)" class="btn edit">Editar</button>
                <button @click="deleteProduct(value._id)" class="btn eliminar">Eliminar</button>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>

</style>

<script>
import { renovateToken, deleteToken, getProductsByUser, createProduct, updateProduct, deleteProduct, updateCalificacion } from "../services/services";
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
        manageModal() {
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
            if (confirm("Estas seguro que deseas eliminar este producto")) {
                deleteProduct(id)
                    .then(resp => {
                        if (resp.data.ok) {
                            this.getProducts();
                        }
                    })
            }
        },
        changeCalificacion(id) {
            updateCalificacion(this.$refs['calif' + id][0].value, id)
                .then(resp => {
                    if (resp.data.ok) {
                        console.log("og");
                        this.getProducts();
                    }
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
    <NavigationComponent v-bind:nombre="this.nombre" v-on:custom-event="manageModal" />
    <FormComponent v-on:custom-event="manageProduct" v-on:custom-event2="manageModal" v-if="showModal"
        v-bind:dataProductToEdit="this.dataProductToEdit" />
    <div class="container">

        <div class="products d-flex justify-between">
            <div v-for="value in this.products" class="product">
                <img src="../assets/logo.svg" alt="" class="mb-5">
                <h3 class="mb-5">{{ value.nombre }}</h3>
                <h5 class="mb-5 price">$ {{ value.precio }}</h5>
                <p class="mb-5 d-flex align-center gp-10">
                    calificacion:
                    <input class="calificacion" type="range" min="0" max="5"
                        v-model="value.calificacion" @change="changeCalificacion(value._id)" :ref="'calif' + value._id">
                    {{ value.calificacion }}</p>
                <div class="d-flex justify-between container-btn gp-10">
                    <button @click="getProduct(value._id)" class="btn edit">Editar</button>
                    <button @click="deleteProduct(value._id)" class="btn eliminar">Eliminar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
.gp-10 {
    gap: 10px;
}

.mb-5 {
    margin-bottom: 5px;
}

.products {
    flex-wrap: wrap;

    .product {
        width: 200px;
        border: 1px solid #666666;
        border-radius: 10px;
        padding: 10px;
    }

    .eliminar {
        background: red;
    }

    .price {
        color: green;
    }
}

.calificacion {
    width: 60px;
}
</style>

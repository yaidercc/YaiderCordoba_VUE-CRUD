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
    // Metodo que se ejecuta antes que el componente se renderize
    beforeCreate() {
        renovateToken(localStorage.getItem("token"))
            .catch(resp => {
                this.$router.push("/login");
            })
    },
    // Metodo que se ejecuta una vez el componente se ha renderizado
    mounted() {
        this.getProducts();
    },
    methods: {
        // Funcion encargada de cerrar sesion
        logout() {
            deleteToken();
            this.$router.push("/login");
        },
        // Funcion encargada de mostrar y ocultar una modal
        manageModal() {
            this.showModal = !this.showModal;
        },
        // funcion encargada de actualizar y/o crear un producto
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
        // Funcion encargada de obtener todos los productos de un usuario
        getProducts() {
            renovateToken(localStorage.getItem("token"))
                .then(resp => {
                    const { token, usuario } = resp.data;
                    const { id, nombre } = usuario;
                    this.nombre = nombre;
                    this.id_user = id
                    getProductsByUser(id).
                        then(response => {
                            this.products = response.data.producto
                        })
                })
                .catch(err => {
                    this.$router.push("/login");
                })
        },
        // funcion encargada de obtener la informacion de un solo producto
        getProduct(id) {
            this.dataProductToEdit = this.products.filter(item => item._id == id)[0];
            this.isUpdating = true;
            this.showModal = true;
        },
        // Funcion encargada de resetear un formulario
        resetValues() {
            this.dataProductToEdit = {};
            this.isUpdating = false;
            this.showModal = false;
        },
        // Funcion encargada de eliminar un producto
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
        // Funcion encargada de actualizar una calificacion
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

        <div class="products d-flex justify-between" >
            <p v-if="!this.products || this.products.length === 0" class="text-center">No hay productos</p>
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

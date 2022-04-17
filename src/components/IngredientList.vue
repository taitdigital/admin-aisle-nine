<script lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import IngredientForm from './forms/IngredientForm.vue'
import { IMG_URL } from '../constants/index'
import ConfirmDialog from 'primevue/confirmdialog'


export default {
    components: {
        IngredientForm,
        ConfirmDialog
    },
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: '',
            displayEdit: false,
            selectedIngredient: null
        }
    },
    computed: {
        ingredients() {
            return this.$store.state.ingredients.ingredients
        }
    },
    methods: {
        toggleEditDialog(selectedIngredient) {
            this.selectedIngredient = selectedIngredient
            this.displayEdit = !this.displayEdit
        },
        handleDelete(id) {
            this.$confirm.require({
                message: 'Ingredients can only be deleted if they are not in use, This action cannot be undone are you sure?',
                header: 'Delete Ingredient',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch("ingredients/delete", id).then((r) => {
                            if (r.exception) {
                                this.$toast.add({
                                    severity:'error', 
                                    summary: 'Delete Failed', 
                                    detail: r.message, 
                                    life: 3000
                                })
                            } else {
                                this.$toast.add({
                                    severity:'success', 
                                    summary: 'Delete Successful', 
                                    detail: r.data.name + ' was deleted successfully', 
                                    life: 3000
                                })
                            }

                            this.$store.dispatch("ingredients/index")
                        },
                        (error) => {
                            console.warn(error)
                        }
                    )
                },
                reject: () => {}
            })  
        }
    },
    setup() {
        onMounted(() => {
            const store = useStore()
            store.dispatch("ingredients/index")
        })
    }
}
</script>

<template>
	<div>
        <ConfirmDialog></ConfirmDialog>

        <div v-if="!ingredients.length">
            <h3>No results</h3>
            <Divider />
        </div>
        <div v-if="ingredients.length">
            <DataTable 
                :value="ingredients" 
                :paginator="true" 
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                responsiveLayout="scroll"
            >
                <Column field="image" header="">
                    <template #body="slotProps">
                        <img v-if="slotProps.data.image" :src="`${imagePath}/${slotProps.data.image}`" width="50"  height="50"/>
                    </template>
                </Column>
                <Column field="name" header="Name"></Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="toggleEditDialog(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.ingredient_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>

        <Dialog header="Edit Ingredient" v-model:visible="displayEdit" :style="{width: '50vw'}">
            <IngredientForm :existingIngredient="selectedIngredient" @onClose="displayEdit = false" />
        </Dialog>
	</div>
</template>

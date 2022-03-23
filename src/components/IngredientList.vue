<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import IngredientForm from './forms/IngredientForm.vue';
import { IMG_URL } from '../constants/index';

export default {
    components: {
        IngredientForm
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
            return this.$store.state.ingredients.ingredients;
        }
    },
    methods: {
        toggleEditDialog(selectedIngredient) {
            this.selectedIngredient = selectedIngredient
            this.displayEdit = !this.displayEdit
        },
        handleDelete(id) {
            this.$store.dispatch("ingredients/delete", id).then((r) => {
                this.$toast.add({severity:'success', summary: 'Delete Successful', detail: r, life: 3000})
                this.$store.dispatch("ingredients/index")
            },
            (error) => {
              console.warn(error);
            }
          );  
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
            <IngredientForm :existingIngredient="selectedIngredient" />
        </Dialog>
	</div>
</template>

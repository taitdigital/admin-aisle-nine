<script lang="ts">
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { IMG_URL } from '../constants/index';

export default {
    emits: ['selectRecipe'],
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: '',
            selectedRecipe: null,
            selectedRow: null
        }
    },
    computed: {
        recipes() {
            return this.$store.state.recipes.recipes;
        }
    },
    methods: {
        handleRowSelect(selectedRecipe) {
            this.selectedRecipe = selectedRecipe
            this.$emit("selectRecipe", selectedRecipe.data.recipe_id)
        },
        handleEdit(selectedRecipe) {
            this.selectedRecipe = selectedRecipe
            this.$emit("selectRecipe", selectedRecipe.recipe_id)

        },
        handleDelete(id) {
            this.$store.dispatch("recipes/delete", id).then((r) => {
                this.$toast.add({severity:'success', summary: 'Delete Successful', detail: r, life: 3000})
                this.$store.dispatch("recipes/index")
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
            store.dispatch("recipes/index")
        })
    }
}
</script>

<template>
	<div>
        <div v-if="!recipes.length">
            <h3>No results</h3>
            <Divider />
        </div>
        <div v-if="recipes.length">
            <DataTable 
                :value="recipes"
                @row-select="handleRowSelect"
                v-model:selection="selectedRow" 
                dataKey="recipe_id"
                selectionMode="single"
                :paginator="true" 
                :rows="5"
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                responsiveLayout="scroll"
            >
                <Column field="name" header="Name"></Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <Button @click="handleEdit(slotProps.data)" icon="pi pi-pencil" class="p-button-text p-button-pirmary" style="margin-right: 6px;" />
                        <Button @click="handleDelete(slotProps.data.recipe_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                    </template>
                </Column>
            </DataTable>    
        </div>

	</div>
</template>


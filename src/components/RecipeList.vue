<script lang="ts">
import { onMounted, watch, ref, computed, defineEmits } from 'vue';
import { useStore } from 'vuex'
import { IMG_URL } from '../constants/index';
import ConfirmDialog from 'primevue/confirmdialog';


export default {
    components: { ConfirmDialog },
    props: ['createdRecipe'],
    emits: ['selectRecipe', 'deleteRecipe'],
    data() {
        return {
            imagePath: IMG_URL,
            searchTerm: ''
        }
    },
    methods: {
        clearRowSelection() {
            this.selectedRow = null
            this.selectedRecipe = null
            this.$emit("selectRecipe", null)
        },
        handleRowSelect(selectedRecipe) {
            this.selectedRecipe = selectedRecipe
            this.$emit("selectRecipe", selectedRecipe.data.recipe_id)
        },
        handleEdit(selectedRecipe) {
            this.selectedRecipe = selectedRecipe
            this.$emit("selectRecipe", selectedRecipe.recipe_id)

        },
        handleDelete(id) {
            this.$confirm.require({
                message: 'This action cannot be undone are you sure?',
                header: 'Delete Recipe',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.$store.dispatch("recipes/delete", id).then((r) => {
                        this.$toast.add({severity:'success', summary: 'Delete Successful', detail: r, life: 3000})
                        this.$store.dispatch("recipes/index")

                        if (id === this.selectedRecipe?.data?.recipe_id) {
                            this.$emit("deleteRecipe", null)
                        }
                    },
                    (error) => {
                        console.warn(error);
                    })
                },
                reject: () => {}
            })
        }
    },
    setup(props, context) {
        const store = useStore()
        const selectedRow = ref(null)
        const recipes = computed(() => store.state.recipes.recipes)
        let selectedRecipe = null

        onMounted(() => {
            store.dispatch("recipes/index")
        })
        
        watch(() => props.createdRecipe, function() {
            if (props.createdRecipe) {
                selectedRow.value = props.createdRecipe    
                selectedRecipe = props.createdRecipe  
                context.emit("selectRecipe", selectedRecipe.recipe_id)       
            } 
        });

        return { selectedRow, recipes, selectedRecipe }
    }
}
</script>

<template>
	<div>
        <div class="flex justify-content-between">
            <span class="text-lg pt-2">Manage Recipes</span>
            <Button type="button" icon="pi pi-plus" @click="clearRowSelection" class="p-button-rounded p-button-outlined" />
        </div>
        <Divider />
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
        <ConfirmDialog></ConfirmDialog>
	</div>
</template>


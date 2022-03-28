<script lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { measurement_options, treatment_options } from '../constants'
import RecipeIngredientForm from './forms/RecipeIngredientForm.vue'

export default {
    components: {
        RecipeIngredientForm
    },
    props: [
        'ingredients'
    ],
    emits: ['deleteRecipeIngredient'],
    methods: {
        handleDelete(recipe_ingredient_id) {
            this.$emit('deleteRecipeIngredient', recipe_ingredient_id)
        }
    },
    setup(props) {
        const store = useStore()
        const ingredients = ref(props.ingredients)

        onMounted(() => {})

        watch(() => props.ingredients, (newValue, oldValue) => {
            ingredients.value = newValue
        });

        return { store, ingredients }
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
                :paginator="false" 
                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                responsiveLayout="scroll"
            >
                <Column field="name" header="Name">
                        <template #body="slotProps">{{ slotProps.data.ingredient.name }}</template>
                </Column>
                <Column header="Actions" style="text-align: right;">
                    <template #body="slotProps">
                        <div class="flex justify-content-end flex-wrap flex-align-middle">
                            <div class="flex-shrink-1">
                                <RecipeIngredientForm :ingredient="slotProps.data" />
                            </div>
                            <div class="pl-2 flex-shrink-0">
                                <Button @click="handleDelete(slotProps.data.recipe_ingredient_id)" icon="pi pi-trash" class="p-button-text p-button-danger" />
                            </div>
                        </div>
                    </template>
                </Column>
            </DataTable>    
        </div>
	</div>
</template>

<style scoped>
.ingredient-quantity {
    width: 50px !important;
}
</style>

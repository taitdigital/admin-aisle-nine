<script lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { measurement_options, treatment_options } from '../constants'

export default {
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

        const measurementOptions = measurement_options.map(i => ({ label: i, value: i }))
        const treatmentOptions = treatment_options.map(i => ({ label: i, value: i }))

        onMounted(() => {})

        watch(() => props.ingredients, (newValue, oldValue) => {
            ingredients.value = newValue
        });

        return { store, ingredients, measurementOptions, treatmentOptions }
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
                        <div class="flex justify-content-end flex-wrap">
                            <InputNumber id="quantity" mode="decimal" showButtons :min="1" class="ingredient-quantity" />
                            <div class="pl-2 flex-shrink-0"><Dropdown :options="treatmentOptions" optionLabel="label" placeholder="Treatment" /></div>
                            <div class="pl-2 flex-shrink-0"><Dropdown :options="measurementOptions" optionLabel="label" placeholder="Mesurement" /></div>
                            <div class="pl-2">
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

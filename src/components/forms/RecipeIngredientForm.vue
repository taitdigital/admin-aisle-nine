<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { measurement_options, treatment_options } from '../../constants'

export default {
    props: [
        'ingredient'
    ],
    emits: ['editRecipeIngredient'],
    methods: {
        handleEdit(isValid) {
            if (!isValid) return

            const payload = {
                quantity: this.state.quantity,
                ...((this.state.treatment) && { treatment: this.state.treatment.value }),
                ...((this.state.measurement) && { measurement: this.state.measurement.value })
            }

            this.$store.dispatch('recipeIngredients/edit', { 
                id: this.props.ingredient.recipe_ingredient_id, 
                payload         
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({
                        severity:'error', 
                        summary: 'Error: ', 
                        detail: r.errors, 
                        life: 3000
                    })
                    console.warn('debug:: ', r.errors)
                } else {
                    this.$toast.add({
                        severity:'success', 
                        summary: 'Edit success', 
                        detail: this.props.ingredient.ingredient.name + ', was updated.', 
                        life: 3000
                    })
                    console.warn(this.props.ingredient)
                }

            },
            (error) => {
                this.$toast.add({
                    severity:'error', 
                    summary: 'Error: ', 
                    detail: error, 
                    life: 3000
                })
                console.warn('debug:: ', error)
            })            
        }
    },
    setup(props) {
        const measurementOptions = measurement_options.map(i => ({ label: i, value: i }))
        const treatmentOptions = treatment_options.map(i => ({ label: i, value: i }))
        const ingredient = ref(props.ingredient)
        const submitted = ref(false)
        const state = reactive({
            quantity: 1,
            treatment: null,
            measurement: null
        })

        if (props.ingredient) {
            state.quantity = props.ingredient.quantity ?? 1
            state.treatment = treatmentOptions.find(m => (props.ingredient.treatment === m.value))
            state.measurement = measurementOptions.find(m => (props.ingredient.measurement === m.value)) 
        }

        const rules: any = {
            quantity: { required },
            treatment: {  },
            measurement: {  }
        }

        const v$ = useVuelidate(rules, state);

        return { v$, measurementOptions, treatmentOptions, props, ingredient, submitted, state }
    }
}
</script>

<template>
    <div class="recipe-ingredient-config-form">

            <div class="flex">
                <div class="flex-shrink-1">
                    <InputNumber 
                        id="quantity"
                        :showButtons="true" 
                        :min="1"
                        v-model="v$.quantity.$model" 
                        inputClass="quantity-input"
                        :class="{'p-invalid':v$.quantity.$invalid && submitted}" 
                        aria-describedby="quantity-error"
                        @input="handleEdit(!v$.$invalid)"
                    />
                </div>

                <div class="pl-2 flex-shrink-1">
                    <Dropdown
                        id="treatment"
                        aria-describedby="treatment-error"
                        :options="treatmentOptions" 
                        :class="{'p-invalid':v$.treatment.$invalid && submitted}" 
                        optionLabel="label"
                        v-model="v$.treatment.$model" 
                        placeholder="Treatment" 
                        @change="handleEdit(!v$.$invalid)"
                    />
                </div>

                <div class="pl-2 flex-shrink-1">
                    <Dropdown
                        id="measurement"
                        aria-describedby="measurement-error"
                        :options="measurementOptions" 
                        :class="{'p-invalid':v$.measurement.$invalid && submitted}" 
                        optionLabel="label"
                        v-model="v$.measurement.$model" 
                        placeholder="Measurement" 
                        @change="handleEdit(!v$.$invalid)"
                    />
                </div>
            </div>
    </div>
</template>

    
   

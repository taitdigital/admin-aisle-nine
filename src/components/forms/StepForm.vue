<script lang="ts">
import { reactive, ref } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import UploadService from '../../services/upload.service'
import { IMG_URL } from '../../constants/index'
import StepTimerForm from './StepTimerForm.vue'
import ImageUploadForm from './ImageUploadForm.vue'

export default {
    props: ['existingStep', 'recipe', 'stepCount'],
    components: {
        StepTimerForm,
        ImageUploadForm
    },
    methods: {
        onTimerUpdate(newTimer) {
            this.state.timer = newTimer
        },
        handleImageSelect(imageData) {
            this.image = imageData
        },
        handleSearch() {
            this.$store.dispatch('steps/search', this.state.name)
        },
        handleSubmit(isFormValid, id = null) {
            this.submitted = true;
            if (!isFormValid) { return }
            if (!id) { this.create() } else { this.edit(id) }
        },
        searchIngredients(searchTerm) {
            this.filteredIngredients = this.props.recipe.recipe_ingredients
                .map(i => ({ 'label': i.ingredient.name, 'value': i.recipe_ingredient_id }))
                .filter(i => i.label.includes(searchTerm.query) )
        },
        create() {
            const stepNumber = this.$store.state.recipeSteps.recipeSteps.length + 1

            this.$store.dispatch('recipeSteps/create', { 
                'name': this.state.name,
                'description': this.state.description,
                'timer': this.state.timer,
                'recipe_id': this.$props.recipe.recipe_id,
                'ingredients': this.state.ingredients.map(i => i.value),
                'step_order': stepNumber          
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000})
                } else {
                    this.$toast.add({severity:'success', summary: 'Create success', detail: r, life: 3000})
                    this.uploadImage(r.data.recipe_step_id);
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
            })
        },
        edit(id) {
            this.$store.dispatch('recipeSteps/edit', { 
                id: id, 
                payload: { 
                    'name': this.state.name,
                    'description': this.state.description,
                    'timer': this.state.timer,
                    'recipe_id': this.$props.recipe.recipe_id,
                    'ingredients': this.state.ingredients.map(i => i.value)   
                }         
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000});
                } else {
                    this.$toast.add({severity:'success', summary: 'Edit success', detail: r, life: 3000})
                    this.uploadImage(r.data.recipe_step_id)
                    this.$emit('onClose')
                }

            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
            }) 
        },
        uploadImage(id) {
            if (this.image) {
                const uploadService = new UploadService()

                this.$toast.add({severity:'info', summary: 'Uploading image', detail: this.image.name, life: 3000})
                
                uploadService.upload({
                    entity_id: id,
                    entity_type: 'Step',
                    file: this.image
                }).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Upload successful', detail: r, life: 3000})
                    this.clearForm();
                    this.$store.dispatch('recipeSteps/index', this.props.recipe.recipe_id)
                },
                (error) => {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
                })
            } else {
                this.clearForm();
                this.$store.dispatch('recipeSteps/index', this.props.recipe.recipe_id)
            }
        },
        clearForm() {
            this.state.name = ''
            this.state.description = ''
            this.image = ''
            this.state.timer = '0:0:0'
            this.state.ingredients = []
            this.imagePreview = null
            this.submitted = false
        }
    },
    setup(props) {
        let imagePreview = ref('')
        let image = ''

        const mappedIngredients = props.recipe.recipe_ingredients.map(i => ({ 'label': i.ingredient.name, 'value': i.recipe_ingredient_id }));
        const filteredIngredients = ref([...mappedIngredients])
        const submitted = ref(false)
        const state = reactive({
            name: '',
            description: '',
            timer: '0:0:0',
            ingredients: []
        })

        const step_id = (props.existingStep) ? props.existingStep.recipe_step_id : null

        if (props.existingStep) {
            state.name = props.existingStep.name
            state.description = props.existingStep.description
            state.timer = props.existingStep.timer
            state.ingredients = filteredIngredients.value.filter(i => props.existingStep.ingredients.includes(i.value)) 
            imagePreview.value = (props.existingStep.image) ? `${IMG_URL}/${props.existingStep.image}` : null
        }

        const rules: any = {
            name: { required },
            description: { required },
            timer: {},
            ingredients: {}
        }

        const v$ = useVuelidate(rules, state)
        return { v$, state, rules, step_id, imagePreview, image, submitted, props, filteredIngredients }
    }
}
</script>

<template>
    <div class="step-form">
        <Divider />
        <div class="flex justify-content-center">
            <form @submit.prevent="handleSubmit(!v$.$invalid, step_id)" class="p-fluid form-max-width">
                <div class="field pt-3">
                    <div class="p-float-label p-input-icon-right">
                        <i class="pi pi-search" />
                        <InputText 
                            id="name"
                            v-model="v$.name.$model" 
                            :class="{'p-invalid':v$.name.$invalid && submitted}" 
                            aria-describedby="name-error"
                        />
                        <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Step Name *</label>
                    </div>

                    <span v-if="v$.name.$error && submitted">
                        <span id="name-error" v-for="(error, index) of v$.name.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>

                    <small v-else-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
                        {{v$.name.required.$message.replace('Value', 'Name')}}
                    </small>
                </div>

                <div class="field pt-3">
                    <div class="flex mt-3 field">
                        <StepTimerForm @timerUpdated="onTimerUpdate" :existingTimer="v$.timer.$model" />   
                    </div>
                </div>

                <div class="field pt-3">
                    <div class="p-float-label">
                        <Textarea id="description" 
                            v-model="v$.description.$model" 
                            :class="{'p-invalid':v$.description.$invalid && submitted}" 
                            aria-describedby="description-error" 
                            :autoResize="true" 
                            rows="3" 
                            cols="30" 
                        />
                        <label for="description" :class="{'p-error':v$.description.$invalid && submitted}">Step Description *</label>
                    </div>

                    <span v-if="v$.description.$error && submitted">
                        <span id="description-error" v-for="(error, index) of v$.description.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>

                    <small v-else-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response" class="p-error">
                        {{v$.name.required.$message.replace('Value', 'Description')}}
                    </small>
                </div>

                <div class="field pt-3">
                    <ImageUploadForm :existingImage="imagePreview" @imageSelected="handleImageSelect" />
                </div>

                <div class="field pt-5">
                    <div class="p-float-label">
                        <AutoComplete 
                            id="recipe_ingredient_selection" 
                            :multiple="true" 
                            v-model="v$.ingredients.$model" 
                            :suggestions="filteredIngredients" 
                            dropdown 
                            @item-unselect="handleRemoveIngredient($event.value.value)"
                            @complete="searchIngredients($event)"
                                field="label" 
                        />
                        <label for="ingredient_selection" :class="{'p-error':v$.ingredients.$invalid && submitted}">Ingredients *</label>
                    </div>

                    <span v-if="v$.ingredients.$error && submitted">
                        <span id="category-error" v-for="(error, index) of v$.ingredients.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>

                    <small v-else-if="(v$.ingredients.$invalid && submitted) || v$.ingredients.$pending.$response" class="p-error">
                        {{v$.ingredients.required.$message.replace('Value', 'Ingredients')}}
                    </small>
                </div>

                <Button type="submit" :label="(existingStep) ? 'Update and Close': 'Create'" class="mt-3 p-button-rounded" />
            </form>
        </div>
        <Divider />
    </div>
</template>

<style scoped>
    .form-max-width {
        max-width: 400px;
    }

    .file {
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
    }

    .file-input {
        width: calc(100% - 40px);
        margin-left: 4px;
    }
    .file-button {
        width: 100%;
    }

    .file-button span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
    }

    .upload-preview {
        width: 36px;
        height:36px;
        overflow: hidden;
        border-radius: 4px;
        border: 1px solid #ccc;
    }
</style>
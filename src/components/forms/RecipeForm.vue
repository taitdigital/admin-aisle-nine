<script lang="ts">
import { reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import UploadService from '../../services/upload.service'
import { IMG_URL } from '../../constants/index'
import RecipeIngredientList from '../RecipeIngredientList.vue'
import StepForm from './StepForm.vue'
import StepList from '../StepList.vue'


export default {
    props: ['existingRecipeId'],
    emits: ['recipeCreated'],
    components: {
        RecipeIngredientList,
        StepForm,
        StepList
    },
    methods: {
        toggleStepDialog(selectedStep) {
            //this.existingStep = selectedStep
            this.displayStepEdit = !this.displayStepEdit
        },
        reloadRecipe() {
            this.$store.dispatch('recipes/show', this.currentRecipe.recipe_id).then((r) => {
                this.currentRecipe = r

                this.state.name = r.name
                this.state.description = r.description
                this.state.ingredients = r.recipe_ingredients.map(i => ({ 'label': i.ingredient.name, 'value': i.ingredient.ingredient_id }))
                this.category = this.filteredCategories.find(i => (i.value === r.category_id))
                this.image = r.image
                this.imagePreview = IMG_URL + '/' + r.image
            });
        },
        handleImageSelect(event) {
            this.imagePreview = URL.createObjectURL(event.target.files[0])
            this.image = event.target.files[0]
        },
        handleSearch() {
            this.$store.dispatch('recipes/search', this.state.name)
        },
        handleSubmit(isFormValid, id = null) {
            this.submitted = true;
            if (!isFormValid) { return }
            if (!id) { this.create() } else { this.edit(id) }
        },
        searchCategories(searchTerm) {
            this.$store.dispatch('categories/search', searchTerm.query).then(() => {
                this.filteredCategories = this.$store.state.categories.categories.map(c => ({ 'label': c.name, 'value': c.category_id }))
            })
        },
        searchIngredients(searchTerm) {
            this.$store.dispatch('ingredients/search', searchTerm.query).then(() => {
                this.filteredIngredients = this.$store.state.ingredients.ingredients.map(i => ({ 'label': i.name, 'value': i.ingredient_id }))
            })
        },
        create() {            
            this.$store.dispatch('recipes/create', {
                'name': this.state.name,
                'description': this.state.description,
                'ingredients': this.state.ingredients,
                'category_id': this.state.category.value  
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000})
                } else {
                    this.currentRecipe = r
                    this.$toast.add({severity:'success', summary: 'Create success', detail: r, life: 3000})
                    this.$emit("recipeCreated", this.currentRecipe)
                    this.uploadImage(r.recipe_id)
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
            })
        },
        edit(id) {
            this.$store.dispatch('recipes/edit', { 
                id: id, 
                payload: { 
                    'name': this.state.name,
                    'description': this.state.description,
                    'ingredients': this.state.ingredients,
                    'category_id': this.state.category.value  
                }         
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000});
                } else {
                    this.$toast.add({severity:'success', summary: 'Edit success', detail: r, life: 3000})
                    this.uploadImage(r.category_id)
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
            }) 

            this.reloadRecipe()
        },
        dropdownDeleteRecipeIngredient(ingredient_id) {
            this.deleteRecipeIngredient(
                this.currentRecipe.recipe_ingredients.find(r => (r.ingredient_id === ingredient_id)).recipe_ingredient_id
            )
        },
        deleteRecipeIngredient(recipe_ingredient_id) {
            this.$store.dispatch('recipeIngredients/delete', recipe_ingredient_id).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Delete Successful', detail: r, life: 3000})
                    this.reloadRecipe()
                },
                (error) => {
                    console.warn(error)
                }
            );  
        },
        uploadImage(id) {
            if (this.image) {
                const uploadService = new UploadService();
                this.$toast.add({severity:'info', summary: 'Uploading image', detail: this.image.name, life: 3000});

                uploadService.upload({
                    entity_id: id,
                    entity_type: 'Recipe',
                    file: this.image
                }).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Upload successful', detail: r, life: 3000});
                    this.$store.dispatch('recipes/index')
                },
                (error) => {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
                })
            } else {
                this.$store.dispatch('recipes/index')
            }
        }
    },
    mounted() {
            this.$store.dispatch("categories/index").then(() => {
                this.filteredCategories = this.$store.state.categories.categories.map(c => ({ 'label': c.name, 'value': c.category_id }))
            })
            this.$store.dispatch("ingredients/index").then(() => {
                this.filteredIngredients = this.$store.state.ingredients.ingredients.map(i => ({ 'label': i.name, 'value': i.ingredient_id }))
            })
    },
    setup(props) {
        const store = useStore()
        
        let showSteps = ref(false)
        let imagePreview = ref(null)
        let image = ''

        const submitted = ref(false)
        const filteredCategories = ref([])
        const filteredIngredients = ref([])
        const displayStepEdit = ref(false);

        const state = reactive({
            name: '',
            description: '',
            ingredients: [],
            category: null
        })

        const ingredient_id = (props.existingRecipeId) ? props.existingRecipeId : null
        let currentRecipe = ref(null)
        let existingStep = ref(null)

        const rules: any = {
            name: { required },
            description: { required },
            ingredients: { required },
            category: { required }
        }

        const clearForm = () => {
            state.name = ''
            state.description = ''
            state.ingredients = []
            state.category = ''
            image = ''
            imagePreview = null
            submitted.value = false
            showSteps.value = true
        }

        watch(() => props.existingRecipeId, function() {
            if (!props.existingRecipeId) {
                currentRecipe.value = null
                clearForm()
            } else {
                store.dispatch("recipes/show", props.existingRecipeId).then((r) => {
                    currentRecipe.value = r 
                    state.name = r.name
                    state.description = r.description
                    state.ingredients = r.recipe_ingredients.map(i => ({ 'label': i.ingredient.name, 'value': i.ingredient.ingredient_id }))
                    state.category = filteredCategories.value.find(i => (i.value === r.category_id))
                    image = r.image

                    imagePreview.value = (r.image) ? IMG_URL + '/' + r.image : null
                })
            }
        });

        const v$ = useVuelidate(rules, state);
        return { 
            v$, 
            state, 
            rules, 
            ingredient_id, 
            imagePreview, 
            image, 
            submitted, 
            showSteps, 
            filteredCategories, 
            filteredIngredients, 
            currentRecipe, 
            props, 
            store, 
            displayStepEdit, 
            existingStep,
            clearForm 
        }
    }
}
</script>

<template>
    <div class="recipe-form">
        <Divider />
        <div class="flex">
            <div>
            
                <form @submit.prevent="handleSubmit(!v$.$invalid, ingredient_id)" class="p-fluid form-max-width">
                    <div class="field pt-3">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-search" />
                            <InputText 
                                id="name"
                                @input="handleSearch()" 
                                v-model="v$.name.$model" 
                                :class="{'p-invalid':v$.name.$invalid && submitted}" 
                                aria-describedby="name-error"
                            />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Recipe Name *</label>
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
                        <div class="p-float-label">
                            <Textarea id="description" 
                                v-model="v$.description.$model" 
                                :class="{'p-invalid':v$.description.$invalid && submitted}" 
                                aria-describedby="description-error" 
                                :autoResize="true" 
                                rows="3" 
                                cols="30" 
                            />
                            <label for="description" :class="{'p-error':v$.description.$invalid && submitted}">Recipe Description *</label>
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

                    <div class="flex justify-content-end">
                        <div class="upload-preview">
                            <span v-if="imagePreview">
                                <img :src="imagePreview" width="36" height="36"/>
                            </span>                    
                        </div>

                        <div class="file-input">
                            <input type="file" id="file-recipe" class="file" v-on:change="handleImageSelect">
                            <label for="file-recipe" class="p-button p-button-outlined file-button">
                                <span class="p-button-label" v-if="!image">Upload Image</span>
                                <span class="p-button-label" v-if="image">{{ image.name ?? 'Upload Image' }}</span>
                            </label>
                        </div>
                    </div>

                    <div class="field pt-5">
                        <div class="p-float-label">
                            <AutoComplete v-model="v$.category.$model" :virtualScrollerOptions="{ itemSize: 31 }" dropdown :suggestions="filteredCategories" @complete="searchCategories($event)" field="label" id="category" />
                            <label for="category" :class="{'p-error':v$.category.$invalid && submitted}">Category *</label>
                        </div>

                        <span v-if="v$.category.$error && submitted">
                            <span id="category-error" v-for="(error, index) of v$.category.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>

                        <small v-else-if="(v$.category.$invalid && submitted) || v$.category.$pending.$response" class="p-error">
                            {{v$.category.required.$message.replace('Value', 'Category')}}
                        </small>
                    </div>

                    <div class="field pt-5">
                        <div class="p-float-label">
                            <AutoComplete 
                                id="ingredient_selection" 
                                :multiple="true" 
                                v-model="v$.ingredients.$model" 
                                :suggestions="filteredIngredients" 
                                dropdown 
                                @item-unselect="dropdownDeleteRecipeIngredient($event.value.value)"
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

                    <Button type="submit" v-if="!currentRecipe" :label="'Create'" class="mt-3 p-button-rounded" />
                </form>
            
            </div>
            <Divider layout="vertical" align="left" v-if="currentRecipe" />
            <div class="flex-grow-1">
                <div v-if="currentRecipe">
                    <RecipeIngredientList :ingredients="currentRecipe.recipe_ingredients" @deleteRecipeIngredient="deleteRecipeIngredient" />
                </div>
            </div>
        </div>

        <div v-if="currentRecipe">
            <Divider />
            <div class="flex justify-content-between">
                <Button type="button" :label="'Create Step'" @click="toggleStepDialog" class="p-button-rounded p-button-outlined" />
                <Button type="button" :label="'Update'" class="p-button-rounded" @click="handleSubmit(true, currentRecipe.recipe_id)" />
            </div>

            <Divider />

            <StepList :recipe="currentRecipe" @selectStep="toggleStepDialog" /> 

            <Dialog :header="(existingStep) ? 'Update Step': 'Create Step'" v-model:visible="displayStepEdit" :style="{width: '50vw'}">
                <StepForm :recipe="currentRecipe" :existingStep="existingStep" :stepCount="0" />
            </Dialog>

        </div>
    </div>
</template>

<style scoped>
    .form-max-width {
        max-width: 266px;
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
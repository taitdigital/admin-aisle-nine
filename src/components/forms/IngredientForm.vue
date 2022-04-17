<script lang="ts">
import { reactive, ref } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import UploadService from '../../services/upload.service'
import ImageUploadForm from './ImageUploadForm.vue'

export default {
    props: ['existingIngredient'],
    components: { ImageUploadForm },
    methods: {
        handleImageSelect(imageData) {
            this.image = imageData
        },
        handleSearch() {
            this.$store.dispatch('ingredients/search', this.state.name)
        },
        handleSubmit(isFormValid, id = null) {
            this.submitted = true;
            if (!isFormValid) { return }
            if (!id) { this.create() } else { this.edit(id) }
        },
        create() {
            this.$store.dispatch('ingredients/create', this.state).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000})
                } else {
                    this.$toast.add({severity:'success', summary: 'Create success', detail: r, life: 3000})
                    this.uploadImage(r.data.ingredient_id);
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
            })
        },
        edit(id) {
            this.$store.dispatch('ingredients/edit', { 
                id: id, 
                payload: this.state        
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({
                        severity:'error', 
                        summary: 'Error: ', 
                        detail: r.errors, 
                        life: 30000
                    })
                } else {
                    this.$toast.add({
                        severity:'success', 
                        summary: 'Edit success', 
                        detail: r.data.name, 
                        life: 3000
                    })
                    this.uploadImage(r.data.ingredient_id)
                    this.$emit('onClose')
                }

            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
            }) 
        },
        uploadImage(id) {
            if (this.image) {
                const uploadService = new UploadService();
                this.$toast.add({severity:'info', summary: 'Uploading image', detail: this.image.name, life: 3000})

                uploadService.upload({
                    entity_id: id,
                    entity_type: 'Ingredient',
                    file: this.image
                }).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Upload successful', detail: r, life: 3000})
                    this.clearForm();
                    this.$store.dispatch('ingredients/index')
                },
                (error) => {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
                })
            } else {
                this.clearForm();
                this.$store.dispatch('ingredients/index')
            }
        },
        clearForm() {
            this.state.name = ''
            this.state.description = ''
            this.image = ''
            this.imagePreview = null
            this.submitted = false
        }
    },
    setup(props) {
        const uid = function(){
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }
        const instanceId = uid()

        let imagePreview = null
        let image = null
        
        const submitted = ref(false)
        const state = reactive({
            name: '',
            description: '',
            allergen: true,
            vegetarian: false,
            vegan: false,
            diabetes_ok: false,
            gluten_free: false
        })

        const ingredient_id = (props.existingIngredient) ? props.existingIngredient.ingredient_id : null

        if (props.existingIngredient) {
            state.name = props.existingIngredient.name
            state.description = props.existingIngredient.description
            state.allergen = props.existingIngredient.allergen
            state.vegetarian = props.existingIngredient.vegetarian
            state.vegan = props.existingIngredient.vegan
            state.diabetes_ok = props.existingIngredient.diabetes_ok
            state.gluten_free = props.existingIngredient.gluten_free
            imagePreview = props.existingIngredient.image
        }

        const rules: any = {
            name: { required },
            description: { required },
            allergen: {},
            vegetarian: {},
            vegan: {},
            diabetes_ok: {},
            gluten_free: {}
        }

        const v$ = useVuelidate(rules, state)

        return { v$, state, rules, ingredient_id, imagePreview, image, submitted, props, instanceId }
    }
}
</script>

<template>
    <div class="ingredient-form">
        <Divider />
        <div class="flex justify-content-center">
                <form @submit.prevent="handleSubmit(!v$.$invalid, ingredient_id)" class="p-fluid flex justify-content-center">

                    <div class="pr-2 flex-grow-1">

                        <div class="field pt-3">
                            <div class="p-float-label p-input-icon-right">
                                <i class="pi pi-search" />
                                <InputText 
                                    :id="`name-${instanceId}`"
                                    @input="handleSearch()" 
                                    v-model="v$.name.$model" 
                                    :class="{'p-invalid':v$.name.$invalid && submitted}" 
                                    aria-describedby="name-error"
                                />
                                <label :for="`name-${instanceId}`" :class="{'p-error':v$.name.$invalid && submitted}">Ingredient Name *</label>
                            </div>

                            <span v-if="v$.name.$error && submitted">
                                <span :id="`name-error-${instanceId}`" v-for="(error, index) of v$.name.$errors" :key="index">
                                <small class="p-error">{{error.$message}}</small>
                                </span>
                            </span>

                            <small v-else-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">
                                {{v$.name.required.$message.replace('Value', 'Name')}}
                            </small>
                        </div>

                        <div class="field pt-3">
                            <div class="p-float-label">
                                <Textarea 
                                    :id="`description-${instanceId}`" 
                                    v-model="v$.description.$model" 
                                    :class="{'p-invalid':v$.description.$invalid && submitted}" 
                                    aria-describedby="description-error" 
                                    :autoResize="true" 
                                    rows="3" 
                                    cols="30" 
                                />
                                <label :for="`description-${instanceId}`" :class="{'p-error':v$.description.$invalid && submitted}">Ingredient Description *</label>
                            </div>

                            <span v-if="v$.description.$error && submitted">
                                <span :id="`description-error-${instanceId}`" v-for="(error, index) of v$.description.$errors" :key="index">
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

                        <Button type="submit" :label="(existingIngredient) ? 'Update and Close': 'Create'" class="mt-3 p-button-rounded" />
                    </div>

                    <div class="ml-2 border-1 px-4 py-4 border-round border-gray-400 flex-grow-1">
                        <div class="field-checkbox">
                            <Checkbox id="allergen" v-model="v$.allergen.$model" :binary="true" />
                            <label for="allergen">Allergen</label>
                        </div>

                        <div class="field-checkbox">
                            <Checkbox id="vegetarian" v-model="v$.vegetarian.$model" :binary="true" />
                            <label for="vegetarian">Vegetarian</label>
                        </div>

                        <div class="field-checkbox">
                            <Checkbox id="vegan" v-model="v$.vegan.$model" :binary="true" />
                            <label for="vegan">Vegan</label>
                        </div>
                        
                        <div class="field-checkbox">
                            <Checkbox id="gluten_free" v-model="v$.gluten_free.$model" :binary="true" />
                            <label for="gluten_free">Gluten Free</label>
                        </div>

                        <div class="field-checkbox">
                            <Checkbox id="diabetes_ok" v-model="v$.diabetes_ok.$model" :binary="true" />
                            <label for="diabetes_ok">Sugarfree</label>
                        </div>
                    </div>
                </form>
        </div>
        <Divider />
    </div>
</template>
<script lang="ts">
import { reactive, ref } from 'vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import UploadService from '../../services/upload.service'
import ImageUploadForm from './ImageUploadForm.vue'

export default {
    props: ['existingCategory'],
    emits: ['onClose'],
    components: { ImageUploadForm },    
    methods: {
        handleImageSelect(imageData) {
            this.image = imageData
        },
        handleSearch() {
            this.$store.dispatch('categories/search', this.state.name)
        },
        handleSubmit(isFormValid, id = null) {
            this.submitted = true
            if (!isFormValid) { return }
            if (!id) { this.create() } else { this.edit(id) }
        },
        create() {
            this.$store.dispatch('categories/create', {
                'name': this.state.name,
                'description': this.state.description,
                'type': this.state.type    
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000})
                } else {
                    this.$toast.add({severity:'success', summary: 'Create success', detail: r, life: 3000})
                    this.uploadImage(r.data.category_id);
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
            })
        },
        edit(id) {
            this.$store.dispatch('categories/edit', { 
                id: id, 
                payload: { 
                    'name': this.state.name,
                    'description': this.state.description,
                    'type': this.state.type
                }         
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000})
                } else {
                    this.$toast.add({severity:'success', summary: 'Edit success', detail: r, life: 3000})
                    this.uploadImage(r.data.category_id)
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
                    entity_type: 'Category',
                    file: this.image
                }).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Upload successful', detail: r, life: 3000})
                    this.clearForm();
                    this.$store.dispatch('categories/index')
                },
                (error) => {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000})
                })
            } else {
                this.clearForm();
                this.$store.dispatch('categories/index')
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
            type: 'Recipe'
        })

        const category_id = (props.existingCategory) ? props.existingCategory.category_id : null

        if (props.existingCategory) {
            state.name = props.existingCategory.name
            state.description = props.existingCategory.description
            state.type = props.existingCategory.type
            imagePreview = props.existingCategory.image
        }

        const rules: any = {
            name: { required },
            description: { required },
            type: {}
        }

        const v$ = useVuelidate(rules, state);
        return { v$, state, rules, category_id, imagePreview, image, submitted, instanceId }
    }
}
</script>

<template>
    <div class="category-form">
        <Divider />
        <div class="flex justify-content-center">
            <form @submit.prevent="handleSubmit(!v$.$invalid, category_id)" class="p-fluid form-max-width">
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
                        <label :for="`name-${instanceId}`" :class="{'p-error':v$.name.$invalid && submitted}">Category Name *</label>
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
                        <label :for="`description-${instanceId}`" :class="{'p-error':v$.description.$invalid && submitted}">Category Description *</label>
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

                <div class="field flex justify-content-center">
                    <div class="field-radiobutton pr-2">
                        <RadioButton id="ingredient_category" name="Ingredient" value="Ingredient" v-model="v$.type.$model" />
                        <label for="ingredient_category">Ingredient</label>
                    </div>
                    <div class="field-radiobutton pl-2">
                        <RadioButton id="recipe_category" name="Recipe" value="Recipe" v-model="v$.type.$model" />
                        <label for="recipe_category">Recipe</label>
                    </div>
                </div>    

                <div class="field pt-3">
                    <ImageUploadForm :existingImage="imagePreview" @imageSelected="handleImageSelect" />
                </div>

                <Button type="submit" :label="(existingCategory) ? 'Update and Close': 'Create'" class="mt-3 p-button-rounded" />
            </form>
        </div>
        <Divider />
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
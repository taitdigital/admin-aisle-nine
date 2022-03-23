<script lang="ts">
import { reactive, ref } from 'vue';
import { required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import UploadService from '../../services/upload.service';
import { IMG_URL } from '../../constants/index';

export default {
    props: ['existingCategory'],
    methods: {
        handleImageSelect(event) {
            this.imagePreview = URL.createObjectURL(event.target.files[0])
            this.image = event.target.files[0]
        },
        handleSearch() {
            this.$store.dispatch('categories/search', this.state.name)
        },
        handleSubmit(isFormValid, id = null) {
            this.submitted = true;
            if (!isFormValid) { return }
            if (!id) { this.create() } else { this.edit(id) }
        },
        create() {
            this.$store.dispatch('categories/create', {
                'name': this.state.name,
                'description': this.state.description    
            }).then((r) => {
                if (r.errors) {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: r.errors, life: 30000});
                } else {
                    this.$toast.add({severity:'success', summary: 'Create success', detail: r, life: 3000})
                    this.uploadImage(r.category_id);
                }
            },
            (error) => {
                this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
            })
        },
        edit(id) {
            this.$store.dispatch('categories/edit', { 
                id: id, 
                payload: { 
                    'name': this.state.name,
                    'description': this.state.description
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
        },
        uploadImage(id) {
            if (this.image) {
                this.$toast.add({severity:'info', summary: 'Uploading image', detail: this.image.name, life: 3000});

                UploadService.upload({
                    entity_id: id,
                    entity_type: 'Category',
                    file: this.image
                }).then((r) => {
                    this.$toast.add({severity:'success', summary: 'Upload successful', detail: r, life: 3000});
                    this.clearForm();
                    this.$store.dispatch('categories/index')
                },
                (error) => {
                    this.$toast.add({severity:'error', summary: 'Error: ', detail: error, life: 30000});
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
        let imagePreview = ''
        let image = ''
        const submitted = ref(false)
        const state = reactive({
            name: '',
            description: ''
        })

        const category_id = (props.existingCategory) ? props.existingCategory.category_id : null;

        if (props.existingCategory) {
            state.name = props.existingCategory.name
            state.description = props.existingCategory.description
            imagePreview = `${IMG_URL}/${props.existingCategory.image}`
        }

        const rules: any = {
            name: { required },
            description: { required }
        }

        const v$ = useVuelidate(rules, state);
        return { v$, state, rules, category_id, imagePreview, image, submitted }
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
                            id="name"
                            @input="handleSearch()" 
                            v-model="v$.name.$model" 
                            :class="{'p-invalid':v$.name.$invalid && submitted}" 
                            aria-describedby="name-error"
                        />
                        <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Category Name *</label>
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
                        <label for="description" :class="{'p-error':v$.description.$invalid && submitted}">Category Description *</label>
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
                        <img v-if="imagePreview" :src="imagePreview" width="36" height="36"/>
                    </div>

                    <div class="file-input">
                        <input type="file" id="file" class="file" v-on:change="handleImageSelect">
                        <label for="file" class="p-button p-button-outlined file-button">
                            <span class="p-button-label" v-if="!image">Upload Image</span>
                            <span class="p-button-label" v-if="image">{{ image.name }}</span>
                        </label>
                    </div>
                </div>

                <Button type="submit" :label="(existingCategory) ? 'Update': 'Create'" class="mt-3 p-button-rounded" />
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
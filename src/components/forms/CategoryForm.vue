<script lang="ts">
import { reactive, ref } from 'vue';
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
    props: ['existingCategory'],
    data() {
      return {
        submitted: ref(false),
      }
    },
    methods: {
        handleSearch() {
            console.warn(this.state.name);

            this.$store.dispatch("categories/search", this.state.name).then((data) => {
                console.warn('search categories success: ', data)
            });
        },
        handleSubmit(isFormValid, id = null) {
            if (!isFormValid) { return }
            if (!id) { this.handleCreate() } else { this.handleEdit(id) }
        },
        handleCreate() {
            this.$store.dispatch("categories/create", {
                "name": this.state.name,
                "description": this.state.description    
            }).then((r) => {
                console.warn('category created successfully: ', r)

                this.$store.dispatch("categories/index").then((data) => {
                    console.warn('get categories success: ', data)
                });
            },
            (error) => {
              console.warn(error);
            })
        },
        handleEdit(id) {
            this.$store.dispatch("categories/edit", { 
                    id: id, 
                    payload: { 
                        "name": this.state.name,
                        "description": this.state.description
                    }         
            }).then((r) => {
                console.warn('category edited successfully: ', r)

                this.$store.dispatch("categories/index").then((data) => {
                    console.warn('get categories success: ', data)
                });
            },
            (error) => {
              console.warn(error);
            }) 
        }
    },
    setup(props) {
        const state = reactive({
            name: '',
            description: ''
        });

        const category_id = (props.existingCategory) ? props.existingCategory.category_id : null;

        if (props.existingCategory) {
            state.name = props.existingCategory.name
            state.description = props.existingCategory.description
        }

        const rules: any = {
            name: { required },
            description: { required }
        }


        const v$ = useVuelidate(rules, state);
        return { v$, state, rules, category_id }
    }
    
}
</script>

<template>
    <div class="category-form">
        <Divider />
        <div class="flex justify-content-center">
            <form @submit.prevent="handleSubmit(!v$.$invalid, category_id)" class="p-fluid">
                <div class="field pt-2">
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
                
                <Button type="submit" :label="(existingCategory) ? 'Update': 'Create'" class="p-button-rounded" />
            </form>
        </div>
        <Divider />
    </div>
</template>
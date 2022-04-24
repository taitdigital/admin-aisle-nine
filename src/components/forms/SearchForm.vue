<script lang="ts">
import { ref } from 'vue'

export default {
    emits: ['searchTerm'],
    methods: {
        handleSearch() {
            this.$emit('searchTerm', this.searchTerm)
        }
    },
    setup(props, {emit}) {
        let searchTerm = ref('')
        return { searchTerm }
    }
}
</script>

<template>

    <div class="field pt-3">
        <div class="p-float-label p-input-icon-right">
            <i class="pi pi-search" />
            <InputText 
                id="search"
                @input="handleSearch()" 
                v-model="searchTerm" 
            />
            <label for="search">Search ...</label>
        </div>
    </div>

</template>

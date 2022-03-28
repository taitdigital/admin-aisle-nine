<script lang="ts">
export default {
    props: ['existingImage', 'entity'],
    emits: ['imageUploaded'],
    methods: {
        handleImageUpdate() {

        }
    },
    setup(props) {
        if (props.existingTimer) {
            
        }
    }
}
</script>

<template>
    <div class="flex justify-content-end">
        <div class="upload-preview">
            <span v-if="imagePreview">
                <img :src="imagePreview" width="36" height="36"/>
            </span>
        </div>

        <div class="file-input">
            <input type="file" id="file-step-1" class="file" v-on:change="handleImageSelect">
            <label for="file-step" class="p-button p-button-outlined file-button">
                <span class="p-button-label" v-if="!image">Upload Image</span>
                <span class="p-button-label" v-if="image">{{ image.name }}</span>
            </label>
        </div>
    </div>
</template>
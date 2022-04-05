<script lang="ts">
import { ref, watch } from 'vue';

import { IMG_URL } from '../../constants/index';

export default {
    props: ['existingImage'],
    emits: ['imageSelected'],
    methods: {
        handleImageSelect(event) {
            this.imagePreview = URL.createObjectURL(event.target.files[0])
            this.imageData = event.target.files[0]
            this.$emit('imageSelected', this.imageData)
        }
    },
    setup(props) {
        const uid = function(){
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }
        const instanceId = uid()

        let imagePreview = ref((props.existingImage) ? `${IMG_URL}/${props.existingImage}` : null)
        let imageData = ref(null)

        watch(() => props.existingImage, function() {
            imagePreview.value = (props.existingImage) ? `${IMG_URL}/${props.existingImage}` : null
        })

        return { imagePreview, imageData, instanceId } 
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
            <input type="file" :id="`file-${instanceId}`" class="file" v-on:change="handleImageSelect">
            <label :for="`file-${instanceId}`" class="p-button p-button-outlined file-button">
                <span class="p-button-label" v-if="!imageData">Upload Image</span>
                <span class="p-button-label" v-if="imageData">{{ imageData.name.substring(0, Math.min(24, imageData.name.length)) + '...' }}</span>
            </label>
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
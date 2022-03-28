<script lang="ts">
import { reactive } from 'vue'

export default {
    props: ['existingTimer'],
    emits: ['timerUpdated'],
    methods: {
        handleTimerUpdate() {
            const parsedValue = `${this.state.hours}:${this.state.minutes}:${this.state.seconds}`
            this.$emit('timerUpdated', parsedValue)
        }
    },
    setup(props) {
        const state = reactive({
            hours: 0,
            minutes: 0,
            seconds: 0
        })

        if (props.existingTimer) {
            const splitValues = props.existingTimer.split(':')

            state.hours = parseInt(splitValues[0])
            state.minutes = parseInt(splitValues[1])
            state.seconds = parseInt(splitValues[2])        
        }

        return { state }
    }
}
</script>

<template>
    <div>
        <label>Step Timer</label>
        <div class="flex mt-6 field">
            <div class="p-float-label mr-1">
                <InputNumber id="hours" mode="decimal" v-model="state.hours" showButtons :min="0" class="timer-input" @input="handleTimerUpdate" />
                <label for="hours">Hours</label>
            </div>
            <div class="p-float-label mr-1 ml-1">
                <InputNumber id="minutes" mode="decimal" v-model="state.minutes" showButtons :min="0" :max="59" class="timer-input" @input="handleTimerUpdate" />
                <label for="minutes">Minutes</label>
            </div>    
            <div class="p-float-label ml-1">
                <InputNumber id="seconds" mode="decimal" v-model="state.seconds" showButtons :min="0" :max="59" class="timer-input" @input="handleTimerUpdate" />
                <label for="seconds">Seconds</label>
            </div>    
        </div>
    </div>
</template>
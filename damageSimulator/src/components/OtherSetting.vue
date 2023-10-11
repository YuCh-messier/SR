<script setup>
import { ref,computed, toRefs } from 'vue';
import { Setting } from '../settings.js'

const dTC8=Setting.dTC8

var props=defineProps(['othersetting'])

var {othersetting}=toRefs(props)
</script>

<template>
  <div>
    <div class="flex">
        <div v-for="i,ii in othersetting.enemySetting" :key="ii">
            <div class="flex space-x-sm mx-md"><div class="w-fit">{{ dTC8[ii] }}</div><div class="text-orange-500">{{ i }}</div></div>
            <div class="flex space-x-sm mx-md my-sm"><div class="w-fit">设置</div><input type="number" class="w-16 border-b" v-model="othersetting.enemySetting[ii]"></div>
        </div>    
    </div>

    <div class="flex my-xl">
        <div v-for="i,ii in othersetting.otherOnSkill" :key="ii">
            <div class="flex space-x-sm mx-md"><div class="w-fit">{{ii}}额外补正</div><div class="text-orange-500">{{ i }}</div></div>
            <div class="flex space-x-sm mx-md my-sm"><div class="w-fit">设置</div><input type="number" class="w-16 border-b" v-model="othersetting.otherOnSkill[ii]"></div>
        </div>    
    </div>
  </div>
</template>

<style scoped>

</style>

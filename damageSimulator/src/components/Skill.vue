<script setup>
import { ref,computed, toRefs } from 'vue';
import { Setting } from '../settings.js'

const dTC2=Setting.dTC2
const dTC4=Setting.dTC4

var props=defineProps(['skilllist','choices'])
var emits=defineEmits(['doit'])

var {choices}=toRefs(props)

var skill=ref(computed(()=>{
  return props.skilllist[choices.value.skill]
}));

var update=ref(true)
function updatePage(){
    update.value=false
    update.value=true
    emits('doit')
}

var text=ref('修改倍率加成')
var input=ref(false)
function startInput(){
  input.value=!input.value
  text.value=input.value?'结束':'修改倍率加成'
}

</script>

<template>
  <div>
    <div>
        <div class="inline-block">
        <div>技能组选择</div>
        <el-select v-model="choices.skill" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item,key in skilllist"
            :key="key"
            :label="key"
            :value="key"
          />
        </el-select>
        </div>

        <div class="button2 hover:bg-orange-300 bg-succeed inline-block" @click="startInput">{{ text }}</div>
        </div>
        <div v-for="item,key in skill" :key="key">
            <div class="my-sm font-bold">{{ dTC4[key] }}加成</div>
            <div class="containerA">
                <div class="w-20 mx-px" v-for="att,i in item.attackRate" :key="i">
                    
                    <div v-if="update">{{  dTC2[i] }}</div><div>{{  att  }}</div>
                    <input type="number" v-if="input" @input="updatePage" class="w-16 border-b" v-model="skill[key].attackRate[i]"> 
    
                </div>
            </div>

      </div>
  </div>
</template>

<style scoped>

</style>

<script setup>
import { ref,computed, toRefs } from 'vue';
import { Setting } from '../settings.js'

const dTC3=Setting.dTC3
const dTC2=Setting.dTC2
const dTC5=Setting.dTC5
const dTC6=Setting.dTC6
var props=defineProps(['itemlist','choices','index'])
var emits=defineEmits(['doit'])

var buffName=ref('buffFix')
var {choices}=toRefs(props)
var {itemlist}=toRefs(props)
var {index}=toRefs(props)

var buff=ref(computed(()=>{
  return itemlist.value[choices.value[index.value]][buffName.value]
}));

var update=ref(true)
function updatePage(){
    update.value=false
    update.value=true
    emits('doit')
}

var text=ref('修改')
var input=ref(false)
function startInput(){
  input.value=!input.value
  text.value=input.value?'结束':'修改'
}

</script>

<template>
  <div>
    <div>
        <div class="inline-block">
        <div>{{ dTC6[index] }} 选择</div>
        <el-select v-model="choices[index]" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item,key in itemlist"
            :key="key"
            :label="key"
            :value="key"
          />
        </el-select>
        </div>

        <div class="inline-block">
        <div>buff类型切换</div>
        <el-select v-model="buffName" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in ['buffFix','buffProportion']"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>

        <div class="button2 bg-succeed inline-block hover:bg-orange-300" @click="startInput">{{ text }}</div>
        </div>

        <div v-for="item,key in buff" :key="key">

            <div class="containerA w-fit space-x-2 my-2 font-bold"><div>{{ buffName=='buffFix'?'数值加成':'百分比加成' }}</div><div>{{ dTC3[item.key1] }}</div><div>{{ dTC5[item.key2] }}</div></div>
            <div class="containerA">
                <div class="w-20 mx-px" v-for="i,ii in item.value" :key="ii">
                    <div v-if="update">{{  dTC2[ii] }}</div><div>{{  buff[item.key1][item.key2][ii]  }}</div>
                    <input type="number" v-if="input" @input="updatePage" class="w-16 border-b" v-model="buff[item.key1][item.key2][ii]">
                </div>
            </div>

        </div>

      </div>
  </div>
</template>

<style scoped>

</style>

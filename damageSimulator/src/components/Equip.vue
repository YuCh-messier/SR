<script setup>
import { ref,computed } from 'vue';
import { Setting } from '../settings.js'

const dTC3=Setting.dTC3
const dTC2=Setting.dTC2
const dTC5=Setting.dTC5
const dTC7=Setting.dTC7

var props=defineProps(['equipbigset','equipsmallset','equip'])
var emits=defineEmits([])

var buffName=ref('buffFix')

var buff=ref(computed(()=>{
  return props.equip[buffName.value]
}));

var update=ref(true)
function updatePage(){
    update.value=false
    update.value=true
    let srobj3={
    equipBigSet:props.equipbigset,
    equipSmallSet:props.equipsmallset
  }
  Setting.setLocal('srobj3',srobj3)
}

var text=ref('修改大词条选择')
var input=ref(false)
function startInput(){
  input.value=!input.value
  text.value=input.value?'结束大词条修改':'修改大词条选择'
}

var text2=ref('修改小词条选择')
var input2=ref(false)
function startInput2(){
  input2.value=!input2.value
  text2.value=input2.value?'结束小词条修改':'修改小词条选择'
}

</script>

<template>
  <div>
    <div>

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

        <div class="button2 hover:bg-orange-300 bg-succeed inline-block" @click="startInput">{{ text }}</div>
        <div class="button2 hover:bg-orange-300 bg-succeed inline-block mx-sm" @click="startInput2">{{ text2 }}</div>
        </div>

        <div class="containerA">
            <div class="w-20 mx-px" v-for="i,ii in equipbigset" :key="ii">
                <div v-if="update">{{  dTC2[ii] }}</div><div>{{  i  }}</div>
                <input type="number" v-if="input" @input="updatePage" class="w-16 border-b" v-model="equipbigset[ii]">
            </div>
        </div>

        <div class="containerA">
            <div class="w-20 mx-px" v-for="i,ii in equipsmallset" :key="ii">
                <div v-if="update">{{  dTC2[ii] }}</div><div>{{  i  }}</div>
                <input type="number" v-if="input2" @input="updatePage" class="w-16 border-b" v-model="equipsmallset[ii]">
            </div>
        </div>

        <div v-for="item,key in buff" :key="key">

            <div class="containerA w-fit space-x-2 my-2 font-bold"><div>{{ buffName=='buffFix'?'数值加成':'百分比加成' }}</div><div>{{ dTC3[item.key1] }}</div><div>{{ dTC5[item.key2] }}</div></div>
            <div class="containerA">
                <div class="w-20 mx-px" v-for="i,ii in item.value" :key="ii">
                    <div>{{  dTC2[ii] }}</div><div>{{  buff[item.key1][item.key2][ii].toFixed(4)  }}</div>
                </div>
            </div>

        </div>

        <div class="m-sm">
          <div class="m-sm font-bold">小词条加成（大词条*10）：</div>
          <div v-for="i,ii in dTC7" :key="ii">
            {{ dTC2[ii] }}{{ i }}
          </div>
        </div>

      </div>
  </div>
</template>

<style scoped>

</style>

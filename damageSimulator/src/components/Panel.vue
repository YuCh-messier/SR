<script setup>
import { ref,computed,toRefs } from 'vue';
import { Setting } from '../settings.js';

var props=defineProps(['roledamage'])
var emits=defineEmits([])

var {roledamage}=toRefs(props)

const dTC=Setting.dTC
const dTC2=Setting.dTC2
const dTC3=Setting.dTC3
const dTC4=Setting.dTC4

var currentPanelIndex=ref('constant')
var currentPanelIndexBox=ref(['constant','conditional'])
var currentPanelType=ref('attackA')
var currentPanelTypeBox=ref(['attackA','attackB'])

if(Setting.checkLocal('srobj2')){
  let srobj2=Setting.getLocal('srobj2')
  currentPanelIndex.value=srobj2.k1
  currentPanelType.value=srobj2.k2
}

var typeToSkill={
    attackA:['pugong','zhanji'],
    attackB:['zuijia','dazhao']
}

var currentDamage=ref(computed(()=>{
  return roledamage.value[currentPanelIndex.value][currentPanelType.value]
}))

var currentPanel=ref(computed(()=>{
  return currentDamage.value[typeToSkill[currentPanelType.value][0]].buff
}))

function changeIndexBox(e){
  currentPanelIndex.value=e
  let srobj2={
    k1:currentPanelIndex.value,
    k2:currentPanelType.value
  }
  Setting.setLocal('srobj2',srobj2)
}
function changeTypeBox(e){
  currentPanelType.value=e
  let srobj2={
    k1:currentPanelIndex.value,
    k2:currentPanelType.value
  }
  Setting.setLocal('srobj2',srobj2)
}
</script>

<template>
  <div class="mx-auto">

    <div class="w-full containerB space-y-md mx-sm">

      <div class="flex w-full border rounded">
        <div class="containerA w-1/2">
          <div @click="changeIndexBox(i)" class="w-full py-md text-center hover:bg-sky-300 hover:cursor-pointer" :class="{'bg-sky-300':currentPanelIndex==i}" v-for="i in currentPanelIndexBox" :key="i">{{ i }}</div>
        </div>

        <div class="containerA w-1/2">
          <div @click="changeTypeBox(i)" class="w-full py-md text-center hover:bg-sky-300 hover:cursor-pointer" :class="{'bg-sky-300':currentPanelType==i}" v-for="i in currentPanelTypeBox" :key="i">{{ i }}</div>
        </div>
      </div>

      <div class="containerA border p-md rounded space-x-xl w-full justify-center hover:bg-gradient-to-l hover:from-indigo-200 hover:to-cyan-200 hover:cursor-pointer">
        <div class="text-font3 font-bold">{{ dTC3[currentPanelIndex] }}{{currentPanelType=='attackA'?'普攻战技':'追加大招'}}面板</div>
        <div>
            <div class="containerA w-fit space-x-sm my-1" v-for="item,key in currentPanel" :key="item">
                <div class="text-font3">{{ dTC2[key] }}</div> : <div class="text-sky-600 text-font3 font-bold hover:text-succeed">{{ item.toFixed(4) }}</div>
            </div>
        </div>
      </div>
      
      <div class="containerA border py-md px-sm rounded space-x-xxl w-full justify-center hover:bg-gradient-to-l hover:from-indigo-200 hover:to-cyan-200 hover:cursor-pointer">
        <div class="containerB" v-for="i in typeToSkill[currentPanelType]" :key="i">

            <div class="text-font3 font-bold mb-md">{{ dTC4[i] }}面板</div>

            <div v-for="item,key in currentDamage[i]" :key="key">
                <div class="containerA w-fit space-x-sm my-1" v-if="key!='buff' && key!='skill'">
                    <div class="text-font3">{{ dTC[key] }}</div> : <div class="text-sky-600 text-font3 font-bold hover:text-succeed">{{ item.toFixed(3) }}</div>
                </div>
            </div>

        </div>
       </div>
      
    </div>
 
  </div>
</template>

<style scoped>

</style>

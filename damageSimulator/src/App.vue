<script setup>
import { ref,computed } from 'vue';
import { Assets } from '../sr/SRmodules/assets.js';
import { Equip, Role } from "../sr/SRmodules/items.js";
import { Attack } from '../sr/SRmodules/damages.js'
import { Setting } from './settings.js';
import { SingleAttribute } from '../sr/SRmodules/baseConstructure';
import Base from './components/Base.vue';
import EquipBase from './components/Equip.vue';
import Skill from './components/Skill.vue';
import Panel from './components/Panel.vue';
import OtherSetting from './components/OtherSetting.vue';

const dTC6=Setting.dTC6

var choices=ref({
  figure:'demo',
  weapon:'demo',
  equipBuff1:'demo',
  equipBuff2:'demo',
  skill:'demo',
  figureBuff1:'demo',
  figureBuff2:'demo',
  figureBuff3:'demo'
});
if(Setting.checkLocal('srobj')){
  choices.value=Setting.getLocal('srobj')
}


var currentBox=ref('figure')
var boxes=ref(['figure','weapon','equipBuff1','equipBuff2','equip','skill','otherSetting','figureBuff1','figureBuff2','figureBuff3'])
var baseList=['figure','weapon','equipBuff1','equipBuff2','figureBuff1','figureBuff2','figureBuff3']
var baseItem=ref(computed(()=>{
  if(currentBox.value=='equipBuff1' || currentBox.value=='equipBuff2'){
    return Assets.equipBuffList
  }
  else if(currentBox.value=='figureBuff1' ||  currentBox.value=='figureBuff2' ||  currentBox.value=='figureBuff3'){
    return Assets.figureBuffList
  }
  else{
    return Assets[currentBox.value+'List']
  }
}))

function changeBox(e){
  currentBox.value=e
}

var equipBigSet=ref(new SingleAttribute().plus(Equip.defaultBigSet))
var equipSmallSet=ref(new SingleAttribute().plus(Equip.defaultSmallSet))
if(Setting.checkLocal('srobj3')){
  equipBigSet.value=new SingleAttribute(Setting.getLocal('srobj3').equipBigSet)
  equipSmallSet.value=new SingleAttribute(Setting.getLocal('srobj3').equipSmallSet)
}
var equip=computed(()=>{
    return new Equip(equipBigSet.value,equipSmallSet.value)
})

var otherSetting=ref({
  enemySetting:{shield:1,debuff:0,roleGrade:80,enemyGrade:85,etc:0},
  otherOnSkill:{pugong:1,zhanji:1,zuijia:1,dazhao:1}
})

var role=ref(computed(()=>{
  Setting.setLocal('srobj',choices.value)
  let role=new Role(
    Assets.figureList[choices.value.figure],
    Assets.weaponList[choices.value.weapon],
    equip.value,
    Assets.equipBuffList[choices.value.equipBuff1],
    Assets.equipBuffList[choices.value.equipBuff2],
    Assets.figureBuffList[choices.value.figureBuff1],
    Assets.figureBuffList[choices.value.figureBuff2],
    Assets.figureBuffList[choices.value.figureBuff3]
  ) 
  let damage=new Attack(
    role.attackTime(),
    Assets.skillList[choices.value.skill]
  )
  damage.doit(otherSetting.value.enemySetting,otherSetting.value.otherOnSkill)
  return damage
}))

var update=ref(true)
function updatePage(){
    let temp=choices.value.figure
    choices.value.figure=(temp=='demo'?'xier':'demo')
    choices.value.figure=temp
}

function deleteLocal(){
  Setting.deleteLocal('srobj')
  Setting.deleteLocal('srobj2')
  Setting.deleteLocal('srobj3')
  alert('成功清除')
}
</script>

<template>
  <div class="flex my-xxl w-standard mx-auto">
    
    <div class="w-2/3">
      <div class="containerA border w-full border-b-0">
        <div @click="changeBox(i)" class="py-md text-center w-full hover:bg-sky-300 hover:cursor-pointer" :class="{'bg-sky-300':currentBox==i}" v-for="i in boxes" :key="i">{{ dTC6[i] }}</div>
      </div>

      <div class="w-full">
        <Base @doit="updatePage" v-if="baseList.indexOf(currentBox)>=0" class="border p-md bg-sky-100" :itemlist="baseItem" :choices="choices" :index="currentBox"></Base>
        <EquipBase v-if="currentBox=='equip'" class="border p-md bg-sky-100" :equipbigset="equipBigSet" :equipsmallset="equipSmallSet" :equip="equip"></EquipBase>
        <Skill @doit="updatePage" v-if="currentBox=='skill'" class="border p-md bg-sky-100" :skilllist="Assets.skillList" :choices="choices"></Skill> 
        <OtherSetting v-if="currentBox=='otherSetting'" class="border p-md bg-sky-100" :othersetting="otherSetting"></OtherSetting> 
      </div>
    </div>

    <div class="w-1/3">

      <Panel :roledamage="role"></Panel>
      
    </div>
    
  </div>
  <div class="button mx-auto" @click="deleteLocal">清除localStorage，有问题可试着F12手动清除</div>
</template>

<style scoped>

</style>

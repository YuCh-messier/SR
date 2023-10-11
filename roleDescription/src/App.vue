<script setup>
import { ref,computed } from 'vue';
import { Skills } from '../project.config.js';

let image=`background-image:url(${Skills.figure})`

var skillTitle=['普攻','战技','终结技','天赋','秘技']
var skillContent=Skills.skillContent
var skillSelectBox=[0,1,0,0,0,0]
var skillDescription=ref(skillContent[1])

function skillDescriptionSetter(index){
  skillDescription.value=skillContent[index]
  for(let i=0;i<skillSelectBox.length;i++){
    skillSelectBox[i]=0
  } 
  skillSelectBox[index]=1
}

var stepTitle=['attribute1','attribute2','attribute3','attribute4','attribute5','attribute6']
var stepContent=Skills.stepContent
var stepSelectBox=[1,0,0,0,0,0]
var stepDescription=ref(stepContent[0])

function stepDescriptionSetter(index){
  stepDescription.value=stepContent[index]
  for(let i=0;i<stepSelectBox.length;i++){
    stepSelectBox[i]=0
  } 
  stepSelectBox[index]=1
}

var titleStyle='w-inner mx-auto p-sm font-bold text-font2 text-center border'
</script>

<template>
  <div class="whitespace-pre-line pb-96">
    <div class="title text-font1 m-xl">角色设想</div>
    <div :class="titleStyle" class="border-b-0">命途-属性</div>
    <div :class="titleStyle" class="border-t-0 text-primary">{{ Skills.baseContent }}</div>

    <div :class="titleStyle" class="mt-20">角色简述-技能概览</div>
    <div class="font-bold w-inner containerA justify-around p-xl mx-auto border border-t-0 border-b-0">
      <div>
        {{ Skills.roleDescription }}
      </div>
    </div>
    <div class="border mx-auto w-inner border-t-0 text-center pb-xl">
      <div class="" v-for="i,ii in Skills.skillContent" :key="ii">
        <div class="font-bold mt-sm">{{ skillTitle[ii] }}</div><div class="text-primary">{{ i }}</div>
      </div>
    </div>

    <div :class="titleStyle" class="mt-20">技能</div>

    <div class="w-inner containerA mx-auto  h-96 border border-t-0">
      <div id="skillBox" class="w-1/2 h-full containerA">
        <div class="containerB  w-1/3 h-full">
          <div class="w-full h-1/5" @click="skillDescriptionSetter(index)" v-for="skill,index in skillTitle" :key="skill">
            <div :class="'hover:cursor-pointer h-full w-full bg-gradient-to-r from-indigo-500 hover:to-cyan-200 text-white font-bold containerA '+(skillSelectBox[index]==1?'to-cyan-200':'')">
              <div class="mx-md">{{ skill }}</div>
          </div>
          </div>
        </div>
        <div class="w-2/3 p-md font-bold">
          {{ skillDescription }}
        </div>
      </div>
      
      <div id="roleFigure" class="w-1/2 h-full">
        <div class="w-full h-full" :style="image"></div>
      </div>
    </div>

    <div :class="titleStyle" class="mt-20">行迹</div>

    <div class="w-inner containerB mx-auto h-72 border border-t-0">
      <div class="containerA justify-around w-full">
        <div class="w-24 h-24" @click="stepDescriptionSetter(index)" v-for="step,index in stepTitle" :key="step">
          <div :class="'font-bold hover:cursor-pointer w-full h-full border containerA justify-center rounded-full m-md hover:border-indigo-500 '+(stepSelectBox[index]==1?'border-indigo-500':'')">
            {{ step }}
          </div>
        </div>
      </div>

      <div class="w-full p-xxl font-bold">
      {{ stepDescription }}
      </div>
    </div>

    <div :class="titleStyle" class="mt-20">80级2弹状态角色属性</div>
    <div class="w-inner containerA justify-around p-xl  mx-auto border border-t-0">
      <div class="space-y-sm " v-for="i,ii in Skills.baseAttributes" :key="ii">
        <div class="font-bold">{{ ii }}</div><div class="text-primary">{{ i }}</div>
      </div>
    </div>

    <div :class="titleStyle" class="mt-20 border">80级专武精1</div>
    <div class="w-inner containerA justify-around p-xl pb-sm  mx-auto border border-t-0 border-b-0">
      <div class="space-y-sm " v-for="i,ii in Skills.weaponAttributes" :key="ii">
        <div class="font-bold">{{ ii }}</div><div class="text-primary">{{ i }}</div>
      </div>
    </div>
    <div class="border mx-auto w-inner border-t-0 text-center pb-xl">{{ Skills.weaponContent }}</div>
    <div :class="titleStyle" class="mt-20 border text-primary">数值测试：<a href="http://1.13.254.14/SR/roleTest/role.html">http://1.13.254.14/SR/roleTest/role.html</a></div>

  </div>
</template>

<style scoped>
#roleFigure div{
  background-size: cover;
  background-position: center;
}
</style>

import { Buff, SingleAttribute } from "./baseConstructure.js";
import { Weapon, EquipBuff, Figure, Skill,Skills,FigureBuff } from "./items.js";
import weapons from '../assets/weapon.json' assert {type:'json'}
import figures from '../assets/figure.json' assert {type:'json'}
import skills from '../assets/skill.json' assert {type:'json'}
import equipBuffs from '../assets/equipBuff.json' assert {type:'json'}
import figureBuffs from '../assets/figureBuff.json' assert {type:'json'}

var weaponList={}
for(let i of Object.keys(weapons)){
    let buffTemp=weapons[i]
    let buffFix=new Buff(0,buffTemp.buffFix)
    let buffProportion=new Buff(1,buffTemp.buffProportion)
    weaponList[i]=new Weapon(buffFix,buffProportion)
}

var figureList={}
for(let i of Object.keys(figures)){
    let buffTemp=figures[i]
    let buffFix=new Buff(0,buffTemp.buffFix)
    let buffProportion=new Buff(1,buffTemp.buffProportion)
    figureList[i]=new Figure(buffFix,buffProportion)
}

var figureBuffList={}
for(let i of Object.keys(figureBuffs)){
    let buffTemp=figureBuffs[i]
    let buffFix=new Buff(0,buffTemp.buffFix)
    let buffProportion=new Buff(1,buffTemp.buffProportion)
    figureBuffList[i]=new FigureBuff(buffFix,buffProportion)
}

var equipBuffList={}
for(let i of Object.keys(equipBuffs)){
    let buffTemp=equipBuffs[i]
    let buffFix=new Buff(0,buffTemp.buffFix)
    let buffProportion=new Buff(1,buffTemp.buffProportion)
    equipBuffList[i]=new EquipBuff(buffFix,buffProportion)
}

var skillList={}
for(let i of Object.keys(skills)){
    let buffTemp=skills[i]
    let pugong=new Skill('A',new SingleAttribute(buffTemp.A.pugong))
    let zhanji=new Skill('A',new SingleAttribute(buffTemp.A.zhanji))
    let zuijia=new Skill('B',new SingleAttribute(buffTemp.B.zuijia))
    let dazhao=new Skill('B',new SingleAttribute(buffTemp.B.dazhao))
    skillList[i]=new Skills(pugong,zhanji,zuijia,dazhao)
}

class Assets{
    static figureList=figureList
    static equipBuffList=equipBuffList
    static weaponList=weaponList
    static skillList=skillList
    static figureBuffList=figureBuffList
}

export {Assets}

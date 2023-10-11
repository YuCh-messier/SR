import { Buff, Damage, SingleAttribute } from "./baseConstructure.js"

var outerKeys=Buff.outerKeys
var innerKeys=Buff.innerKeys

class BaseAttribute{
    static buffKeys=['buffFix','buffProportion']
    constructor(buffFix,buffProportion){
        this.buffFix=buffFix
        this.buffProportion=buffProportion    //weapon and figure,expect use [0][0] as base attributes
    }
}
class Weapon extends BaseAttribute{
    constructor(buffFix=new Buff(0),buffProportion=new Buff(1)){
        super(buffFix,buffProportion)
    }
}
class Figure extends BaseAttribute{
    constructor(buffFix=new Buff(0),buffProportion=new Buff(1)){
        super(buffFix,buffProportion)
    }
}
class EquipBuff extends BaseAttribute{
    constructor(buffFix=new Buff(0),buffProportion=new Buff(1)){
        super(buffFix,buffProportion)
    }
}
class FigureBuff extends BaseAttribute{
    constructor(buffFix=new Buff(0),buffProportion=new Buff(1)){
        super(buffFix,buffProportion)
    }
}

class Equip extends BaseAttribute{
    static defaultBigSet=new SingleAttribute({
        hp:0,
        atk:2,
        def:0,
        speed:0,
        rate:1,
        ratio:0,
        buff:1,
        antiResist:0,
        antiDef:0 
    })
    static defaultSmallSet=new SingleAttribute({
        hp:3,
        atk:3,
        def:2,
        speed:2,
        rate:10,
        ratio:10,
        buff:0,
        antiResist:0,
        antiDef:0
    })
    static defaultBig=new SingleAttribute({
        hp:0.432,
        atk:0.432,
        def:0.54,
        speed:25,
        rate:0.324,
        ratio:0.648,
        buff:0.388,
        antiResist:0,
        antiDef:0
    })
    static defaultSmall=(()=>{
        let temp=Equip.defaultBig.multiply(SingleAttribute.standardA(0.1))
        temp.buff=0
        return temp
    })()
    
    constructor(equipDecisionBig=Equip.defaultBigSet,equipDecisionSmall=Equip.defaultSmallSet){
        super(new Buff(0),new Buff(1))
        var buff1=equipDecisionBig.multiply(Equip.defaultBig)
        var buff2=equipDecisionSmall.multiply(Equip.defaultSmall)
        var buff3=buff1.plus(buff2)
        var speed=buff3.speed
        buff3.speed=0   
        this.buffProportion[outerKeys[0]][innerKeys[0]]=buff3
        this.buffFix[outerKeys[0]][innerKeys[0]].hp=704
        this.buffFix[outerKeys[0]][innerKeys[0]].atk=352
        this.buffFix[outerKeys[0]][innerKeys[0]].speed=speed
    }
}
class Role{
    constructor(figure,weapon,equip,equipBuff1,equipBuff2,figureBuff1,figureBuff2,figureBuff3){
        this.figure=figure
        this.weapon=weapon
        this.equip=equip     
        this.equipBuff1=equipBuff1
        this.equipBuff2=equipBuff2
        this.figureBuff1=figureBuff1
        this.figureBuff2=figureBuff2
        this.figureBuff3=figureBuff3
    }
    computeBuff(){
        let buffs=[]
        for(let key of BaseAttribute.buffKeys){
            buffs.push(this.figure[key])
            buffs.push(this.weapon[key])
            buffs.push(this.equip[key])
            buffs.push(this.equipBuff1[key])
            buffs.push(this.equipBuff2[key])
            buffs.push(this.figureBuff1[key])
            buffs.push(this.figureBuff2[key])
            buffs.push(this.figureBuff3[key])
        }
        return Buff.aggregateBuffByType(buffs)
    }
    panel(){
        let roleBase=this.figure.buffFix[outerKeys[0]][innerKeys[0]].plus(this.weapon.buffFix[outerKeys[0]][innerKeys[0]])
        let buffs=this.computeBuff()
        let buffFix=buffs[0]
        let buffProportion=buffs[1]
        let buffProportionPanel=Buff.buffProportionToPanel(roleBase,buffProportion)
        let panel=Buff.aggregateBuff([buffFix,buffProportionPanel])
        return panel
    }   
    attackTime(){
        return Damage.buffToDamage(this.panel())
    }
}

class Skill{
    constructor(attackType='A',attackRate=SingleAttribute.standardA(1)){
        this.attackRate=attackRate
        this.attackType=attackType
    }
    skillCoe(panel=SingleAttribute.standardA(100),other=1){
        let base=panel.multiply(this.attackRate)
        let res=0
        for(let key of SingleAttribute.keys){
            res+=base[key]
        }
        return res*other
    }
}
class Skills{
    constructor(
        pugong=new Skill(),
        zhanji=new Skill(),
        zuijia=new Skill('B'),
        dazhao=new Skill('B')
    ){
        this.pugong=pugong
        this.zhanji=zhanji
        this.zuijia=zuijia
        this.dazhao=dazhao
    }
}

class Enemy{
    constructor(antiResist=0,antiDef=0,shield=1,debuff=0,roleGrade=80,enemyGrade=85,etc=0){
        this.resist=this.resisitCompute(antiResist)
        this.defence=this.defenceCompute(roleGrade,enemyGrade,antiDef)
        this.shield=this.shieldCompute(shield)
        this.debuff=this.debuffCompute(debuff)
        this.etc=this.etcCompute(etc)
    }
    resisitCompute(anti=0,moreResist=0){
        return 1+anti-moreResist
    }
    defenceCompute(roleGrade=80,enemyGrade=85,antiDef=0){
        return (roleGrade+20)/(roleGrade+20+(enemyGrade+20)*(1-antiDef))
    }
    shieldCompute(shield=0){
        return shield==0?1:0.9
    }
    debuffCompute(debuff=0){
        return 1+debuff
    }
    etcCompute(etc=0){
        return 1+etc
    }
    enemyCoe(){
        var res=this.resist*this.shield*this.defence*this.debuff*this.etc
        return res
    }    
}

export {Weapon}
export {Equip}
export {EquipBuff}
export {FigureBuff}
export {Figure}
export {Role}
export {Enemy}
export {Skill}
export {Skills}

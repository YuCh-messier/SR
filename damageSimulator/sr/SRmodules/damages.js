import { Enemy } from "./items.js"
import { Damage } from "./baseConstructure.js"

class Attack extends Damage{
    constructor(damage,skills){
        super(damage)
        this.skills=skills
    }
    doit(enemySetting={shield:1,debuff:0,roleGrade:80,enemyGrade:85,etc:0},otherBuff={pugong:1,zhanji:1,zuijia:1,dazhao:1}){
        return this.damage(enemySetting,otherBuff)
    }
    attackCoe(otherBuff){
        for(let i of this){
            let skillA=['pugong','zhanji']
            let skillB=['zuijia','dazhao']
            let skillName=i['key2']=='attackA'?skillA:skillB
            let att=i['value']
            att.rate=(att.rate>1?1:att.rate)
            this[i['key1']][i['key2']]={}
            for(let skill of skillName){
                let base=this.skills[skill].skillCoe(att,otherBuff[skill])
                let temp={
                        buff:att,
                        skill:this.skills[skill].attackRate,
                        base:base,
                        coeFuck:base*(att.ratio+1)*(att.buff+1),
                        coeUnfuck:base*(att.buff+1),
                }
                temp['coeExp']=temp.coeFuck*(att.rate)+temp.coeUnfuck*(1-att.rate)
                this[i['key1']][i['key2']][skill]=temp
            }
        }
    }

    damage(enemySetting,otherBuff){
        this.attackCoe(otherBuff)
        for(let i of this){
            let skillA=['pugong','zhanji']
            let skillB=['zuijia','dazhao']
            let skillName=i['key2']=='attackA'?skillA:skillB
            for(let skill of skillName){
                let temp=this[i['key1']][i['key2']]
                let enemy=new Enemy(
                    temp[skill].buff.antiResist,
                    temp[skill].buff.antiDef,
                    enemySetting.shield,
                    enemySetting.debuff,
                    enemySetting.roleGrade,
                    enemySetting.enemyGrade,
                    enemySetting.etc
                )
                let enemyCoe=enemy.enemyCoe()
                temp[skill]['enemyCoe']=enemyCoe
                temp[skill]['damageFuck']=enemyCoe*temp[skill]['coeFuck']
                temp[skill]['damageUnfuck']=enemyCoe*temp[skill]['coeUnfuck']
                temp[skill]['damageUnfuck']=enemyCoe*temp[skill]['coeUnfuck']
                temp[skill]['damageExp']=enemyCoe*temp[skill]['coeExp']
            }
        }
        let res={
            constant:{
                pugong:this.constant.attackA.pugong,
                zhanji:this.constant.attackA.zhanji,
                zuijia:this.constant.attackB.zuijia,
                dazhao:this.constant.attackB.dazhao,
            },
            conditonal:{
                pugong:this.conditional.attackA.pugong,
                zhanji:this.conditional.attackA.zhanji,
                zuijia:this.conditional.attackB.zuijia,
                dazhao:this.conditional.attackB.dazhao,
            }
        }
        return res
    }
}

export {Attack}
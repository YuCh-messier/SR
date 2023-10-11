class Setting{
    static dTC={
        buff:'面板',
        skill:'技能倍率',
        base:'面板*倍率',
        coeFuck:'暴击基础伤害',
        coeUnfuck:'不暴击基础伤害',
        coeExp:'基础伤害期望',
        enemyCoe:'敌方系数',
        damageFuck:'最终暴击伤害',
        damageUnfuck:'最终不暴击伤害',
        damageExp:'最终伤害期望'
      }
    static dTC2={
        hp:'生命值',
        atk:'攻击力',
        def:'防御',
        speed:'速度',
        rate:'暴击率',
        ratio:'暴击伤害',
        buff:'增伤',
        antiResist:'抗性穿透',
        antiDef:'防御穿透'
    } 
    static dTC3={
        constant:'常驻',
        conditional:'条件'
    }
    static dTC4={
        pugong:'普攻',
        zhanji:'战技',
        zuijia:'追加',
        dazhao:'大招',
    }
    static dTC5={
        total:'全体加成',
        attackA:'普攻战技加成',
        attackB:'追加大招加成'
    }
    static dTC6={
        figure:'人物',
        weapon:'武器',
        equipBuff1:'外圈Buff',
        equipBuff2:'内圈Buff',
        equip:'装备词条',
        skill:'技能组',
        otherSetting:'其他',
        figureBuff1:'辅助1',
        figureBuff2:'辅助2',
        figureBuff3:'辅助3'
    }
    static dTC7={
        hp:'( 4.3% , ≈80±15 )',
        atk:'( 4.3% , ≈40±8 )',
        def:'( 5.4% , ≈40±10 )',
        speed:'( 2.5 )',
        rate:'( 3.24% )',
        ratio:'( 6.48% )',
        buff:'( 大词条为38.8% )',
        antiResist:'( 0 )',
        antiDef:'( 0 )'
    } 
    static dTC8={
        shield:'有盾1无盾0',
        debuff:'易伤',
        roleGrade:'我方等级',
        enemyGrade:'敌人等级',
        etc:'额外补正'
    }
    static setLocal(id,obj){
        obj=JSON.stringify(obj)
        localStorage.setItem(id,obj)
    }
    static getLocal(id){
        return JSON.parse(localStorage.getItem(id))
    }
    static deleteLocal(id){
        localStorage.removeItem(id)
    }
    static checkLocal(id){
        if(Setting.getLocal(id)==null){
            return false
        }
        return true
    }
}

export {Setting}
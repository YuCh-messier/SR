class SingleAttribute{
    static keys=['hp','atk','def','speed','rate','ratio','buff','antiResist','antiDef']
    static keysF=['hp','atk','def','speed']
    static keysP=['rate','ratio','buff','antiResist','antiDef']
    constructor(obj={
        hp:0,
        atk:0,
        def:0,
        speed:0,
        rate:0,
        ratio:0,
        buff:0,
        antiResist:0,
        antiDef:0
    }){

        for(let key of SingleAttribute.keys){
            this[key]=obj[key]
        }
    }
    plus(item){
        var res=new SingleAttribute()
        for(let key of SingleAttribute.keys){
            res[key]=this[key]+item[key]
        }
        return res
    }
    multiply(item){
        var res=new SingleAttribute()
        for(let key of SingleAttribute.keys){
            res[key]=this[key]*item[key]
        }
        return res
    }
    show(){
        let res=[]
        for(let key of SingleAttribute.keys){
            res.push(this[key])
        }
        return res
    }
    static pTF(base,item){
        var res=new SingleAttribute()
        for(let key of SingleAttribute.keysF){
            res[key]=base[key]*item[key]
        }
        for(let key of SingleAttribute.keysP){
            res[key]=item[key]
        }
        return res
    }
    static standardA(num){
        let res=new SingleAttribute()
        for(let key of SingleAttribute.keys){
            res[key]=num
        }
        return res
    }
}

class BaseConstructure{
    static outerKeys=['constant','conditional']
    static innerKeys=['total','attackA','attackB']
    constructor(obj){
        for(let key1 of BaseConstructure.outerKeys){
            this[key1]={}
            for(let key2 of BaseConstructure.innerKeys){
                let temp=obj[key1][key2]
                this[key1][key2]=new SingleAttribute(temp)
            }
        }
        this[Symbol.iterator]=this.generetor
    }
    generetor=function* (){
        for(let key1 of BaseConstructure.outerKeys){
            for(let key2 of BaseConstructure.innerKeys){
                yield {
                    key1:key1,
                    key2:key2,
                    value:this[key1][key2]
                }
            }
        }
    }
    show(){
        let object={}
        for(let e of this){
            object[e.key1+','+e.key2]=e.value.show()
        }
        return object
    }
}
class Buff extends BaseConstructure{
    constructor(buffType=0,
        obj=(()=>{
            let res={}
            for(let key1 of Buff.outerKeys){
                res[key1]={}
                for(let key2 of Buff.innerKeys){
                    res[key1][key2]=new SingleAttribute()
                }
            }
            return res
        })()){

        super(obj)
        this.buffType=buffType
    }

    plus(buffAdd){
        let buffRes=new Buff(this.buffType)
        for(let key1 of Buff.outerKeys){
            for(let key2 of Buff.innerKeys){
                buffRes[key1][key2]=this[key1][key2].plus(buffAdd[key1][key2])
            }
        }
        return buffRes
    }
    static aggregateBuff(buffs){
        let buffRes=new Buff(buffs[0].buffType)
        for(let buff of buffs){
            buffRes=buffRes.plus(buff)
        }
        return buffRes
    }
    static aggregateBuffByType(buffs){
        let buff0=[]
        let buff1=[]
        for(let buff of buffs){
            if(buff.buffType==0){
                buff0.push(buff)
            }
            else{
                buff1.push(buff)
            }
        }
        let buffRes0=Buff.aggregateBuff(buff0)
        let buffRes1=Buff.aggregateBuff(buff1)
        
        return [buffRes0,buffRes1]
    }
    static buffProportionToPanel(base,buff){
        let buffRes=new Buff(0)
        for(let i of buff){
            buffRes[i.key1][i.key2]=SingleAttribute.pTF(base,i.value)
        }
        return buffRes
    }
}

class Damage{
    static outerKeys=['constant','conditional']
    static innerKeys=['attackA','attackB']
    constructor(obj){
        for(let key1 of Damage.outerKeys){
            this[key1]={}
            for(let key2 of Damage.innerKeys){
                this[key1][key2]=obj[key1][key2]
            }
        }
        this[Symbol.iterator]=this.generetor
    }
    generetor=function* (){
        for(let key1 of Damage.outerKeys){
            for(let key2 of Damage.innerKeys){
                yield {
                    key1:key1,
                    key2:key2,
                    value:this[key1][key2]
                }
            }
        }
    }
    static buffToDamage(panel){
        let outerKeys=BaseConstructure.outerKeys
        let innerKeys=BaseConstructure.innerKeys
        let constantPanel=panel[outerKeys[0]][innerKeys[0]]
        let constantAttacks={
            attackA:constantPanel.plus(panel[outerKeys[0]][innerKeys[1]]),
            attackB:constantPanel.plus(panel[outerKeys[0]][innerKeys[2]]),
        }
        let conditionalPanel=constantPanel.plus(panel[outerKeys[1]][innerKeys[0]])
        let conditionalAttacks={
            attackA:conditionalPanel.plus(panel[outerKeys[1]][innerKeys[1]]).plus(panel[outerKeys[0]][innerKeys[1]]),
            attackB:conditionalPanel.plus(panel[outerKeys[1]][innerKeys[2]]).plus(panel[outerKeys[0]][innerKeys[2]]),
        }
        let temp={
            constant:constantAttacks,
            conditional:conditionalAttacks
        }
        return new Damage(temp)
    }
}



export {Buff}
export {SingleAttribute}
export {Damage}


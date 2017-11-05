var judgeNumBetween=function(num,base){
    //判断num数据哪两个base数字之间 num =90 
    var baseKeys=[];
    var minKey=0;
    var maxKey=0;
    var arr=[];
    for(var key in base){
        //提取baseSymbol的key值到数组
        baseKeys.push(key);
    }
    for(var i=0;i<baseKeys.length;i++){
        //找到最小值
        if(baseKeys[i]>num){
            maxKey=baseKeys[i];
            break;
        }
        minKey = baseKeys[i];
    }
    arr.push(minKey);
    arr.push(maxKey)
    return arr;
};


var convertAdd=function(num,base,isOver){
//转换以加为主 90
var arr=[];
var result='';
if(isOver){
    //当num值大于1000时循环添加M
    var len =num/1000;
    var romanSymbol='M';
    for(var i=0;i<len;i++){
        result +=romanSymbol;
    }
    return result;
}
arr = judgeNumBetween(num,base);
var remainder= num % arr[0];//获取num不能被范围最小值整除的余数
var countNum= Math.floor(num/arr[0]);//获取num被arr[0]整除的个数
for(var i=0;i<countNum;i++){
    result += base[arr[0]];
}
if(remainder !==0){
    //当余数不为0时，则找到范围最小值arr[0]在base对象中的前一个key，并用该key值去整除余数
    var keysArr=Object.keys(base);
  var lowerNum= keysArr[(keysArr.indexOf(arr[0])-1)];
  for(var i=0;i<remainder/lowerNum;i++){
    result += base[lowerNum];
}
    }
return result;
};


var convertSub=function(num,base){
//转换以减为主
var result='';
var arr=[];
arr = judgeNumBetween(num,base);
var toMax=(arr[1]-num);//获取num到最大值的差值
var remainder= toMax % arr[0];//获取差值不能被范围最小值整除的余数
var numToMax=Math.floor(toMax/arr[0]);//获取差值能被范围最小值整除的商

for(var i=0;i<numToMax;i++){
    result += base[arr[0]];
}
if(remainder!==0){
    //当余数不为0时，则找到范围最小值arr[0]在base对象中的前一个key，并用该key值去整除余数
    var keysArr=Object.keys(base);
    var lowerNum= keysArr[(keysArr.indexOf(arr[0])-1)];
    for(var i=0;i<remainder/lowerNum;i++){
      result += base[lowerNum];
    }
}
result += base[arr[1]];
return result;
};


var getMaxNum=function(str){
//找出字符串中字母出现最多的次数，返回次数
    var obj={};
    for(var i=0;i<str.length;i++){
        if(obj[str[i]]){
            obj[str[i]]++;
        }else{
            obj[str[i]]=1;
        }
    }
    var max=0;
    for(var key in obj){
        if(obj[key]>max){
            max = obj[key];
        }
    }
    return max;
};

function convert(num) {
    var base={
      1:'I',
      5:'V',
      10:'X',
      50:'L',
      100:'C',
      500:'D',
      1000:'M'
    };
    //每个字母不能超过3次
    //XI=X+I=>6
    //IX=X-I=>5-1=4
    var sNum=num+'';
    var numArr=[];
    for(var i=1,j=sNum.length-1;j>=0;j--){
        if(sNum[j] === '0'){
            i *=10;
            continue;
        }
        numArr.unshift((sNum[j]-0)*i);
        i *=10;
    }
    for(var i=0;i<numArr.length;i++){
        var key = numArr[i];
        var romanNumerals='';
        var isOver=false;
        if(key<1000){
            var times=3;
            romanNumerals = convertAdd(key,base,isOver);
            if(getMaxNum(romanNumerals)>times){
                romanNumerals = convertSub(key,base);
            }
            numArr[i] = romanNumerals;
        }else{
            isOver=true;
            numArr[i]= convertAdd(key,base,isOver);
        }
    }

   return numArr.join('');
  }
  
 console.log(convert(1000));
  
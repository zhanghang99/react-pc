/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-09 16:11:19
 * @LastEditTime: 2019-09-25 10:43:54
 * @LastEditors: Please set LastEditors
 */
function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');  // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(routePath =>
    routePath.indexOf(path) === 0 && routePath !== path);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map((item) => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/**
 * @description: 数据容错处理judgment(res, ['data', 'data', 'key'], 'Array',true)
 * @param {res:初始数据}
 * @param {arr:目标数据的所有key的组合,目标数据:res.data.data.key,所有key的组合:['data', 'data', 'key'],当所有key都不存在时传[]}
 * @param {type:目标数据的数据类型}
 * @param {isEmpty:判断是否需要检测目标数据Array或者Object时内容为空，true：需要判断，false:不需要判断，非必要字段}
 */
export function judgment(res, arr, type, isEmpty) {
    try {
        let value = res;
        if (arr.length) {
            arr.forEach(v => {
                value = value[v];
            });
        }
        const toString = Object.prototype.toString.call(value).slice(8, -1);
        if (isEmpty) {
            if ((type === 'Array' && value.length === 0) || (type === 'Object' && Object.keys(value).length === 0)) {
                return false;
            }
        }
        if (toString === type) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

/**
 * @description: 输入内容验证
 * @param {data:传入参数必须为对象(data:{value:'',JudgeNullValue:true,...})}
 * @param {value:内容，必传}
 * @param {JudgeNullValue:判断是否为空，非必传,值:true}
 * @param {JudgeLengthLimit:判断是否超限数，非必传,值:10}
 * @param {JudgePhone:判断是否为手机号(内地)，非必传,值:true}
 * @param {JudgeTrim:返回去掉前后空格的值，非必传,值:true}
 * @param {JudgeNumber:判断是否为数值，非必传,值:true}
 * @param {JudgeSpecial:判断是否有特殊字符，特殊字符自己传进来(值格式：/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/)，非必传}
 * @param {JudgeEmail:判断是否正确邮件格式，@前中英文都可，不能特殊字符，非必传,值:true}
 * @param {JudgeEscape:返回转码值，注：escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z，非必传,值:true}
 * @return: 返回true、false、值，true表示通过验证，false表示没通过，值表示根据要求处理过的值
 */
export function InputVerification(data) {
  const type = Object.prototype.toString.call(data);
  if (type !== '[object Object]') return '请传入对象参数值';
  try {
      // 非空判断，排除数字0
      if (data.JudgeNullValue) {
          if (!!!data.value && data.value !== 0) {
              return Object.assign({ JudgeNullValue: false });
          }
          Object.assign(data, { JudgeNullValue: true });
      }
      // 长度限制判断
      if (data.JudgeLengthLimit) {
          if (data.value.length > data.JudgeLengthLimit) {
              Object.assign(data, { JudgeLengthLimit: false });
          } else {
              Object.assign(data, { JudgeLengthLimit: true });
          }
      }
      // 手机号码判断
      if (data.JudgePhone) {
          if (!/^1[3456789]\d{9}$/.test(data.value)) {
              Object.assign(data, { JudgePhone: false });
          } else {
              Object.assign(data, { JudgePhone: true });
          }
      }
      // 删除支付窜前后空格
      if (data.JudgeTrim) {
          if (data.value !== 0 && !Number(data.value)) {
              Object.assign(data, { JudgeTrim: data.value.trim() });
          } else {
              Object.assign(data, { JudgeTrim: data.value });
          }
      }
      // 数字判断
      if (data.JudgeNumber) {
          if (!Number(data.value) && data.value !== 0) {
              Object.assign(data, { JudgeNumber: false });
          } else {
              Object.assign(data, { JudgeNumber: true });
          }
      }
      // 特殊字符判断
      if (data.JudgeSpecial) {
          const reg = new RegExp(data.JudgeSpecial, 'im');
          if (!reg.test(data.value)) {
              Object.assign(data, { JudgeSpecial: false });
          } else {
              Object.assign(data, { JudgeSpecial: true });
          }
      }
      // 邮箱判断(@前中英文都可以，不能特殊字符)
      if (data.JudgeEmail) {
          const reg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$');
          if (!reg.test(data.value)) {
              Object.assign(data, { JudgeEmail: false });
          } else {
              Object.assign(data, { JudgeEmail: true });
          }
      }
      // 转码
      if (data.JudgeEscape) {
          Object.assign(data, { JudgeEscape: escape(data.JudgeEscape) });
      }
      return data;
  } catch (err) {
      console.log(err);
      return false;
  }
};
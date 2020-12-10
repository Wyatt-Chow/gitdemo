/**
 * 过滤器
 * @description: 过滤器 
 * @author : sunersheng<sunersheng@szzt.com> 2018-09-21
 * @version 1.0.0
 */
import Vue from 'vue';
import moment from 'moment';
/**
 * 时候格式化
 * value 需要格式化的时间
 * formatString 格式
 * 例子： {{ item.startTime | date() }}
 */
Vue.filter('date', function(value = '', formatString = 'YYYY-MM-DD HH:mm:ss') {
    if (!value) return;   
    return moment(value).format(formatString);
});

/**
 * utils.js中text方法的过滤器实现 * 
 * 例子： 假设types = [ { value:1,text:'管理员'} ]; 列表数据行对象变量item, item.val = 1;
 * {{ item.type | text(item.val, types) }}
 * 则type列将展示文本  “管理员”
 */
Vue.filter('text', (val, items, itemkeyname = 'value', itemtextname = 'text') => {
    if (typeof val === 'undefined') {
        return '';
    }
    if (Array.isArray(items)) {        
        let it = items.find( item => (val === item[itemkeyname]) || ( parseInt(val) === parseInt(item[itemkeyname]) ) );
        return it[itemtextname];
    }    
    return '';
});


/**
 * 参数替换
 */
Vue.filter('replace', (string, replaceParams = []) => {
    if (string) {
        replaceParams.forEach((value, index) => {
            string = string.replace(/{\w+}/, replaceParams[index]);
        });
        return string;
    }
    return string;
});
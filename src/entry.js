import css from './css/index.css';
import less from './css/black.less';
import sass from './css/bb.scss';

let myStr = 'HEllo JSPang12345678';
document.getElementById('title').innerHTML = myStr;
console.log(css, less, sass, '222');
$('#title').html('Hello chunGold');

// var mjson = require('../config.json');
import mjson from '../config.json';
document.getElementById('json').innerHTML = mjson.name + mjson.website + '反反复复';
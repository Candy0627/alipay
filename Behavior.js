const wx2my = require('./wx2my');

const Behavior = require('./Behavior');

// Create by wx2my.

module.exports = function Behavior(obj) {
const keyMap = {
properties: 'props',

created: 'onInit',

attached: 'didMount',

detached: 'didUnmount'

};

Object.keys(keyMap).forEach(key => {
if (Object.prototype.hasOwnProperty.call(obj, key)) {
obj[keyMap[key]] = obj[key];

delete obj[key];

}

}); // if exist lifetimes replace others.

 

if (obj.lifetimes) {
const keyMap = {
created: 'onInit',

attached: 'didMount',

detached: 'didUnmount'

};

const lifetimesObj = obj.lifetimes;

Object.keys(keyMap).forEach(key => {
if (Object.prototype.hasOwnProperty.call(lifetimesObj, key)) {
obj[keyMap[key]] = lifetimesObj[key];

}

});

delete obj.lifetimes;

}

 

return obj;

};
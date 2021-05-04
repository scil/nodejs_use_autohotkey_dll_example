const ffi = require('ffi-napi');

const dll_type = process.arch=='x64'?'x64w':'W32w'

const 
 libPath = `D:/A/ahk/AutoHotkey_H/ahkdll-v1-release-master/${dll_type}_MT/AutoHotkey.dll`;
// libPath = `D:/A/ahk/AutoHotkey_H/ahkdll-v1-release-master/${dll_type}/AutoHotkey.dll`;

function showText(text, encoding='utf8') {
  return new Buffer.from(text, encoding).toString('binary');
};

/**
autohotkey.dll 中的函数签名，可参考 luajit 或 c# 版本的包装
- https://github.com/goreliu/luajit-ahk/blob/master/src/ahk.lua
- https://github.com/amazing-andrew/AutoHotkey.Interop/blob/master/src/AutoHotkey.Interop/AutoHotkeyDll.cs

通过调用，理解各函数的作用
- https://github.com/amazing-andrew/AutoHotkey.Interop/blob/master/src/AutoHotkey.Interop/AutoHotkeyEngine.cs
  - Reset
  - Suspend
  - Terminate
  - ...
*/
const  ahkdll = new ffi.Library(libPath, {
  'ahkTextDll': 
  [
    'int32', 
    ['string','string','string'] 
  ],
});

ok = ahkdll.ahkTextDll(
    showText('Msgbox I am AHK  /n MouseMove, 0,0  '), showText('') ,showText('TITLE') 

console.log(ok)


const fs = require('fs');
ahk_script_string = fs.readFileSync("D:/vagrant/www/kids_friends_electron/src/assets/ahk/kids_friends.ahk",'utf8')

ok = ahkdll.ahkTextDll(
    showText(ahk_script_string,'utf16le'), showText('') ,showText('TITLE','utf16le') 
);
console.log(ok)


// return

// 通过ffi加载user32.dll
const myUser32 = new ffi.Library('user32', {
  'MessageBoxW': // 声明这个dll中的一个函数
    [
      'int32', 
      ['int32', 'string', 'string', 'int32'], 
    ],
});

const isOk = myUser32.MessageBoxW(
    0, 
    showText('I am user32!','ucs2'), 
    showText('Hello, World!','ucs2'), 
    1
);
// console.log(isOk);

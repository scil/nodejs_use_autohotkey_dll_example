const ffi = require('ffi-napi');

const dll_type = process.arch=='x64'?'x64w':'W32w'

const 
 libPath = `D:/A/ahk/AutoHotkey_H/ahkdll-v1-release-master/${dll_type}_MT/AutoHotkey.dll`;
// libPath = `D:/A/ahk/AutoHotkey_H/ahkdll-v1-release-master/${dll_type}/AutoHotkey.dll`;

function T(text, encoding='utf16le') {
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
    ahkTextDll:  [ 'int32',  ['string','string','string']  ],
    ahkassign: ['int', ['string', 'string']],
    ahkgetvar: ['string', ['string', 'uint']],
});

ok = ahkdll.ahkTextDll(
    T('Msgbox I am AHK  /n MouseMove, 0,0  '), T('') ,T('TITLE') 
    )

console.log(ok)

    
ahkdll.ahkassign(T('var1'), T('3') );
console.log('var1 is ' + ahkdll.ahkgetvar(T('var1'),0) );

const fs = require('fs');
ahk_script_string = fs.readFileSync("D:/vagrant/www/kids_friends_electron/src/assets/ahk/kids_friends.ahk",'utf8')

ok = ahkdll.ahkTextDll(
    T(ahk_script_string),  T('') , T('TITLE') 
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
    T('I am user32!','ucs2'),  // 'ucs-2': Aliases of 'utf16le'
    T('Hello, World!','ucs2'), 
    1
);
// console.log(isOk);

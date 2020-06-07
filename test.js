const assert = require("assert");

//为了方便观看 数字采用十六进制
var RAM = new Array(2 ** 12); //主存
var ACC; //寄存器
RAM[0x1] = (x) => (ACC = RAM[x]);
RAM[0x2] = (x) => (ACC *= RAM[x]);
RAM[0x3] = (x) => (ACC += RAM[x]);
RAM[0x4] = (x) => (RAM[x] = ACC);
RAM[0x5] = (x) => console.log(RAM[x]);
RAM[0x6] = (x) => process.exit(); //停机

RAM[0x10] = 1; //x
RAM[0x11] = 2; //a
RAM[0x12] = 3; //b
RAM[0x13] = 4; //c
//程序开始的地址码
var begin_of_progam = 0x100;
var run = begin_of_progam;
//前一位为操作码后三位为地址码
RAM[run++] = 0x1010;
RAM[run++] = 0x2011;
RAM[run++] = 0x3012;
RAM[run++] = 0x2010;
RAM[run++] = 0x3013;
RAM[run++] = 0x4014;
RAM[run++] = 0x5014;
RAM[run++] = 0x6014;

function print(str) {
  console.log(str);
}

while (true) {
  run = RAM[begin_of_progam++];
  var func = run >> 12;
  run = run & 0xfff;
  RAM[func](run);
}

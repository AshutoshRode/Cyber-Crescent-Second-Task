(()=>{"use strict";const e=window.React,t=window.wp.blocks,a=window.wp.blockEditor;(0,t.registerBlockType)("ashutosh-task/data-block",{title:"Ashutosh Rode (Task-Display Data from API)",icon:"database",category:"widgets",edit:function(){const t=(0,a.useBlockProps)();return(0,e.createElement)("div",{...t,className:"admin-page"},(0,e.createElement)("p",null,"Data from API will display here in frontend."))},save:()=>null})})();
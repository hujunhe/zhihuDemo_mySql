webpackJsonp([0],{"+Soc":function(t,s,i){"use strict";s.a={props:["showStatus"],data:function(){return{disscusData:[],showDiss:this.showStatus.showStatus,sendData:{disscus:"",replyCode:Number,replyName:String,placeholder:"写下你的评论"},childData:{status:!1,dissCount:Number}}},methods:{closeDissBox:function(){this.$emit("childData",this.childData)},likeDisscus:function(t){var s=this;this.$http.get("/api/likeThisDisscus?disscusCode="+this.disscusData[t].disscusCode+"&r="+Math.random()).then(function(i){i.body.success&&("点赞"===i.body.message?(s.disscusData[t].likeCount+=1,console.log(1)):(s.disscusData[t].likeCount-=1,console.log(2)))})},sendDisscus:function(){var t=this;if(0===this.sendData.disscus.replace(/(^\s*)|(\s*$)/g,"").length)return alert("未填写内容"),!1;this.$http.post("/api/sendDiscuss",{questCode:parseInt(this.showStatus.codeNum),disscus:this.sendData.disscus,replyCode:this.sendData.replyCode,replyName:this.sendData.replyName}).then(function(s){s.body.success?(alert("评论成功"),t.disscusData=s.body.data,t.sendData.disscus="",t.sendData.replyCode=0,t.sendData.replyName=""):alert(s.body.message)})},reply:function(t){this.sendData.replyCode=this.disscusData[t].userCode,this.sendData.replyName=this.disscusData[t].userName,this.sendData.placeholder="回复"+this.disscusData[t].userName+":"},getDissList:function(){var t=this;this.$http.get("/api/getQuestDiscuss?code="+parseInt(this.showStatus.codeNum)+"&r="+Math.random()).then(function(s){if(s.body.success)return t.disscusData=s.body.data,t.DissList})}},computed:{showList:function(){return this.showStatus.showStatus&&(this.getDissList(),this.childData.dissCount=this.disscusData.length),this.disscusData.length}}}},0:function(t,s){},"3Nd4":function(t,s,i){"use strict";i("DuJU"),i("sx+N"),i("hXGm"),window.Quill||(window.Quill=i("hTA/")),s.a={name:"quill-editor",data:function(){return{_content:"",defaultModules:{toolbar:[["bold","italic","blockquote","code-block",{header:1},{list:"ordered"},{list:"bullet"},{direction:"rtl"}],[{align:[]}],["clean"],["link","image","video"]]},loginStatus:!1,authorInfo:{}}},props:{content:String,value:String,disabled:Boolean,options:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize(),this.loginStatusFn()},beforeDestroy:function(){this.quill=null},methods:{initialize:function(){if(this.$el){var t=this;t.options.theme=t.options.theme||"snow",t.options.boundary=t.options.boundary||document.body,t.options.modules=t.options.modules||t.defaultModules,t.options.modules.toolbar=void 0!==t.options.modules.toolbar?t.options.modules.toolbar:t.defaultModules.toolbar,t.options.placeholder=t.options.placeholder||"Insert text here ...",t.options.readOnly=void 0!==t.options.readOnly&&t.options.readOnly,t.quill=new Quill(t.$refs.editor,t.options),(t.value||t.content)&&t.quill.pasteHTML(t.value||t.content),t.quill.on("selection-change",function(s){s?t.$emit("focus",t.quill):t.$emit("blur",t.quill)}),t.quill.on("text-change",function(s,i,e){var a=t.$refs.editor.children[0].innerHTML,n=t.quill.getText();"<p><br></p>"===a&&(a=""),t._content=a,t.$emit("input",t._content),t.$emit("change",{editor:t.quill,html:a,text:n})}),this.disabled&&this.quill.enable(!1),t.$emit("ready",t.quill)}},loginStatusFn:function(t){var s=this;this.$http.get("/api/loginStatus?r="+Math.random()).then(function(i){!0===i.body.success?(s.loginStatus=!0,s.authorInfo=i.body.userInfo,t&&t()):s.loginStatus=!1})},subAnswer:function(){var t=this;this.loginStatusFn(function(){t.$http.post("/api/sendAnswer",{questCode:parseInt(t.$route.params.id),r:Math.random(),content:t._content}).then(function(t){alert(t.body.message)})})}},computed:{authorStatus:function(){return!0===this.loginStatus&&this.authorInfo}},watch:{content:function(t,s){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,s){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,s){this.quill&&this.quill.enable(!t)}}}},"53Hg":function(t,s){},"6USk":function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"editorBox"},[i("div",{staticClass:"authorInfo clearFix"},[i("div",{staticClass:"answerEditor-leftPart clearFix"},[i("div",{staticClass:"headPart"},[i("img",{attrs:{src:t.authorInfo.headImg,alt:""}}),t._v(" "),i("div",{staticClass:"info"},[i("p",[t._v(t._s(t.authorInfo.userName))]),t._v(" "),t._m(0)])])]),t._v(" "),t._m(1)]),t._v(" "),i("div",{staticClass:"quill-editor"},[t._t("toolbar"),t._v(" "),i("div",{ref:"editor"})],2),t._v(" "),i("div",{staticClass:"subBox"},[i("p",[i("a",{staticClass:"options",attrs:{href:"#"}},[t._v("设置")]),i("a",{staticClass:"subAns",attrs:{href:"javascript:;"},on:{click:t.subAnswer}},[t._v("提交回答")])])])])},a=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("p",[i("span",[t._v("86")]),i("a",{staticClass:"editExp"},[t._v("编辑话题经验")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"answerEditor-rightPart"},[i("a",{attrs:{href:""}},[t._v("使用匿名身份回答")])])}],n={render:e,staticRenderFns:a};s.a=n},"D7+t":function(t,s){},DICR:function(t,s,i){"use strict";var e=i("wNU2"),a=i("Kb+U"),n=i("JON1"),o=i("kjrT");s.a={name:"app",data:function(){return{showEditor:"",title:""}},components:{topHearder:e.a,questionInfo:a.a,answerEditor:n.a,answerList:o.a},methods:{showAnsStatus:function(t){this.showEditor=!0===t&&"answerEditor"},showTitle:function(t){this.title=t}}}},DuJU:function(t,s){},HBDB:function(t,s){},I4To:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"app"}},[i("topHearder",{attrs:{title:t.title}}),t._v(" "),i("questionInfo",{on:{title:t.showTitle,showAnsBox:t.showAnsStatus}}),t._v(" "),i("div",{staticClass:"mainBody"},[i("div",{staticClass:"leftPart"},[i(t.showEditor,{tag:"component"}),t._v(" "),i("answerList")],1)])],1)},a=[],n={render:e,staticRenderFns:a};s.a=n},JON1:function(t,s,i){"use strict";function e(t){i("53Hg")}var a=i("3Nd4"),n=i("6USk"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},KF3J:function(t,s,i){"use strict";s.a={data:function(){return{answerList:[]}},methods:{getAnswerList:function(){var t=this,s=this;this.$http.get("/api/getAnswerList?code="+parseInt(s.$route.params.id)+"&r="+Math.random()).then(function(s){!0===s.body.success?t.answerList=s.body.data:alert(s.body.message)})},action:function(){}},mounted:function(){this.getAnswerList()}}},"Kb+U":function(t,s,i){"use strict";function e(t){i("s9i9")}var a=i("ue6Q"),n=i("znAv"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},LGeT:function(t,s){},M93x:function(t,s,i){"use strict";function e(t){i("D7+t")}var a=i("DICR"),n=i("I4To"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},N1vW:function(t,s,i){"use strict";i("DuJU"),i("sx+N"),i("hXGm"),window.Quill||(window.Quill=i("hTA/")),s.a={name:"quill-editor",data:function(){return{_content:"",defaultModules:{toolbar:[["bold","italic","underline","strike"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],[{direction:"rtl"}],[{size:["small",!1,"large","huge"]}],[{header:[1,2,3,4,5,6,!1]}],[{color:[]},{background:[]}],[{font:[]}],[{align:[]}],["clean"],["link","image","video"]]}}},props:{content:String,value:String,disabled:Boolean,options:{type:Object,required:!1,default:function(){return{}}}},mounted:function(){this.initialize()},beforeDestroy:function(){this.quill=null},methods:{initialize:function(){if(this.$el){var t=this;t.options.theme=t.options.theme||"snow",t.options.boundary=t.options.boundary||document.body,t.options.modules=t.options.modules||t.defaultModules,t.options.modules.toolbar=void 0!==t.options.modules.toolbar?t.options.modules.toolbar:t.defaultModules.toolbar,t.options.placeholder=t.options.placeholder||"Insert text here ...",t.options.readOnly=void 0!==t.options.readOnly&&t.options.readOnly,t.quill=new Quill(t.$refs.editor,t.options),(t.value||t.content)&&t.quill.pasteHTML(t.value||t.content),t.quill.on("selection-change",function(s){s?t.$emit("focus",t.quill):t.$emit("blur",t.quill)}),t.quill.on("text-change",function(s,i,e){var a=t.$refs.editor.children[0].innerHTML,n=t.quill.getText();"<p><br></p>"===a&&(a=""),t._content=a,t.$emit("input",t._content),t.$emit("change",{editor:t.quill,html:a,text:n})}),this.disabled&&this.quill.enable(!1),t.$emit("ready",t.quill)}}},watch:{content:function(t,s){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},value:function(t,s){this.quill&&(t&&t!==this._content?(this._content=t,this.quill.pasteHTML(t)):t||this.quill.setText(""))},disabled:function(t,s){this.quill&&this.quill.enable(!t)}}}},NHnr:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("MVSX"),a=i("M93x"),n=i("YaEn"),o=i("y0Fx"),r=i("xHD2"),c=i.n(r);e.a.use(o.a),e.a.use(c.a),e.a.config.productionTip=!1,new e.a({el:"#app",router:n.a,template:"<App/>",components:{App:a.a}})},"R3+v":function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"topNav"},[i("transition",{attrs:{name:"fadeIn",mode:"out-in"}},[t.show?i("div",{key:"userInfo",staticClass:"minWidth clearFix"},[i("div",{staticClass:"logoBox"},[i("svg",{staticClass:"Icon Icon--logo",staticStyle:{fill:"rgb(15, 136, 235)",height:"33px",width:"70px"},attrs:{viewBox:"0 0 200 91",width:"120",height:"53","aria-hidden":"true"}},[i("title"),t._v(" "),i("g",[i("path",{attrs:{d:"M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z","fill-rule":"evenodd"}})])])]),t._v(" "),i("div",{staticClass:"modelList"},[i("ul",[i("li",[i("a",{staticClass:"active",attrs:{href:"/"}},[t._v("首页")])]),t._v(" "),i("li",[i("a",{attrs:{href:"/"}},[t._v("发现")])]),t._v(" "),i("li",[i("a",{attrs:{href:"/"}},[t._v("话题")])])])]),t._v(" "),i("div",{staticClass:"searchBox clearFix"},[i("input",{attrs:{type:"text",name:"",value:"",placeholder:"搜索你感兴趣的内容..."}}),t._v(" "),i("a",{attrs:{href:"javascript:;"}},[i("svg",{staticClass:"Icon Icon--search",staticStyle:{height:"16px",width:"16px",fill:"#afbdcf"},attrs:{viewBox:"0 0 16 16",width:"16",height:"16","aria-hidden":"true"}},[i("title"),i("g",[i("path",{attrs:{d:"M12.054 10.864c.887-1.14 1.42-2.57 1.42-4.127C13.474 3.017 10.457 0 6.737 0S0 3.016 0 6.737c0 3.72 3.016 6.737 6.737 6.737 1.556 0 2.985-.533 4.127-1.42l3.103 3.104c.765.46 1.705-.37 1.19-1.19l-3.103-3.104zm-5.317.925c-2.786 0-5.053-2.267-5.053-5.053S3.95 1.684 6.737 1.684 11.79 3.95 11.79 6.737 9.522 11.79 6.736 11.79z"}})])])])]),t._v(" "),i("div",{staticClass:"askQuest"},[i("a",{attrs:{href:"javascript:;"},on:{click:t.login}},[t._v("提问")])]),t._v(" "),i("div",{staticClass:"personInfo"},[t.loginStatus?i("div",[i("ul",{staticClass:"loginAfter clearFix"},[i("li",[i("a",{attrs:{href:"javascript:;"},on:{click:function(s){t.showList(s,3)}}},[i("svg",{staticClass:"Icon Icon--news",staticStyle:{height:"20px",width:"20px"},attrs:{viewBox:"0 0 20 22",width:"20",height:"20","aria-hidden":"true"}},[i("title"),i("g",[i("path",{attrs:{d:"M2.502 14.08C3.1 10.64 2 3 8.202 1.62 8.307.697 9.08 0 10 0s1.694.697 1.797 1.62C18 3 16.903 10.64 17.497 14.076c.106 1.102.736 1.855 1.7 2.108.527.142.868.66.793 1.206-.075.546-.542.95-1.09.943H1.1C.55 18.34.084 17.936.01 17.39c-.075-.547.266-1.064.794-1.206.963-.253 1.698-1.137 1.698-2.104zM10 22c-1.417.003-2.602-1.086-2.73-2.51-.004-.062.02-.124.063-.17.043-.045.104-.07.166-.07h5c.063 0 .124.025.167.07.044.046.067.108.063.17-.128 1.424-1.313 2.513-2.73 2.51z"}})])])])]),t._v(" "),i("li",[i("a",{attrs:{href:"javascript:;"},on:{click:function(s){t.showList(s,2)}}},[i("svg",{staticClass:"Icon Icon--message",staticStyle:{height:"20px",width:"20px"},attrs:{viewBox:"0 0 20 20",width:"20",height:"20","aria-hidden":"true"}},[i("title"),i("g",[i("path",{attrs:{d:"M9 0C3.394 0 0 4.13 0 8c0 1.654.522 3.763 2.014 5.566.314.292.518.82.454 1.17-.165 1.488-.842 1.905-.842 1.905-.328.332.105.67.588.582 1.112-.2 2.07-.58 3.526-1.122.4-.202.464-.147.78-.078C11.524 17.764 18 14 18 8c0-3.665-3.43-8-9-8z"}}),i("path",{attrs:{d:"M19.14 9.628c.758.988.86 2.01.86 3.15 0 1.195-.62 3.11-1.368 3.938-.21.23-.354.467-.308.722.12 1.073.614 1.5.614 1.5.237.24-.188.563-.537.5-.802-.145-1.494-.42-2.545-.81-.29-.146-.336-.106-.563-.057-2.043.712-4.398.476-6.083-.926 5.964-.524 8.726-3.03 9.93-8.016z"}})])])])]),t._v(" "),i("li",[i("a",{staticClass:"headBtn",attrs:{href:"javascript:;"},on:{click:function(s){t.showList(s,1)}}},[i("img",{attrs:{src:t.userInfo.headImg,alt:"头像"}})])])]),t._v(" "),t.topheaderStatus.userShowList?i("div",{staticClass:"topHeaderPop people"},[i("ul",[i("li",[i("a",{attrs:{href:"#"}},[t._v("个人主页")])]),t._v(" "),i("li",[i("a",{attrs:{href:"#"}},[t._v("设置")])]),t._v(" "),i("li",[i("a",{attrs:{href:"#"},on:{click:t.logOut}},[t._v("退出")])])])]):t._e(),t._v(" "),t.topheaderStatus.messageShowList?i("div",{staticClass:"topHeaderPop message"},[i("div",{staticClass:"title"},[t._v("我的私信")]),t._v(" "),i("ul",[i("li",[i("div",{staticClass:"message_one clearFix"},[i("div",{staticClass:"left"},[i("img",{attrs:{src:t.userInfo.headImg,alt:""}})]),t._v(" "),i("div",{staticClass:"right"},[i("p",[t._v("知乎实验室")]),t._v(" "),i("p",[t._v("亲爱的胡钧赫你好")])])])])])]):t._e(),t._v(" "),t.topheaderStatus.remindShowList?i("div",{staticClass:"topHeaderPop remind"},[t._v("\n            提醒框\n          ")]):t._e()]):t._e(),t._v(" "),t.loginStatus?t._e():i("div",[i("ul",{staticClass:"loginBefore"},[i("li",[i("a",{attrs:{id:"logInBtn",href:"javascript:;"},on:{click:function(s){t.login()}}},[t._v("登陆")])]),t._v(" "),i("li",[i("a",{attrs:{id:"signInBtn",href:"#"}},[t._v("加入知乎")])])])])])]):i("div",{key:"questInfo",staticClass:"minWidth clearFix"},[i("h3",{staticStyle:{float:"left"}},[t._v(t._s(t.title))]),t._v(" "),i("div",{staticClass:"questionInfo"},[i("ul",[i("li",[i("a",{staticClass:"focusQuest",attrs:{href:"#"}},[t._v("关注问题")])]),t._v(" "),i("li",[i("a",{staticClass:"answert",attrs:{href:"#"}},[t._v("写回答")])])])])])])],1)},a=[],n={render:e,staticRenderFns:a};s.a=n},RQZY:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return t.showStatus.showStatus?i("div",{staticClass:"disscusMask"},[i("div",{staticClass:"disscusBox"},[i("div",{staticClass:"close"},[i("a",{attrs:{href:"javascript:;"},on:{click:t.closeDissBox}},[t._v("X")])]),t._v(" "),i("div",{staticClass:"title clearFix"},[i("h4",[t._v(t._s(t.showList)+"条评论")]),t._v(" "),i("a",{attrs:{href:"#"}},[t._v("切换为时间排序")])]),t._v(" "),i("div",{staticClass:"discussList"},[i("div",{staticClass:"discussList_box"},[i("ul",t._l(t.disscusData,function(s,e){return i("li",[i("div",{staticClass:"oneDiscuss"},[i("p",{staticClass:"peopleInfo clearFix"},[i("span",[i("img",{attrs:{src:s.headImg,alt:""}}),i("a",{attrs:{href:"#"}},[t._v(t._s(s.userName))]),t._v(" "),0!==s.replyCode?[t._v("\n                    回复 "),i("a",{attrs:{href:"#"}},[t._v(t._s(s.replyName))])]:t._e()],2),t._v(" "),i("span",[t._v(t._s(s.createTime))])]),t._v(" "),i("p",{staticClass:"content"},[t._v(t._s(s.disscus))]),t._v(" "),i("p",{staticClass:"actionP"},[i("span",[i("a",{attrs:{href:"javascript:;"},on:{click:function(s){t.likeDisscus(e)}}},[t._v("赞"+t._s(s.likeCount?s.likeCount:0))])]),t._v(" "),i("span",{staticClass:"btnHover"},[i("a",{attrs:{href:"javascript:;"},on:{click:function(s){t.reply(e)}}},[t._v("回复")]),i("a",{attrs:{href:"#"}},[t._v("举报")])])])])])}))]),t._v(" "),i("div",{staticClass:"writeArea"},[i("div",{staticClass:"writeAreaCon"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.sendData.disscus,expression:"sendData.disscus"}],attrs:{name:"name",placeholder:t.sendData.placeholder},domProps:{value:t.sendData.disscus},on:{input:function(s){s.target.composing||t.$set(t.sendData,"disscus",s.target.value)}}}),t._v(" "),i("a",{staticClass:"submitDis",attrs:{href:"javascript:;"},on:{click:t.sendDisscus}},[t._v("评论")])])])])]),t._v(" "),i("p",[t._v("{{}}")])]):t._e()},a=[],n={render:e,staticRenderFns:a};s.a=n},VQkq:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"quill-editor"},[t._t("toolbar"),t._v(" "),i("div",{ref:"editor"})],2)},a=[],n={render:e,staticRenderFns:a};s.a=n},XiV5:function(t,s){},YaEn:function(t,s,i){"use strict";var e=i("MVSX"),a=i("zO6J"),n=i("Kb+U");e.a.use(a.a),s.a=new a.a({routes:[{path:"/:id",name:"question",component:n.a}]})},frb2:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"answerList"},[i("ul",[0!==t.answerList.length?t._l(t.answerList,function(s,e){return i("li",[i("div",{staticClass:"oneAnswer"},[i("div",{staticClass:"personInfo clearFix"},[i("img",{attrs:{src:s.headImg,alt:"头像"}}),t._v(" "),i("div",{staticClass:"Info"},[i("p",[t._v(t._s(s.userName))]),t._v(" "),i("p",[t._v(t._s(s.introduction))])])]),t._v(" "),i("p",[t._v(t._s(s.good)+"人赞同了该回答")]),t._v(" "),i("div",{staticClass:"content",domProps:{innerHTML:t._s(s.answerContent)}}),t._v(" "),i("p",[t._v("编辑于 "+t._s(s.updateTime))]),t._v(" "),i("div",{staticClass:"actionBar"},[i("p",[i("a",{attrs:{href:"javascript:;"},on:{click:t.action}},[t._v(t._s(s.good)+"赞同")]),t._v(" "),i("a",{attrs:{href:"javascript:;"},on:{click:t.action}},[t._v("踩")]),t._v(" "),i("a",{attrs:{href:"javascript:;"}},[t._v(t._s(null===s.disscusCode?0:1)+"条评论")]),t._v(" "),i("a",{attrs:{href:"javascript:;"}},[t._v("分享")]),t._v(" "),i("a",{attrs:{href:"javascript:;"}},[t._v("收藏")]),t._v(" "),i("a",{attrs:{href:"感谢"}})])])])])}):[i("li",[t._v("暂无回答哦")])]],2)])},a=[],n={render:e,staticRenderFns:a};s.a=n},fwVn:function(t,s,i){"use strict";function e(t){i("HBDB")}Object.defineProperty(s,"__esModule",{value:!0});var a=i("N1vW"),n=i("VQkq"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.default=c.exports},hXGm:function(t,s){},kjrT:function(t,s,i){"use strict";function e(t){i("mFfE")}var a=i("KF3J"),n=i("frb2"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},mFfE:function(t,s){},npFn:function(t,s,i){"use strict";function e(t){i("XiV5")}var a=i("+Soc"),n=i("RQZY"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},s9i9:function(t,s){},"sx+N":function(t,s){},ue6Q:function(t,s,i){"use strict";var e=i("npFn");s.a={data:function(){return{questInfo:{},topic:[],showDisscus:{showStatus:!1,dissCount:0,codeNum:this.$route.params.id}}},components:{disscusBox:e.a},methods:{getQuestDetial:function(t){var s=this;this.$http.get("/api/getQuestDetail?code="+t+"&r="+Math.random()).then(function(t){!0===t.body.success&&(s.topic=t.body.data.topic,s.questInfo=t.body.data.questInfo,s.showDisscus.dissCount=t.body.data.disscusCount,s.$emit("title",s.questInfo.questName))})},showDisscusFn:function(){this.showDisscus.showStatus=!0},changeStatus:function(t){this.showDisscus.showStatus=t.status,this.showDisscus.dissCount=t.dissCount},loginStatusFn:function(t){this.$http.get("/api/loginStatus?r="+Math.random()).then(function(s){!0===s.body.success?t&&t():alert(s.body.message)})},showWriteAnsBox:function(){var t=this;this.loginStatusFn(function(){t.$emit("showAnsBox",!0)})}},mounted:function(){this.getQuestDetial(this.showDisscus.codeNum)},watch:{$route:function(t,s){this.showDisscus.codeNum=t.params.id,this.getQuestDetial(t.params.id)}}}},wNU2:function(t,s,i){"use strict";function e(t){i("LGeT")}var a=i("yjfs"),n=i("R3+v"),o=i("46Yf"),r=e,c=o(a.a,n.a,!1,r,null,null);s.a=c.exports},yjfs:function(t,s,i){"use strict";function e(){this.userShowList=this.messageShowList=this.remindShowList=!1,document.body.removeEventListener("click",e,!1)}s.a={props:["title"],data:function(){return{loginStatus:!1,userInfo:{},show:!0,topheaderStatus:{userShowList:!1,messageShowList:!1,remindShowList:!1}}},methods:{getLoginStatus:function(){var t=this;this.$http.get("/api/loginStatus",{r:Math.random()}).then(function(s){t.loginStatus=s.body.success,!0===s.body.success&&(t.userInfo=s.body.userInfo)},function(t){console.log(t)})},login:function(){this.$http.post("/api/logIn",{userName:"胡钧赫",password:"19940601hu",r:Math.random()}).then(function(t){!0===t.body.success?location.reload():alert(t.body.message)},function(t){console.log(t)})},logOut:function(){this.$http.get("/api/logOut?r="+Math.random()).then(function(t){alert(t.body.message),location.reload()})},showList:function(t,s){t.cancelBubble=!0;var i=this.topheaderStatus;switch(s){case 1:i.userShowList=!0,i.remindShowList=i.messageShowList=!1;break;case 2:i.messageShowList=!0,i.remindShowList=i.userShowList=!1;break;case 3:i.remindShowList=!0,i.userShowList=i.messageShowList=!1}document.body.addEventListener("click",e.bind(i),!1)},Oscroll:function(){var t=this;window.addEventListener("mousewheel",function(s){s.deltaY>0?t.show=!1:t.show=!0})}},mounted:function(){this.getLoginStatus(),this.Oscroll()},computed:{}}},znAv:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"questionDetail"},[i("div",{staticClass:"minBody clearFix"},[i("div",{staticClass:"leftPart"},[i("p",{staticClass:"topicList"},t._l(t.topic,function(s){return i("span",[t._v(t._s(s.topicName))])})),t._v(" "),i("h1",[t._v(t._s(t.questInfo.questName))]),t._v(" "),i("div",{staticClass:"questionContent"},[t._v("\n        "+t._s(t.questInfo.describetion)+"\n      ")]),t._v(" "),i("div",{staticClass:"actionBar"},[i("p",[i("ul",[t._m(0),t._v(" "),i("li",[i("a",{staticClass:"takeAnswer",attrs:{href:"javascript:;"},on:{click:t.showWriteAnsBox}},[t._v("写回答")])]),t._v(" "),i("li",[i("a",{staticClass:"disscusNum",attrs:{href:"javascript:;"},on:{click:t.showDisscusFn}},[t._v(t._s(t.showDisscus.dissCount)+"条评论")])]),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5)])])])]),t._v(" "),i("div",{staticClass:"numInfo"},[i("div",{staticClass:"clearFix"},[i("div",{staticClass:"follower"},[i("p",[t._v("关注者")]),t._v(" "),i("p",[t._v(t._s(t.questInfo.follower))])]),t._v(" "),i("div",{staticClass:"watched"},[i("p",[t._v("被浏览")]),t._v(" "),i("p",[t._v(t._s(t.questInfo.watched))])])]),t._v(" "),t._m(6)])]),t._v(" "),i("disscusBox",{attrs:{showStatus:t.showDisscus},on:{childData:t.changeStatus}})],1)},a=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"focusQuest",attrs:{href:"#"}},[t._v("关注问题")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"share",attrs:{href:"#"}},[t._v("分享")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"invite",attrs:{href:"#"}},[t._v("邀请回答")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"report",attrs:{href:"#"}},[t._v("举报")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"soOn",attrs:{href:"#"}},[t._v("···")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("li",[i("a",{staticClass:"takeClose",attrs:{href:"#"}},[t._v("收起")])])},function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"followerList"},[i("p",[t._v("lydia也关注了该问题")])])}],n={render:e,staticRenderFns:a};s.a=n}},["NHnr"]);
//# sourceMappingURL=app.c64ebc67fbf5d0d72f4a.js.map
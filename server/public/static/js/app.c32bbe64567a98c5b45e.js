webpackJsonp([1],{"2oTW":function(t,e){},"6V8g":function(t,e){},"7EwS":function(t,e){},"7zck":function(t,e){},"97S7":function(t,e){},AkZ2:function(t,e){},Fieg:function(t,e){},JLzs:function(t,e){},NHnr:function(t,e,r){"use strict";function n(t){r("97S7")}function a(t){r("AkZ2")}function s(t){r("T4im")}function i(t){r("jwIN")}function o(t){r("oOYC")}function l(t){r("Fieg")}function c(t){r("6V8g")}function u(t){r("NYDB")}function d(t){r("NqGf")}function v(t){r("WZSu")}function p(t){r("2oTW")}function f(t){r("UShy")}Object.defineProperty(e,"__esModule",{value:!0});var m=r("7+uW"),h=r("uBzb"),g={components:{VIcon:h.a},methods:{navigateTo:function(t){this.$router.push(t)},logout:function(){this.$store.dispatch("setToken",null),this.$store.dispatch("setUsername",null),this.$store.dispatch("setId",null),navigateTo({name:"root"})}}},b=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-toolbar",{staticClass:"pa-1",attrs:{color:"amber",app:"",fixed:"","clipped-left":""}},[r("v-toolbar-title",{staticClass:"display-2"},[r("v-toolbar-side-icon",{attrs:{large:""},on:{click:function(e){t.$emit("sidebar")}}},[r("v-icon",{attrs:{large:"",color:"white"}},[t._v("menu")])],1),t._v(" "),r("span",{staticClass:"home",attrs:{flat:"",dark:""},on:{click:function(e){t.navigateTo({name:"root"})}}},[t._v("\n      Codual")])],1),t._v(" "),r("v-spacer",{staticClass:"hidden-md-and-down"}),t._v(" "),r("v-text-field",{staticClass:"ma-5  pl-2 pr-2",attrs:{solo:"",flat:"",color:"red","prepend-icon":"search",placeholder:"Search"}}),t._v(" "),r("v-spacer",{staticClass:"hidden-md-and-down"}),t._v(" "),r("v-toolbar-item",[t.$store.state.isUserLoggedIn?r("span",[r("v-btn",{attrs:{icon:"",large:"",flat:"",dark:"",color:"white"},on:{click:function(e){t.logout()}}},[r("v-icon",{attrs:{large:""}},[t._v("exit_to_app")])],1)],1):r("span",[r("v-btn",{attrs:{icon:"",large:"",flat:"",dark:"",to:{name:"login"},color:"white"}},[r("v-icon",{attrs:{large:""}},[t._v("account_circle")])],1),t._v(" "),r("v-btn",{attrs:{icon:"",large:"",flat:"",dark:"",to:{name:"signup"},color:"white"}},[r("v-icon",{attrs:{large:""}},[t._v("person_add")])],1)],1),t._v(" "),r("v-btn",{attrs:{icon:"",large:"",flat:"",dark:"",to:{name:"publications"},color:"white"}},[r("v-icon",{attrs:{large:""}},[t._v("apps")])],1)],1)],1)},x=[],_={render:b,staticRenderFns:x},w=_,k=r("VU/8"),y=n,$=k(g,w,!1,y,"data-v-20dd31e8",null),U=$.exports,C=r("Ijew"),q=r("atyw"),I={data:function(){return{telegramLink:"https://telegram.me/ZulusK",instagramLink:"https://www.instagram.com/idanilk"}},components:{VContent:q.a,VAvatar:C.a},methods:{}},L=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-footer",{staticClass:"pl-2 pr-2 grey--text"},[r("a",{attrs:{href:t.telegramLink,target:"_blank"}},[r("v-btn",{attrs:{fab:"",flat:"",color:"blue",value:"telegram"}},[r("v-avatar",{attrs:{size:"30px",tile:""}},[r("img",{attrs:{src:"https://image.flaticon.com/icons/png/512/355/355977.png",alt:"telegram"}})])],1)],1),t._v(" "),r("a",{attrs:{href:t.instagramLink,target:"_blank"}},[r("v-btn",{attrs:{flat:"",fab:"",color:"pink"}},[r("v-avatar",{attrs:{size:"30px",tile:""}},[r("img",{attrs:{src:"https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png",alt:"telegram"}})])],1)],1),t._v(" "),r("v-spacer"),t._v(" "),r("div",{staticClass:"body-1"},[t._v("\n    © Danil Kazimirov KPI, FAM student "+t._s((new Date).getFullYear())+"\n  ")])],1)},R=[],V={render:L,staticRenderFns:R},T=V,E=r("VU/8"),P=a,F=E(I,T,!1,P,"data-v-577ee29a",null),M=F.exports,S=r("EYLC"),D=r("laJj"),N=r("gfgR"),z={components:{VCardTitle:N.a,VSubheader:D.a},data:function(){return{username:this.$store.state.username}},computed:{avatarHeight:function(){switch(this.$vuetify.breakpoint.name){case"xs":return"150px";case"sm":case"md":return"250px";case"lg":case"xl":return"300px";default:return"100px"}}},methods:{}},A=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",[r("v-layout",{attrs:{column:"","text-xs-center":"",layout:""}},[t.$store.state.isUserLoggedIn?r("div",[r("v-flex"),t._v(" "),r("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[r("v-avatar",{staticClass:"grey lighten-4",attrs:{tile:!1,size:t.avatarHeight}},[r("img",{staticClass:"croped",attrs:{src:"http://cp12.nevsepic.com.ua/93/1348001954-76201-9009437024-www.nevspc.com.ua.jpg",alt:"user avatar",onerror:"this.src='https://cdn3.iconfinder.com/data/icons/internet-and-web-4/78/internt_web_technology-13-512.png'"}})])],1),t._v(" "),r("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[r("v-card-text",[r("div",{staticClass:"display-1 grey--text text--darken-3"},[t._v(t._s(t.username))])])],1)],1):r("div",[r("v-card-text",[r("div",{staticClass:"subheading light-grey--text"},[t._v("You need to log in")])]),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",[r("v-btn",{attrs:{color:"amber",flat:"",to:"login"}},[r("v-icon",{attrs:{large:"",color:"amber"}},[t._v("person")])],1),t._v(" "),r("v-btn",{attrs:{color:"amber",flat:"",to:"signup"}},[r("v-icon",{attrs:{large:"",color:"amber"}},[t._v("person_add")])],1)],1)],1)],1)])],1)},W=[],j={render:A,staticRenderFns:W},Y=j,B=r("VU/8"),H=s,Z=B(z,Y,!1,H,"data-v-78804079",null),J=Z.exports,K={components:{UserInfo:J},data:function(){return{items:[{icon:"keyboard_arrow_up","icon-alt":"keyboard_arrow_down",text:"Labels",model:!0,children:[{icon:"add",text:"Create label"}]},{icon:"settings",text:"Settings"},{icon:"help",text:"Help"}]}},props:["drawer"],watch:{drawer:function(t){t?this.$emit("opened"):this.$emit("closed")}},computed:{sidebarWidth:function(){switch(this.$vuetify.breakpoint.name){case"xs":return"200";case"sm":case"md":return"300";case"lg":case"xl":return"350";default:return"300"}}}},O=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-navigation-drawer",{attrs:{fixed:"",clipped:"",app:"",width:t.sidebarWidth},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list",{attrs:{dense:""}},[r("user-info"),t._v(" "),t._l(t.items,function(e,n){return[e.heading?r("v-layout",{key:t.index,attrs:{row:"","align-center":""}},[r("v-flex",{attrs:{xs6:""}},[e.heading?r("v-subheader",[t._v("\n            "+t._s(e.heading)+"\n          ")]):t._e()],1)],1):e.children?r("v-list-group",{attrs:{"no-action":""},model:{value:e.model,callback:function(r){t.$set(e,"model",r)},expression:"item.model"}},[r("v-list-tile",{attrs:{slot:"item",to:e.to},on:{click:function(t){}},slot:"item"},[r("v-list-tile-action",[r("v-icon",[t._v(t._s(e.model?e.icon:e["icon-alt"]))])],1),t._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1),t._v(" "),t._l(e.children,function(e,n){return r("v-list-tile",{key:n,attrs:{to:e.to},on:{click:function(t){}}},[e.icon?r("v-list-tile-action",[r("v-icon",[t._v(t._s(e.icon))])],1):t._e(),t._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1)})],2):r("v-list-tile",{attrs:{to:e.to},on:{click:function(t){}}},[r("v-list-tile-action",[r("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[t._v("\n            "+t._s(e.text)+"\n          ")])],1)],1)]})],2)],1)},G=[],X={render:O,staticRenderFns:G},Q=X,tt=r("VU/8"),et=i,rt=tt(K,Q,!1,et,"data-v-add6ab86",null),nt=rt.exports,at={name:"app",components:{VParallax:S.a,PageHeader:U,PageFooter:M,Sidebar:nt},data:function(){return{dialog:!1,sidebarDrawer:"xl"===this.$vuetify.breakpoint.name}},methods:{}},st=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("v-app",[r("sidebar",{attrs:{drawer:t.sidebarDrawer},on:{"update:drawer":function(e){t.sidebarDrawer=e},opened:function(e){t.sidebarDrawer=!0},closed:function(e){t.sidebarDrawer=!1}}}),t._v(" "),r("page-header",{on:{sidebar:function(e){t.sidebarDrawer=!t.sidebarDrawer}}}),t._v(" "),r("v-content",[r("v-container",{attrs:{fluid:""}},[r("router-view")],1)],1),t._v(" "),r("page-footer")],1)],1)},it=[],ot={render:st,staticRenderFns:it},lt=ot,ct=r("VU/8"),ut=o,dt=ct(at,lt,!1,ut,null,null),vt=dt.exports,pt=r("/ocq"),ft={data:function(){return{}},props:["title"]},mt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"elevation-2 white"},[r("v-toolbar",{staticClass:"blue accent-3 white--text",attrs:{flat:"",fense:""}},[r("v-toolbar-title",[t._v("\n      "+t._s(t.title)+"\n    ")])],1),t._v(" "),r("div",{staticClass:"pl-4 pr-4 pt-2 pb-2"},[t._t("default",[t._v("\n      No slot content defined\n    ")])],2)],1)},ht=[],gt={render:mt,staticRenderFns:ht},bt=gt,xt=r("VU/8"),_t=l,wt=xt(ft,bt,!1,_t,"data-v-5ad8979a",null),kt=wt.exports,yt={name:"Index",data:function(){return{msg:"Welcome to Your Vue.js App"}}},$t=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-layout",{attrs:{column:""}},[r("v-flex",{attrs:{xs6:"","offset-xs3":""}},[r("panel",{attrs:{title:"Index"}},[r("v-card",[r("h1",[t._v("Welcome to Codual, website, developed for education")])])],1)],1)],1)],1)},Ut=[],Ct={render:$t,staticRenderFns:Ut},qt=Ct,It=r("VU/8"),Lt=c,Rt=It(yt,qt,!1,Lt,"data-v-5d5dddf0",null),Vt=Rt.exports,Tt=r("Xxa5"),Et=r.n(Tt),Pt=r("fZjL"),Ft=r.n(Pt),Mt=r("exGp"),St=r.n(Mt),Dt=r("mtWM"),Nt=r.n(Dt),zt=r("NYxO"),At=r("UIay"),Wt=r.n(At);m.a.use(zt.a);var jt=new zt.a.Store({strict:!0,state:{token:null,id:null,username:null,isUserLoggedIn:!1},plugins:[Wt()()],mutations:{setToken:function(t,e){t.token=e,t.isUserLoggedIn=!!e},setId:function(t,e){t.id=e},setUsername:function(t,e){t.username=e}},actions:{setToken:function(t,e){(0,t.commit)("setToken",e)},setId:function(t,e){(0,t.commit)("setId",e)},setUsername:function(t,e){(0,t.commit)("setUsername",e)}}}),Yt=function(){return new Nt.a.create({baseURL:"production".startsWith("dev")?"http://localhost:3000":"http://codual.herokuapp.com",headers:{Authorization:"Bearer "+jt.state.token}})},Bt={signup:function(t){return Yt().post("api/v1/auth/signup",t)},login:function(t){return Yt().post("api/v1/auth/login",t)}},Ht={data:function(){return{timeout:3e3,multiline:!0,vertical:!0,color:"error"}},props:["message","show"],methods:{hide:function(){this.$emit("update:show",!1)}}},Zt=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-snackbar",{attrs:{timeout:t.timeout,vertical:!0,top:!0},on:{close:function(e){t.hide()}},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}},[r("h2",[t._v(t._s(t.message))]),t._v(" "),r("v-btn",{attrs:{flat:"",color:"pink"},on:{click:function(e){t.hide()}}},[t._v("Close")])],1)},Jt=[],Kt={render:Zt,staticRenderFns:Jt},Ot=Kt,Gt=r("VU/8"),Xt=Gt(Ht,Ot,!1,null,null,null),Qt=Xt.exports,te={components:{Panel:kt,ErrorBar:Qt},data:function(){return{credentials:{username:"",password:"",name:""},error:!1,errorMessage:null,required:function(t){return!!t||"Required."}}},mounted:function(){this.$store.state.isUserLoggedIn&&this.$router.push({name:"root"})},methods:{submit:function(){var t=this;return St()(Et.a.mark(function e(){var r,n;return Et.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r=Ft()(t.credentials).every(function(e){return!!t.credentials[e]})){e.next=6;break}return t.errorMessage="Please fill in all the required fields.",t.error=!0,e.abrupt("return");case 6:return e.next=8,Bt.signup(t.credentials);case 8:n=e.sent,t.$store.dispatch("setToken",n.data.token),t.$store.dispatch("setUsername",n.data.username),t.$store.dispatch("setId",n.data.id),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(0),t.errorMessage=e.t0.response.data.message,t.error=!0;case 18:case"end":return e.stop()}},e,t,[[0,14]])}))()}},computed:{progress:function(){return Math.min(100,10*this.credentials.password.length)},color:function(){return["error","warning","success"][Math.floor(this.progress/40)]}}},ee=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.$store.state.isUserLoggedIn?t._e():r("v-layout",{staticClass:"text-xs-center",attrs:{column:""}},[r("error-bar",{attrs:{show:t.error,message:t.errorMessage},on:{"update:show":function(e){t.error=e}}}),t._v(" "),r("v-flex",{attrs:{xs6:"","offset-xs3":""}},[r("panel",{attrs:{title:"Join us"}},[r("v-form",[r("v-card-text",[r("v-container",{attrs:{fluid:""}},[r("v-text-field",{attrs:{label:"Name",name:"name",rules:[t.required],required:""},model:{value:t.credentials.name,callback:function(e){t.$set(t.credentials,"name",e)},expression:"credentials.name"}}),t._v(" "),r("v-text-field",{attrs:{label:"Username",name:"username",rules:[t.required],required:""},model:{value:t.credentials.username,callback:function(e){t.$set(t.credentials,"username",e)},expression:"credentials.username"}}),t._v(" "),r("v-text-field",{attrs:{type:"password",label:"Password",name:"username",rules:[t.required],required:""},model:{value:t.credentials.password,callback:function(e){t.$set(t.credentials,"password",e)},expression:"credentials.password"}}),t._v(" "),r("v-progress-linear",{attrs:{slot:"progress",value:t.progress,height:"5",color:t.color},slot:"progress"}),t._v(" "),r("v-btn",{attrs:{round:"",color:"success"},on:{click:t.submit}},[t._v("\n              Submit\n            ")])],1)],1)],1)],1)],1)],1)},re=[],ne={render:ee,staticRenderFns:re},ae=ne,se=r("VU/8"),ie=u,oe=se(te,ae,!1,ie,"data-v-9c97eba2",null),le=oe.exports,ce={components:{Panel:kt,ErrorBar:Qt},data:function(){return{credentials:{username:null,password:null},error:!1,errorMessage:null,required:function(t){return!!t||"Required."}}},mounted:function(){this.$store.state.isUserLoggedIn&&this.$router.push({name:"root"})},methods:{submit:function(){var t=this;return St()(Et.a.mark(function e(){var r,n;return Et.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Ft()(t.credentials).every(function(e){return!!t.credentials[e]})){e.next=5;break}return t.errorMessage="Please fill in all the required fields.",t.error=!0,e.abrupt("return");case 5:return e.prev=5,e.next=8,Bt.login(t.credentials);case 8:n=e.sent,t.$store.dispatch("setToken",n.data.token),t.$store.dispatch("setUsername",n.data.username),t.$store.dispatch("setId",n.data.id),t.$router.push({name:"publications"}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(5),t.errorMessage=e.t0.response.data.message,t.error=!0;case 19:case"end":return e.stop()}},e,t,[[5,15]])}))()}}},ue=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.$store.state.isUserLoggedIn?t._e():r("v-layout",{staticClass:"text-xs-center",attrs:{column:""}},[r("error-bar",{attrs:{show:t.error,message:t.errorMessage},on:{"update:show":function(e){t.error=e}}}),t._v(" "),r("v-flex",{attrs:{xs6:"","offset-xs3":""}},[r("panel",{attrs:{title:"Login"}},[r("v-form",[r("v-card-text",[r("v-container",{attrs:{add_circle_outline:""}},[r("v-text-field",{attrs:{label:"Username",name:"username",rules:[t.required],required:""},model:{value:t.credentials.username,callback:function(e){t.$set(t.credentials,"username",e)},expression:"credentials.username"}}),t._v(" "),r("v-text-field",{attrs:{type:"password",label:"Password",name:"password",rules:[t.required],required:""},model:{value:t.credentials.password,callback:function(e){t.$set(t.credentials,"password",e)},expression:"credentials.password"}}),t._v(" "),r("v-btn",{attrs:{round:"",color:"success"},on:{click:t.submit}},[t._v("\n              Login\n            ")])],1)],1)],1)],1)],1)],1)},de=[],ve={render:ue,staticRenderFns:de},pe=ve,fe=r("VU/8"),me=d,he=fe(ce,pe,!1,me,"data-v-43f13590",null),ge=he.exports,be={find:function(t){return Yt().post("api/v1/publications/find",t)},index:function(){return Yt().post("api/v1/publications/find",{target:{}})},create:function(t){return Yt().post("api/v1/publications/create",t)}},xe={components:{Panel:kt},data:function(){return{publications:[],timer:null}},created:function(){function t(){return e.apply(this,arguments)}var e=St()(Et.a.mark(function t(){return Et.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Я родился"),t.next=3,this.getItems();case 3:this.timer=setInterval(this.getItems,6e4);case 4:case"end":return t.stop()}},t,this)}));return t}(),methods:{getItems:function(){var t=this;return St()(Et.a.mark(function e(){return Et.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Я обновился"),e.prev=1,e.next=4,be.index();case 4:t.publications=e.sent.data.items,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.log(e.t0);case 10:case"end":return e.stop()}},e,t,[[1,7]])}))()}}},_e=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{column:""}},[r("v-flex",[r("panel",{attrs:{title:"Publicaions"}},[t._t("default",t._l(t.publications,function(e){return r("div",{key:e.id,staticClass:"ma-3"},[r("panel",{attrs:{title:e.title}},[t._v("\n              "+t._s(e.title)+"\n              "+t._s(e.difficult)+"\n              "+t._s(e.description)+"\n              "),t._l(e.tags,function(e){return r("div",[t._v("\n                "+t._s(e)+"\n              ")])})],2)],1)}))],2)],1)],1)},we=[],ke={render:_e,staticRenderFns:we},ye=ke,$e=r("VU/8"),Ue=v,Ce=$e(xe,ye,!1,Ue,"data-v-55c9f463",null),qe=Ce.exports,Ie={components:{Panel:kt,ErrorBar:Qt},data:function(){return{publication:{title:null,difficult:null,description:null,text:null,tags:[],imageURL:null},error:!1,errorMessage:null,required:function(t){return!!t||"Required."}}},methods:{create:function(){var t=this;return St()(Et.a.mark(function e(){var r;return Et.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=Ft()(t.publication).every(function(e){return!!t.publication[e]})){e.next=5;break}return t.errorMessage="Please fill in all the required fields.",t.error=!0,e.abrupt("return");case 5:return e.prev=5,e.next=8,be.create(t.publication);case 8:t.$router.push({name:"publications"}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(5),t.errorMessages=e.t0.response.data.message,t.error=!0;case 15:case"end":return e.stop()}},e,t,[[5,11]])}))()}}},Le=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.$store.state.isUserLoggedIn?r("v-layout",{staticClass:"text-xs-center",attrs:{column:""}},[r("error-bar",{attrs:{show:t.error,message:t.errorMessage},on:{"update:show":function(e){t.error=e}}}),t._v(" "),r("v-flex",{attrs:{xs6:"","offset-xs3":""}},[r("panel",{attrs:{title:"Create publication"}},[r("v-form",[r("v-card-text",[r("v-container",{attrs:{fluid:""}},[r("v-layout",{attrs:{row:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-subheader",[t._v("Title of publication")])],1),t._v(" "),r("v-flex",{attrs:{xs8:""}},[r("v-text-field",{attrs:{color:"blue darken-2",label:"Title",name:"title",required:"",rules:[t.required]},model:{value:t.publication.title,callback:function(e){t.$set(t.publication,"title",e)},expression:"publication.title"}})],1)],1),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-subheader",[t._v("Short description")])],1),t._v(" "),r("v-flex",{attrs:{xs8:""}},[r("v-layout",{attrs:{row:""}},[r("v-text-field",{attrs:{color:"blue darken-2",label:"Decription",name:"description",required:"",rules:[t.required]},model:{value:t.publication.description,callback:function(e){t.$set(t.publication,"description",e)},expression:"publication.description"}})],1)],1)],1),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-subheader",[t._v("Select difficult")])],1),t._v(" "),r("v-flex",{attrs:{xs8:""}},[r("v-layout",{attrs:{row:""}},[r("v-slider",{attrs:{name:"difficult",color:"blue darken-2",label:"Difficult",hint:"1 is easy, 10 is hard",min:"1",max:"10","thumb-label":"",required:"",rules:[t.required]},model:{value:t.publication.difficult,callback:function(e){t.$set(t.publication,"difficult",e)},expression:"publication.difficult"}})],1)],1)],1),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-subheader",[t._v("Add some tags")])],1),t._v(" "),r("v-flex",{attrs:{xs8:""}},[r("v-layout",{attrs:{row:""}},[r("v-select",{attrs:{label:"Tags",name:"tags",chips:"",tags:"",required:"",rules:[t.required]},model:{value:t.publication.tags,callback:function(e){t.$set(t.publication,"tags",e)},expression:"publication.tags"}})],1)],1)],1),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",{attrs:{xs4:""}},[r("v-subheader",[t._v("Publication image URL")])],1),t._v(" "),r("v-flex",{attrs:{xs8:""}},[r("v-layout",{attrs:{row:""}},[r("v-text-field",{attrs:{color:"blue darken-2",label:"URL",name:"imageURL",required:"",rules:[t.required]},model:{value:t.publication.imageURL,callback:function(e){t.$set(t.publication,"imageURL",e)},expression:"publication.imageURL"}})],1)],1)],1),t._v(" "),r("v-layout",{attrs:{row:""}},[r("v-flex",[r("v-text-field",{attrs:{box:"","multi-line":"",name:"text",label:"Text of publication","aria-required":"true",rules:[t.required]},model:{value:t.publication.text,callback:function(e){t.$set(t.publication,"text",e)},expression:"publication.text"}})],1)],1),t._v(" "),r("v-btn",{attrs:{round:"",color:"success"},on:{click:t.create}},[t._v("\n              Create\n            ")])],1)],1)],1)],1)],1)],1):t._e()},Re=[],Ve={render:Le,staticRenderFns:Re},Te=Ve,Ee=r("VU/8"),Pe=p,Fe=Ee(Ie,Te,!1,Pe,null,null),Me=Fe.exports,Se={data:function(){return{items:[{icon:"lightbulb_outline",text:"Notes"},{icon:"touch_app",text:"Reminders"},{divider:!0},{heading:"Labels"},{icon:"add",text:"Create new label"},{divider:!0},{icon:"archive",text:"Archive"},{icon:"delete",text:"Trash"},{divider:!0},{icon:"settings",text:"Settings"},{icon:"chat_bubble",text:"Trash"},{icon:"help",text:"Help"},{icon:"phonelink",text:"App downloads"},{icon:"keyboard",text:"Keyboard shortcuts"}]}},props:{source:String}},De=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"inspire"}},[r("v-navigation-drawer",{staticClass:"grey lighten-4",attrs:{permanent:"",fixed:"",clipped:"",app:""}},[r("v-list",{staticClass:"grey lighten-4",attrs:{dense:""}},[t._l(t.items,function(e,n){return[e.heading?r("v-layout",{key:n,attrs:{row:"","align-center":""}},[r("v-flex",{attrs:{xs6:""}},[e.heading?r("v-subheader",[t._v("\n              "+t._s(e.heading)+"\n            ")]):t._e()],1),t._v(" "),r("v-flex",{staticClass:"text-xs-right",attrs:{xs6:""}},[r("v-btn",{attrs:{small:"",flat:""}},[t._v("edit")])],1)],1):e.divider?r("v-divider",{key:n,staticClass:"my-4",attrs:{dark:""}}):r("v-list-tile",{key:n,on:{click:function(t){}}},[r("v-list-tile-action",[r("v-icon",[t._v(t._s(e.icon))])],1),t._v(" "),r("v-list-tile-content",[r("v-list-tile-title",{staticClass:"grey--text"},[t._v("\n              "+t._s(e.text)+"\n            ")])],1)],1)]})],2)],1),t._v(" "),r("v-toolbar",{attrs:{color:"amber",app:"",absolute:"","clipped-left":""}},[r("span",{staticClass:"title"},[t._v("Google "),r("span",{staticClass:"text"},[t._v("Keep")])])]),t._v(" "),r("v-content",[r("v-container",{staticClass:"grey lighten-4",attrs:{fluid:"","fill-height":""}},[r("v-layout",{attrs:{"justify-center":"","align-center":""}},[r("v-tooltip",{attrs:{right:""}},[r("v-btn",{attrs:{slot:"activator",icon:"",large:"",href:t.source,target:"_blank"},slot:"activator"},[r("v-icon",{attrs:{large:""}},[t._v("code")])],1),t._v(" "),r("span",[t._v("Source")])],1)],1)],1)],1)],1)},Ne=[],ze={render:De,staticRenderFns:Ne},Ae=ze,We=r("VU/8"),je=f,Ye=We(Se,Ae,!1,je,null,null),Be=Ye.exports;m.a.use(pt.a);var He=new pt.a({routes:[{path:"/",name:"root",component:Vt},{path:"/signup",name:"signup",component:le},{path:"/login",name:"login",component:ge},{path:"/publications",name:"publications",component:qe},{path:"/publications/create",name:"publications.create",component:Me},{path:"/publications/edit",name:"publications.edit",component:Be}]}),Ze=r("3EgV"),Je=r.n(Ze),Ke=(r("7zck"),r("9JMe"));new Promise(function(t){t()}).then(r.bind(null,"7zck")),m.a.config.productionTip=!1,m.a.use(Je.a),Object(Ke.sync)(jt,He),new m.a({el:"#app",router:He,store:jt,template:"<App/>",components:{App:vt}})},NYDB:function(t,e){},NqGf:function(t,e){},P0ba:function(t,e){},T4im:function(t,e){},UShy:function(t,e){},WZSu:function(t,e){},acBN:function(t,e){},jwIN:function(t,e){},kP4z:function(t,e){},oOYC:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c32bbe64567a98c5b45e.js.map
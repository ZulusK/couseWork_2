webpackJsonp([1],{"7zck":function(e,t){},NHnr:function(e,t,s){"use strict";function n(e){s("tWb3")}function a(e){s("Qkhc")}function r(e){s("ZzLq")}function o(e){s("k3LN")}function c(e){s("ovgr")}function i(e){s("UwtF")}Object.defineProperty(t,"__esModule",{value:!0});var l=s("7+uW"),u={methods:{navigateTo:function(e){this.$router.push(e)}}},d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-toolbar",{staticClass:"blue accent-3",attrs:{fixed:"true"}},[s("v-toolbar-title",{staticClass:"white--text ma-2"},[s("span",{staticClass:"logo home",attrs:{flat:"",dark:""},on:{click:function(t){e.navigateTo({name:"root"})}}},[e._v("\n      Codual\n    ")])]),e._v(" "),s("v-toolbar-items"),e._v(" "),s("v-spacer"),e._v(" "),s("v-toolbar-items",[e.$store.state.isUserLoggedIn?e._e():s("v-btn",{attrs:{flat:"",dark:""},on:{click:function(t){e.navigateTo({name:"signup"})}}},[e._v("\n      Sign UP\n    ")]),e._v(" "),e.$store.state.isUserLoggedIn?e._e():s("v-btn",{attrs:{flat:"",dark:""},on:{click:function(t){e.navigateTo({name:"login"})}}},[e._v("\n      LOG IN\n    ")])],1)],1)},p=[],v={render:d,staticRenderFns:p},m=v,f=s("VU/8"),g=n,_=f(u,m,!1,g,"data-v-8b44b178",null),h=_.exports,b={methods:{}},x=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-footer",{staticClass:"pa-3 white blue--text"},[e._v("\n  Developer: Danil Kazimirov, KPI, FAM student\n  "),s("v-spacer"),e._v(" "),s("div",[e._v("© "+e._s((new Date).getFullYear()))])],1)},k=[],w={render:x,staticRenderFns:k},U=w,L=s("VU/8"),C=a,$=L(b,U,!1,C,"data-v-24d59646",null),I=$.exports,T={name:"app",components:{PageHeader:h,PageFooter:I}},F=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("v-app",[s("page-header"),e._v(" "),s("main",[s("v-container",{attrs:{fluid:""}},[s("router-view")],1)],1),e._v(" "),s("page-footer")],1)],1)},P=[],E={render:F,staticRenderFns:P},q=E,M=s("VU/8"),V=r,H=M(T,q,!1,V,null,null),N=H.exports,R=s("/ocq"),y={name:"Index",data:function(){return{msg:"Welcome to Your Vue.js App"}}},z=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},W=[],Y={render:z,staticRenderFns:W},A=Y,O=s("VU/8"),j=o,D=O(y,A,!1,j,"data-v-8bbba042",null),J=D.exports,S=s("Xxa5"),G=s.n(S),K=s("exGp"),Q=s.n(K),Z=s("mtWM"),X=s.n(Z),B=function(){return new X.a.create({baseURL:"http://localhost:3000"})},ee={signup:function(e){return B().post("api/v1/auth/signup",e)},login:function(e){return B().post("api/v1/auth/login",e)}},te={components:{},data:function(){return{username:"",password:"",error:null,success:null}},methods:{submit:function(){var e=this;return Q()(G.a.mark(function t(){var s;return G.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ee.signup({username:e.username,password:e.password,name:e.name});case 3:s=t.sent,e.$store.dispatch("setToken",s.data.token),e.$store.dispatch("setUsername",s.data.username),e.$store.dispatch("setId",s.data.id),e.error=null,e.success="You are logged successful",t.next=15;break;case 11:t.prev=11,t.t0=t.catch(0),e.error=t.t0.data&&t.t0.data.response&&t.t0.data.response.message?t.t0.data.response.message:"Error",e.success=null;case 15:case"end":return t.stop()}},t,e,[[0,11]])}))()}}},se=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.$store.state.isUserLoggedIn?e._e():s("v-layout",{attrs:{column:""}},[s("v-flex",{attrs:{xs6:"","offset-xs3":""}},[s("div",{staticClass:"white elevation-2"},[s("v-toolbar",{staticClass:"blue accent-3",attrs:{flat:"",fense:""}},[s("v-toolbar-title",[e._v("\n          Join us\n        ")])],1),e._v(" "),s("div",{staticClass:"pl-4 pr-4 pt-2 pb-2"},[s("form",[s("v-text-field",{attrs:{label:"Name",name:"name",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),s("v-text-field",{attrs:{label:"Username",name:"username",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),s("v-text-field",{attrs:{type:"password",label:"Password",name:"username",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),s("v-alert",{staticClass:"white--text text-lg-center",attrs:{color:"error",icon:"check_circle",value:e.error,transition:"scale-transition"},domProps:{innerHTML:e._s(e.error)}}),e._v(" "),s("v-alert",{staticClass:"white--text text-lg-center",attrs:{color:"success",icon:"check_circle",value:e.success,transition:"scale-transition"},domProps:{innerHTML:e._s(e.success)}}),e._v(" "),s("v-btn",{staticClass:"green accent-5",attrs:{round:""},on:{click:e.submit}},[e._v("\n            Submit\n          ")])],1)])],1)])],1)},ne=[],ae={render:se,staticRenderFns:ne},re=ae,oe=s("VU/8"),ce=c,ie=oe(te,re,!1,ce,"data-v-5197c7e7",null),le=ie.exports,ue={components:{},data:function(){return{username:"",password:"",error:null,success:null}},methods:{submit:function(){var e=this;return Q()(G.a.mark(function t(){var s;return G.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,ee.login({username:e.username,password:e.password});case 3:s=t.sent,e.$store.dispatch("setToken",s.data.token),e.$store.dispatch("setUsername",s.data.username),e.$store.dispatch("setId",s.data.id),e.error=null,e.success="You are logged successful",t.next=15;break;case 11:t.prev=11,t.t0=t.catch(0),e.error=t.t0.data&&t.t0.data.response&&t.t0.data.response.message?t.t0.data.response.message:"Error",e.success=null;case 15:case"end":return t.stop()}},t,e,[[0,11]])}))()}}},de=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.$store.state.isUserLoggedIn?e._e():s("v-layout",{attrs:{column:""}},[s("v-flex",{attrs:{xs6:"","offset-xs3":""}},[s("div",{staticClass:"white elevation-2"},[s("v-toolbar",{staticClass:"blue accent-3",attrs:{flat:"",fense:""}},[s("v-toolbar-title",[e._v("\n          Login\n        ")])],1),e._v(" "),s("div",{staticClass:"pl-4 pr-4 pt-2 pb-2",attrs:{light:""}},[s("form",[s("v-text-field",{attrs:{label:"Username",name:"username",required:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),s("v-text-field",{attrs:{type:"password",label:"Password",name:"username",required:""},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),s("v-alert",{staticClass:"white--text text-lg-center",attrs:{color:"error",icon:"check_circle",value:e.error,transition:"scale-transition"},domProps:{innerHTML:e._s(e.error)}}),e._v(" "),s("v-alert",{staticClass:"white--text text-lg-center",attrs:{color:"success",icon:"check_circle",value:e.success,transition:"scale-transition"},domProps:{innerHTML:e._s(e.success)}}),e._v(" "),s("v-btn",{staticClass:"green accent-5",attrs:{round:""},on:{click:e.submit}},[e._v("\n            Login\n          ")])],1)])],1)])],1)},pe=[],ve={render:de,staticRenderFns:pe},me=ve,fe=s("VU/8"),ge=i,_e=fe(ue,me,!1,ge,"data-v-430d1837",null),he=_e.exports;l.a.use(R.a);var be=new R.a({routes:[{path:"/",name:"root",component:J},{path:"/signup",name:"signup",component:le},{path:"/login",name:"login",component:he}]}),xe=s("3EgV"),ke=s.n(xe),we=(s("7zck"),s("9JMe")),Ue=s("NYxO");l.a.use(Ue.a);var Le=new Ue.a.Store({strict:!0,state:{token:null,id:null,username:null,isUserLoggedIn:!1},mutations:{setToken:function(e,t){e.token=t,e.isUserLoggedIn=!!t},setId:function(e,t){e.id=t},setUsername:function(e,t){e.username=t}},actions:{setToken:function(e,t){(0,e.commit)("setToken",t)},setId:function(e,t){(0,e.commit)("setId",t)},setUsername:function(e,t){(0,e.commit)("setUsername",t)}}});l.a.config.productionTip=!1,l.a.use(ke.a),Object(we.sync)(Le,be),new l.a({el:"#app",router:be,store:Le,template:"<App/>",components:{App:N}})},Qkhc:function(e,t){},UwtF:function(e,t){},ZzLq:function(e,t){},k3LN:function(e,t){},ovgr:function(e,t){},tWb3:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.82780c26d624458a3af9.js.map
"use strict";(self["webpackChunkBaoyan_video"]=self["webpackChunkBaoyan_video"]||[]).push([[876],{2024:function(e,t,a){function n(e){if(null==e||""==e)return"";const t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,l=t.getDate()<10?"0"+t.getDate():t.getDate();return a+"-"+n+"-"+l}function l(e){if(null==e||""==e)return"";const t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,l=t.getDate()<10?"0"+t.getDate():t.getDate(),o=t.getHours()<10?"0"+t.getHours():t.getHours(),u=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),s=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return a+"-"+n+"-"+l+" "+o+":"+u+":"+s}function o(e){let t=null;const a=()=>{t&&clearTimeout(t),t=setTimeout((function(){e.value=!0}),1500)},n=()=>{t&&clearTimeout(t),clearTimeout(Number(t)),e.value=!1},l=()=>{t&&clearTimeout(t),e.value=!1};return{vMouseenter:a,vMouseleave:n,visibleClick:l}}a.d(t,{oy:function(){return n},p6:function(){return l},ZP:function(){return o}})},8628:function(e,t,a){a.d(t,{Z:function(){return x}});var n=a(3396),l=a(7139);const o=e=>((0,n.dD)("data-v-1535beed"),e=e(),(0,n.Cn)(),e),u={class:"comment"},s={class:"comment-title"},r=o((()=>(0,n._)("span",null,"评论",-1))),i={class:"comment-desc"},c=(0,n.Uk)("发表评论"),d={class:"popular"},p={class:"popular-msg"},m={class:"name"},g={class:"time"},v={class:"content"};function w(e,t,a,o,w,f){const h=(0,n.up)("el-input"),y=(0,n.up)("el-button"),C=(0,n.up)("el-image");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",u,[(0,n._)("h2",s,[r,(0,n._)("span",i,"共 "+(0,l.zw)(e.commentList.length)+" 条评论",1)]),(0,n.Wm)(h,{class:"comment-input",type:"textarea",placeholder:"期待您的精彩评论...",rows:2,modelValue:e.textarea,"onUpdate:modelValue":t[0]||(t[0]=t=>e.textarea=t)},null,8,["modelValue"]),(0,n.Wm)(y,{class:"sub-btn",type:"primary",onClick:t[1]||(t[1]=t=>e.submitComment())},{default:(0,n.w5)((()=>[c])),_:1})]),(0,n._)("ul",d,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.commentList,((t,a)=>((0,n.wg)(),(0,n.iD)("li",{key:a},[(0,n.Wm)(C,{class:"popular-img",fit:"contain",src:e.getImageUrl(t.avatar)},null,8,["src"]),(0,n._)("div",p,[(0,n._)("ul",null,[(0,n._)("li",m,(0,l.zw)(t.username),1),(0,n._)("li",g,(0,l.zw)(e.formatDate(t.CreatedAt)),1),(0,n._)("li",v,(0,l.zw)(t.content),1)])])])))),128))])],64)}var f=a(4870),h=a(9749),y=a(8045),C=a(2167),k=a(1588),I=a(2024),_=(0,n.aZ)({components:{},props:{playId:String||Number,type:Number},setup(e){const{proxy:t}=(0,n.FN)(),a=(0,h.oR)(),{checkStatus:l,getImageUrl:o}=(0,y.Z)(),{playId:u,type:s}=(0,f.BK)(e),r=(0,f.iH)([]),i=(0,f.iH)(""),c=(0,f.qj)({Support:k.JO.Support}),d=(0,n.Fl)((()=>a.getters.userId));async function p(){try{const e=await C.x.getAllComment(s.value,u.value);r.value=e.data,null!==e.data&&0!==e.data.length||(r.value=[]);for(let t=0;t<r.value.length;t++){const e=await C.x.getUserOfId(r.value[t].userId);r.value[t].avatar=e.data.avatar,r.value[t].username=e.data.username}}catch(e){console.error(e)}}async function m(){if(!l())return;const e=new URLSearchParams;1===s.value?e.append("courseId",`${u.value}`):0===s.value&&e.append("videoId",`${u.value}`),e.append("userId",d.value),e.append("type",`${s.value}`),e.append("content",i.value);const a=await C.x.setComment(e);t.$message({message:a.message,type:a.type}),a.success&&(i.value="",await p())}async function g(e,a){const n=await C.x.deleteComment(e);t.$message({message:n.message,type:n.type}),n.success&&r.value.splice(a,1)}async function v(e,t,a){if(!l())return;const n=new URLSearchParams;n.append("id",e),n.append("up",t+1);const o=await C.x.setSupport(n);o.success&&await p()}return(0,n.YP)(u,(()=>{p()})),(0,n.bv)((()=>{p()})),{userId:d,commentList:r,textarea:i,iconList:c,attachImageUrl:C.x.attachImageUrl,submitComment:m,setSupport:v,formatDate:I.p6,deleteComment:g,getImageUrl:o}}}),D=a(89);const b=(0,D.Z)(_,[["render",w],["__scopeId","data-v-1535beed"]]);var x=b},3876:function(e,t,a){a.r(t),a.d(t,{default:function(){return U}});var n=a(3396),l=a(7139);const o=e=>((0,n.dD)("data-v-6eba528b"),e=e(),(0,n.Cn)(),e),u={class:"course-info"},s=o((()=>(0,n._)("h1",null,"简介",-1)));function r(e,t,a,o,r,i){const c=(0,n.up)("el-image"),d=(0,n.up)("el-aside"),p=(0,n.up)("video-list"),m=(0,n.up)("el-pagination"),g=(0,n.up)("comment"),v=(0,n.up)("el-main"),w=(0,n.up)("el-container");return(0,n.wg)(),(0,n.j4)(w,null,{default:(0,n.w5)((()=>[(0,n.Wm)(d,{class:"course-slide"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{class:"course-img",fit:"contain",src:e.getImageUrl(e.courseDetail.pic)},null,8,["src"]),(0,n._)("h3",u,(0,l.zw)(e.courseDetail.title),1)])),_:1}),(0,n.Wm)(v,{class:"course-main"},{default:(0,n.w5)((()=>[s,(0,n._)("p",null,(0,l.zw)(e.courseDetail.introduction),1),(0,n.Wm)(p,{class:"course-body",videoList:e.currentVideoList,courseId:e.courseId+""},null,8,["videoList","courseId"]),(0,n.Wm)(m,{class:"pagination",background:"",layout:"total, prev, pager, next","current-page":e.currentPage,"page-size":e.pageSize,total:e.total,onCurrentChange:e.handleCurrentChange},null,8,["current-page","page-size","total","onCurrentChange"]),(0,n.Wm)(g,{playId:e.courseId+"",type:1},null,8,["playId"])])),_:1})])),_:1})}var i=a(4870),c=a(9749),d=a(8045);const p={class:"content"},m=(0,n.Uk)("下载"),g=(0,n.Uk)("删除");function v(e,t,a,o,u,s){const r=(0,n.up)("el-table-column"),i=(0,n.up)("el-link"),c=(0,n.up)("MoreFilled"),d=(0,n.up)("el-icon"),v=(0,n.up)("el-dropdown-item"),w=(0,n.up)("el-dropdown-menu"),f=(0,n.up)("el-dropdown"),h=(0,n.up)("el-table");return(0,n.wg)(),(0,n.iD)("div",p,[(0,n.Wm)(h,{"highlight-current-row":"",data:e.dataList,onRowClick:e.handleClick},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{prop:"title",label:"目录"}),(0,n.Wm)(r,{prop:"guruName",label:"主讲"},{default:(0,n.w5)((t=>[(0,n.Wm)(i,{type:"primary",underline:!0,onClick:a=>e.handleGuruClick(t.$index,t.row)},{default:(0,n.w5)((()=>[(0,n.Uk)((0,l.zw)(t.row.guruName),1)])),_:2},1032,["onClick"])])),_:1}),(0,n.Wm)(r,{label:"下载",width:"80",align:"center"},{default:(0,n.w5)((t=>[(0,n.Wm)(f,null,{dropdown:(0,n.w5)((()=>[(0,n.Wm)(w,null,{default:(0,n.w5)((()=>[(0,n.Wm)(v,{icon:e.Download,onClick:a=>e.downloadVideo(t.row)},{default:(0,n.w5)((()=>[m])),_:2},1032,["icon","onClick"]),e.show?((0,n.wg)(),(0,n.j4)(v,{key:0,icon:e.Delete,onClick:a=>e.deleteCollection({id:t.row.id})},{default:(0,n.w5)((()=>[g])),_:2},1032,["icon","onClick"])):(0,n.kq)("",!0)])),_:2},1024)])),default:(0,n.w5)((()=>[(0,n.Wm)(d,{onClick:a=>e.handleEdit(t.row)},{default:(0,n.w5)((()=>[(0,n.Wm)(c)])),_:2},1032,["onClick"])])),_:2},1024)])),_:1})])),_:1},8,["data","onRowClick"])])}var w=a(9092),f=a(547),h=a(2828),y=a(2167),C=a(1588),k=(0,n.aZ)({components:{MoreFilled:w.Z},props:{videoList:Array,courseId:String,show:{default:!1}},emits:["changeData"],setup(e){const{checkStatus:t}=(0,d.Z)(),{proxy:a}=(0,n.FN)(),l=(0,c.oR)(),o=(0,i.iH)("guru-detail"),u=(0,i.iH)("video"),{routerManager:s}=(0,d.Z)(),{videoList:r,courseId:p}=(0,i.BK)(e),m=(0,i.qj)({dislike:C.JO.Dislike,like:C.JO.Like}),g=(0,n.Fl)((()=>l.getters.songUrl)),v=(0,n.Fl)((()=>l.getters.singerName)),w=(0,n.Fl)((()=>l.getters.songTitle)),k=(0,n.Fl)((()=>{const e=[];return null!==r.value&&r.value.length>0&&r.value.forEach(((t,a)=>{t["guruName"]=t.guruName,t["index"]=a,e.push(t)})),e}));function I(e){s(u.value,{path:`/${u.value}/${e.id}`})}async function _(e){const t=await y.x.getVideoURLOfId(e.id);window.location.href=t.data.url}async function D(e,t){try{const e=await y.x.getGuruOfId(t.guruId),n=e.data;a.$store.commit("setGuruDetail",n),s(o.value,{path:`/${o.value}/${n.id}`})}catch(n){console.error(n)}}function b(e){console.log("hello!")}const x=(0,n.Fl)((()=>l.getters.userId));async function L({id:e}){if(!t())return;const n=await y.x.deleteCollection(x.value,e);a.$message({message:n.message,type:n.type}),!1===n.data&&a.$emit("changeData",n.data)}return{path:o,dataList:k,iconList:m,Delete:f.Z,Download:h.Z,songUrl:g,singerName:v,songTitle:w,handleClick:I,handleGuruClick:D,handleEdit:b,downloadVideo:_,deleteCollection:L}}}),I=a(89);const _=(0,I.Z)(k,[["render",v],["__scopeId","data-v-e7e46724"]]);var D=_,b=a(8628),x=a(5803),L=(0,n.aZ)({components:{VideoList:D,Comment:b.Z},setup(){const{proxy:e}=(0,n.FN)(),t=(0,c.oR)(),{checkStatus:a,getImageUrl:l}=(0,d.Z)(),o=(0,i.iH)([]),u=(0,i.iH)(1),s=(0,i.iH)(12),r=(0,i.iH)(0),p=(0,i.iH)(""),m=(0,i.iH)(0),g=(0,i.iH)(0),v=(0,i.iH)(!1),w=(0,i.iH)("评价"),f=(0,n.Fl)((()=>t.getters.courseDetail)),C=(0,n.Fl)((()=>t.getters.userId));async function k(){const e=await y.x.getVideoListOfCourseId(p.value,u.value,s.value);o.value=e.data.items,r.value=e.data.total}function I(e){u.value=e,k()}async function _(e){const t=await y.x.getRankOfCourseId(e);g.value=t.data/2}async function D(){if(v.value||!a())return;const t=new URLSearchParams;t.append("courseId",p.value),t.append("consumerId",C.value),t.append("score",(2*m.value).toString());try{const a=await y.x.setRank(t);e.$message({message:a.message,type:a.type}),a.success&&(_(p.value),v.value=!0,w.value="已评价")}catch(n){console.error(n)}}return p.value=f.value.id,(0,n.bv)((()=>{k()})),{courseDetail:f,rank:g,score:m,disabledRank:v,assistText:w,currentVideoList:o,currentPage:u,pageSize:s,total:r,courseId:p,getImageUrl:l,pushValue:D,handleCurrentChange:I,Download:h.Z,Star:x.Z}}});const Z=(0,I.Z)(L,[["render",r],["__scopeId","data-v-6eba528b"]]);var U=Z},2828:function(e,t,a){a.d(t,{Z:function(){return c}});var n=a(3396),l=a(6854);const o=(0,n.aZ)({name:"Download"}),u={class:"icon",width:"200",height:"200",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},s=(0,n._)("path",{fill:"currentColor",d:"M160 832h704a32 32 0 110 64H160a32 32 0 110-64zm384-253.696l236.288-236.352 45.248 45.248L508.8 704 192 387.2l45.248-45.248L480 584.704V128h64v450.304z"},null,-1),r=[s];function i(e,t,a,l,o,s){return(0,n.wg)(),(0,n.iD)("svg",u,r)}var c=(0,l.Z)(o,[["render",i]])}}]);
//# sourceMappingURL=876.7d34424b.js.map
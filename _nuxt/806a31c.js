(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{336:function(t,n,e){"use strict";e.r(n);e(33),e(221);var o={props:{maxVisibleButtons:{type:Number,required:!1,default:3},totalPages:{type:Number,required:!0},perPage:{type:Number,required:!0},currentPage:{type:Number,required:!0}},data:function(){return{disabledFirst:null,disabledLast:null}},updated:function(){this.isInFirstPage(),this.isInLastPage()},computed:{startPage:function(){return 1===this.currentPage?1:this.currentPage===this.totalPages?this.totalPages-this.maxVisibleButtons:this.currentPage-1},pages:function(){for(var t=[],i=this.startPage;i<=Math.min(this.startPage+this.maxVisibleButtons-1,this.totalPages);i++)t.push({name:i,isDisabled:i===this.currentPage});return t}},methods:{isInFirstPage:function(){this.disabledFirst=1===this.currentPage},isInLastPage:function(){this.disabledLast=this.currentPage===this.totalPages},onClickFirstPage:function(){console.log(2),this.$emit("pagechanged",1)},onClickPreviousPage:function(){console.log(2),this.$emit("pagechanged",this.currentPage-1)},onClickPage:function(t){console.log(2),this.$emit("pagechanged",t)},onClickNextPage:function(){console.log(2),this.$emit("pagechanged",this.currentPage+1)},onClickLastPage:function(){console.log(2),this.$emit("pagechanged",this.totalPages)},isPageActive:function(t){return console.log(2),this.currentPage===t}}},c=e(22),component=Object(c.a)(o,(function(){var t=this,n=t._self._c;return n("ul",{staticClass:"pagination"},[n("li",{staticClass:"pagination-item first"},[n("button",{staticClass:"btn_option_pgnt_HE",attrs:{type:"button",disabled:t.disabledFirst},on:{click:t.onClickFirstPage}},[t._v("\n            First\n        ")])]),t._v(" "),n("li",{staticClass:"pagination-item previous",on:{click:function(n){return t.isInFirstPage()}}},[n("button",{staticClass:"btn_option_pgnt btn",attrs:{type:"button",disabled:t.disabledFirst},on:{click:t.onClickPreviousPage}},[n("font-awesome-icon",{attrs:{icon:["fas","angles-left"]}})],1)]),t._v(" "),t._l(t.pages,(function(e){return n("li",{key:e.name,staticClass:"pagination-item numb"},[n("button",{staticClass:"btn_option_pgnt",class:{active:t.isPageActive(e.name)},attrs:{type:"button",disabled:e.isDisabled},on:{click:function(n){return t.onClickPage(e.name)}}},[t._v("\n            "+t._s(e.name)+"\n        ")])])})),t._v(" "),n("li",{staticClass:"pagination-item next",on:{click:function(n){return t.isInLastPage()}}},[n("button",{staticClass:"btn_option_pgnt btn",attrs:{type:"button",disabled:t.disabledLast},on:{click:t.onClickNextPage}},[n("font-awesome-icon",{attrs:{icon:["fas","angles-right"]}})],1)]),t._v(" "),n("li",{staticClass:"pagination-item last"},[n("button",{staticClass:"btn_option_pgnt_HE",attrs:{type:"button",disabled:t.disabledLast},on:{click:t.onClickLastPage}},[t._v("\n            Last\n        ")])])],2)}),[],!1,null,"86d39578",null);n.default=component.exports}}]);
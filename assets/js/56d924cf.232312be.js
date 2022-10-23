"use strict";(self.webpackChunkflexbench=self.webpackChunkflexbench||[]).push([[868],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,k=d["".concat(p,".").concat(m)]||d[m]||c[m]||i;return n?r.createElement(k,l(l({ref:t},u),{},{components:n})):r.createElement(k,l({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},7692:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:3},l="Production",o={unversionedId:"Installation/production",id:"Installation/production",title:"Production",description:"This page is dedicated to production installation for",source:"@site/docs/Installation/production.md",sourceDirName:"Installation",slug:"/Installation/production",permalink:"/flexbench/docs/Installation/production",draft:!1,editUrl:"https://github.com/flexivian/flexbench/docs/Installation/production.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Development",permalink:"/flexbench/docs/Installation/development"},next:{title:"Simple Request",permalink:"/flexbench/docs/CodeExamples/simple-request"}},p={},s=[{value:"Desktop app",id:"desktop-app",level:2},{value:"Prerequisites",id:"prerequisites",level:3},{value:"Server app",id:"server-app",level:2},{value:"Prerequisites",id:"prerequisites-1",level:3},{value:"Plain installation",id:"plain-installation",level:3},{value:"Docker installation",id:"docker-installation",level:3},{value:"Kubernetes installation",id:"kubernetes-installation",level:3}],u={toc:s};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"production"},"Production"),(0,a.kt)("p",null,"This page is dedicated to production installation for"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Desktop app"),(0,a.kt)("li",{parentName:"ul"},"Server app")),(0,a.kt)("h2",{id:"desktop-app"},"Desktop app"),(0,a.kt)("h3",{id:"prerequisites"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"NodeJs"),(0,a.kt)("li",{parentName:"ul"},"npm / yarn")),(0,a.kt)("p",null,"To build production app follow the below steps:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Clone ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/flexivian/flexbench"},"Flexbench")," repo "),(0,a.kt)("li",{parentName:"ul"},"After cloning the repo change directory",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"cd desktop-app\n"))),(0,a.kt)("li",{parentName:"ul"},"Install dependencies",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm run install-dep\n"))),(0,a.kt)("li",{parentName:"ul"},"Build the executable files (unpacked) and installer",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm run electron:build\n")))),(0,a.kt)("p",null,"The executables and installer can be found in the ",(0,a.kt)("inlineCode",{parentName:"p"},"/dist")),(0,a.kt)("p",null,"After installing the executables you can delete the ",(0,a.kt)("inlineCode",{parentName:"p"},"repo")),(0,a.kt)("h2",{id:"server-app"},"Server app"),(0,a.kt)("h3",{id:"prerequisites-1"},"Prerequisites"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"NodeJs"),(0,a.kt)("li",{parentName:"ul"},"npm / yarn"),(0,a.kt)("li",{parentName:"ul"},"MongoDB"),(0,a.kt)("li",{parentName:"ul"},"Docker (only if using the docker to start server)"),(0,a.kt)("li",{parentName:"ul"},"docker-compose",(0,a.kt)("admonition",{parentName:"li",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"Make sure MongoDB server is running in the background.")))),(0,a.kt)("p",null,"There are three ways to start production server "),(0,a.kt)("p",null,"Below three steps are common for all"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Clone ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/flexivian/flexbench"},"Flexbench")," repo "),(0,a.kt)("li",{parentName:"ul"},"After cloning the repo change directory",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"cd server-app\n"))),(0,a.kt)("li",{parentName:"ul"},"Install dependencies",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm i \n")),"or",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"yarn install\n")))),(0,a.kt)("h3",{id:"plain-installation"},"Plain installation"),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"This method is discouraged because it can cause a lot of issues with other packages and is deprived of all the advantages that a Docker installation would offer.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"start production server",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm run start\n")))),(0,a.kt)("h3",{id:"docker-installation"},"Docker installation"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"This is the suggested method for single-node installation.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"start production server in docker container\nfor linux / macos",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm run docker-prod\n")),"for windows",(0,a.kt)("pre",{parentName:"li"},(0,a.kt)("code",{parentName:"pre"},"npm run docker-wprod\n")))),(0,a.kt)("h3",{id:"kubernetes-installation"},"Kubernetes installation"),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"This is the suggested method of installation for scalability. It can handle practically any load using the horizontal scaling features offered by Kubernetes.")))}c.isMDXComponent=!0}}]);
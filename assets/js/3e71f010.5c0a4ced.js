"use strict";(self.webpackChunkflexbench=self.webpackChunkflexbench||[]).push([[955],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>f});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=r.createContext({}),l=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},c=function(e){var n=l(e.components);return r.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),m=l(t),f=o,d=m["".concat(u,".").concat(f)]||m[f]||p[f]||i;return t?r.createElement(d,s(s({ref:n},c),{},{components:t})):r.createElement(d,s({ref:n},c))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,s=new Array(i);s[0]=m;var a={};for(var u in n)hasOwnProperty.call(n,u)&&(a[u]=n[u]);a.originalType=e,a.mdxType="string"==typeof e?e:o,s[1]=a;for(var l=2;l<i;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8444:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var r=t(7462),o=(t(7294),t(3905));const i={sidebar_position:2},s="Multi Request",a={unversionedId:"CodeExamples/multi-request",id:"CodeExamples/multi-request",title:"Multi Request",description:"This code example is for standalone script",source:"@site/docs/CodeExamples/multi-request.md",sourceDirName:"CodeExamples",slug:"/CodeExamples/multi-request",permalink:"/flexbench/docs/CodeExamples/multi-request",draft:!1,editUrl:"https://github.com/flexivian/flexbench/docs/CodeExamples/multi-request.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Simple Request",permalink:"/flexbench/docs/CodeExamples/simple-request"},next:{title:"2022",permalink:"/flexbench/docs/GSoC/2022"}},u={},l=[{value:"Create a multiple request script",id:"create-a-multiple-request-script",level:2},{value:"Run script",id:"run-script",level:2}],c={toc:l};function p(e){let{components:n,...t}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"multi-request"},"Multi Request"),(0,o.kt)("p",null,"This code example is for standalone script"),(0,o.kt)("h2",{id:"create-a-multiple-request-script"},"Create a multiple request script"),(0,o.kt)("p",null,"Create a file at root ",(0,o.kt)("inlineCode",{parentName:"p"},"multi-request.js"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:'title="multi-request.js"',title:'"multi-request.js"'},"/**\n * Scenario:\n * Generate requests towards specific domain\n **/\nvar trafficSimulator = require('flexbench');\n\n\nfunction runTest() {\n    trafficSimulator.debugMode(true);\n    trafficSimulator.testDuration(5);//-1 for infinite run\n    trafficSimulator.workers(1);\n    trafficSimulator.clients(2)\n    trafficSimulator.throttleRequests_bps(50000);//-1 for no throttling\n    trafficSimulator.randomDelayBetweenRequests('0.5-1.1');\n    trafficSimulator.setFunc('request', requestFunc);\n\n    trafficSimulator.start();\n\n    trafficSimulator.events.on('end', function (msg) {\n        //This function will run on exit/stop, when worker has received a message to offload his stats to his master\n        //Get from msg object all exposed metrics\n        console.log('\\nTraffic Simulator Results');\n        console.log('-------------------------');\n\n        var cArr = Object.keys(msg.counters);\n        for (var i = 0; i < cArr.length; i++) {\n            var key = cArr[i];\n            console.log('counter %s: %s ', key, msg.counters[key]);\n        }\n        console.log(\"Exiting..\");\n        process.exit();\n    });\n\n    //stop test after specific period or condition\\\n    setTimeout(function () {\n        trafficSimulator.stop();\n    }, 20 * 1000);\n\n}\n\n/**\n * Create your generate request function here\n * */\nvar requestFunc = function () {\n    //GENERATE REQUEST FUNCTION\n    //use random or roundrobbin ['random' | 'rr']\n    var req = trafficSimulator.multiRequest(requestOptions, 'random', function (response) {\n        console.log(\"Response: %s\", response.statusCode);\n        //response.setEncoding('utf8');\n        //response.on('data',function(chunk){\n        //    console.log(chunk.length)\n        //});\n    });\n\n    req.on('error', function (err) {\n        console.log('error:' + err.message);\n    });\n}\n\n\n\nvar requestOptions = {\n    '1': {\n        options: {\n            host: 'www.example.com',\n            port: '80',\n            path: '/',\n            method: 'GET',\n            headers: {\n                \"my-dummy-header\": '1'\n            }\n        }\n    },\n    '2': {\n        options: {\n            host: 'www.example.com',\n            port: '80',\n            path: '/dummy',\n            method: 'GET',\n            headers: {\n                \"my-dummy-header\": '1'\n            }\n        }\n    },\n    '3': {\n        options: {\n            host: 'www.example.com',\n            port: '80',\n            path: '/dummy',\n            method: 'GET',\n            headers: {\n                \"my-dummy-header\": '1'\n            }\n        }\n    },\n    '4': {\n        options: {\n            host: 'www.in.gr',\n            port: '80',\n            path: '/',\n            method: 'GET',\n            headers: {\n                \"my-dummy-header\": '1'\n            }\n        }\n    },\n    '5': {\n        options: {\n            host: 'www.mobistuff.net',\n            port: '80',\n            path: '/',\n            method: 'GET',\n            headers: {\n                \"my-dummy-header\": '1'\n            }\n        }\n    }\n}\n\nrunTest();\n")),(0,o.kt)("h2",{id:"run-script"},"Run script"),(0,o.kt)("p",null,"Open terminal in your root directory and execute the below command"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"node multi-request.js\n")))}p.isMDXComponent=!0}}]);
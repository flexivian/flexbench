"use strict";(self.webpackChunkflexbench=self.webpackChunkflexbench||[]).push([[671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=c(n),f=i,h=d["".concat(l,".").concat(f)]||d[f]||p[f]||a;return n?r.createElement(h,s(s({ref:t},u),{},{components:n})):r.createElement(h,s({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,s=new Array(a);s[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<a;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={sidebar_position:1},s="What is Flexbench?",o={unversionedId:"intro",id:"intro",title:"What is Flexbench?",description:"Flexbench is a fully customizable NodeJS script , generating simulated HTTP traffic.  It can be used as a standalone script, as a desktop-app and as a server to simulate traffic with specific characteristics, such as read/write ratio, duration, number of requests to generate, in/out traffic throttling and more.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/flexbench/docs/intro",draft:!1,editUrl:"https://github.com/flexivian/flexbench/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Getting Started",permalink:"/flexbench/docs/Installation/GettingStarted"}},l={},c=[{value:"Features",id:"features",level:2},{value:"Clustering",id:"clustering",level:3},{value:"Delay between requests",id:"delay-between-requests",level:3},{value:"Throttling",id:"throttling",level:3},{value:"Duration of test",id:"duration-of-test",level:3},{value:"Number of requests",id:"number-of-requests",level:3},{value:"Statistics",id:"statistics",level:3},{value:"Deploying Flexbench",id:"deploying-flexbench",level:2},{value:"Standalone Script",id:"standalone-script",level:2},{value:"Desktop App",id:"desktop-app",level:2},{value:"what is scenario?",id:"what-is-scenario",level:4},{value:"Features",id:"features-1",level:3},{value:"Server App",id:"server-app",level:2},{value:"Something Missing?",id:"something-missing",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"what-is-flexbench"},"What is Flexbench?"),(0,i.kt)("p",null,"Flexbench is a fully customizable NodeJS script , generating simulated HTTP traffic.  It can be used as a ",(0,i.kt)("a",{parentName:"p",href:"#standalone-script"},"standalone script"),", as a ",(0,i.kt)("a",{parentName:"p",href:"#desktop-app"},"desktop-app")," and as a ",(0,i.kt)("a",{parentName:"p",href:"#server"},"server")," to simulate traffic with specific characteristics, such as read/write ratio, duration, number of requests to generate, in/out traffic throttling and more."),(0,i.kt)("h2",{id:"features"},"Features"),(0,i.kt)("p",null,"Below you can find some of Flexbench core features"),(0,i.kt)("h3",{id:"clustering"},"Clustering"),(0,i.kt)("p",null,"By utilizing the NodeJS ",(0,i.kt)("strong",{parentName:"p"},"cluster")," module, the script can initialize a cluster of workers, each one simulating a batch of clients, taking full advantage of the hardware resources and parallelization. Each worker has its own process space and heap memory, keeping the batches of clients isolated from each other and using effectively all the cores of the system.\nClients\nEach worker is responsible to create a batch of clients. The client will generate HTTP requests. Depending on the configuration, a client can generate requests for a specific duration, or a specific number, with customizable delays between them.  Each client can create requests with a pipelined manner, meaning that the next request is created upon having the previous finished first. The pipelined configuration can also be disabled, having each client generating requests with specific delays, but not waiting for previous ones to finish first."),(0,i.kt)("h3",{id:"delay-between-requests"},"Delay between requests"),(0,i.kt)("p",null,"Delay is a configured parameter and can be initialized with two ways: As a single value in milliseconds or a range between two values, selecting a random one between of them."),(0,i.kt)("h3",{id:"throttling"},"Throttling"),(0,i.kt)("p",null,"Under specific scenarios, there is the need to throttle the generated traffic. This is supported by utilizing the \u2018throttle-proxy\u2019 NodeJS module with a few customizations. To throttle or not, is set by a configuration parameter for both inbound and outbound traffic, in bytes per second units.  If enabled, a web proxy server is initialized on start ",(0,i.kt)("strong",{parentName:"p"},"(same number of proxies with workers)"),", handling all the traffic generated both ways, applying a throttle policy on each request."),(0,i.kt)("h3",{id:"duration-of-test"},"Duration of test"),(0,i.kt)("p",null,"A test can be configured to run for a specific period or infinitively upon interruption. The configured value is set in seconds."),(0,i.kt)("h3",{id:"number-of-requests"},"Number of requests"),(0,i.kt)("p",null,"A test can be configured to run for a specific number of requests generated by all clients. The configured value is an integer value with the total number of requests all the clients should generate."),(0,i.kt)("h3",{id:"statistics"},"Statistics"),(0,i.kt)("p",null,"Each worker is capable of collecting its own metrics on served requests.  In this version the total number of responses with their codes is collected.  When the test is finished all workers\u2019 statistics are aggregated by the Master process and values are returned for further processing."),(0,i.kt)("h2",{id:"deploying-flexbench"},"Deploying Flexbench"),(0,i.kt)("p",null,"Flexbench can be deployed with different options and configurations."),(0,i.kt)("h2",{id:"standalone-script"},"Standalone Script"),(0,i.kt)("p",null,"As standalone script through command line with arguments or to be included in another script. It has 3 main phases: ",(0,i.kt)("inlineCode",{parentName:"p"},"Initialize \u2013 Run \u2013 Stop"),". For more details on how to write a simple request script have a look at ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("a",{parentName:"strong",href:"/docs/CodeExamples/simple-request"},"Code Example")),"."),(0,i.kt)("h2",{id:"desktop-app"},"Desktop App"),(0,i.kt)("p",null,"A cross platform desktop app built with ",(0,i.kt)("a",{parentName:"p",href:"https://www.electronjs.org/"},"ElectronJs"),". It is an easy to use http traffic simulator app."),(0,i.kt)("p",null,"The purpose of desktop app is to provide user an easy to use GUI, with much more abstraction than using standalone script"),(0,i.kt)("p",null,"User can save multiple scenarios with different request configuration.\nThe scenarios can be exported as a flie with extention ",(0,i.kt)("inlineCode",{parentName:"p"},".flex")," and can be imported in other device that has flexbench desktop app installed."),(0,i.kt)("h4",{id:"what-is-scenario"},"what is scenario?"),(0,i.kt)("p",null,"scenario is a list of configurations for generating simulated HTTP traffic.\nThe configuration have the below options:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"testDuration               - in seconds (-1 for infinite run)\nworkers                    - no. of workers (recomended to use equal the no. of cpus available)\nclients                    - no. of clients to make request\nthrottleRequests_bps       - in bps (-1 for no throttling)\nrandomDelayBetweenRequests - a random between each request eg.('0.5-1.1');\n")),(0,i.kt)("h3",{id:"features-1"},"Features"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"create multiple projects"),(0,i.kt)("li",{parentName:"ul"},"create multiple scenarios"),(0,i.kt)("li",{parentName:"ul"},"create multiple requests"),(0,i.kt)("li",{parentName:"ul"},"run single / multiple scenarios"),(0,i.kt)("li",{parentName:"ul"},"run single / multiple requests"),(0,i.kt)("li",{parentName:"ul"},"import / export scenarios"),(0,i.kt)("li",{parentName:"ul"},"access to logs of every request")),(0,i.kt)("h2",{id:"server-app"},"Server App"),(0,i.kt)("p",null,"Server exposing REST apis for generating simulated HTTP traffic. "),(0,i.kt)("h2",{id:"something-missing"},"Something Missing?"),(0,i.kt)("p",null,"If something is missing in the documentation or if you found some part confusing, please click on ",(0,i.kt)("strong",{parentName:"p"},"edit this Page")," and create a PR for improvement. We love your contribution!"))}p.isMDXComponent=!0}}]);
(window.webpackJsonpreact_app_first=window.webpackJsonpreact_app_first||[]).push([[0],{33:function(e,t,s){e.exports=s(56)},38:function(e,t,s){},40:function(e,t,s){},46:function(e,t){},47:function(e,t){},48:function(e,t){},49:function(e,t){},50:function(e,t){},51:function(e,t){},56:function(e,t,s){"use strict";s.r(t);var n,o=s(1),i=s.n(o),l=s(12),r=s.n(l),c=(s(38),s(21)),h=s.n(c),a=s(22),d=s(11),u=s(23),b=s(24),f=s(4),k=s(26),v=s(29),m=(s(40),s(25)),y=s(70),p=s(69);function S(){return(S=Object(v.a)(h.a.mark(function e(){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a("https://eggplanck.github.io/QTTT/DDQN3/model.json");case 2:return n=e.sent,e.next=5,n.summary();case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){S.apply(this,arguments)}();var g=function(e){function t(e){var s;return Object(a.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).handleClick=s.handleClick.bind(Object(f.a)(s)),s.state={stones:e.stones,visibleSelect:s.unselectedStyle,selected:Boolean(e.selected)},s.unselectedStyle={backgroundColor:"white"},s.selectedStyle={backgroundColor:"gray"},s.firstStyle={backgroundColor:"rgba(255, 0, 0, 0.6)"},s.secondStyle={backgroundColor:"rgba(0, 0, 255, 0.6)"},s.number=Number(e.number),s.clickAction=e.onClick,s}return Object(k.a)(t,e),Object(d.a)(t,[{key:"handleClick",value:function(){this.clickAction(this.number)}},{key:"componentDidUpdate",value:function(e){e.stones!==this.props.stones&&("string"===typeof this.props.stones?"\u3007"===this.props.stones[0]?this.setState({visibleSelect:this.firstStyle}):"\u2716"===this.props.stones[0]&&this.setState({visibleSelect:this.secondStyle}):this.setState({visibleSelect:this.unselectedStyle}),this.setState({stones:this.props.stones})),e.selected!==this.props.selected&&(this.setState({selected:Boolean(this.props.selected)}),Boolean(this.props.selected)?this.setState({visibleSelect:this.selectedStyle}):"string"!==typeof this.props.stones&&this.setState({visibleSelect:this.unselectedStyle}))}},{key:"render",value:function(){return i.a.createElement("td",{className:"Block",style:this.state.visibleSelect,onClick:this.handleClick},this.state.stones)}}]),t}(o.Component);function L(e){if("entanglement"===e.turnType){var t=[],s=!0,n=!1,o=void 0;try{for(var i,l=e.stonePos[e.selected[1]][Symbol.iterator]();!(s=(i=l.next()).done);s=!0){var r=i.value;e.checkBlock(e.selected[1],e.selected[1],r)&&t.push(r)}}catch(u){n=!0,o=u}finally{try{s||null==l.return||l.return()}finally{if(n)throw o}}return t[Math.floor(Math.random()*t.length)]}for(var c=[],h=0;h<e.blocks.length;h++)"string"!==typeof e.blocks[h].stones&&c.push(h);var a=Math.floor(Math.random()*c.length),d=c[a];return c.splice(a,1),[d,c[Math.floor(Math.random()*c.length)]]}function W(e){if(100*Math.random()<100){for(var t=[],s=0;s<8;s++)for(var o=s+1;o<9;o++)t.push([s,o]);for(var i=0;i<9;i++)t.push(i+1);var l=[0,0,0,0,0,0,0,0,0],r=Array(162);r.fill(0);for(var c=0;c<9;c++){var h=e.decidedPos[c];0!==h&&(r[18*c+(h-1)]=1,l[c]=1)}for(var a=0;a<9;a++)if(0===l[a]){for(var d=e.stonePos[a],u=0;u<d.length;u++){r[18*a+9+d[u]-1]=1}l[a]=1}r=m.b([r]);var b=n.predict(r).dataSync(),f=b.indexOf(Math.max.apply(null,b)),k=t[f];if(Math.max.apply(null,b)>=0&&100*Math.random()>80)return console.log("random choice"),L(e);if(console.log(Math.max.apply(null,b)),"entanglement"===e.turnType){var v=[],y=!0,p=!1,S=void 0;try{for(var g,W=e.stonePos[e.selected[1]][Symbol.iterator]();!(y=(g=W.next()).done);y=!0){var P=g.value;e.checkBlock(e.selected[1],e.selected[1],P)&&v.push(P)}}catch(A){p=!0,S=A}finally{try{y||null==W.return||W.return()}finally{if(p)throw S}}(-1===v.indexOf(k)||f<36)&&(k=v[Math.floor(Math.random()*v.length)])}else{for(var B=[],w=0;w<e.blocks.length;w++)"string"!==typeof e.blocks[w].stones&&B.push(w);if(f>=36){var O=Math.floor(Math.random()*B.length),M=B[O];B.splice(O,1),k=[M,B[Math.floor(Math.random()*B.length)]]}else{var x=!0,F=!1,j=void 0;try{for(var E,C=k[Symbol.iterator]();!(x=(E=C.next()).done);x=!0){var N=E.value;if(-1===B.indexOf(N)){var T=Math.floor(Math.random()*B.length),U=B[T];B.splice(T,1),k=[U,B[Math.floor(Math.random()*B.length)]];break}}}catch(A){F=!0,j=A}finally{try{x||null==C.return||C.return()}finally{if(F)throw j}}}}return k}return L(e)}var P=function(e){function t(e){var s;return Object(a.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).makeLines=s.makeLines.bind(Object(f.a)(s)),s.addTurn=s.addTurn.bind(Object(f.a)(s)),s.addSelected=s.addSelected.bind(Object(f.a)(s)),s.checkEntanglement=s.checkEntanglement.bind(Object(f.a)(s)),s.checkBlock=s.checkBlock.bind(Object(f.a)(s)),s.choiceAction=s.choiceAction.bind(Object(f.a)(s)),s.decideBlock=s.decideBlock.bind(Object(f.a)(s)),s.decideBlock1=s.decideBlock1.bind(Object(f.a)(s)),s.decideBlock2=s.decideBlock2.bind(Object(f.a)(s)),s.checkWinLose=s.checkWinLose.bind(Object(f.a)(s)),s.resetField=s.resetField.bind(Object(f.a)(s)),s.state={turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}},s.turn=1,s.turnUser=0,s.turnType="normal",s.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],s.selected=[],s.haveStones=[],s.stonePos=[[],[],[],[],[],[],[],[],[]],s.decidedPos=[0,0,0,0,0,0,0,0,0],s.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],s}return Object(k.a)(t,e),Object(d.a)(t,[{key:"makeLines",value:function(){for(var e=this,t=[],s=0;s<3;s++)t.push(i.a.createElement("tr",{key:s},this.state.blocks.slice(3*s,3*s+3).map(function(t,s){return i.a.createElement(g,{number:t.number,stones:t.stones,selected:t.selected,onClick:e.addSelected,key:t.number})})));return t}},{key:"addSelected",value:function(e){if("normal"===this.turnType&&"string"!==typeof this.blocks[Number(e)].stones)if(this.blocks[Number(e)].selected){this.blocks[Number(e)].selected=!1;for(var t=0;t<this.selected.length;t++)this.selected[t]===e&&this.selected.splice(t,1);this.setState({blocks:this.blocks})}else this.selected.length<2&&(this.blocks[Number(e)].selected=!0,this.selected.push(Number(e)),this.setState({blocks:this.blocks}))}},{key:"addTurn",value:function(){if(2===this.selected.length){var e=!0,t=!1,s=void 0;try{for(var n,o=this.selected[Symbol.iterator]();!(e=(n=o.next()).done);e=!0){var i=n.value;0===this.turnUser?this.blocks[i].stones.push("\u3007"+this.turn+" "):this.blocks[i].stones.push("\u2716"+this.turn+" "),this.blocks[i].selected=!1,this.setState({blocks:this.blocks})}}catch(a){t=!0,s=a}finally{try{e||null==o.return||o.return()}finally{if(t)throw s}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",this.selected.sort(function(e,t){return e<t?-1:e>t?1:0}),void this.cpusChoice();if(this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[],9===this.turn){for(var l=0,r=-1,c=0;c<9;c++)"string"!==typeof this.blocks[c].stones&&(l+=1,r=c);if(1===l){this.blocks[r].stones="\u30079",this.stonePosForWinLose[Math.floor(r/3)][Math.round(r%3)]=9,this.decidedPos[r]=9,this.setState({blocks:this.blocks});var h=this.checkWinLose();if(-1===h&&10!==this.turn)return;-1===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5f15\u304d\u5206\u3051"}}),0===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5148\u624b\u306e\u52dd\u3061"}}),1===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5f8c\u624b\u306e\u52dd\u3061"}})}}this.cpusChoice()}}},{key:"checkEntanglement",value:function(e,t,s){if(1===this.stonePos[t].length)return!1;for(var n=0;n<this.stonePos[t].length;n++){var o=this.stonePos[t][n];if(o!==s&&this.checkBlock(e,t,o))return!0}return!1}},{key:"checkBlock",value:function(e,t,s){for(var n=0;n<this.haveStones[s-1].length;n++){var o=this.haveStones[s-1][n];if(o!==t){if(e===o)return!0;if(this.checkEntanglement(e,o,s))return!0}}return!1}},{key:"choiceAction",value:function(){this.blocks[this.selected[1]].selected=!0;var e=[],t=!0,s=!1,n=void 0;try{for(var o,i=this.stonePos[this.selected[1]][Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var l=o.value;this.checkBlock(this.selected[1],this.selected[1],l)&&e.push(l)}}catch(r){s=!0,n=r}finally{try{t||null==i.return||i.return()}finally{if(s)throw n}}this.setState({blocks:this.blocks,choices:e}),this.setState({buttonBisible:{display:"none"},choiceBisible:{display:"inline-block"}})}},{key:"decideBlock",value:function(e){var t=Number(e);this.blocks[this.selected[1]].selected=!1,this.setState({blocks:this.blocks}),this.stonePosForWinLose[Math.floor(this.selected[1]/3)][Math.round(this.selected[1]%3)]=t,this.decidedPos[this.selected[1]]=t,t%2===1?this.blocks[this.selected[1]].stones="\u3007"+t:t%2===0&&(this.blocks[this.selected[1]].stones="\u2716"+t),this.decideBlock1(this.selected[1],this.selected[1],t,t),this.setState({blocks:this.blocks}),this.turnType="normal",this.setState({buttonBisible:{display:"block"},choiceBisible:{display:"none"}}),this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[];var s=this.checkWinLose();if(-1===s&&10!==this.turn){if(9===this.turn){for(var n=0,o=-1,i=0;i<9;i++)"string"!==typeof this.blocks[i].stones&&(n+=1,o=i);if(1===n){this.blocks[o].stones="\u30079",this.stonePosForWinLose[Math.floor(o/3)][Math.round(o%3)]=9,this.decidedPos[o]=9,this.setState({blocks:this.blocks});var l=this.checkWinLose();-1===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}}),0===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}),1===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}})}}return 1===this.turnUser?void this.cpusChoice():void 0}-1===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}}),0===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}),1===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}})}},{key:"decideBlock1",value:function(e,t,s,n){for(var o=0;o<this.stonePos[t].length;o++){var i=this.stonePos[t][o];if(i!==s&&this.decideBlock2(e,t,i,n),e===t&&i===n)for(var l=0;l<this.haveStones[n-1].length;l++){var r=this.haveStones[n-1][l];if(r!==t){for(var c=0;c<this.blocks[r].stones.length;c++){this.blocks[r].stones[c]===(n%2===1?"\u3007"+n:"\u2716"+n)&&this.blocks[r].stones.splice(c,1)}for(var h=0;h<this.stonePos[r].length;h++){this.stonePos[r][h]===n&&this.stonePos[r].splice(h,1)}}}}}},{key:"decideBlock2",value:function(e,t,s,n){for(var o=0;o<this.haveStones[s-1].length;o++){var i=this.haveStones[s-1][o];if(i!==t){if(e===i)return;this.decideBlock1(e,i,s,n),s%2===1?this.blocks[i].stones="\u3007"+s:s%2===0&&(this.blocks[i].stones="\u2716"+s),this.stonePosForWinLose[Math.floor(i/3)][Math.round(i%3)]=s,this.decidedPos[i]=s}}}},{key:"checkWinLose",value:function(){for(var e=!1,t=10,s=!1,n=10,o=0;o<3;o++){for(var i=0,l=0,r=0,c=0;c<3;c++)this.stonePosForWinLose[o][c]%2===1&&(i+=1),this.stonePosForWinLose[o][c]%2===0&&(l+=1),this.stonePosForWinLose[o][c]>r&&(r=this.stonePosForWinLose[o][c]);3===i&&(e=!0,r<t&&(t=r)),3===l&&(s=!0,r<n&&(n=r))}for(var h=0;h<3;h++){for(var a=0,d=0,u=0,b=0;b<3;b++)this.stonePosForWinLose[b][h]%2===1&&(a+=1),this.stonePosForWinLose[b][h]%2===0&&(d+=1),this.stonePosForWinLose[b][h]>u&&(u=this.stonePosForWinLose[b][h]);3===a&&(e=!0,u<t&&(t=u)),3===d&&(s=!0,u<n&&(n=u))}for(var f=0,k=0,v=0,m=0;m<3;m++)this.stonePosForWinLose[m][m]%2===1&&(f+=1),this.stonePosForWinLose[m][m]%2===0&&(k+=1),this.stonePosForWinLose[m][m]>v&&(v=this.stonePosForWinLose[m][m]);3===f&&(e=!0,v<t&&(t=v)),3===k&&(s=!0,v<n&&(n=v)),f=0,k=0,v=0;for(var y=0;y<3;y++)this.stonePosForWinLose[y][2-y]%2===1&&(f+=1),this.stonePosForWinLose[y][2-y]%2===0&&(k+=1),this.stonePosForWinLose[y][2-y]>v&&(v=this.stonePosForWinLose[y][2-y]);if(3===f&&(e=!0,v<t&&(t=v)),3===k&&(s=!0,v<n&&(n=v)),!0===e&&!1===s)return 0;if(!1===e&&!0===s)return 1;if(!0===e&&!0===s){if(t<n)return 0;if(t>n)return 1}return-1}},{key:"resetField",value:function(){this.turn=1,this.turnUser=0,this.turnType="normal",this.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],this.selected=[],this.haveStones=[],this.stonePos=[[],[],[],[],[],[],[],[],[]],this.decidedPos=[0,0,0,0,0,0,0,0,0],this.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],this.setState({turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}})}},{key:"cpusChoice",value:function(){if("entanglement"===this.turnType){var e=W(this);this.decideBlock(e)}else{var t=W(this);if(this.selected=t,2===this.selected.length){var s=!0,n=!1,o=void 0;try{for(var i,l=this.selected[Symbol.iterator]();!(s=(i=l.next()).done);s=!0){var r=i.value;0===this.turnUser?this.blocks[r].stones.push("\u3007"+this.turn+" "):this.blocks[r].stones.push("\u2716"+this.turn+" "),this.setState({blocks:this.blocks})}}catch(c){n=!0,o=c}finally{try{s||null==l.return||l.return()}finally{if(n)throw o}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",void this.choiceAction();this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[]}}}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"Field"},i.a.createElement("div",{className:"showWinLose",style:this.state.showWinLose.style,onClick:this.resetField},this.state.showWinLose.text),i.a.createElement("table",{className:"App"},i.a.createElement("tbody",null,this.makeLines())),i.a.createElement("div",{className:"turndisplay"},"turn: ",this.turn),i.a.createElement(y.a,{variant:"contained",color:"default",size:"large",className:"button",style:this.state.buttonBisible,onClick:this.addTurn},"\u78ba\u5b9a"),i.a.createElement(p.a,{className:"choice",style:this.state.choiceBisible},this.state.choices.map(function(t,s){return i.a.createElement(y.a,{variant:"contained",size:"medium",className:"marubatsu",key:s,"data-turn":t,onClick:function(t){return e.decideBlock(t.currentTarget.dataset.turn)}},t%2===1?"\u3007"+t:"\u2716"+t)})))}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.fff3a7ef.chunk.js.map
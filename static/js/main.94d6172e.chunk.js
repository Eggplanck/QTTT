(window.webpackJsonpreact_app_first=window.webpackJsonpreact_app_first||[]).push([[0],{33:function(e,t,s){e.exports=s(56)},38:function(e,t,s){},40:function(e,t,s){},46:function(e,t){},47:function(e,t){},48:function(e,t){},49:function(e,t){},50:function(e,t){},51:function(e,t){},56:function(e,t,s){"use strict";s.r(t);var n,i=s(1),o=s.n(i),l=s(12),r=s.n(l),c=(s(38),s(25)),a=s.n(c),h=s(19),d=s(11),u=s(20),b=s(21),k=s(4),f=s(22),v=s(29),y=(s(40),s(26)),m=s(70),p=s(69);function S(){return(S=Object(v.a)(a.a.mark(function e(){return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a("https://eggplanck.github.io/QTTT/DDQN4/model.json");case 2:return n=e.sent,e.next=5,n.summary();case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){S.apply(this,arguments)}();var g=function(e){function t(e){var s;return Object(h.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).handleClick=s.handleClick.bind(Object(k.a)(s)),s.state={stones:e.stones,visibleSelect:s.unselectedStyle,selected:Boolean(e.selected)},s.unselectedStyle={backgroundColor:"white"},s.selectedStyle={backgroundColor:"gray"},s.firstStyle={backgroundColor:"rgba(255, 0, 0, 0.6)"},s.secondStyle={backgroundColor:"rgba(0, 0, 255, 0.6)"},s.number=Number(e.number),s.clickAction=e.onClick,s}return Object(f.a)(t,e),Object(d.a)(t,[{key:"handleClick",value:function(){this.clickAction(this.number)}},{key:"componentDidUpdate",value:function(e){e.stones!==this.props.stones&&("string"===typeof this.props.stones?"\u3007"===this.props.stones[0]?this.setState({visibleSelect:this.firstStyle}):"\u2716"===this.props.stones[0]&&this.setState({visibleSelect:this.secondStyle}):this.setState({visibleSelect:this.unselectedStyle}),this.setState({stones:this.props.stones})),e.selected!==this.props.selected&&(this.setState({selected:Boolean(this.props.selected)}),Boolean(this.props.selected)?this.setState({visibleSelect:this.selectedStyle}):"string"!==typeof this.props.stones&&this.setState({visibleSelect:this.unselectedStyle}))}},{key:"render",value:function(){return o.a.createElement("td",{className:"Block",style:this.state.visibleSelect,onClick:this.handleClick},this.state.stones)}}]),t}(i.Component),W=function(e){function t(e){var s;return Object(h.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).clickAction=e.onClick,s.state={style:e.style},s}return Object(f.a)(t,e),Object(d.a)(t,[{key:"handleClick",value:function(e){this.clickAction(e)}},{key:"componentDidUpdate",value:function(e){e!==this.props&&this.setState({style:this.props.style})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"InitDisplay",style:this.state.style},o.a.createElement("div",{className:"sengo"},o.a.createElement("p",{className:"mess"},"Select Mark and Start"),o.a.createElement(m.a,{variant:"contained",className:"sengobutton",size:"large",onClick:function(){return e.handleClick(0)}},"\u3007"),o.a.createElement(m.a,{variant:"contained",className:"sengobutton",size:"large",onClick:function(){return e.handleClick(1)}},"\u2716")))}}]),t}(i.Component);function L(e){if(100*Math.random()<100){for(var t=[],s=0;s<8;s++)for(var i=s+1;i<9;i++)t.push([s,i]);for(var o=0;o<9;o++)t.push(o+1);var l=[0,0,0,0,0,0,0,0,0],r=Array(162);r.fill(0);for(var c=0;c<9;c++){var a=e.decidedPos[c];0!==a&&(r[18*c+(a-1)]=1,l[c]=1)}for(var h=0;h<9;h++)if(0===l[h]){for(var d=e.stonePos[h],u=0;u<d.length;u++){r[18*h+9+d[u]-1]=1}l[h]=1}r=y.b([r]);var b=n.predict(r).dataSync(),k=function(e,t){for(var s,n=e.reduce(function(e,s){return e+Math.pow(t,s)},0),i=Math.random()*n,o=0,l=0;l<45;l++){if(s=o+Math.pow(t,e[l]),o<=i&&i<s)return l;o=s}}(b,400),f=t[k];if(console.log(Math.max.apply(null,b)),"entanglement"===e.turnType){var v=[],m=!0,p=!1,S=void 0;try{for(var g,W=e.stonePos[e.selected[1]][Symbol.iterator]();!(m=(g=W.next()).done);m=!0){var L=g.value;e.checkBlock(e.selected[1],e.selected[1],L)&&v.push(L)}}catch(T){p=!0,S=T}finally{try{m||null==W.return||W.return()}finally{if(p)throw S}}(-1===v.indexOf(f)||k<36)&&(f=v[Math.floor(Math.random()*v.length)])}else{for(var P=[],M=0;M<e.blocks.length;M++)"string"!==typeof e.blocks[M].stones&&P.push(M);if(k>=36){var O=Math.floor(Math.random()*P.length),w=P[O];P.splice(O,1),f=[w,P[Math.floor(Math.random()*P.length)]]}else{var B=!0,j=!1,C=void 0;try{for(var E,F=f[Symbol.iterator]();!(B=(E=F.next()).done);B=!0){var x=E.value;if(-1===P.indexOf(x)){var N=Math.floor(Math.random()*P.length),U=P[N];P.splice(N,1),f=[U,P[Math.floor(Math.random()*P.length)]];break}}}catch(T){j=!0,C=T}finally{try{B||null==F.return||F.return()}finally{if(j)throw C}}}}return f}return console.log("random action"),function(e){if("entanglement"===e.turnType){var t=[],s=!0,n=!1,i=void 0;try{for(var o,l=e.stonePos[e.selected[1]][Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var r=o.value;e.checkBlock(e.selected[1],e.selected[1],r)&&t.push(r)}}catch(T){n=!0,i=T}finally{try{s||null==l.return||l.return()}finally{if(n)throw i}}return t[Math.floor(Math.random()*t.length)]}for(var c=[],a=0;a<e.blocks.length;a++)"string"!==typeof e.blocks[a].stones&&c.push(a);var h=Math.floor(Math.random()*c.length),d=c[h];return c.splice(h,1),[d,c[Math.floor(Math.random()*c.length)]]}(e)}var P=function(e){function t(e){var s;return Object(h.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).makeLines=s.makeLines.bind(Object(k.a)(s)),s.addTurn=s.addTurn.bind(Object(k.a)(s)),s.addSelected=s.addSelected.bind(Object(k.a)(s)),s.checkEntanglement=s.checkEntanglement.bind(Object(k.a)(s)),s.checkBlock=s.checkBlock.bind(Object(k.a)(s)),s.choiceAction=s.choiceAction.bind(Object(k.a)(s)),s.decideBlock=s.decideBlock.bind(Object(k.a)(s)),s.decideBlock1=s.decideBlock1.bind(Object(k.a)(s)),s.decideBlock2=s.decideBlock2.bind(Object(k.a)(s)),s.checkWinLose=s.checkWinLose.bind(Object(k.a)(s)),s.resetField=s.resetField.bind(Object(k.a)(s)),s.start=s.start.bind(Object(k.a)(s)),s.state={init:{display:"block"},fieldDisplay:{display:"none"},turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}},s.userMark=0,s.turn=1,s.turnUser=0,s.turnType="normal",s.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],s.selected=[],s.haveStones=[],s.stonePos=[[],[],[],[],[],[],[],[],[]],s.decidedPos=[0,0,0,0,0,0,0,0,0],s.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],s}return Object(f.a)(t,e),Object(d.a)(t,[{key:"makeLines",value:function(){for(var e=this,t=[],s=0;s<3;s++)t.push(o.a.createElement("tr",{key:s},this.state.blocks.slice(3*s,3*s+3).map(function(t,s){return o.a.createElement(g,{number:t.number,stones:t.stones,selected:t.selected,onClick:e.addSelected,key:t.number})})));return t}},{key:"start",value:function(e){0===e&&(this.userMark=0,this.setState({init:{display:"none"},fieldDisplay:{display:"block"}})),1===e&&(this.userMark=1,this.setState({init:{display:"none"},fieldDisplay:{display:"block"}}),this.cpusChoice())}},{key:"addSelected",value:function(e){if("normal"===this.turnType&&"string"!==typeof this.blocks[Number(e)].stones)if(this.blocks[Number(e)].selected){this.blocks[Number(e)].selected=!1;for(var t=0;t<this.selected.length;t++)this.selected[t]===e&&this.selected.splice(t,1);this.setState({blocks:this.blocks})}else this.selected.length<2&&(this.blocks[Number(e)].selected=!0,this.selected.push(Number(e)),this.setState({blocks:this.blocks}))}},{key:"addTurn",value:function(){if(2===this.selected.length){var e=!0,t=!1,s=void 0;try{for(var n,i=this.selected[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var o=n.value;0===this.turnUser?this.blocks[o].stones.push("\u3007"+this.turn+" "):this.blocks[o].stones.push("\u2716"+this.turn+" "),this.blocks[o].selected=!1,this.setState({blocks:this.blocks})}}catch(h){t=!0,s=h}finally{try{e||null==i.return||i.return()}finally{if(t)throw s}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",this.selected.sort(function(e,t){return e<t?-1:e>t?1:0}),void this.cpusChoice();if(this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[],9===this.turn){for(var l=0,r=-1,c=0;c<9;c++)"string"!==typeof this.blocks[c].stones&&(l+=1,r=c);if(1===l){this.blocks[r].stones="\u30079",this.stonePosForWinLose[Math.floor(r/3)][Math.round(r%3)]=9,this.decidedPos[r]=9,this.setState({blocks:this.blocks});var a=this.checkWinLose();if(-1===a&&10!==this.turn)return;-1===a&&this.setState({showWinLose:{style:{display:"inline-block"},text:"DRAW"}}),a===this.userMark&&this.setState({showWinLose:{style:{display:"inline-block"},text:"YOU WIN"}}),a===this.userMark&&this.setState({showWinLose:{style:{display:"inline-block"},text:"YOU LOSE"}})}}this.cpusChoice()}}},{key:"checkEntanglement",value:function(e,t,s){if(1===this.stonePos[t].length)return!1;for(var n=0;n<this.stonePos[t].length;n++){var i=this.stonePos[t][n];if(i!==s&&this.checkBlock(e,t,i))return!0}return!1}},{key:"checkBlock",value:function(e,t,s){for(var n=0;n<this.haveStones[s-1].length;n++){var i=this.haveStones[s-1][n];if(i!==t){if(e===i)return!0;if(this.checkEntanglement(e,i,s))return!0}}return!1}},{key:"choiceAction",value:function(){this.blocks[this.selected[1]].selected=!0;var e=[],t=!0,s=!1,n=void 0;try{for(var i,o=this.stonePos[this.selected[1]][Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var l=i.value;this.checkBlock(this.selected[1],this.selected[1],l)&&e.push(l)}}catch(r){s=!0,n=r}finally{try{t||null==o.return||o.return()}finally{if(s)throw n}}this.setState({blocks:this.blocks,choices:e}),this.setState({buttonBisible:{display:"none"},choiceBisible:{display:"inline-block"}})}},{key:"decideBlock",value:function(e){var t=Number(e);this.blocks[this.selected[1]].selected=!1,this.setState({blocks:this.blocks}),this.stonePosForWinLose[Math.floor(this.selected[1]/3)][Math.round(this.selected[1]%3)]=t,this.decidedPos[this.selected[1]]=t,t%2===1?this.blocks[this.selected[1]].stones="\u3007"+t:t%2===0&&(this.blocks[this.selected[1]].stones="\u2716"+t),this.decideBlock1(this.selected[1],this.selected[1],t,t),this.setState({blocks:this.blocks}),this.turnType="normal",this.setState({buttonBisible:{display:"block"},choiceBisible:{display:"none"}}),this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[];var s=this.checkWinLose();if(-1===s&&10!==this.turn){if(9===this.turn){for(var n=0,i=-1,o=0;o<9;o++)"string"!==typeof this.blocks[o].stones&&(n+=1,i=o);if(1===n){this.blocks[i].stones="\u30079",this.stonePosForWinLose[Math.floor(i/3)][Math.round(i%3)]=9,this.decidedPos[i]=9,this.setState({blocks:this.blocks});var l=this.checkWinLose();-1===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}}),l===this.userMark&&this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}),l===this.userMark&&this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}})}}return this.turnUser!==this.userMark?void this.cpusChoice():void 0}-1!==s?s!==this.userMark?s===this.userMark||this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}}):this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}):this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}})}},{key:"decideBlock1",value:function(e,t,s,n){for(var i=0;i<this.stonePos[t].length;i++){var o=this.stonePos[t][i];if(o!==s&&this.decideBlock2(e,t,o,n),e===t&&o===n)for(var l=0;l<this.haveStones[n-1].length;l++){var r=this.haveStones[n-1][l];if(r!==t){for(var c=0;c<this.blocks[r].stones.length;c++){this.blocks[r].stones[c]===(n%2===1?"\u3007"+n:"\u2716"+n)&&this.blocks[r].stones.splice(c,1)}for(var a=0;a<this.stonePos[r].length;a++){this.stonePos[r][a]===n&&this.stonePos[r].splice(a,1)}}}}}},{key:"decideBlock2",value:function(e,t,s,n){for(var i=0;i<this.haveStones[s-1].length;i++){var o=this.haveStones[s-1][i];if(o!==t){if(e===o)return;this.decideBlock1(e,o,s,n),s%2===1?this.blocks[o].stones="\u3007"+s:s%2===0&&(this.blocks[o].stones="\u2716"+s),this.stonePosForWinLose[Math.floor(o/3)][Math.round(o%3)]=s,this.decidedPos[o]=s}}}},{key:"checkWinLose",value:function(){for(var e=!1,t=10,s=!1,n=10,i=0;i<3;i++){for(var o=0,l=0,r=0,c=0;c<3;c++)this.stonePosForWinLose[i][c]%2===1&&(o+=1),this.stonePosForWinLose[i][c]%2===0&&(l+=1),this.stonePosForWinLose[i][c]>r&&(r=this.stonePosForWinLose[i][c]);3===o&&(e=!0,r<t&&(t=r)),3===l&&(s=!0,r<n&&(n=r))}for(var a=0;a<3;a++){for(var h=0,d=0,u=0,b=0;b<3;b++)this.stonePosForWinLose[b][a]%2===1&&(h+=1),this.stonePosForWinLose[b][a]%2===0&&(d+=1),this.stonePosForWinLose[b][a]>u&&(u=this.stonePosForWinLose[b][a]);3===h&&(e=!0,u<t&&(t=u)),3===d&&(s=!0,u<n&&(n=u))}for(var k=0,f=0,v=0,y=0;y<3;y++)this.stonePosForWinLose[y][y]%2===1&&(k+=1),this.stonePosForWinLose[y][y]%2===0&&(f+=1),this.stonePosForWinLose[y][y]>v&&(v=this.stonePosForWinLose[y][y]);3===k&&(e=!0,v<t&&(t=v)),3===f&&(s=!0,v<n&&(n=v)),k=0,f=0,v=0;for(var m=0;m<3;m++)this.stonePosForWinLose[m][2-m]%2===1&&(k+=1),this.stonePosForWinLose[m][2-m]%2===0&&(f+=1),this.stonePosForWinLose[m][2-m]>v&&(v=this.stonePosForWinLose[m][2-m]);if(3===k&&(e=!0,v<t&&(t=v)),3===f&&(s=!0,v<n&&(n=v)),!0===e&&!1===s)return 0;if(!1===e&&!0===s)return 1;if(!0===e&&!0===s){if(t<n)return 0;if(t>n)return 1}return-1}},{key:"resetField",value:function(){this.turn=1,this.turnUser=0,this.turnType="normal",this.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],this.selected=[],this.haveStones=[],this.stonePos=[[],[],[],[],[],[],[],[],[]],this.decidedPos=[0,0,0,0,0,0,0,0,0],this.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],this.setState({fieldDisplay:{display:"none"},init:{display:"block"},turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}})}},{key:"cpusChoice",value:function(){if("entanglement"===this.turnType){var e=L(this);this.decideBlock(e)}else{var t=L(this);if(this.selected=t,2===this.selected.length){var s=!0,n=!1,i=void 0;try{for(var o,l=this.selected[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var r=o.value;0===this.turnUser?this.blocks[r].stones.push("\u3007"+this.turn+" "):this.blocks[r].stones.push("\u2716"+this.turn+" "),this.setState({blocks:this.blocks})}}catch(c){n=!0,i=c}finally{try{s||null==l.return||l.return()}finally{if(n)throw i}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",void this.choiceAction();this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[]}}}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Field"},o.a.createElement(W,{onClick:this.start,style:this.state.init}),o.a.createElement("div",{style:this.state.fieldDisplay},o.a.createElement("div",{className:"showWinLose",style:this.state.showWinLose.style,onClick:this.resetField},this.state.showWinLose.text),o.a.createElement("table",{className:"App"},o.a.createElement("tbody",null,this.makeLines())),o.a.createElement("div",{className:"turndisplay"},"turn: ",this.turn),o.a.createElement(m.a,{variant:"contained",color:"default",size:"large",className:"button",style:this.state.buttonBisible,onClick:this.addTurn},"Place"),o.a.createElement(p.a,{className:"choice",style:this.state.choiceBisible},this.state.choices.map(function(t,s){return o.a.createElement(m.a,{variant:"contained",size:"medium",className:"marubatsu",key:s,"data-turn":t,onClick:function(t){return e.decideBlock(t.currentTarget.dataset.turn)}},t%2===1?"\u3007"+t:"\u2716"+t)}))))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[33,1,2]]]);
//# sourceMappingURL=main.94d6172e.chunk.js.map
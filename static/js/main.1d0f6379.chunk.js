(window.webpackJsonpreact_app_first=window.webpackJsonpreact_app_first||[]).push([[0],{18:function(e,t,s){e.exports=s(37)},23:function(e,t,s){},25:function(e,t,s){},31:function(e,t){},32:function(e,t){},33:function(e,t){},34:function(e,t){},35:function(e,t){},36:function(e,t){},37:function(e,t,s){"use strict";s.r(t);var n,i=s(1),o=s.n(i),l=s(16),c=s.n(l),r=(s(23),s(7)),h=s.n(r),a=s(8),d=s(9),u=s(13),b=s(10),k=s(2),v=s(11),f=s(17),m=(s(25),s(12));function y(){return(y=Object(f.a)(h.a.mark(function e(){return h.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a("https://eggplanck.github.io/DQNgame/DQNmodel1/model.json");case 2:return n=e.sent,e.next=5,n.summary();case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){y.apply(this,arguments)}();var p=function(e){function t(e){var s;return Object(a.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).handleClick=s.handleClick.bind(Object(k.a)(s)),s.state={stones:e.stones,visibleSelect:s.unselectedStyle,selected:Boolean(e.selected)},s.unselectedStyle={backgroundColor:"white"},s.selectedStyle={backgroundColor:"gray"},s.firstStyle={backgroundColor:"rgba(255, 0, 0, 0.6)"},s.secondStyle={backgroundColor:"rgba(0, 0, 255, 0.6)"},s.number=Number(e.number),s.clickAction=e.onClick,s}return Object(v.a)(t,e),Object(d.a)(t,[{key:"handleClick",value:function(){this.clickAction(this.number)}},{key:"componentDidUpdate",value:function(e){e.stones!==this.props.stones&&("string"===typeof this.props.stones?"\u3007"===this.props.stones[0]?this.setState({visibleSelect:this.firstStyle}):"\u2716"===this.props.stones[0]&&this.setState({visibleSelect:this.secondStyle}):this.setState({visibleSelect:this.unselectedStyle}),this.setState({stones:this.props.stones})),e.selected!==this.props.selected&&(this.setState({selected:Boolean(this.props.selected)}),Boolean(this.props.selected)?this.setState({visibleSelect:this.selectedStyle}):"string"!==typeof this.props.stones&&this.setState({visibleSelect:this.unselectedStyle}))}},{key:"render",value:function(){return o.a.createElement("td",{className:"Block",style:this.state.visibleSelect,onClick:this.handleClick},this.state.stones)}}]),t}(i.Component);function S(e){if("entanglement"===e.turnType){var t=[],s=!0,n=!1,i=void 0;try{for(var o,l=e.stonePos[e.selected[1]][Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var c=o.value;e.checkBlock(e.selected[1],e.selected[1],c)&&t.push(c)}}catch(u){n=!0,i=u}finally{try{s||null==l.return||l.return()}finally{if(n)throw i}}return t[Math.floor(Math.random()*t.length)]}for(var r=[],h=0;h<e.blocks.length;h++)"string"!==typeof e.blocks[h].stones&&r.push(h);var a=Math.floor(Math.random()*r.length),d=r[a];return r.splice(a,1),[d,r[Math.floor(Math.random()*r.length)]]}var g=function(e){function t(e){var s;return Object(a.a)(this,t),(s=Object(u.a)(this,Object(b.a)(t).call(this,e))).makeLines=s.makeLines.bind(Object(k.a)(s)),s.addTurn=s.addTurn.bind(Object(k.a)(s)),s.addSelected=s.addSelected.bind(Object(k.a)(s)),s.checkEntanglement=s.checkEntanglement.bind(Object(k.a)(s)),s.checkBlock=s.checkBlock.bind(Object(k.a)(s)),s.choiceAction=s.choiceAction.bind(Object(k.a)(s)),s.decideBlock=s.decideBlock.bind(Object(k.a)(s)),s.decideBlock1=s.decideBlock1.bind(Object(k.a)(s)),s.decideBlock2=s.decideBlock2.bind(Object(k.a)(s)),s.checkWinLose=s.checkWinLose.bind(Object(k.a)(s)),s.resetField=s.resetField.bind(Object(k.a)(s)),s.state={turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}},s.turn=1,s.turnUser=0,s.turnType="normal",s.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],s.selected=[],s.haveStones=[],s.stonePos=[[],[],[],[],[],[],[],[],[]],s.decidedPos=[0,0,0,0,0,0,0,0,0],s.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],s}return Object(v.a)(t,e),Object(d.a)(t,[{key:"makeLines",value:function(){for(var e=this,t=[],s=0;s<3;s++)t.push(o.a.createElement("tr",{key:s},this.state.blocks.slice(3*s,3*s+3).map(function(t,s){return o.a.createElement(p,{number:t.number,stones:t.stones,selected:t.selected,onClick:e.addSelected,key:t.number})})));return t}},{key:"addSelected",value:function(e){if("normal"===this.turnType&&"string"!==typeof this.blocks[Number(e)].stones)if(this.blocks[Number(e)].selected){this.blocks[Number(e)].selected=!1;for(var t=0;t<this.selected.length;t++)this.selected[t]===e&&this.selected.splice(t,1);this.setState({blocks:this.blocks})}else this.selected.length<2&&(this.blocks[Number(e)].selected=!0,this.selected.push(Number(e)),this.setState({blocks:this.blocks}))}},{key:"addTurn",value:function(){if(2===this.selected.length){var e=!0,t=!1,s=void 0;try{for(var n,i=this.selected[Symbol.iterator]();!(e=(n=i.next()).done);e=!0){var o=n.value;0===this.turnUser?this.blocks[o].stones.push("\u3007"+this.turn+" "):this.blocks[o].stones.push("\u2716"+this.turn+" "),this.blocks[o].selected=!1,this.setState({blocks:this.blocks})}}catch(a){t=!0,s=a}finally{try{e||null==i.return||i.return()}finally{if(t)throw s}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",this.selected.sort(function(e,t){return e<t?-1:e>t?1:0}),void this.cpusChoice();if(this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[],9===this.turn){for(var l=0,c=-1,r=0;r<9;r++)"string"!==typeof this.blocks[r].stones&&(l+=1,c=r);if(1===l){this.blocks[c].stones="\u30079",this.stonePosForWinLose[Math.floor(c/3)][Math.round(c%3)]=9,this.decidedPos[c]=9,this.setState({blocks:this.blocks});var h=this.checkWinLose();if(-1===h&&10!==this.turn)return;-1===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5f15\u304d\u5206\u3051"}}),0===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5148\u624b\u306e\u52dd\u3061"}}),1===h&&this.setState({showWinLose:{style:{display:"inline-block"},text:"\u5f8c\u624b\u306e\u52dd\u3061"}})}}this.cpusChoice()}}},{key:"checkEntanglement",value:function(e,t,s){if(1===this.stonePos[t].length)return!1;for(var n=0;n<this.stonePos[t].length;n++){var i=this.stonePos[t][n];if(i!==s&&this.checkBlock(e,t,i))return!0}return!1}},{key:"checkBlock",value:function(e,t,s){for(var n=0;n<this.haveStones[s-1].length;n++){var i=this.haveStones[s-1][n];if(i!==t){if(e===i)return!0;if(this.checkEntanglement(e,i,s))return!0}}return!1}},{key:"choiceAction",value:function(){this.blocks[this.selected[1]].selected=!0;var e=[],t=!0,s=!1,n=void 0;try{for(var i,o=this.stonePos[this.selected[1]][Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var l=i.value;this.checkBlock(this.selected[1],this.selected[1],l)&&e.push(l)}}catch(c){s=!0,n=c}finally{try{t||null==o.return||o.return()}finally{if(s)throw n}}this.setState({blocks:this.blocks,choices:e}),this.setState({buttonBisible:{display:"none"},choiceBisible:{display:"inline-block"}})}},{key:"decideBlock",value:function(e){var t=Number(e);this.blocks[this.selected[1]].selected=!1,this.setState({blocks:this.blocks}),this.stonePosForWinLose[Math.floor(this.selected[1]/3)][Math.round(this.selected[1]%3)]=t,this.decidedPos[this.selected[1]]=t,t%2===1?this.blocks[this.selected[1]].stones="\u3007"+t:t%2===0&&(this.blocks[this.selected[1]].stones="\u2716"+t),this.decideBlock1(this.selected[1],this.selected[1],t,t),this.setState({blocks:this.blocks}),this.turnType="normal",this.setState({buttonBisible:{display:"block"},choiceBisible:{display:"none"}}),this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[];var s=this.checkWinLose();if(-1===s&&10!==this.turn){if(9===this.turn){for(var n=0,i=-1,o=0;o<9;o++)"string"!==typeof this.blocks[o].stones&&(n+=1,i=o);if(1===n){this.blocks[i].stones="\u30079",this.stonePosForWinLose[Math.floor(i/3)][Math.round(i%3)]=9,this.decidedPos[i]=9,this.setState({blocks:this.blocks});var l=this.checkWinLose();-1===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}}),0===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}),1===l&&this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}})}}return 1===this.turnUser?void this.cpusChoice():void 0}-1===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"black"},text:"DRAW"}}),0===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"red"},text:"YOU WIN"}}),1===s&&this.setState({showWinLose:{style:{display:"inline-block",color:"blue"},text:"YOU LOSE"}})}},{key:"decideBlock1",value:function(e,t,s,n){for(var i=0;i<this.stonePos[t].length;i++){var o=this.stonePos[t][i];if(o!==s&&this.decideBlock2(e,t,o,n),e===t&&o===n)for(var l=0;l<this.haveStones[n-1].length;l++){var c=this.haveStones[n-1][l];if(c!==t){for(var r=0;r<this.blocks[c].stones.length;r++){this.blocks[c].stones[r]===(n%2===1?"\u3007"+n:"\u2716"+n)&&this.blocks[c].stones.splice(r,1)}for(var h=0;h<this.stonePos[c].length;h++){this.stonePos[c][h]===n&&this.stonePos[c].splice(h,1)}}}}}},{key:"decideBlock2",value:function(e,t,s,n){for(var i=0;i<this.haveStones[s-1].length;i++){var o=this.haveStones[s-1][i];if(o!==t){if(e===o)return;this.decideBlock1(e,o,s,n),s%2===1?this.blocks[o].stones="\u3007"+s:s%2===0&&(this.blocks[o].stones="\u2716"+s),this.stonePosForWinLose[Math.floor(o/3)][Math.round(o%3)]=s,this.decidedPos[o]=s}}}},{key:"checkWinLose",value:function(){for(var e=!1,t=10,s=!1,n=10,i=0;i<3;i++){for(var o=0,l=0,c=0,r=0;r<3;r++)this.stonePosForWinLose[i][r]%2===1&&(o+=1),this.stonePosForWinLose[i][r]%2===0&&(l+=1),this.stonePosForWinLose[i][r]>c&&(c=this.stonePosForWinLose[i][r]);3===o&&(e=!0,c<t&&(t=c)),3===l&&(s=!0,c<n&&(n=c))}for(var h=0;h<3;h++){for(var a=0,d=0,u=0,b=0;b<3;b++)this.stonePosForWinLose[b][h]%2===1&&(a+=1),this.stonePosForWinLose[b][h]%2===0&&(d+=1),this.stonePosForWinLose[b][h]>u&&(u=this.stonePosForWinLose[b][h]);3===a&&(e=!0,u<t&&(t=u)),3===d&&(s=!0,u<n&&(n=u))}for(var k=0,v=0,f=0,m=0;m<3;m++)this.stonePosForWinLose[m][m]%2===1&&(k+=1),this.stonePosForWinLose[m][m]%2===0&&(v+=1),this.stonePosForWinLose[m][m]>f&&(f=this.stonePosForWinLose[m][m]);3===k&&(e=!0,f<t&&(t=f)),3===v&&(s=!0,f<n&&(n=f)),k=0,v=0,f=0;for(var y=0;y<3;y++)this.stonePosForWinLose[y][2-y]%2===1&&(k+=1),this.stonePosForWinLose[y][2-y]%2===0&&(v+=1),this.stonePosForWinLose[y][2-y]>f&&(f=this.stonePosForWinLose[y][2-y]);if(3===k&&(e=!0,f<t&&(t=f)),3===v&&(s=!0,f<n&&(n=f)),!0===e&&!1===s)return 0;if(!1===e&&!0===s)return 1;if(!0===e&&!0===s){if(t<n)return 0;if(t>n)return 1}return-1}},{key:"resetField",value:function(){this.turn=1,this.turnUser=0,this.turnType="normal",this.blocks=[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],this.selected=[],this.haveStones=[],this.stonePos=[[],[],[],[],[],[],[],[],[]],this.stonePosForWinLose=[[void 0,void 0,void 0],[void 0,void 0,void 0],[void 0,void 0,void 0]],this.setState({turn:1,blocks:[{number:0,stones:[],selected:!1},{number:1,stones:[],selected:!1},{number:2,stones:[],selected:!1},{number:3,stones:[],selected:!1},{number:4,stones:[],selected:!1},{number:5,stones:[],selected:!1},{number:6,stones:[],selected:!1},{number:7,stones:[],selected:!1},{number:8,stones:[],selected:!1}],buttonBisible:{display:"block"},choiceBisible:{display:"none"},choices:[],showWinLose:{style:{display:"none"},text:""}})}},{key:"cpusChoice",value:function(){if("entanglement"===this.turnType){var e=S(this);this.decideBlock(e)}else{var t=S(this);if(this.selected=t,2===this.selected.length){var s=!0,n=!1,i=void 0;try{for(var o,l=this.selected[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var c=o.value;0===this.turnUser?this.blocks[c].stones.push("\u3007"+this.turn+" "):this.blocks[c].stones.push("\u2716"+this.turn+" "),this.setState({blocks:this.blocks})}}catch(r){n=!0,i=r}finally{try{s||null==l.return||l.return()}finally{if(n)throw i}}if(this.haveStones.push(this.selected),this.stonePos[this.selected[0]].push(this.turn),this.stonePos[this.selected[1]].push(this.turn),this.checkEntanglement(this.selected[1],this.selected[1],this.turn))return alert("cyclic entanglement"),this.turnType="entanglement",void this.choiceAction();this.turn+=1,this.turn%2===0?this.turnUser=1:this.turnUser=0,this.setState({turn:this.turn}),this.selected=[]}}}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"Field"},o.a.createElement("div",{className:"showWinLose",style:this.state.showWinLose.style,onClick:this.resetField},this.state.showWinLose.text),o.a.createElement("table",{className:"App"},o.a.createElement("tbody",null,this.makeLines())),o.a.createElement("div",{className:"turndisplay"},"turn: ",this.turn),o.a.createElement("div",{className:"button",style:this.state.buttonBisible,onClick:this.addTurn},"\u78ba\u5b9a"),o.a.createElement("div",{className:"choice",style:this.state.choiceBisible},this.state.choices.map(function(t,s){return o.a.createElement("div",{className:"marubatsu",key:s,"data-turn":t,onClick:function(t){return e.decideBlock(t.target.dataset.turn)}},t%2===1?"\u3007"+t:"\u2716"+t)})))}}]),t}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.1d0f6379.chunk.js.map
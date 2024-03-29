import React, {Component} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';


let ESRLmodel;
async function loadmodel() {
    ESRLmodel = await tf.loadLayersModel("https://eggplanck.github.io/QTTT/DDQN4/model.json")
    await ESRLmodel.summary()
}

class Block extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            stones: props.stones,
            visibleSelect: this.unselectedStyle,
            selected: Boolean(props.selected)
        };
        this.unselectedStyle = {
            backgroundColor: 'white'
        }
        this.selectedStyle = {
            backgroundColor: 'gray'
        }
        this.firstStyle = {
            backgroundColor: 'rgba(255, 0, 0, 0.6)'
        }
        this.secondStyle = {
            backgroundColor: 'rgba(0, 0, 255, 0.6)'
        }
        this.number = Number(props.number)
        this.clickAction = props.onClick
    }
    handleClick() {
        this.clickAction(this.number)
    }
    componentDidUpdate(prevProps) {
        if(prevProps.stones !== this.props.stones){
            if(typeof(this.props.stones) === 'string'){
                if(this.props.stones[0] === '〇'){
                    this.setState({
                        visibleSelect: this.firstStyle
                    })
                }else if (this.props.stones[0] === '✖') {
                    this.setState({
                        visibleSelect: this.secondStyle
                    })
                }
            }else{
                this.setState({visibleSelect: this.unselectedStyle})
            }
            this.setState({
                stones: this.props.stones,
            })
        }
        if(prevProps.selected !== this.props.selected){
            this.setState({
                selected: Boolean(this.props.selected)
            })
            if (Boolean(this.props.selected)) {
                this.setState({visibleSelect: this.selectedStyle})
            } else {
                if(typeof(this.props.stones) !== 'string'){
                    this.setState({visibleSelect: this.unselectedStyle})
                }
            }
        }
    }
    render() {
        return (<td className="Block" style={this.state.visibleSelect} onClick={this.handleClick}>{this.state.stones}</td>)
    }
}

class InitDisplay extends Component {
    constructor(props) {
        super(props);
        this.clickAction = props.onClick
        this.state = {
            style : props.style
        }
    }
    handleClick(mark) {
        this.clickAction(mark)
    }
    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState({
                style : this.props.style
            })
        }
    }
    render() {
        return (
            <div className='InitDisplay' style={this.state.style}>
                <div className='sengo'>
                    <p className='title'>Quantum Tic-Tac-Toe</p>
                    <p className='mess'>Select Mark and Start</p>
                    <Button variant='contained' className='sengobutton' size='large' onClick={()=>this.handleClick(0)}>
                        〇
                    </Button>
                    <Button variant='contained' className='sengobutton' size='large' onClick={()=>this.handleClick(1)}>
                        ✖
                    </Button>
                    <div className='explain'>
                    Quantum Tic-Tac-Toe is a quantum expansion of Tic-Tac-Toe.<br/>
                    You play against AI player made by Deep Q-Network (DQN), which is one of the methods of Deep reinforcement learning.<br/>
                    Can you defeat AI?
                    </div>
                    <div className='tolearn'>To learn the rule: <a href='https://en.wikipedia.org/w/index.php?title=Quantum_tic-tac-toe&oldid=1014709105' target="_blank" rel="noopener noreferrer">Wikipedia "Quantum tic-tac-toe" </a></div>
                </div>
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.makeLines = this.makeLines.bind(this)
        this.addTurn = this.addTurn.bind(this)
        this.addSelected = this.addSelected.bind(this)
        this.checkEntanglement = this.checkEntanglement.bind(this)
        this.checkBlock = this.checkBlock.bind(this)
        this.choiceAction = this.choiceAction.bind(this)
        this.decideBlock = this.decideBlock.bind(this)
        this.decideBlock1 = this.decideBlock1.bind(this)
        this.decideBlock2 = this.decideBlock2.bind(this)
        this.checkWinLose = this.checkWinLose.bind(this)
        this.resetField = this.resetField.bind(this)
        this.clearShowEntangle = this.clearShowEntangle.bind(this)
        this.start = this.start.bind(this)
        this.state = {
            loading:true,
            init: {
                display: 'block'
            },
            fieldDisplay : {
                display: 'none'
            },
            turn: 1,
            blocks: [
                {
                    number: 0,
                    stones: [],
                    selected: false
                }, {
                    number: 1,
                    stones: [],
                    selected: false
                }, {
                    number: 2,
                    stones: [],
                    selected: false
                }, {
                    number: 3,
                    stones: [],
                    selected: false
                }, {
                    number: 4,
                    stones: [],
                    selected: false
                }, {
                    number: 5,
                    stones: [],
                    selected: false
                }, {
                    number: 6,
                    stones: [],
                    selected: false
                }, {
                    number: 7,
                    stones: [],
                    selected: false
                }, {
                    number: 8,
                    stones: [],
                    selected: false
                }
            ],
            buttonBisible: {
                display: 'block'
            },
            choiceBisible: {
                display: 'none'
            },
            choices:[],
            showWinLose:{style:{display:'none'},text:''},
            showEntangle:{style:{display:'none'}}
        }
        this.userMark = 0
        this.turn = 1
        this.turnUser = 0
        this.turnType = 'normal'
        this.blocks = [
            {
                number: 0,
                stones: [],
                selected: false
            }, {
                number: 1,
                stones: [],
                selected: false
            }, {
                number: 2,
                stones: [],
                selected: false
            }, {
                number: 3,
                stones: [],
                selected: false
            }, {
                number: 4,
                stones: [],
                selected: false
            }, {
                number: 5,
                stones: [],
                selected: false
            }, {
                number: 6,
                stones: [],
                selected: false
            }, {
                number: 7,
                stones: [],
                selected: false
            }, {
                number: 8,
                stones: [],
                selected: false
            }
        ]
        this.selected = []
        this.haveStones = []
        this.stonePos = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        this.decidedPos = [0,0,0,0,0,0,0,0,0]
        this.stonePosForWinLose = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]]
    }
    componentDidMount(){
        const loading = async () => {
            await loadmodel()
            console.log('loaded')
            this.setState({
                loading:false
            })
        }
        loading()
    }
    makeLines() {
        let tableContents = [];
        for (let i = 0; i < 3; i++) {
            tableContents.push(<tr key={i}>{this.state.blocks.slice(i * 3, i * 3 + 3).map((value, key) => (<Block number={value.number} stones={value.stones} selected={value.selected}  onClick={this.addSelected} key={value.number}/>))}</tr>)
        }
        return tableContents
    }
    start(mark) {
        if (mark === 0) {
            this.userMark = 0
            this.setState({
                init: {
                    display: 'none'
                },
                fieldDisplay: {
                    display: 'block'
                }
            })
        }
        if (mark === 1) {
            this.userMark = 1
            this.setState({
                init: {
                    display: 'none'
                },
                fieldDisplay: {
                    display: 'block'
                }
            })
            this.cpusChoice()
        }
    }
    addSelected(number) {
        if(this.turnType !== 'normal'){
            return
        }
        if(typeof(this.blocks[Number(number)].stones) === 'string'){
            return
        }
        if (this.blocks[Number(number)].selected) {
            this.blocks[Number(number)].selected = false
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i] === number) {
                    this.selected.splice(i, 1)
                }
            }
            this.setState({blocks: this.blocks})
        } else {
            if (this.selected.length < 2) {
                this.blocks[Number(number)].selected = true
                this.selected.push(Number(number))
                this.setState({blocks: this.blocks})
            }
        }
    }
    addTurn() {
        if (this.selected.length === 2) {
            for (let number of this.selected) {
                if (this.turnUser === 0) {
                    this.blocks[number].stones.push('〇' + this.turn + ' ')
                } else {
                    this.blocks[number].stones.push('✖' + this.turn + ' ')
                }
                this.blocks[number].selected = false
                this.setState({blocks: this.blocks})
            }
            this.haveStones.push(this.selected)
            this.stonePos[this.selected[0]].push(this.turn)
            this.stonePos[this.selected[1]].push(this.turn)

            if (this.checkEntanglement(this.selected[1], this.selected[1], this.turn)) {
                this.setState({
                    showEntangle:{style:{display:'inline-block'}}
                })
                this.turnType = 'entanglement'
                this.selected.sort(function(a,b){
                    if(a < b) return -1;
                    if(a > b) return 1;
                    return 0;
                })
                this.cpusChoice()
                return
            }

            this.turn += 1
            if (this.turn % 2 === 0) {
                this.turnUser = 1
            } else {
                this.turnUser = 0
            }
            this.setState({turn: this.turn})
            this.selected = []
            if(this.turn === 9){
                let undefinedCounter = 0
                let logger = -1
                for(let w=0;w<9;w++){
                    if(typeof(this.blocks[w].stones) !== 'string'){
                        undefinedCounter += 1
                        logger = w
                    }
                }
                if(undefinedCounter === 1){
                    this.blocks[logger].stones = '〇9'
                    this.stonePosForWinLose[Math.floor(logger/3)][Math.round(logger%3)] = 9
                    this.decidedPos[logger] = 9
                    this.setState({
                        blocks:this.blocks
                    })
                    let WinLose = this.checkWinLose()
                    if(WinLose === -1){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'DRAW'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                    if(WinLose === this.userMark){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'YOU WIN'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                    if(WinLose === this.userMark){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'YOU LOSE'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                }
            }
            this.cpusChoice()
        }
    }
    checkEntanglement(first, selected, turn) {
        if (this.stonePos[selected].length === 1) {
            return false
        }
        for (let i = 0; i < (this.stonePos[selected].length); i++) {
            let turnSelected = this.stonePos[selected][i]
            if (turnSelected !== turn) {
                if (this.checkBlock(first, selected, turnSelected)) {
                    return true
                }
            }
        }
        return false
    }
    checkBlock(first, selected, turn) {
        for (let i = 0; i < (this.haveStones[turn - 1].length); i++) {
            let blockSelected = this.haveStones[turn - 1][i]
            if (blockSelected !== selected) {
                if (first === blockSelected) {
                    return true
                } else if (this.checkEntanglement(first, blockSelected, turn)) {
                    return true
                }
            }
        }
        return false
    }
    choiceAction() {
        this.blocks[this.selected[1]].selected = true
        let choices = []
        for(let turnCheck of this.stonePos[this.selected[1]]){
            if(this.checkBlock(this.selected[1],this.selected[1],turnCheck)){
                choices.push(turnCheck)
            }
        }
        this.setState({
            blocks:this.blocks,
            choices:choices
        })
        this.setState({
            buttonBisible: {
                display: 'none'
            },
            choiceBisible: {
                display: 'inline-block'
            }
        })
    }
    decideBlock(turnNum0){
        const turnNum = Number(turnNum0)
        this.blocks[this.selected[1]].selected = false
        this.setState({
            blocks:this.blocks
        })
        this.stonePosForWinLose[Math.floor(this.selected[1]/3)][Math.round(this.selected[1]%3)] = turnNum
        this.decidedPos[this.selected[1]] = turnNum
        if(turnNum%2 === 1){
            this.blocks[this.selected[1]].stones = '〇' + turnNum
        }else if (turnNum%2 === 0) {
            this.blocks[this.selected[1]].stones = '✖' + turnNum
        }
        this.decideBlock1(this.selected[1],this.selected[1],turnNum,turnNum)
        this.setState({
            blocks:this.blocks
        })
        this.turnType = 'normal'
        this.setState({
            buttonBisible: {
                display: 'block'
            },
            choiceBisible: {
                display: 'none'
            }
        })
        this.turn += 1
        if (this.turn % 2 === 0) {
            this.turnUser = 1
        } else {
            this.turnUser = 0
        }
        this.setState({turn: this.turn})
        this.selected = []
        let WinLose = this.checkWinLose()
        if(WinLose === -1 && this.turn !== 10){
            if(this.turn === 9){
                let undefinedCounter = 0
                let logger = -1
                for(let w=0;w<9;w++){
                    if(typeof(this.blocks[w].stones) !== 'string'){
                        undefinedCounter += 1
                        logger = w
                    }
                }
                if(undefinedCounter === 1){
                    this.blocks[logger].stones = '〇9'
                    this.stonePosForWinLose[Math.floor(logger/3)][Math.round(logger%3)] = 9
                    this.decidedPos[logger] = 9
                    this.setState({
                        blocks:this.blocks
                    })
                    let WinLose = this.checkWinLose()
                    if(WinLose === -1){
                        this.setState({
                            showWinLose:{style:{display:'inline-block',color:'black'},text:'DRAW'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                    if(WinLose === this.userMark){
                        this.setState({
                            showWinLose:{style:{display:'inline-block',color:'red'},text:'YOU WIN'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                    if(WinLose === this.userMark){
                        this.setState({
                            showWinLose:{style:{display:'inline-block',color:'blue'},text:'YOU LOSE'},
                            showEntangle:{style:{display:'none'}}
                        })
                        return
                    }
                }
            }
            if(this.turnUser !== this.userMark){
                this.cpusChoice()
                return
            }else {
                return
            }
        }
        if(WinLose === -1){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'black'},text:'DRAW'},
                showEntangle:{style:{display:'none'}}
            })
            return
        }
        if(WinLose === this.userMark){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'red'},text:'YOU WIN'},
                showEntangle:{style:{display:'none'}}
            })
            return
        }
        if(WinLose !== this.userMark){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'blue'},text:'YOU LOSE'},
                showEntangle:{style:{display:'none'}}
            })
            return
        }
    }
    decideBlock1(first,selected,turn,selectedTurn){
        for (let i = 0; i < (this.stonePos[selected].length); i++) {
            let turnSelected = this.stonePos[selected][i]
            if (turnSelected !== turn) {
                this.decideBlock2(first,selected,turnSelected,selectedTurn)
            }
            if(first === selected){
                if(turnSelected === selectedTurn){
                    for (let j = 0; j < (this.haveStones[selectedTurn - 1].length); j++) {
                        let blockSelected = this.haveStones[selectedTurn - 1][j]
                        if (blockSelected !== selected) {
                            for(let k=0;k<this.blocks[blockSelected].stones.length;k++){
                                let iterTurn = this.blocks[blockSelected].stones[k]
                                let selectedTurnStr = selectedTurn%2 === 1 ? '〇'+selectedTurn : '✖'+selectedTurn
                                if(iterTurn === selectedTurnStr){
                                    this.blocks[blockSelected].stones.splice(k,1)

                                }
                            }
                            for(let t=0;t<this.stonePos[blockSelected].length;t++){
                                let iterTurn2 = this.stonePos[blockSelected][t]
                                if(iterTurn2 === selectedTurn){
                                    this.stonePos[blockSelected].splice(t,1)
                                }
                            }
                        }

                    }
                }
            }
        }
        return
    }
    decideBlock2(first,selected,turn,selectedTurn){
        for (let i = 0; i < (this.haveStones[turn - 1].length); i++) {
            let blockSelected = this.haveStones[turn - 1][i]
            if (blockSelected !== selected) {
                if (first === blockSelected) {
                    return
                } else {
                    this.decideBlock1(first,blockSelected,turn,selectedTurn)
                    if(turn%2 === 1){
                        this.blocks[blockSelected].stones = '〇' + turn
                    }else if (turn%2 === 0) {
                        this.blocks[blockSelected].stones = '✖' + turn
                    }
                    this.stonePosForWinLose[Math.floor(blockSelected/3)][Math.round(blockSelected%3)] = turn
                    this.decidedPos[blockSelected] = turn
                }
            }
        }
        return
    }
    checkWinLose(){
        let TF1 = false
        let score1 = 10
        let TF2 = false
        let score2 = 10
        for(let y=0;y<3;y++){
            let count1 = 0
            let count2 = 0
            let countscore = 0
            for(let x=0;x<3;x++){
                if(this.stonePosForWinLose[y][x]%2 === 1){
                    count1 += 1
                }
                if(this.stonePosForWinLose[y][x]%2 === 0){
                    count2 += 1
                }
                if(this.stonePosForWinLose[y][x] > countscore){
                    countscore = this.stonePosForWinLose[y][x]
                }
            }
            if(count1 === 3){
                TF1 = true
                if(countscore < score1){
                    score1 = countscore
                }
            }
            if(count2 === 3){
                TF2 = true
                if(countscore < score2){
                    score2 = countscore
                }
            }
        }
        for(let x=0;x<3;x++){
            let count1 = 0
            let count2 = 0
            let countscore = 0
            for(let y=0;y<3;y++){
                if(this.stonePosForWinLose[y][x]%2 === 1){
                    count1 += 1
                }
                if(this.stonePosForWinLose[y][x]%2 === 0){
                    count2 += 1
                }
                if(this.stonePosForWinLose[y][x] > countscore){
                    countscore = this.stonePosForWinLose[y][x]
                }
            }
            if(count1 === 3){
                TF1 = true
                if(countscore < score1){
                    score1 = countscore
                }
            }
            if(count2 === 3){
                TF2 = true
                if(countscore < score2){
                    score2 = countscore
                }
            }
        }
        let count1 = 0
        let count2 = 0
        let countscore = 0
        for(let z=0;z<3;z++){
            if(this.stonePosForWinLose[z][z]%2 === 1){
                count1 += 1
            }
            if(this.stonePosForWinLose[z][z]%2 === 0){
                count2 += 1
            }
            if(this.stonePosForWinLose[z][z] > countscore){
                countscore = this.stonePosForWinLose[z][z]
            }
        }
        if(count1 === 3){
            TF1 = true
            if(countscore < score1){
                score1 = countscore
            }
        }
        if(count2 === 3){
            TF2 = true
            if(countscore < score2){
                score2 = countscore
            }
        }
        count1 = 0
        count2 = 0
        countscore = 0
        for(let z=0;z<3;z++){
            if(this.stonePosForWinLose[z][2-z]%2 === 1){
                count1 += 1
            }
            if(this.stonePosForWinLose[z][2-z]%2 === 0){
                count2 += 1
            }
            if(this.stonePosForWinLose[z][2-z] > countscore){
                countscore = this.stonePosForWinLose[z][2-z]
            }
        }
        if(count1 === 3){
            TF1 = true
            if(countscore < score1){
                score1 = countscore
            }
        }
        if(count2 === 3){
            TF2 = true
            if(countscore < score2){
                score2 = countscore
            }
        }

        if(TF1 === true && TF2 === false){
            return 0
        }
        if(TF1 === false && TF2 === true){
            return 1
        }
        if(TF1 === true && TF2 === true){
            if(score1 < score2){
                return 0
            }else if (score1 > score2) {
                return 1
            }
        }
        return -1
    }
    resetField(){
        this.turn = 1
        this.turnUser = 0
        this.turnType = 'normal'
        this.blocks = [
            {
                number: 0,
                stones: [],
                selected: false
            }, {
                number: 1,
                stones: [],
                selected: false
            }, {
                number: 2,
                stones: [],
                selected: false
            }, {
                number: 3,
                stones: [],
                selected: false
            }, {
                number: 4,
                stones: [],
                selected: false
            }, {
                number: 5,
                stones: [],
                selected: false
            }, {
                number: 6,
                stones: [],
                selected: false
            }, {
                number: 7,
                stones: [],
                selected: false
            }, {
                number: 8,
                stones: [],
                selected: false
            }
        ]
        this.selected = []
        this.haveStones = []
        this.stonePos = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        this.decidedPos = [0,0,0,0,0,0,0,0,0]
        this.stonePosForWinLose = [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]]
        this.setState({
            fieldDisplay: {
                display: 'none'
            },
            init: {
                display: 'block'
            },
            turn: 1,
            blocks: [
                {
                    number: 0,
                    stones: [],
                    selected: false
                }, {
                    number: 1,
                    stones: [],
                    selected: false
                }, {
                    number: 2,
                    stones: [],
                    selected: false
                }, {
                    number: 3,
                    stones: [],
                    selected: false
                }, {
                    number: 4,
                    stones: [],
                    selected: false
                }, {
                    number: 5,
                    stones: [],
                    selected: false
                }, {
                    number: 6,
                    stones: [],
                    selected: false
                }, {
                    number: 7,
                    stones: [],
                    selected: false
                }, {
                    number: 8,
                    stones: [],
                    selected: false
                }
            ],
            buttonBisible: {
                display: 'block'
            },
            choiceBisible: {
                display: 'none'
            },
            choices:[],
            showWinLose:{style:{display:'none'},text:''},
            showEntangle:{style:{display:'none'}}
        })
    }
    clearShowEntangle(){
        this.setState({
            showEntangle:{style:{display:'none'}}
        })
    }
    cpusChoice(){
        if(this.turnType === 'entanglement') {
            let choice = ESRL(this)
            this.decideBlock(choice)
        }else {
            let choice = ESRL(this)
            this.selected = choice
            if (this.selected.length === 2) {
                for (let number of this.selected) {
                    if (this.turnUser === 0) {
                        this.blocks[number].stones.push('〇' + this.turn + ' ')
                    } else {
                        this.blocks[number].stones.push('✖' + this.turn + ' ')
                    }
                    this.setState({blocks: this.blocks})
                }
                this.haveStones.push(this.selected)
                this.stonePos[this.selected[0]].push(this.turn)
                this.stonePos[this.selected[1]].push(this.turn)

                if (this.checkEntanglement(this.selected[1], this.selected[1], this.turn)) {
                    this.setState({
                        showEntangle:{style:{display:'inline-block'}}
                    })
                    this.turnType = 'entanglement'
                    this.choiceAction()
                    return
                }

                this.turn += 1
                if (this.turn % 2 === 0) {
                    this.turnUser = 1
                } else {
                    this.turnUser = 0
                }
                this.setState({turn: this.turn})
                this.selected = []
            }
        }
    }
    render() {
        if(this.state.loading){
            return (
                <div className='Field'>
                    <p style={{textAlign:"center"}}>Loading...</p>
                    <p style={{textAlign:"center"}}><CircularProgress /></p>
                </div>
            )
        }
        return (<div className='Field'>
            <InitDisplay onClick={this.start} style={this.state.init}/>
            <div style={this.state.fieldDisplay}>
            <div className='showWinLose' style={this.state.showWinLose.style} onClick={this.resetField}>
                {this.state.showWinLose.text}
            </div>
            <div className='showEntangle' style={this.state.showEntangle.style} onClick={this.clearShowEntangle}>
                Cyclic Entangle!
            </div>
            <table className="App">
                <tbody>
                    {this.makeLines()}
                </tbody>
            </table>
            <div className="turndisplay">turn: {this.turn}</div>
            <Button variant='contained' color='default' size='large' className="button" style={this.state.buttonBisible} onClick={this.addTurn}>Place</Button>
            <ButtonGroup className='choice' style={this.state.choiceBisible}>
                {this.state.choices.map((value,key)=>(<Button variant='contained' size='medium' className='marubatsu' key={key} data-turn={value} onClick={(event)=>this.decideBlock(event.currentTarget.dataset.turn)}>{value%2 === 1 ? '〇'+value : '✖'+value}</Button>))}
            </ButtonGroup>
        </div>
        </div>)
    }
}

function randomCpu(App) {
    if(App.turnType === 'entanglement') {
        let selectable = []
        for(let turnCheck of App.stonePos[App.selected[1]]){
            if(App.checkBlock(App.selected[1],App.selected[1],turnCheck)){
                selectable.push(turnCheck)
            }
        }
        let choice = selectable[Math.floor(Math.random()*selectable.length)]
        return choice
    }else {
        let selectable = []
        for(let i=0;i<App.blocks.length;i++){
            if(typeof(App.blocks[i].stones) !== 'string') {
                selectable.push(i)
            }
        }
        let sai = Math.floor(Math.random()*selectable.length)
        let choice1 = selectable[sai]
        selectable.splice(sai,1)
        let choice2 = selectable[Math.floor(Math.random()*selectable.length)]
        return [choice1,choice2]
    }
}
function ESRL(App) {
    if(Math.random()*100 < 100){//randomにする確率の調整
        let choices = []
        for(let i=0;i<8;i++){
            for(let j=i+1;j<9;j++){
                choices.push([i,j])
            }
        }
        for(let t=0;t<9;t++){
            choices.push(t+1)
        }
        let cases = [0,0,0,0,0,0,0,0,0]
        let case_param = Array(18*9)
        case_param.fill(0)
        for(let w=0;w<9;w++){
            let decided = App.decidedPos[w]
            if(decided !== 0){
                case_param[18*w+(decided-1)] = 1
                cases[w] = 1
            }
        }
        for(let l=0;l<9;l++){
            if(cases[l] === 0) {
                let virpos = App.stonePos[l]
                for(let m=0;m<virpos.length;m++) {
                    let sturn = virpos[m]
                    case_param[18*l+9+sturn-1] = 1
                }
                cases[l] = 1
            }
        }
        case_param = tf.tensor([case_param])
        let predicted_value = ESRLmodel.predict(case_param).dataSync()
        let choiceIndex
        if(App.turn === 1){
            choiceIndex = weightRandom(predicted_value,0.1)
        }else if(App.turn === 2){
            choiceIndex = weightRandom(predicted_value,0.01)
        }else{
            choiceIndex = predicted_value.indexOf(Math.max.apply(null, predicted_value))
        }
        //let choiceIndex = weightRandom(predicted_value,400)
        //let choiceIndex = predicted_value.indexOf(Math.max.apply(null, predicted_value))
        let choice = choices[choiceIndex]
        //console.log(Math.max.apply(null, predicted_value))
        console.log(predicted_value[choiceIndex])
        //console.log(predicted_value)
        if(App.turnType === 'entanglement') {
            let selectable = []
            for(let turnCheck of App.stonePos[App.selected[1]]){
                if(App.checkBlock(App.selected[1],App.selected[1],turnCheck)){
                    selectable.push(turnCheck)
                }
            }
            if(selectable.indexOf(choice) === -1 || choiceIndex < 36) {
                choice = selectable[Math.floor(Math.random()*selectable.length)]
            }
        }else {
            let selectable = []
            for(let i=0;i<App.blocks.length;i++){
                if(typeof(App.blocks[i].stones) !== 'string') {
                    selectable.push(i)
                }
            }
            if(choiceIndex >= 36){
                let sai = Math.floor(Math.random()*selectable.length)
                let choice1 = selectable[sai]
                selectable.splice(sai,1)
                let choice2 = selectable[Math.floor(Math.random()*selectable.length)]
                choice = [choice1,choice2]
            }else{
                for(let cci of choice){
                    if(selectable.indexOf(cci) === -1) {
                        let sai = Math.floor(Math.random()*selectable.length)
                        let choice1 = selectable[sai]
                        selectable.splice(sai,1)
                        let choice2 = selectable[Math.floor(Math.random()*selectable.length)]
                        choice = [choice1,choice2]
                        break
                    }
                }
            }
        }
        return choice
    }else{
        console.log("random action")
        return randomCpu(App)
    }
}
function weightRandom (weight, t) {
    const reducer = (accumulator,currentValue) => accumulator + Math.pow(2,currentValue/t)
    let summen = weight.reduce(reducer,0)
    let dice = Math.random() * summen
    let under = 0
    let top
    for(let i=0;i<45;i++){
        top = under + Math.pow(2,weight[i]/t)
        if(under<=dice && dice<top) {
            return i
        }
        under = top
    }
}



export default App;

import React, {Component} from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


let ESRLmodel;
async function loadmodel() {
    ESRLmodel = await tf.loadLayersModel("https://eggplanck.github.io/QTTT/ESRLmodel/model.json")
    await ESRLmodel.summary()
}
loadmodel();

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
        this.state = {
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
            showWinLose:{style:{display:'none'},text:''}
        }
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
    makeLines() {
        let tableContents = [];
        for (let i = 0; i < 3; i++) {
            tableContents.push(<tr key={i}>{this.state.blocks.slice(i * 3, i * 3 + 3).map((value, key) => (<Block number={value.number} stones={value.stones} selected={value.selected}  onClick={this.addSelected} key={value.number}/>))}</tr>)
        }
        return tableContents
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
                alert('cyclic entanglement')
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
                    if(WinLose === -1 && this.turn !== 10){
                        return
                    }
                    if(WinLose === -1){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'引き分け'}
                        })
                    }
                    if(WinLose === 0){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'先手の勝ち'}
                        })
                    }
                    if(WinLose === 1){
                        this.setState({
                            showWinLose:{style:{display:'inline-block'},text:'後手の勝ち'}
                        })
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
                            showWinLose:{style:{display:'inline-block',color:'black'},text:'DRAW'}
                        })
                    }
                    if(WinLose === 0){
                        this.setState({
                            showWinLose:{style:{display:'inline-block',color:'red'},text:'YOU WIN'}
                        })
                    }
                    if(WinLose === 1){
                        this.setState({
                            showWinLose:{style:{display:'inline-block',color:'blue'},text:'YOU LOSE'}
                        })
                    }
                }
            }
            if(this.turnUser === 1){
                this.cpusChoice()
                return
            }else {
                return
            }
        }
        if(WinLose === -1){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'black'},text:'DRAW'}
            })
        }
        if(WinLose === 0){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'red'},text:'YOU WIN'}
            })
        }
        if(WinLose === 1){
            this.setState({
                showWinLose:{style:{display:'inline-block',color:'blue'},text:'YOU LOSE'}
            })
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
            showWinLose:{style:{display:'none'},text:''}
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
                    alert('cyclic entanglement')
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
        return (<div className='Field'>
            <div className='showWinLose' style={this.state.showWinLose.style} onClick={this.resetField}>
                {this.state.showWinLose.text}
            </div>
            <table className="App">
                <tbody>
                    {this.makeLines()}
                </tbody>
            </table>
            <div className="turndisplay">turn: {this.turn}</div>
            <Button variant='contained' color='default' size='large' className="button" style={this.state.buttonBisible} onClick={this.addTurn}>確定</Button>
            <ButtonGroup className='choice' style={this.state.choiceBisible}>
                {this.state.choices.map((value,key)=>(<Button variant='contained' size='medium' className='marubatsu' key={key} data-turn={value} onClick={(event)=>this.decideBlock(event.currentTarget.dataset.turn)}>{value%2 === 1 ? '〇'+value : '✖'+value}</Button>))}
            </ButtonGroup>
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
    if(Math.random()*100 < 70){
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
        let choiceIndex = predicted_value.indexOf(Math.max.apply(null, predicted_value))
        let choice = choices[choiceIndex]
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
        return randomCpu(App)
    }
}



export default App;

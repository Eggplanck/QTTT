import copy
class App():
    def __init__(self):
        self.blocks = []
        self.turn = 1
        self.turnUser = 0
        self.turnType = 'normal'
        self.selected = []
        self.haveStones = []
        self.stonePos = [[],[],[],[],[],[],[],[],[]]
        self.stone_first = []
        self.stone_second = []
        self.decided_pos = [0,0,0,0,0,0,0,0,0]
    def selectable(self):
        if self.turnType == 'normal':
            selectable_pos = []
            for i in range(len(self.decided_pos)):
                if self.decided_pos[i] == 0:
                    selectable_pos.append(i)
            return selectable_pos
        else:
            selectable_turn = []
            for turn in self.stonePos[self.selected[1]]:
                if self.checkBlock(self.selected[1],self.selected[1],turn):
                    selectable_turn.append(turn)
            return selectable_turn
    def select_pos(self,choice):
        self.selected = choice
        self.haveStones.append(self.selected)
        self.stonePos[self.selected[0]].append(self.turn)
        self.stonePos[self.selected[1]].append(self.turn)

        if self.checkEntanglement(self.selected[1],self.selected[1],self.turn):
            self.turnType = 'entanglement'
            return

        self.turn += 1
        if self.turnUser == 0:
            self.turnUser = 1
        else:
            self.turnUser = 0
        self.selected = []
        if self.turn == 9:
            if len(self.selectable()) == 1:
                self.stone_first.append(self.selectable()[0])
                self.decided_pos[self.selectable()[0]] = 9
                WL = self.checkWinLose()
                return WL
        return -2

    def checkEntanglement(self,first,selected,turn):
        if len(self.stonePos[selected]) == 1:
            return False
        for turnSelected in self.stonePos[selected]:
            if turnSelected != turn:
                if self.checkBlock(first,selected,turnSelected):
                    return True
        return False

    def checkBlock(self,first,selected,turn):
        for blockSelected in self.haveStones[turn-1]:
            if blockSelected != selected:
                if first == blockSelected:
                    return True
                elif self.checkEntanglement(first,blockSelected,turn):
                    return True
        return False

    def decideBlock(self,turnNum):
        self.decided_pos[self.selected[1]] = turnNum
        if turnNum%2 == 1:
            self.stone_first.append(self.selected[1])
        else:
            self.stone_second.append(self.selected[1])
        self.decideBlock1(self.selected[1],self.selected[1],turnNum,turnNum)
        self.turnType = 'normal'
        self.turn += 1
        if self.turnUser == 0:
            self.turnUser = 1
        else:
            self.turnUser = 0
        self.selected = []
        WL = self.checkWinLose()
        if WL == -1 and self.turn != 10:
            if self.turn == 9:
                if len(self.selectable()) == 1:
                    self.stone_first.append(self.selectable()[0])
                    self.decided_pos[self.selectable()[0]] = 9
                    WL2 = self.checkWinLose()
                    return WL2
            return -2
        return WL
    def decideBlock1(self,first,selected,turn,selectedTurn):
        for turnSelected in self.stonePos[selected]:
            if turnSelected != turn:
                self.decideBlock2(first,selected,turnSelected,selectedTurn)
        return
    def decideBlock2(self,first,selected,turn,selectedTurn):
        for blockSelected in self.haveStones[turn-1]:
            if blockSelected != selected:
                if first == blockSelected:
                    return
                else:
                    self.decideBlock1(first,blockSelected,turn,selectedTurn)
                    if turn%2 == 1:
                        self.stone_first.append(blockSelected)
                    else:
                        self.stone_second.append(blockSelected)
                    self.decided_pos[blockSelected] = turn
        return
    def checkWinLose(self):
        checklist = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        score1 = 10
        score2 = 10
        for lis in checklist:
            counter1 = 0
            shape1 = []
            TF1 = False
            counter2 = 0
            shape2 = []
            TF2 = False
            for pos in lis:
                if pos in self.stone_first:
                    counter1 += 1
                if pos in self.stone_second:
                    counter2 += 1
            if counter1 >= 3:
                shape1.append(lis)
                TF1 = True
            if counter2 >= 3:
                shape2.append(lis)
                TF2 = True
        if TF1:
            for shape in shape1:
                maxi1 = 0
                for pos in shape:
                    if self.decided_pos[pos] > maxi1:
                        maxi1 = self.decided_pos[pos]
                if score1 > maxi1:
                    score1 = maxi1
        if TF2:
            for shape in shape2:
                maxi2 = 0
                for pos in shape:
                    if self.decided_pos[pos] > maxi2:
                        maxi2 = self.decided_pos[pos]
                if score2 > maxi2:
                    score2 = maxi2
        if TF1 and TF2:
            if score1 < score2:
                return 0
            else:
                return 1
        if TF1 and (not TF2):
            return 0
        if (not TF1) and TF2:
            return 1
        if (not TF1) and (not TF2):
            return -1

class MonteCarlo():
    def __init__(self):
        self.case_saver = []
    def maker(self,app):
        score = 0
        case = [None,None,None,None,None,None,None,None,None]
        for k in range(len(app.decided_pos)):
            decided = app.decided_pos[k]
            if decided != 0:
                if decided%2 == 1:
                    case[k] = '〇' + str(decided)
                else:
                    case[k] = '✖' + str(decided)
        for l in range(len(app.stonePos)):
            if case[l] == None:
                virpos = app.stonePos[l]
                showStone = []
                for sturn in virpos:
                    if sturn%2 == 1:
                        showStone.append('〇'+str(sturn))
                    else:
                        showStone.append('✖'+str(sturn))
                case[l] = showStone
        answer = [case,None]
        myscore = -10
        bestchoice = None
        if app.turnType == 'normal':
            selectable = app.selectable()
            choice = [None,None]
            for i in range(len(selectable)-1):
                choice[0] = selectable[i]
                for j in range(i+1,len(selectable)):
                    choice[1] = selectable[j]
                    virtualApp = copy.deepcopy(app)
                    result = virtualApp.select_pos(choice)
                    if result == -2:
                        virscore = -self.maker(virtualApp)
                        score += virscore
                        if myscore < virscore:
                            myscore = virscore
                            bestchoice = choice
                    else:
                        if app.turnUser == 1:
                            if result == 0:
                                score += -1
                                if myscore < -1:
                                    myscore = -1
                                    bestchoice = choice
                            elif result == 1:
                                score += 1
                                if myscore < 1:
                                    myscore = 1
                                    bestchoice = choice
                            elif result == -1:
                                score += 0
                                if myscore < 0:
                                    myscore = 0
                                    bestchoice = choice
                        elif app.turnUser == 0:
                            if result == 0:
                                score += 1
                                if myscore < 1:
                                    myscore = 1
                                    bestchoice = choice
                            elif result == 1:
                                score += -1
                                if myscore < -1:
                                    myscore = -1
                                    bestchoice = choice
                            elif result == -1:
                                score += 0
                                if myscore < 0:
                                    myscore = 0
                                    bestchoice = choice
            answer[1] = bestchoice
            self.case_saver.append(answer)
            return score / (len(selectable)*(len(selectable)-1)/2)
        elif app.turnType == 'entanglement':
            selectable = app.selectable()
            for choice in selectable:
                virtualApp = copy.deepcopy(app)
                result = virtualApp.decideBlock(choice)
                if result == -2:
                    virscore = self.maker(virtualApp)
                    score += virscore
                    if myscore < virscore:
                        myscore = virscore
                        bestchoice = choice
                else:
                    if app.turnUser == 0:
                        if result == 0:
                            score += -1
                            if myscore < -1:
                                myscore = -1
                                bestchoice = choice
                        elif result == 1:
                            score += 1
                            if myscore < 1:
                                myscore = 1
                                bestchoice = choice
                        elif result == -1:
                            score += 0
                            if myscore < 0:
                                myscore = 0
                                bestchoice = choice
                    elif app.turnUser == 1:
                        if result == 0:
                            score += 1
                            if myscore < 1:
                                myscore = 1
                                bestchoice = choice
                        elif result == 1:
                            score += -1
                            if myscore < -1:
                                myscore = -1
                                bestchoice = choice
                        elif result == -1:
                            score += 0
                            if myscore < 0:
                                myscore = 0
                                bestchoice = choice
            answer[1] = bestchoice
            self.case_saver.append(answer)
            return score / len(selectable)

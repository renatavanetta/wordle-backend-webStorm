const uniqueId = require('./objetos/idGenerator');
const Word = require('./objetos/Words');
const Checker = require('./objetos/Checker')
const { Player } = require('./objetos/Player');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: "https://wordle-clone-pug-1-0.herokuapp.com/",
}));

const port = process.env.PORT || 3001;

let playerList = new Map();

app.get('/userId', async (req, res) => {
    let userId = uniqueId();
    res.status(200).json({id: userId});
})

app.post('/startGame', async(req, res) => {
    let userId = req.body.id;
    let player;

    if (playerList.has(userId)) {
        let playerInfo = playerList.get(userId);
        let newWord = Word.randomWord();
        playerInfo.startNewGame(newWord);
        res.status(200).json({message: 'new game starting'})
    } else {
        player = new Player(userId, Word.randomWord(), true, false, 0, 0, 0)
        playerList.set(player.id, player);
    }
})

app.post('/checkword', async(req, res) => {
    const userId = req.body.id;
    const sentWord = req.body.sentWord.toUpperCase();
    

    if(playerList.has(userId)){
        let playerInfo = playerList.get(userId); //recupera todas as informações do usuario

        if(!playerInfo.gameStarted){
            res.status(400).json({message: 'game not started. impossible to proceed.'})
            return
        }

        if(Word.checkWord(sentWord) === false){
            res.status(200).json({message: 'word do not exist in list', line: playerInfo.currentLine})
            return
        }

        let wordChecker = Checker.compareWords(playerInfo, sentWord);
        playerInfo.currentLine += 1;
        res.status(200).json({wordChecker})

    }else{
        res.status(404).json({
            message: 'user does not exist',
        })
    }
})

app.post('/deleteUser', async(req, res) =>{
    let userId = req.body.id;
    playerList.delete(userId);
    res.status(200).json({message: "bye!"})
})

app.listen(port);
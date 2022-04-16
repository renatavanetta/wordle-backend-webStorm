function compareWords(playerInfo, sentWord) {
    userWord = playerInfo.activeWord.toUpperCase();
    currentLine = playerInfo.currentLine;

    let answerMap = new Map();

    if(sentWord == userWord){
        playerInfo.addCurrentStreak();
        playerInfo.addNumberOfPlays();
        answerMap.set("status", "win");
        answerMap.set("currentStreak", playerInfo.currentStreak)
        answerMap.set("numberOfPlays", playerInfo.numberOfPlays)
    }
    else{
        for(let a=0; a<5; a++){

            if(sentWord[a] === userWord[a]){
                answerMap.set(a+5, sentWord[a]);
                answerMap.set(a, "#6aaa64");
                continue;
            }
            
            if(userWord.includes(sentWord[a])){
                answerMap.set(a+5, sentWord[a]);
                answerMap.set(a, "#c9b458");
                continue;
            }

            answerMap.set(a, "#787c7e");
            answerMap.set(a+5, sentWord[a]);
        }

        if(currentLine == 5){
            playerInfo.lose();
            answerMap.set("status", "gameOver");
            answerMap.set("pastWord", userWord);
            answerMap.set("currentStreak", playerInfo.currentStreak)
            answerMap.set("numberOfPlays", playerInfo.numberOfPlays)
        }
    }

    return Object.fromEntries(answerMap)

}

module.exports = { compareWords };
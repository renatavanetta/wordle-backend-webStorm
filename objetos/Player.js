class Player{

    #id 
    #activeWord
    #gameStarted    
    #gameOver
    #currentLine
    #numberOfPlays
    #currentStreak


    constructor(id, activeWord, gameStarted, gameOver, currentLine, numberOfPlays, currentStreak){
        this.#id = id;
        this.#activeWord = activeWord;
        this.#gameStarted = gameStarted;
        this.#gameOver = gameOver;
        this.#currentLine = currentLine;
        this.#numberOfPlays = numberOfPlays;
        this.#currentStreak = currentStreak;
    }

    get id(){
        return this.#id;
    }

    get activeWord(){
        return this.#activeWord;
    }

    get gameStarted(){
        return this.#gameStarted;
    }

    get gameOver(){
        return this.#gameOver
    }

    get currentLine(){
        return this.#currentLine;
    }

    get numberOfPlays(){
        return this.#numberOfPlays;
    }

    get currentStreak(){
        return this.#currentStreak;
    }

    set id(id){
        this.#id = id;
    }

    set gameOver(status){
        this.#gameOver = status;
    }

    set currentLine(currentLine){
        this.#currentLine = currentLine;
    }

    set numberOfPlays(numberOfPlays){
        this.#numberOfPlays = numberOfPlays;
    }

    set currentStreak(currentStreak){
        this.#currentStreak = currentStreak;
    }


    addCurrentStreak(){
        this.#currentStreak++;
    }

    addNumberOfPlays(){
        this.#numberOfPlays++;
    }

    startNewGame(word){
        this.#activeWord = word;
        this.#currentLine = 0;
        this.#gameOver = false;
        this.#gameStarted = true;
    }

    lose(){
        this.#gameOver = true;
        this.#currentStreak = 0;
    }
    
}

module.exports = { Player }
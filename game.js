export default function createGame(){
    const state = {
        players:{},
        fruits:{},
        screen:{
            width:10,
            height:10
        }
    }

    function addPlayer(command){
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x:playerX,
            y:playerY
        }
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command){
        const fruitId = command.fruitsId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x:fruitX,
            y:fruitY
        }
    }

    function removeFruit(command){
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command){

        const acceptedMoves = {
            ArrowUp(player){
                if(player.y-1>=0){
                    player.y = player.y-1
                    return
                }
            },
            ArrowRight(player){
                if(player.x+1<state.screen.width){
                    player.x = player.x+1
                    return
                }
            },
            ArrowDown(player){
                if(player.y+1<state.screen.height){
                    player.y = player.y+1
                    return
                }
            },
            ArrowLeft(player){
                if(player.x-1>=0){
                    player.x = player.x-1
                    return
                }
            }
        }
        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]
        const moveFunction = acceptedMoves[keyPressed]
        if(player && moveFunction){
            moveFunction(player)
            checkForFruitCollition(playerId)
        }
    }
    function checkForFruitCollition(playerId){
        const player = state.players[playerId]

        for(const fruitId in state.fruits){
            const fruit = state.fruits[fruitId]
            console.log(`Checking ${playerId} and ${fruitId}`)

            if(player.x===fruit.x && player.y===fruit.y){
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit(fruitId)
            }
        }
    }
    return {
        addPlayer,
        removePlayer,
        movePlayer,
        addFruit,
        removeFruit,
        state
    }
}

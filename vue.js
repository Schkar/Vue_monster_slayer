new Vue({
    el: "#gameRoot",
    data: {
        gameStarted: false,
        playerHealth: 100,
        monsterHealth: 100,
        turn: "player",
        logs: []
    },
    methods: {
        playGameToggle: function() {
            this.gameStarted = !this.gameStarted
            this.logs = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turn = "player"
        },
        attack: function(specialAttack) {
            let maxValue = specialAttack ? 20 : 12;
            let minValue = specialAttack ? 10 : 5;

            let damage = ~~(Math.random() * (maxValue - minValue + 1) + minValue);


            console.log(damage);

            this.monsterHealth -= damage;

            if (this.monsterHealth <= 0) {
                this.endGame("monster");
                addLog("player","kills", 0)
                return;
            }
            this.addLog("player","attacks",damage);
            this.setTurn();
        },
        monsterAttack: function() {
            let damage = ~~(Math.random() * (12 - 5 + 1) + 5);

            console.log(damage);
            

            this.playerHealth -= damage;
            if (this.playerHealth <= 0) {
                this.endGame("player");
                addLog("monster","kills", 0);
                return;
            }
            this.addLog("monster","attacks",damage);
            this.setTurn();
        },
        endGame: function(lost) {
            if (lost === "player") {
                alert("You lose, monster wins");
            }
            else {
                alert("You win, monster lost");
            }
            this.playGameToggle()
        },
        heal: function() {
            let heal = ~~(Math.random() * (12 - 5 + 1) + 5);

            this.playerHealth += heal;
            if (this.playerHealth > 100) {
                this.playerHealth = 100
            }
            this.addLog("player","heals",heal);
            this.setTurn();
        },
        setTurn: function() {
            if (this.turn === "player") {
                this.turn = 'monster';
            } 
            else {
                this.turn = 'player';
            }
        },
        addLog: function(who,what,ammount) {
            this.logs.unshift(
                {
                    side: who,
                    action: what,
                    number: ammount
                }
            )
        }
    },
    computed: {

    },
    watch: {
        turn: function() {
            if (this.turn === 'monster') {
                setTimeout(this.monsterAttack, 400);
            }
        }
    }
})
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Initialization
    this.x = Math.random() * 606 - 101; //between -101 to 505 (-101 before coming from left, 505 after passing the last right box)
    this.y = Math.floor(Math.random() * 3) * 80 + 50; //math.floor(math.random*3) to get random int (1,2,3) and times 80 to position them at the road (50 is the off-position)
    this.speed = Math.random() * 400;

    //setting the minimum speed of enemy
    while (this.speed < 180) {
        this.speed = Math.random() * 400;
    }

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //return enemy at the left
    if (this.x > 505) {
        this.x = -101;
        this.y = Math.floor(Math.random() * 3) * 80 + 50;
    }

    //increase the position of enemy
    this.x += dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.image = 'images/char-boy.png';
    
    //initialization
    this.x = 0 + 101 * 2; //101 is the x-size of each box
    this.y = -30 + 80 * 5; //80 is the y-size of each box, -30 is the offset Y
};

Player.prototype.update = function() {
    //checking collision
    allEnemies.forEach((enemy) => {
        if (Math.abs(this.x - enemy.x) < 50 && this.y == enemy.y ) {
            this.y = 370;
            this.x = 202;
        }
    })
};

Player.prototype.handleInput = function(key) {
    //event listener callback, to translate the input key
    switch(key) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > -30) {
                this.y -= 80;

                //win if the player arrive at the water
                if (this.y == -30) {
                    setTimeout(() => {
                        this.y = 370;
                        this.x = 202;

                        let finish = new Date();
                        let time = finish - start;
                        alert(`You Win! your duration : ${time}`);
                        start = new Date();
                    }, 20);
                }
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 370) {
                this.y += 80;
            }
            break;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.image), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player;
let enemy = new Enemy;
let allEnemies = [new Enemy, new Enemy, new Enemy];
let start = new Date();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

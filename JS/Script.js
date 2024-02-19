let HoleElemnts = document.getElementsByClassName("g");
let Gnomes = document.getElementsByClassName("Holes");
let PlayButton = document.getElementById("Start");
let timer = document.getElementById("timer");
let Points = document.getElementById("points");

let time = 50;
let pointer = 0;
Points.innerText = pointer;
const GameOBJ = {
    Holes: ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "h11", "h12"],
    Gnomes: ["./images/Gnome-1.png", "./images/Gnome-2.png", "./images/Gnome-3.png"],
    NewHole: "none",
    NewGnome: "none",
    LastHoles: [],
    IsPlayed: false,
    Chose_Random_Hole: function () {
        let RNDnumber = Math.round(Math.random() * 11);
        this.NewHole = RNDnumber;
    },
    Chose_Random_Gnome: function () {
        let RNDnumber = Math.round(Math.random() * 2);
        this.NewGnome = this.Gnomes[RNDnumber]

    },
    SpawnGnome: function () {
        GameOBJ.Chose_Random_Hole();
        GameOBJ.Chose_Random_Gnome();
        for (let i = 0; i < this.LastHoles[this.LastHoles.length]; i++) {
            if (this.NewHole !== this.LastHoles[i]) {
                break;
            }
            GameOBJ.Chose_Random_Hole();
        }
        let DiggingSound = new Audio("./Audio/Digging.mp3")
        HoleElemnts[this.NewHole].classList.add("Gnomes")
        HoleElemnts[this.NewHole].src = this.NewGnome;
        HoleElemnts[this.NewHole].style.opacity = 1;
        DiggingSound.play();
        this.LastHoles[this.LastHoles.length] = this.NewHole;
        this.NewGnome = "none";
        this.NewHole = "none";
    },
    Delet_Old_Gnome: function () {

        HoleElemnts[this.LastHoles[0]].classList.add("Gnomes")
        HoleElemnts[this.LastHoles[0]].src = " ";
        HoleElemnts[this.LastHoles[0]].style.opacity = 0;

        this.LastHoles.splice(0, 1)
    }
}

function MainProgram() {

    PlayButton.addEventListener("click", function () {
        if (GameOBJ.IsPlayed === false) {


            GameOBJ.IsPlayed = true;
            GameOBJ.SpawnGnome();
        }
        let interval1 = setInterval(function () {
            GameOBJ.SpawnGnome();
        }, 500)

        // let interval2 = setInterval(function () {
        //     GameOBJ.Delet_Old_Gnome();
        // }, 1200)
        let interval3 = setInterval(function () {
            time--;
            if (time <= 69 && time >= 60) {
                timer.innerText = "((((((" + time + "))))))";
            } else if (time <= 59 && time >= 50) {
                timer.innerText = "(((((" + time + ")))))";
            } else if (time <= 49 && time >= 40) {
                timer.innerText = "((((" + time + "))))";
            } else if (time <= 39 && time >= 30) {
                timer.innerText = "(((" + time + ")))";
            } else if (time <= 29 && time >= 20) {
                timer.innerText = "((" + time + "))";
            } else if (time <= 19 && time >= 10) {
                timer.innerText = "(" + time + ")";
            } else if (time <= 9 && time >= 0) {
                timer.innerText = time;
                if (time === 0) {
                    window.alert("Time Is Up,You Got " + Points.innerText + " Points!")
                    time = 60;
                    GameOBJ.IsPlayed = false;
                    pointer = 0;
                    Points.innerText = pointer;
                    clearInterval(interval1);

                    clearInterval(interval3);
                }
            }

        }, 1000)


    })
    for (const argument of Gnomes) {
        argument.addEventListener("click", function (event) {
            let target = Number(event.target.id);
            for (let i = 0; i < GameOBJ.LastHoles.length; i++) {
                if (target === GameOBJ.LastHoles[i]) {

                    let Poof = new Audio("./Audio/Poof.mp3")
                    Poof.play();
                    HoleElemnts[target].classList.add("Gnomes")
                    HoleElemnts[target].src = " ";
                    HoleElemnts[target].style.opacity = 0;
                    GameOBJ.LastHoles.splice(target, 1)
                    pointer++;
                    Points.innerText = pointer;

                }


            }


        })
    }

}

MainProgram();
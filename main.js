let picked = null;
let player = 'w';
let kill = { cell: [], killCell: [] };

function pick() {
    const cell = this;
    if (cell.getAttribute('side') == player || cell.classList.contains('move')) {
        if (picked) {
            if (cell.getAttribute('identifer') != picked.getAttribute('identifer')) {
                if (cell.classList.contains('move')) {
                    changeCells(cell, picked);
                    for (let i = 0; i < kill.cell.length; i++) {
                        if (kill.cell[i]) {
                            if (kill.cell[i].getAttribute('identifer') == cell.getAttribute('identifer')) {
                                for (let j = 0; j < kill.killCell.length; j++) {
                                    cut(kill.killCell[j]);
                                }
                            }
                        }
                    }
                    if (player == "w") {
                        player = "b";
                    } else {
                        player = "w";
                    }
                } else {

                    let exCell = document.getElementsByClassName('picked');
                    exCell[0].classList.remove('picked');
                    picked = cell;
                    cell.classList.add('picked');
                }
            }
        } else {
            cell.classList.add('picked');
            picked = cell;
        }
        clearWays();
        availableCells(player);
    }
}

function changeCells(nextCell, exCell) {
    exCell.classList.remove('picked');
    nextCell.setAttribute('side', exCell.getAttribute('side'));
    nextCell.innerHTML = exCell.innerHTML;
    exCell.innerHTML = "";
    exCell.setAttribute('side', 'none');
    picked = null;
    if (exCell.classList.contains('queen')) {
        nextCell.classList.add('queen');
        exCell.classList.remove('queen');
    }
}

function availableCells(side) {
    kill.cell = [];
    kill.killCell = [];
    let sideMove;
    let enemySide;
    if (side == 'w') {
        sideMove = 1;
        enemySide = 'b';
    } else {
        sideMove = -1;
        enemySide = 'w';
    }
    let x = +picked.getAttribute('x');
    let y = +picked.getAttribute('y');
    let pickSide = picked.getAttribute('side');
    let right = document.querySelector(`[x="${x+sideMove}"][y="${y+1}"]`);
    let left = document.querySelector(`[x="${x+sideMove}"][y="${y-1}"]`);
    if (right) {
        if (right.getAttribute('side') == 'none') {
            right.classList.add('move');
        }
        if (right.getAttribute('side') == enemySide) {
            let nextRight = document.querySelector(`[x="${+right.getAttribute('x')+sideMove}"][y="${+right.getAttribute('y')+1}"]`);
            if (nextRight) {
                if (nextRight.getAttribute('side') == 'none') {
                    nextRight.classList.add('move');
                    kill.cell.push(nextRight);
                    kill.killCell.push(right);
                }
            }
        }
    }

    if (left) {
        if (left.getAttribute('side') == 'none') {
            left.classList.add('move');
        }

        if (left.getAttribute('side') == enemySide) {
            let nextLeft = document.querySelector(`[x="${+left.getAttribute('x')+sideMove}"][y="${+left.getAttribute('y')-1}"]`);
            if (nextLeft) {
                if (nextLeft.getAttribute('side') == 'none') {
                    nextLeft.classList.add('move');
                    kill.cell.push(nextLeft);
                    kill.killCell.push(left);
                }
            }
        }
    }

    if (picked.classList.contains('queen')) {
        let leftTop = document.querySelector(`[x="${x+1}"][y="${y-1}"]`);
        let leftBot = document.querySelector(`[x="${x-1}"][y="${y-1}"]`);
        let rightTop = document.querySelector(`[x="${x+1}"][y="${y+1}"]`);
        let rightBot = document.querySelector(`[x="${x-1}"][y="${y+1}"]`);
        let writeCell = false;
        while (rightTop || rightTop.getAttribute('side') != enemySide || rightTop.getAttribute('side') == 'none') {
            if (rightTop.getAttribute('side') == enemySide) {
                kill.killCell.push(rightTop);
                writeCell = true;
            }
            if (writeCell) {
                kill.cell.push(rightTop);
            }
            if (rightTop.getAttribute('side') != enemySide) {
                rightTop.classList.add('move');
            }
            rightTop = document.querySelector(`[x="${+rightTop.getAttribute('x')+1}"][y="${+rightTop.getAttribute('y')+1}"]`);
        }
        writeCell = false;
        while (rightBot || rightBot.getAttribute('side') != enemySide || rightBot.getAttribute('side') == 'none') {
            if (rightBot.getAttribute('side') == enemySide) {
                kill.killCell.push(rightBot);
                writeCell = true;
            }
            if (writeCell) {
                kill.cell.push(rightBot);
            }
            if (rightBot.getAttribute('side') != enemySide) {
                rightBot.classList.add('move');
            }
            rightBot = document.querySelector(`[x="${+rightBot.getAttribute('x')-1}"][y="${+rightBot.getAttribute('y')+1}"]`);
        }
        writeCell = false;
        while (leftTop || leftTop.getAttribute('side') != enemySide || leftTop.getAttribute('side') == 'none') {
            if (leftTop.getAttribute('side') == enemySide) {
                kill.killCell.push(leftTop);
                writeCell = true;
            }
            if (writeCell) {
                kill.cell.push(leftTop);
            }
            if (leftTop.getAttribute('side') != enemySide) {
                leftTop.classList.add('move');
            }
            leftTop = document.querySelector(`[x="${+leftTop.getAttribute('x')+1}"][y="${+leftTop.getAttribute('y')-1}"]`);
        }
        writeCell = false;
        while (leftBot || leftBot.getAttribute('side') != enemySide || leftBot.getAttribute('side') == 'none') {
            if (leftBot.getAttribute('side') == enemySide) {
                kill.killCell.push(leftBot);
                writeCell = true;
            }
            if (writeCell) {
                kill.cell.push(leftBot);
            }
            if (leftBot.getAttribute('side') != enemySide) {
                leftBot.classList.add('move');
            }
            leftBot = document.querySelector(`[x="${+leftBot.getAttribute('x')-1}"][y="${+leftBot.getAttribute('y')-1}"]`);
        }
    }
}

function cut(killCell) {
    killCell.setAttribute('side', 'none');
    killCell.innerHTML = '';
    if (killCell.classList.contains('queen')) {

        killCell.classList.remove('queen');
    }
}

function clearWays() {
    let moves = document.getElementsByClassName('move');
    while (moves.length != 0) {
        moves[0].classList.remove('move');
    }
    kill.cell = [];
    kill.killCell = [];
}

const field = document.getElementById('field');
let num = 1;
for (let i = 8; i > 0; i--) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let j = 1; j < 9; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('x', i);
        cell.setAttribute('y', j);
        cell.setAttribute('identifer', num);
        num++;
        cell.setAttribute('side', 'none');
        cell.addEventListener('click', pick);
        if (j % 2 == 1) {
            if (i % 2 == 1) {
                cell.classList.add('black');
            } else {
                cell.classList.add('white');
            }
        } else {
            if (i % 2 == 1) {
                cell.classList.add('white');
            } else {
                cell.classList.add('black');
            }
        }
        line.appendChild(cell);
    }
    field.appendChild(line);
}

for (let x = 1; x < 4; x++) {
    for (let y = 1; y < 9; y += 2) {
        const img = document.createElement('img');
        img.src = 'img/white.png';
        if (x % 2 == 0 && y == 1) {
            y++;
        }
        let cell = document.querySelector(`[x="${x}"][y="${y}"]`);
        cell.setAttribute('side', 'w');
        cell.appendChild(img);

    }

}

for (let x = 8; x > 5; x--) {
    for (let y = 1; y < 9; y += 2) {
        const img = document.createElement('img');
        img.src = 'img/black.png';
        if (x % 2 == 0 && y == 1) {
            y++;
        }
        let cell = document.querySelector(`[x="${x}"][y="${y}"]`);
        cell.setAttribute('side', 'b');
        cell.appendChild(img);

    }

}

document.querySelector('[identifer="45"]').classList.add('queen');
<template>
    <h1>2048 游戏</h1>
    <div class="score">得分: {{ score }}</div>
    <div class="game-container" ref="gameContainer">
    </div>
    <div class="buttons">
        <button @click="saveGame">保存游戏</button>
        <button @click="loadGame">加载游戏</button>
    </div>
</template>

<script lang='ts' setup name='game2048'>

import { ref,reactive,onMounted,onUnmounted} from 'vue'
const gameContainer = ref()
let score = ref(0)

let grid = reactive(Array.from({ length: 4 }, () => Array(4).fill(0)))

// 初始化游戏
function initGame() {
    addNewTile();
    addNewTile();
    updateGrid();
}

// 添加新数字块
function addNewTile() {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) emptyCells.push({ row, col });
        }
    }
    if (emptyCells.length > 0) {
        const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() > 0.1 ? 2 : 4;
    }
}

// 更新游戏界面
function updateGrid() {

}

// 滑动并合并
function slideAndCombine(row: number[]) {
    row = row.filter(num => num !== 0); // 移除所有 0
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    row = row.filter(num => num !== 0); // 再次移除所有 0
    while (row.length < 4) row.push(0); // 补齐为 4 个元素
    return row;
}

// 处理向左滑动
function moveLeft() {
    for (let i = 0; i < 4; i++) {
        grid[i] = slideAndCombine(grid[i]);
    }
}

// 处理向右滑动
function moveRight() {
    for (let i = 0; i < 4; i++) {
        grid[i] = slideAndCombine(grid[i].reverse()).reverse();
    }
}

// 处理向上滑动
function moveUp() {
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]];
        column = slideAndCombine(column);
        for (let row = 0; row < 4; row++) {
            grid[row][col] = column[row];
        }
    }
}

// 处理向下滑动
function moveDown() {
    for (let col = 0; col < 4; col++) {
        let column = [grid[0][col], grid[1][col], grid[2][col], grid[3][col]];
        column = slideAndCombine(column.reverse()).reverse();
        for (let row = 0; row < 4; row++) {
            grid[row][col] = column[row];
        }
    }
}

// 处理用户输入
const control = (e: KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        default:
            return;
    }
    addNewTile();
    updateGrid();
}

let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}
const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        if (diffY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
    addNewTile();
    updateGrid();
}

// 保存游戏状态到 localStorage
function saveGame() {
    const gameState = {
        grid: grid,
        score: score
    };
    localStorage.setItem('2048-game', JSON.stringify(gameState));
    alert('游戏已保存！');
}

// 从 localStorage 加载游戏状态
function loadGame() {
    const savedState = localStorage.getItem('2048-game');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        grid = gameState.grid;
        score = gameState.score;
        updateGrid();
        alert('游戏已加载！');
    } else {
        alert('没有找到已保存的游戏！');
    }
}

initGame();
onMounted(() => {
    window.addEventListener('keydown', control);
    gameContainer.value.addEventListener('touchstart', handleTouchStart);
    gameContainer.value.addEventListener('touchend', handleTouchEnd);
});

onUnmounted(() => {
    window.removeEventListener('keydown', control);
    gameContainer.value.removeEventListener('touchstart', handleTouchStart);
    gameContainer.value.removeEventListener('touchend', handleTouchEnd);
});

</script>

<style scoped>
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #faf8ef;
    font-family: 'Arial', sans-serif;
    touch-action: none;
}

h1 {
    margin-bottom: 5vh;
    color: #776e65;
}

#game-container {
    text-align: center;
}

#score {
    font-size: 5vw;
    margin-bottom: 5vw;
}

#buttons {
    text-align: center;
    margin-top: 5vw;
}

button {
    background-color: #8f7a66;
    color: #f9f6f2;
    border: none;
    padding: 4vw;
    margin: 5px;
    cursor: pointer;
    font-size: 5vw;
    border-radius: 2vw;
}

button:hover {
    background-color: #9e8b76;
}

#grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 每列均分 */
    grid-template-rows: repeat(4, 1fr);
    /* 每行均分 */
    aspect-ratio: 1;
    /* 保证容器宽高比为1:1 */
    gap: 1vw;
    /* 设置单元格间距 */
    background-color: #bbada0;
    padding: 1vw;
    border-radius: 1vw;
    width: 80vw;
    /* 动态宽度 */

    max-width: 500px;
    /* 限制最大宽度 */
}

.tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 10%;
    background-color: #cdc1b4;
    color: #776e65;
    transition: all 0.1s ease-in-out;
}

.tile-2 {
    background-color: #eee4da;
}

.tile-4 {
    background-color: #ede0c8;
}

.tile-8 {
    background-color: #f2b179;
    color: #f9f6f2;
}

.tile-16 {
    background-color: #f59563;
    color: #f9f6f2;
}

.tile-32 {
    background-color: #f67c5f;
    color: #f9f6f2;
}

.tile-64 {
    background-color: #f65e3b;
    color: #f9f6f2;
}

.tile-128 {
    background-color: #edcf72;
    color: #f9f6f2;
}

.tile-256 {
    background-color: #edcc61;
    color: #f9f6f2;
}

.tile-512 {
    background-color: #edc850;
    color: #f9f6f2;
}

.tile-1024 {
    background-color: #edc53f;
    color: #f9f6f2;
    font-size: 3vw;
}

.tile-2048 {
    background-color: #edc22e;
    color: #f9f6f2;
    font-size: 3vw;
}

.tile-4096 {
    background-color: #a2e00f;
    color: #f9f6f2;
    font-size: 3vw;
}

.tile-8192 {
    background-color: #2d7405;
    color: #f9f6f2;
    font-size: 3vw;
}
</style>
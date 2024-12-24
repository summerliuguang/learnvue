<template>

    <div class="game-container" ref="gameContainer" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <h1>2048 游戏</h1>
        <div class="score">得分: {{ score }}</div>
        <div class="grid-container">
            <div v-for="(value, index) in grid.flat()" :key="index" class="tile" :class="'tile-' + value">
                {{ value || '' }}
            </div>
        </div>
        <button @click="saveGame">保存游戏</button>
        <button @click="loadGame">加载游戏</button>
    </div>

</template>

<script lang='ts' setup name='game2048'>

import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const gameContainer = ref()
let score = ref(0)
let grid = reactive(Array.from({ length: 4 }, () => Array(4).fill(0)))

// 初始化游戏
function initGame() {
    addNewTile();
    addNewTile();
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

// 滑动并合并
function slideAndCombine(row: number[]) {
    const newRow = row.filter(num => num !== 0);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            newRow[i + 1] = 0;
            score.value += newRow[i];
        }
    }
    const mergedRow = newRow.filter(num => num !== 0);
    return mergedRow.concat(Array(4 - mergedRow.length).fill(0));
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
const handlekey = (e: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); // 阻止默认的滚动行为
    }
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
}

let touchStartX = 0;
let touchStartY = 0;
const moveThreshold = 10;

const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    if (Math.abs(diffX) < moveThreshold && Math.abs(diffY) < moveThreshold) return;
    if (Math.abs(diffX) >= Math.abs(diffY)) {
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
}

// 保存游戏状态到 localStorage
function saveGame() {
    const gameState = {
        grid: grid,
        score: score.value
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
        score.value = gameState.score;
        alert('游戏已加载！');
    } else {
        alert('没有找到已保存的游戏！');
    }
}


onMounted(() => {
    window.addEventListener('keydown', handlekey);
    initGame();
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handlekey);
});

</script>

<style scoped>
.main_content {
    touch-action: none;
}

.game-container {
    text-align: center;
    touch-action: none;
}

h1 {
    color: #776e65;
}

.score {
    text-align: right;
    font-size: 24px;
    margin-bottom: 20px;
}

buttons {
    text-align: center;
    margin-top: 5vw;
}

button {
    background-color: #8f7a66;
    color: #f9f6f2;
    border: none;
    padding: 40px;
    margin: 5px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 2vw;
}

button:hover {
    background-color: #9e8b76;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    aspect-ratio: 1;
    gap: 10px;
    background-color: #bbada0;
    padding: 10px;
    border-radius: 10px;
    width: 80vw;
    max-width: 600px;
    min-width: 500px;
    touch-action: none;
}

.tile {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cdc1b4;
    border-radius: 10px;
    font-size: 300%;
    font-weight: bold;
    color: #776e65;
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

@media screen and (max-width: 768px) {
    .grid-container {
        max-width: 400px;
        min-width: 200px;
    }

    .tile {
        font-size: 200%;
    }

    button {
        padding: 20px;
        font-size: 14px;
        border-radius: 5vw;
    }
}
</style>
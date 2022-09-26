const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// 设置画布的宽和高
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// 内置图像类,构造函数它将创建html图像
const playerImage = new Image();
playerImage.src = '../images/shadow_dog.png';
// 获取精灵图的一个小图像的宽度和高度 width:6876PX 有12列 6876 / 12 = 573， 
const spriteWidth = 575;
// 5230 / 10 = 523 px
const spriteHeight = 523;
let playerState = 'idle';
// 接select
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

// 游戏帧
let gameFrame = 0;
// 交错帧
const staggerFrames = 5;
// 自定义常量，空数组作为主容器保存所有动画的所有数据
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7, // 由7帧组成
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];
animationStates.forEach((state, index) => {
    // 执行动画状态中的每个元素
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

// 创建一个调用的自定义函数示例画框
function animate() {
    // 清除画布油漆,拿到每一个动画帧
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) //清除整个画布
    // 一种高级算法,6 对应6张动图 , 11 对应11张动图
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    // 用于在精灵图中垂直完成跳跃动画
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    //now we can draw~
    // 参数获取想要的图像：line 6
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    gameFrame++;
    requestAnimationFrame(animate); // 内置方法，一次又一次调用这个animate
};
animate();
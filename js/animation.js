/**
 * Created by admin on 2017/5/24.
 */
'use strict';

var loadImage = require('./imageloader');


//初始化状态
var STATE_INITAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

/**
 * 帧动画库类
 */
function Animation(){
    this.taskQueue = [];
    this.index = 0;
    this.state = STATE_INITAL;

}
/**
 添加一个同步任务,去加载图片
 @param imglist 图片数组
 */
Animation.prototype.loadImage = function(imglist){
    var taskFn = function (next) {
        loadImage(imglist.slice(),next);
    }
    var type = TASK_SYNC;

    return this._add(taskFn,type);
}
/*
*  添加一个异步定时任务,通过定时改变图片背景位置,实现帧动画
*  @param ele dom对象
*  @param positions 背景位置数组
*  @param imageUrl 图片地址
* */
Animation.prototype.changePostion = function (ele,positions,imageUrl) {
    
}
/*
* 添加一个定时任务,通过定时改变image标签的src属性,实现帧动画
* @param ele
* @param imglist
* */
Animation.prototype.changSrc = function (ele,imglist) {

}
/*
* 高级用法,添加一个异步定时执行的任务
* 该任务自定义动画每帧执行的任务函数
* @param taskFn 自定义每帧执行的任务函数
* */
Animation.prototype.enterFrame = function (taskFn) {

}
/*
* 添加一个同步任务,可以在上一个任务完成后执行回调函数
* @param callback 回调函数
* */
Animation.prototype.then = function (callback) {
    
}
/*
* 开始执行任务  异步定时任务执行间隔
* $param interval
* */
Animation.prototype.start = function (interval) {
    if(this.state === STATE_START){
        return this;
    }
    //如果任务链中没有任务则返回
    if(!this.taskQueue.length){
        return this;
    }

    this.state = STATE_START;
    this.interval = interval;
    this._runTask();
    return this;
}
/*
* 添加一个同步任务,该任务就是退回到上一个任务中
* 实现重复上一个任务的效果,可以定义重复的次数
* @param times
* */
Animation.prototype.repeat = function (times) {

}

/*
* 添加一个同步任务相当于repeat()更友好的接口,无限循环上一次任务
*
* */
Animation.prototype.repeatForever = function () {
    
}
/*
* 设置当前任务执行结束后到下一个任务开始前的等待时间
* @param time 等待时长
* */
Animation.prototype.wait = function (time) {
    
}
/*
* 暂停当前异步定时任务
* */
Animation.prototype.pause = function () {

}
/*
* 重新执行上一次暂停的异步任务
* */
Animation.prototype.restart = function () {
    
}
/*
* 释放资源
* */
Animation.prototype.dispose = function () {
    
}

/*
* 添加一个任务到任务队列中
* @param taskFn  任务方法
* @param type   任务类型
* @private
* */
Animation.prototype._add = function (tsakFn,type) {
    this.taskQueue.push({
        taskFn:taskFn,
        type:type
    });

    return this;
}

/*
* 执行任务
* @private
* */
Animation.prototype._runTask = function () {
    if(!this.taskQueue || this.state != STATE_START){
        return;
    }
    //任务执行完毕
    if(this.index === this.taskQueue.length){
        this.dispose();
        return
    }
    //获得任务链上的当前任务
    var task = this.taskQueue[this.index];
    if(task.type ===TASK_SYNC){
        this._syncTask(task);
    }else{
        this._asyncTask(task);
    }
}

/*
* 同步任务
* @param task执行的任务对象
* @private
* */
Animation.prototype._synacTask = function (task) {
    var me = this
    var next = function () {
        //切换到下一个任务
        this._next();
    };
    var taskFn = task.taskFn;
    taskFn(next);
}
/*
* 异步任务
* @param task 执行任务的对象
* @private
* */
Animation.prototype._asyncTask = function (task) {

}
/*
* 切换到下一个任务
* @private
* */
Animation.prototype._next = function () {
    this.index++;
    this._runTask();
}
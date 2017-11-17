/*
【1】//创建实例 
//box 为图片盒子，standHeight 为设置基准高度。gap为图片间间隙
var picsObj = new PicList(box,standHeight,gap) 


【2】//添加图片
//picUrls 为图片地址数组,  true表示清空后插入，false（默认）为在box里追加。
picsObj.addPics(picUrls,true)
	
【3】//box清空图片
	picsObj.clearPics()

【4】//销毁, box 未清空
    picsObj.destory()
*/




function PicList(box, standHeight, gap) {
    var self = this;
    self.pics = []; //已插入box 的图片
    self.standHeight = standHeight || 150;
    self.box = box;
    self.gap = gap || 10;
    self.boxWidth = self.getCoWidth(box);
    self.lefts = [];

    self.queues = [];

    function resize(){
    	self.readysResize();
    }
    window.addEventListener('resize',resize, false);
}
PicList.prototype.addPics = function(picUrls, isClear) {
    var self = this;
    var pics = [];
    var picChecks = [];
    if (isClear) {
        self.clearPics();
    }
    var queueObj = { timer: null, over: false, pics: [] }
    self.queues.push(queueObj);

    picUrls.forEach(function(url) {
        var image = document.createElement('img');
        image.style.padding = self.gap / 2 + 'px';
        image.src = url;
        pics.push(image);
        picChecks.push(image);
    })

    // 定时执行获取宽高
    function check() {
        if (!picChecks.length) {

            queueObj.over = true;
            queueObj.pics = pics;

            self.excuteQueue();

            return;
        } else {
            picChecks.forEach(function(img, index) {
                if (img.width > 0 || img.height > 0) { // 只要任何一方大于0,表示已经服务器已经返回宽高
                    picChecks.splice(index, 1);
                }
            })
            queueObj.timer = setTimeout(check, 40);
        }
    }
    check();
};
PicList.prototype.excuteQueue = function() {
    var self = this;
    var next = false;
    self.queues.forEach(function(queueObj, index) {
        if (index == 0 && queueObj.over) {
            self.readys(queueObj.pics);
            self.readysResize(self.pics); // 防止撑出滚动条，需重新监测
            next = true;
        } else {
            return;
        }
    })
    if (next) {
        self.queues.shift();
        self.excuteQueue()
    }
}

PicList.prototype.getCoWidth = function(obj) {
    return parseInt(getComputedStyle(obj, null)['width']);
}
PicList.prototype.clearPics = function() {
    var self = this;
    self.box.innerHTML = '';
    self.pics = [];
    self.lefts = [];
    self.queues.forEach(function(queueObj) {
        clearTimeout(queueObj.timer)
    })
    self.queues = [];
}

PicList.prototype.destory = function() {
    var self = this;
    self.pics = [];
    self.lefts = [];
    self.queues.forEach(function(queueObj) {
        clearTimeout(queueObj.timer)
    })
    self.queues = [];

    self.addPics = null;
}

PicList.prototype.readys = function(pics) {
    var self = this;
    var standHeight = self.standHeight;
    var boxWidth = self.getCoWidth(self.box); //内容宽
    pics.forEach(function(pic) {
        self.pics.push(pic); //将该组的pics 插入实例的pics 中。
        var width = pic.naturalWidth / pic.naturalHeight * standHeight;
        pic.width = width;
    })


    for (var i = 0, length = self.lefts.length; i < length; i++) { // 添加上次残留
        pics.unshift(self.lefts[length - i - 1]);
    }

    var temp = [];
    var totalWidh = 0;

    pics.forEach(function(pic) {
        totalWidh += (pic.width + self.gap);
        if (totalWidh > boxWidth) {
            var rate = (totalWidh - pic.width - self.gap) / boxWidth;

            temp.forEach(function(item) {
                item.width = ((item.width + self.gap) / rate) - self.gap;
            })
            temp = [pic];
            totalWidh = pic.width + self.gap;
            return;
        } else {
            temp.push(pic);
        }
    })

    self.lefts.forEach(function(pic) { //移除尾部上次的残留
        self.box.removeChild(pic);
    })

    self.lefts = [];
    temp.forEach(function(pic) { //更新本次残留
        self.lefts.push(pic)
    })

    pics.forEach(function(pic) {
        self.box.appendChild(pic)
    })
}

PicList.prototype.readysResize = function() {
    var self = this;
    var width = self.getCoWidth(self.box);
    if (width !== self.boxWidth) {
        self.boxWidth = width;
        var pics = self.pics;
        var standHeight = self.standHeight;
        var boxWidth = self.boxWidth; //内容宽

        pics.forEach(function(pic) {
            var width = pic.naturalWidth / pic.naturalHeight * standHeight;
            pic.width = width;
        })
        var temp = [];
        var totalWidh = 0;
        pics.forEach(function(pic) {
            totalWidh += (pic.width + self.gap);
            if (totalWidh > boxWidth) {

                var rate = (totalWidh - pic.width - self.gap) / boxWidth;
                temp.forEach(function(item) {
                    item.width = ((item.width + self.gap) / rate) - self.gap;
                })
                temp = [pic];
                totalWidh = pic.width + self.gap;
                return;
            } else {
                temp.push(pic);
            }
        })
        self.lefts = [];
        temp.forEach(function(pic) { //更新本次残留
            self.lefts.push(pic)
        })

    }

}
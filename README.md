# yunFlow 图片等高瀑布流，图片横向瀑布流。


	1.支持多批图片同时插入,以及插入后的回调。

	2.支持浏览器缩放动态计算。

	3.图片地址错误的处理。对超小，超长，超宽图完美显示。

	4.现代浏览器 及 >=ie8。

项目展示页面 https://yuncode.github.io/yunFlow/
### 【0】安装引入
node 安装并引入 
安装：`npm install yunFlow --save`  
引入：`import PicList from 'yunFlow'`  

或者 
浏览器直接js引入：
`<script type="text/javascript" src="sameHeightPic.js"></script> //请确保 src路径写对` 


### 【1】创建实例 
`var picsObj = new PicList(box,config) `  
    
* 	box 为图片盒子，   
*	config 为{standHeight,gap,isShowFail}   默认为{150,10，false}
* 	standHeight 为设置基准高度。     
* 	gap为图片间间隙。    
*	isShowFail是否显示 加载失败的图片



### 【2】添加图片；
`picsObj.addPics(picUrls,true).after(function(wraps){     
	// wraps 为图片的父级div数组     
})`      
     
*	picUrls 为图片地址数组。
*	true表示清空后插入，false（默认）为在box里追加。        
*	after可选，为插入图片后的回调。     


	
### 【3】清空图片
  `picsObj.clearPics()`

### 【4】销毁, box 未清空
`picsObj.destory()`

### 【5】刷新。box尺寸变动时，布局会混乱，需手动调用，重新计算图片布局
 `picsObj.resize()`

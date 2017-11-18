# yunFlow
图片等高瀑布流，图片横向瀑布流。 ie8 不支持。

1.支持多批图片同时插入,以及插入后的回调。

2.支持浏览器缩放动态计算。



项目展示页面 https://yuncode.github.io/yunFlow/

### 【1】创建实例 
`var picsObj = new PicList(box,standHeight,gap) `  
box 为图片盒子，standHeight 为设置基准高度。gap为图片间间隙。



### 【2】添加图片；
`picsObj.addPics(picUrls,true).after(function(wraps){
	// wraps 为图片的父级div数组 
})`  
picUrls 为图片地址数组,  true表示清空后插入，false（默认）为在box里追加。 after可选，为插入图片后的回调。 


	
### 【3】清空图片
  `picsObj.clearPics()`

# yunFlow
图片等高瀑布流，图片横向瀑布流。 ie8 不支持。


【1】创建实例 
box 为图片盒子，standHeight 为设置基准高度。gap为图片间间隙。

  var picsObj = new PicList(box,standHeight,gap) 


【2】添加图片
picUrls 为图片地址数组,  true表示清空后插入，false（默认）为在box里追加。

  picsObj.addPics(picUrls,true)
	
【3】清空图片

  picsObj.clearPics()

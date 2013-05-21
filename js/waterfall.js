 
function waterfall_add(items){
for (var i = 0; i < 10; ++ i) {  
    var div = document.createElement('div');  
    div.setAttribute("id","div_"+items[i].share_id);  
    div.setAttribute("style", "position:absolute");  
    $("#waterfall").appendChild(div);  
}  
  
for (var i = 0; i < 10; ++ i) {  
    var img = document.createElement('img');  
    img.setAttribute('src', items[i].picurl);  
	div.setAttribute("id","img_"+items[i].share_id); 
    document.getElementById("div_"+items[i].share_id).appendChild(img);  
} 
}

function waterfall_display(items) {  
    var col = 0;  
    var row = document.body.clientWidth - 50;  
    var H = 250;  
    var h = 0;  
    var w = 300;  
    var jg = 20;  
   
    for (var i = 0; i < items.length; ++ i) {  
        var flag = i;  
		 var img = document.getElementsById("img_"+items[i].share_id);  
        h = row / img.width * img.height;  
        while (h > H && i < items.length - 1) {  
            ++ i;  
			var img = document.getElementsById("img_"+items[i].share_id); 
            h = row / (row / h + (img.width() + jg) / img.height());  
        }  
        w = 0;  
        for (var j = flag; j <= i; ++ j) { 
		var img = document.getElementsById("img_"+items[j].share_id);
            img.parentNode.style.top = (col + jg).toString() + "px";  
            img.parentNode.style.left = (w + jg).toString() + "px";  
            img.style.height = h.toString() + "px";  
            w = w + h / img.height * img.width + jg;  
        }  
        col += h + jg;  
    }  
    /*  
       var imgs = document.getElementsByTagName("img");  
       for (var i = 0; i < imgs.length; ++ i) {  
       if (row + imgs[i].width > document.body.clientWidth + 100) {  
       ++ col;  
       row = 0;  
       }  
       imgs[i].parentNode.style.top = (col * 250).toString() + "px";  
       imgs[i].parentNode.style.left = row.toString() + "px";  
       row += imgs[i].width + 10;  
       }  
     */  
}  
 
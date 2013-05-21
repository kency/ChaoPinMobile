var _apiBaseUrl="http://chaopinapi.sinaapp.com/";
var _siteName="潮品会";
var _indexController="index";
var _indexAction="";


function main(){
	$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "精彩马上呈现";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "e";
  $.mobile.loader.prototype.options.html = "";
  $.mobile.defaultPageTransition="slide";
});
	loadStart();
	//动作检测 m.chaopin.cc/?c=share&m=view&id=5 html里page的 id与这个对应  #shareview
	var controller=getQueryString('c');
var action=getQueryString('m');
if (controller=="" | controller==null){controller=_indexController;action=_indexAction;}
	if (route(controller,action)){
		
		
		 loadData(controller,action);
		}else{
			loadViewErr();
			}
	
return ;
	}
	
function route(controller,action){
	/*var command=array({
		"share":{
							 "view":["id"],
							 "like":["id"]
					},
		"discovery":{
								 "index":"",
								 "category":["id","name"]
		}
				  });
	
	*/



if(controller=="index"){
	return true;
	}else if(controller=="share"){
		if(action=="view"){
		return true;
		}else{
			return false;
			}
	}else{
		return false;
		}
return false;
	}
	
	//all function of data load
function loadData(controller,action,Extra){
	loadDataStart();
	var f=controller+action;
	eval("loadData_"+f+"(f,Extra)");
	
	}
	

function loadData_index(v){
				$.getJSON(_apiBaseUrl+"discovery/index?jsoncallback=?", function(data){
																		window.location.href='#'+v;
																		 eval("loadView_"+v+"(data)");
																		 
																		 loadDataFinish();
																		   });
				
		return;
		}
function loadView(v){//暂 无调用
	loadViewStart();
eval(v+"()");
}//end function
//loading...



//all views function
function loadView_index(data){
	loadViewFinish();
	var items=data.item;
	waterfall_add(items);
	
	}
	function loadData_shareview(v,id){
		if (id==null | id==""){
		var shareId=getQueryString('id');
		}else{var shareId=id;}
				if (shareId!=null && shareId!=""){$.getJSON(_apiBaseUrl+"share/view/"+shareId+"?jsoncallback=?", function(data){
																		window.location.href='#'+v;
																		 eval("loadView_"+v+"(data)");
																		 loadDataFinish();
																		   });
				}else{
					
					loadViewErr();
					return false;
					}
		return;
		}

function loadView_shareview(data){

													$("title").html(_siteName+' '+data.itemintro);
													$("#itempic").html("");
													$("#itempic").html('<img src="'+data.itempic+'" />');
													// $("<img>").prop({src:data.itempic}).appendTo("#itempic");
														//	$("#itempic").prop({src:data.itempic});
															 $("#otherPics").html("");
															if (data.itempics.length>1){
															$.each(data.itempics, function(i,pic){
																							  
																								  $("<div>").html('<img src="'+pic.picurl+'" />').appendTo("#otherPics");
																								   });
															}
															$("#itemintro").html(data.itemintro);
															if(data.itemprice>0){
																$("#buyinfo").click(function( event ) {window.location.href=data.itembuyurl;});
															$("#buyinfo").html('￥'+data.itemprice+' 查看商品详情');
															}else{
																$("#buyButton").remove();
															}
															
															$("#posteravatar").prop({src:data.posteravatar});
															$("#postername").html(data.postername+'<br />');
																$("#pushProfile").click(function( event ) {window.location.href=data.itembuyurl;});
															$("#albumtitle").html(data.albumtitle+'<br />');
																$("#pushAlbum").click(function( event ) {window.location.href=data.itembuyurl;});
															//评论
															$("#commentsTotal").html("");
															$("#commentslist").html("");
															$("#commentsTotal").html(data.create_time);
															// $(data.create_time).appendTo("#commentsTotal");
															if(data.total_comments>0){
																//$("#commentsTotal").html(data.create_time+" 共"+data.total_comments+"条评论");
																//$(" 共"+data.total_comments+"条评论").appendTo("#commentsTotal");
																 loadData_shareviewcomment(data.item_id);
																}else{
																	//$("#commentsTotal").html(data.create_time);
																	//$(" 还没有评论，马上抢沙发:").appendTo("#commentsTotal");
																	}//评论结束
																	 $("#shareview_albumname").html("所属专辑："+data.albumtitle);
																	 $("#shareview_albumpics").html("");
																	 $("#shareview_maybelikes").html("");
															var i=0;
															$.each(data.otheritems, function(i,pic){
																							  i++
																								  $("<div>").html('<img src="'+pic.picurl+'" />').appendTo("#shareview_albumpics");
																								  if( i==5){return;}
																								   });
															i=0;
															$.each(data.maybelike, function(i,pic){
																							  
																								  $("<div>").html('<img src="'+pic.picurl+'"  onclick=" loadData(\'share\',\'view\',\''+pic.share_id+'\')"/>').appendTo("#shareview_maybelikes");
																								  if(i==5){return;}
																								   });
																
loadViewFinish();
																
}
//
function loadData_shareviewcomment(shareId){
		
				if (shareId!=null && shareId!=""){$.getJSON(_apiBaseUrl+"share/viewcomment/"+shareId+"?jsoncallback=?", function(data){
																	
																		 loadView_shareviewcomment(data);
																		 
																		 loadDataFinish();
																		   });
				}else{
					
					loadViewErr();
					return false;
					}
		return;
		}
function  loadView_shareviewcomment(data){

																var CurrentN=0;
																
																$.each(data.itemcomments, function(i,comment){
																								   CurrentN++;
																	$("<li>").html('<a href="?c=profile&m=index&id='+comment.commentposterid+'">'+comment.commentpostername+'</a>: '+comment.commentcontent).appendTo("#commentslist");
																	if ( i == 4 &&CurrentN<data.total_comments){
																		$("<li>").html('加载更多').appendTo("#commentslist");
																		return false;
																		}
																	});
}


//state viewloading function
function loadStart(){$('<div id="loadingMask" style="background-color:#999;top:0;left:0;width:100%;height:100%;position:fixed;z-index:990;display:block;"></div>').appendTo("body");}
function loadFinish(){$('#loadingMask').remove();}
function loadViewStart(){
	
	}
function loadViewFinish(){$.mobile.loading('hide'); loadFinish();}
function loadViewErr(errString){if(!errString){errString="请求错误";}$.mobile.loading( 'show', {text: errString,textVisible: true,theme: "a",textonly:true,html:''});
}
//state dataloading function
function loadDataStart(){
	
	$.mobile.loading( 'show', {text: "精彩马上呈现",textVisible: true,theme: "e",textonly: false,});
	}
function loadDataFinish(){}
function loadDataErr(){}

//public function
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
    }
	

//
function waterfall_add(items){
	var imgwidth=document.width/2-16;
	//var imgwidth=250;
/*	var ids=new Array();
for (var i = 0; i < 10; ++ i) {  
    var div = document.createElement('div');  
    div.setAttribute("id","item_"+items[i].share_id);  
    div.setAttribute("style", "width:"+imgwidth+"px");  
	$(div).appendTo("#waterfall");
	//ids[i]=items[i].share_id;
	
}  */

for (var i = 0; i < 10; ++ i) {
	$('<div style="width:'+imgwidth+'px"><img src="'+ items[i].picurl+'" id="itemimg_'+items[i].share_id+'" onclick= loadData("share","view",'+items[i].share_id+')></div>').appendTo("#waterfall");
/*    var img = document.createElement('img');  
    img.setAttribute('src', items[i].picurl);  
	img.setAttribute("id","itemimg_"+items[i].share_id); 
    $(img).appendTo("#item_"+items[i].share_id);
	var id=items[i].share_id;*/
//	$("#itemimg_"+items[i].share_id).click(loadData('share','view',items[i].share_id));
	
} 
}

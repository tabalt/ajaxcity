// +----------------------------------------------------------------------
// | AjaxCity [ ajaxcity.jquery.js ]
// +----------------------------------------------------------------------
// | Copyright (c) 2012 http://www.actphp.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author : Gnipt <t@php.cn> <245291359@qq.com>
// +----------------------------------------------------------------------
// | Version : 1.1 
// +----------------------------------------------------------------------
// | Update : 2012-04-19 
// +----------------------------------------------------------------------
$.fn.ajax_city_select = function (city_config){
	//------------------基本函数----------------
	function _is_string(str){
		if(typeof(str) == 'string')
			return true;
		else
			return false;
	}
	//------------------设置option----------------
	function _ajax_set_option(url,select_id,default_select,is_hidden){
		//alert(url);
		$.ajax({
			type:'get',
			url:url,
			success:function(result){		
				if(result){			
					if(!is_hidden){
						$('#'+select_id).show();
					}else{
						$('#'+select_id).attr('disabled','disabled');
					}
					var jsondata = eval('('+result+')');
					if(_is_string(default_select)){
						for(var i= 0; i< jsondata.length; i++){
							if(default_select == jsondata[i].id){						
								$('#'+select_id)[0].options.add(new Option(jsondata[i].name, jsondata[i].id,true,true));	
							}else{
								$('#'+select_id)[0].options.add(new Option(jsondata[i].name, jsondata[i].id));
							}
						}
					}else{
						for(var i= 0; i< jsondata.length; i++){
							$('#'+select_id)[0].options.add(new Option(jsondata[i].name, jsondata[i].id));					
						}
					}
				}
			}
		});
	}
	
	var render = $(this);
	//省份
	if(_is_string(city_config.province)){
		var new_province = $("<select name='"+city_config.province+"' id='"+city_config.province+"' style='display:none;'   >");  
		$(new_province)[0].options.add(new Option("-请选择省份-", "0"));
		render.append(new_province);
		
		//创建城市
		if(_is_string(city_config.city) ){
			var new_city = $("<select name='"+city_config.city+"' id='"+city_config.city+"' style='display:none;' >");					
			render.append(new_city);
		}
		//创建区域 
		if(_is_string(city_config.area)){					
			var new_area = $("<select name='"+city_config.area+"' id='"+city_config.area+"' style='display:none;' >"); //TODO					
			render.append(new_area);
		}
		//列出省份
		if(_is_string(city_config.default_province) ){
			//设置了隐藏 省份
			if(city_config.hidden_province)
				_ajax_set_option(provinceurl,city_config.province,city_config.default_province,true);
			else{
				_ajax_set_option(provinceurl,city_config.province,city_config.default_province);
			}
			//如果启用了城市，则显示城市
			if( _is_string(city_config.city) ){
				if(_is_string(city_config.default_city)){
					//设置了 隐藏 城市
					if(city_config.hidden_city)
						_ajax_set_option(cityurl+city_config.default_province,city_config.city,city_config.default_city,true);
					else
						_ajax_set_option(cityurl+city_config.default_province,city_config.city,city_config.default_city);
					
					//如果启用了区域， 则显示区域
					if( _is_string(city_config.area) ){
						if(_is_string(city_config.default_area)){
							_ajax_set_option(areaurl+city_config.default_province+'&cid='+city_config.default_city,city_config.area,city_config.default_area);
						}else{
							_ajax_set_option(areaurl+city_config.default_province+'&cid='+city_config.default_city,city_config.area);
						}
					}
				}else{
					_ajax_set_option(cityurl+city_config.default_province,city_config.city);
				}					
			}
			
		}else{
			_ajax_set_option(provinceurl,city_config.province);
		}			
	}	
			
		//注册事件 切换省份时 取得 城市
	if(_is_string(city_config.city) ){			
		$('#'+city_config.province).change(function(){
			if($(this).val() != 0){
				$('#'+city_config.city).empty();//清空city select
				$(new_city)[0].options.add(new Option("-请选择城市-", "0"));
				_ajax_set_option(cityurl+$(this).val(),city_config.city);					
				
				//如果有 区域，区域更新 
				if(_is_string(city_config.area)){
					if($('#'+city_config.city).val() != 0){
						$('#'+city_config.area).empty();//清空city select
						$(new_area)[0].options.add(new Option("-请选择区域-", "0"));
						_ajax_set_option(areaurl+$('#'+city_config.province).val()+'&cid='+$('#'+city_config.city).val(),city_config.area);
					}else{
						$('#'+city_config.area).empty();//清空city select
						$(new_area)[0].options.add(new Option("-请选择区域-", "0"));
					}
				}					
			}
		});
	}
	//注册事件 切换城市时 取得 区域
	if(_is_string(city_config.area)){			
		$('#'+city_config.city).change(function(){
			if($(this).val() != 0){
				$('#'+city_config.area).empty();//清空city select
				$(new_area)[0].options.add(new Option("-请选择区域-", "0"));
				_ajax_set_option(areaurl+$('#'+city_config.province).val()+'&cid='+$(this).val(),city_config.area);
			}
		});
	}				
	
}

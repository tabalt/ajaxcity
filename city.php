<?php
// +----------------------------------------------------------------------
// | AjaxCity [ city.php ]
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
	
	$a = isset($_GET['a'])?$_GET['a']:'';
	if(in_array($a,array('province','city','area'))){
		$method = 'get_'.$a;
		$method();
	}
	function echo_json($array){
		header('Content-type:text/html;charset=utf-8');
		//print_r($array);
		echo json_encode($array);	
	}
	
	function get_province(){
		$datafile = 'config/province.inc.php';
		if(file_exists($datafile)){
			$config = include($datafile);
			$provinces = array();
			foreach($config as $k=>$v){
				$province['id'] = $k;
				$province['name'] = $v;
				$provinces[] = $province;
			}		
			echo_json($provinces);	
		}			
	}
	
	function get_city(){
		$datafile = 'config/city.inc.php';
		if(file_exists($datafile)){
			$config = include($datafile);
			$province_id = isset($_GET['pid'])?trim($_GET['pid']):'';
			if($province_id != ''){
				$citylist = array();
				if(is_array($config[$province_id]) && !empty($config[$province_id])){
					$citys = $config[$province_id];
					foreach($citys as $k => $v){
						$city['id'] = $k;
						$city['name'] = $v;
						$citylist[] = $city;
					}				
				}
				echo_json($citylist);			
			}
		}		
	}
	function get_area(){
		$datafile = 'config/area.inc.php';
		if(file_exists($datafile)){
			$config = include($datafile);
			$province_id = isset($_GET['pid'])?trim($_GET['pid']):'';
			$city_id = isset($_GET['cid'])?trim($_GET['cid']):'';
			if($province_id != '' && $city_id != ''){
				$arealist = array();				
				if(isset($config[$province_id][$city_id]) && is_array($config[$province_id][$city_id]) && !empty($config[$province_id][$city_id])){
					$areas = $config[$province_id][$city_id];
					foreach($areas as $k => $v){
						$area['id'] = $k;
						$area['name'] = $v;
						$arealist[] = $area;
					}				
				}
				echo_json($arealist);			
			}
		}		
	}
?>
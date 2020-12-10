<?php
/**
 * 上传附件和上传视频
 * User: Jinqn
 * Date: 14-04-09
 * Time: 上午10:17
 */
include "Uploader.class.php";

/* 上传配置 */
$base64 = "upload";
switch (htmlspecialchars($_GET['action'])) {
    case 'uploadimage':
        $config = array(
            "pathFormat" => $CONFIG['imagePathFormat'],
            "maxSize" => $CONFIG['imageMaxSize'],
            "allowFiles" => $CONFIG['imageAllowFiles']
        );
        $fieldName = $CONFIG['imageFieldName'];
        break;
    case 'uploadscrawl':
        $config = array(
            "pathFormat" => $CONFIG['scrawlPathFormat'],
            "maxSize" => $CONFIG['scrawlMaxSize'],
            "allowFiles" => $CONFIG['scrawlAllowFiles'],
            "oriName" => "scrawl.png"
        );
        $fieldName = $CONFIG['scrawlFieldName'];
        $base64 = "base64";
        break;
    case 'uploadvideo':
        $config = array(
            "pathFormat" => $CONFIG['videoPathFormat'],
            "maxSize" => $CONFIG['videoMaxSize'],
            "allowFiles" => $CONFIG['videoAllowFiles']
        );
        $fieldName = $CONFIG['videoFieldName'];
        break;
    case 'uploadfile':
    default:
        $config = array(
            "pathFormat" => $CONFIG['filePathFormat'],
            "maxSize" => $CONFIG['fileMaxSize'],
            "allowFiles" => $CONFIG['fileAllowFiles']
        );
        $fieldName = $CONFIG['fileFieldName'];
        break;
}

/* 生成上传实例对象并完成上传 */
$up = new Uploader($fieldName, $config, $base64);
/**
 * 得到上传文件所对应的各个参数,数组结构
 * array(
 *     "state" => "",          //上传状态，上传成功时必须返回"SUCCESS"
 *     "url" => "",            //返回的地址
 *     "title" => "",          //新文件名
 *     "original" => "",       //原始文件名
 *     "type" => ""            //文件类型
 *     "size" => "",           //文件大小
 * )
 */

/* 返回数据 */
$array=include_once('../../../../Common/config.php');
$file_info=$up->getFileInfo();

////////////////////////////////////////////////////////////////////////////////////
#修改了以下代码，把文件上传到文件服务器 author by linzi
$filePath='../../../'.$file_info['url'];
if(!file_exists($filePath)){
	exit();
}

#文件上传路径
session_start();
#需要提交的数据
$file['file_path']=str_replace($array['TEMP_PATH'],'',$file_info['url']);
$file['timestamp']=time();
$file['randstr']=time();
$file['storage']=1;
$file['file_content'] = base64_encode((fread(fopen($filePath, "r"), filesize ($filePath))));
$file['sign']=make_sign($file,$array);
unlink($filePath);#删除本地文件
$result=http_upload($file,$array);
if(!check_sign($result,$array)){
	$myfile = fopen("error.txt", "w") or die("Unable to open file!");
	fwrite($myfile, '本地验签错误');
	fclose($myfile);
	exit();	
}
if($result && $result['errcode']==0){	
	$file_info['title']='T-Linx';
	$file_info['original']='T-Linx';
	$file_info['url']=$array['F_SERVER'].$result['path'];
	return json_encode($file_info);
}else{
	$myfile = fopen("error.txt", "w") or die("Unable to open file!");
	fwrite($myfile, $result['msg']);
	fclose($myfile);
	exit();			
}

#签名过程
function make_sign($data,$array){
		$data['key']=$array['SIGN_KEY'];#签名密钥
		ksort($data);
		$arr_temp = array ();
		foreach ($data as $key => $val) {
			$arr_temp[]=$key.'='.$val;
		}
		$sign_str = implode('&', $arr_temp);
		$sign_str = md5(sha1($sign_str));
		return $sign_str;
	}	
	
//验签过程
function check_sign($data,$array){
		#时间戳校验
		$timestamp_diff	=intval(time()-$data['timestamp']);
		if($timestamp_diff>300 || $timestamp_diff<-300){
			return false;
			exit();
		}
		$sign=$data['sign'];#得到返回签名字符串
		unset($data['sign']);#去掉sign节点
		$data['key']=$array['SIGN_KEY'];#签名密钥
		ksort($data);#排序
		$arr_temp = array ();
		foreach ($data as $key => $val) {
			$arr_temp[]=$key.'='.$val;
		}
		$sign_str = implode('&', $arr_temp);
		$sign_str = md5(sha1($sign_str));
		if($sign!=$sign_str){
			return false;	
		}else{
			return true;	
		}
	}
	
#内部文件上传
function http_upload($data,$array){
	$url =$array['UP_SERVER'];
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_POST, 1); #是否开启post
	curl_setopt($curl, CURLOPT_POSTFIELDS, $data); #post数据
	#忽略证书
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_HEADER,0);#是否需要头部信息（否）
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);#如果成功只将结果返回，不自动输出任何内容。
	curl_setopt($curl, CURLOPT_TIMEOUT,30);#设置允许执行的最长秒数。
	curl_setopt($curl, CURLOPT_CONNECTTIMEOUT ,3);#在发起连接前等待的时间，如果设置为0，则无限等待。
	$result = curl_exec($curl);
	if($result){
		curl_close($curl);
		#将返回json转换为数组
		$arr_result=json_decode($result,true);
		if(!is_array($arr_result)){
			return false;
		}
		return $arr_result;
	}else{
		$err_str=curl_error($curl);
		curl_close($curl);	
		return false;
	}
}



<?php

header("Content-type:application/json;charset=utf-8");//在php文件中使用utf-8
$con = mysql_connect("localhost","root","");//连接到数据库

if(!$con){
  die('Could not connect:'.mysql_error());
}else{
	mysql_select_db("phplesson",$con);
	mysql_query("SET NAMES UTF8");
	//接受index.html传来的newstag
	$newstag = $_REQUEST['newstag'];

	//执行select语句，并把返回结果存入$arr
	$sql = "select * from `news` where newstag='".$newstag."' ";
	$result = mysql_query($sql,$con);
	$arr = array();
	while($row = mysql_fetch_array($result)){
	array_push($arr,array("newstitle"=>$row['newstitle'],"newsimg"=>$row['newsimg'],"newscontent"=>$row['newscontent'],"addtime"=>$row['addtime']));
};

//echo json格式的$arr
$result = array("errcode"=>0,"result"=>$arr);
echo json_encode($arr ,JSON_UNESCAPED_UNICODE);
};

//断开数据库连接
mysql_close($con)
?>

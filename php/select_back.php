<?php

header("Content-type:application/json;charset=utf-8");
$con = mysql_connect("localhost","root","");

if(!$con){
die('Could not connect:'.mysql_error());
}else{
mysql_select_db("phplesson",$con);
mysql_query("SET NAMES UTF8");




//执行select语句，并把返回结果存入$arr
$sql = "select * from `news` where 1 ";
$result = mysql_query($sql,$con);
$arr = array();
while($row = mysql_fetch_array($result)){
array_push($arr,array("newsid"=>$row['newsid'],"newstitle"=>$row['newstitle'],"newsimg"=>$row['newsimg'],"newscontent"=>$row['newscontent'],"addtime"=>$row['addtime'],"newstag"=>$row['newstag']));
};


//echo json格式的$arr
$result = array("errcode"=>0,"result"=>$arr);
echo json_encode($arr ,JSON_UNESCAPED_UNICODE);
};

//断开数据库连接
mysql_close($con)
?>

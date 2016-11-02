<?php
//头文件
header("Content-type:application/json;charset=utf-8");
//连接数据库
$con = mysql_connect("localhost","root","");
if(!$con){
//如果没连接成功，报错
die('Could not connect:'.mysql_error());
}else{
//如果连接成功了，选择phplesson、选择utf-8字符集
mysql_select_db("phplesson",$con);
mysql_query("SET NAMES UTF8");

//接受back.html传来的newsid转化为中文
$newsid = $_REQUEST['newsid'];

//对phplesson下的news，执行delete语句
$sql = "DELETE FROM `news` WHERE `newsid`='".$newsid."' ";
mysql_query($sql);
};

//断开数据库连接
mysql_close($con)
?>

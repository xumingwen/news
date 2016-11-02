<?php
header("Content-type:application/json;charset=uft-8");//在php文件中使用utf-8
$con = mysql_connect("localhost","root","");//连接到

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{

  	mysql_select_db("phplesson",$con);

    //用htmlspecialchars来转义危险代码
    $newstitle = htmlspecialchars($_REQUEST['newstitle']);
    $newsimg = htmlspecialchars($_REQUEST['newsimg']);
    $newscontent = htmlspecialchars($_REQUEST['newscontent']);
    $addtime = htmlspecialchars($_REQUEST['addtime']);
    $newstag = htmlspecialchars($_REQUEST['newstag']);
    



    $sql="INSERT INTO `news`(`newstitle`,`newsimg`,`newscontent`,`addtime`,`newstag`)VALUES('".$newstitle."','".$newsimg."','".$newscontent."','".$addtime."','".$newstag."')";
    mysql_query("SET NAMES UTF8");//在MySQL中使用utf-8
  	
    $result = mysql_query($sql);
  	if(!$result){
  		die('Error:'.mysql_error());
  	}else{
  		echo "success";
  	}
  };

mysql_close($con);
?>



<?php

header("Content-type:application/json;charset=utf-8");//在php文件中使用utf-8
$con = mysql_connect("localhost","root","");//连接到数据库

if(!$con){
  die('Could not connect: ' . mysql_error());
}else{
  	mysql_select_db("phplesson",$con);
    $newstitle = $_REQUEST['newstitle'];
    $newsimg = $_REQUEST['newsimg'];
    $newscontent = $_REQUEST['newscontent'];
    $addtime = $_REQUEST['addtime'];
    $newstag = $_REQUEST['newstag'];
    $newsid = $_REQUEST['newsid'];

    //INSERT INTO `news`(`newsid`, `newstitle`, `newsimg`, `newscontent`, `addtime`, `newstag`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6])
    // $sql="INSERT INTO `news`(`newstitle`,`newsimg`,`newscontent`,`addtime`,`newstag`)VALUES('".$newstitle."','".$newsimg."','".$newscontent."','".$addtime."','".$newstag."')";
    
    //上面是insert语法，下面是update的语法，自己对比着改一下~~~~
    //UPDATE `news` SET `newsid`=[value-1],`newstitle`=[value-2],`newsimg`=[value-3],`newscontent`=[value-4],`addtime`=[value-5],`newstag`=[value-6] WHERE 1
    $sql="UPDATE `news` SET `newstitle`='".$newstitle."',`newsimg`='".$newsimg."',`newscontent`='".$newscontent."',`addtime`='".$addtime."',`newstag`='".$newstag."' WHERE `newsid`='".$newsid."' ";

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
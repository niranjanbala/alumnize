<?php
session_start();
error_reporting(0);
require 'fb/facebook.php';
$con=mysql_connect("internal-db.s102820.gridserver.com","db102820_goost","shortme123");
mysql_select_db("db102820_apps",$con) or die(mysql_error);

$facebook = new Facebook(array(
  'appId'  => '404356396268041',
  'secret' => 'f9a0c25bbb652dbda55743406e0625f1',
));

// See if there is a user from a cookie
$user = $facebook->api('/me');
$fbid=$user['id'];
$name=$user['name'];
$data=mysql_real_escape_string(json_encode($user));
$sql=mysql_query("select * from invite where fbid='$fbid'");
//echo mysql_num_rows($sql);
if(mysql_num_rows($sql)==0)
{
	$insert=mysql_query("insert into invite (fbid,name,data) values ('$fbid','$name','$data') ") or die(mysql_error());	
	$permissions = $facebook->api("/me/permissions");
	if( array_key_exists('publish_stream', $permissions['data'][0]) ) 
	{
		// Permission is granted!
	$facebook->api('/me/feed/','POST',array('link' => 'http://alumnize.com','description' => "Alumnize is a platform which lets you explore your fellow alumni beyond your existing social and professional networks and reach out to them.",'message' => $name.' Signed Up For an Invite on Alumnize.'));
	} 
	
	
	
}
//echo mysql_error($insert);
$_SESSION['updated']=true;
header("location:index.php");
?>
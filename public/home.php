<?php

	session_start();
	error_reporting(0);
	require 'fb/facebook.php';
	
	$facebook = new Facebook(array(
		'appId'  => '514256625329292',
		'secret' => 'a5ed124040736814f413ceaf753170a8'
	));
	
	// See if there is a user from a cookie
	$user = $facebook->getUser();
	if ($user) {
		try {
			// Proceed knowing you have a logged in user who's authenticated.
			$user_profile = $facebook->api('/me');
		} catch (FacebookApiException $e) {
			echo '<pre>'.htmlspecialchars(print_r($e, true)).'</pre>';
			$user = null;
		}
	}
	
	if ($user) {
		if($_SESSION['updated']==false) {
			header("location:update.php");
		}
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	<link rel="shortcut icon" href="../../assets/ico/favicon.png">
    	<meta name="user-id" content="0" />
		<!--OpenGraph Meta-->
		<meta property="og:image" content="http://www.alumnize.com/public/images/logo-blue.png"/>
		<meta property="og:type" content="website" />
    	<title>Alumnize - Start Alumnizing!!!</title>
		<!-- Bootstrap core CSS -->
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	    <!-- Custom styles for this template-->
	    <link href="css/navbar.css" rel="stylesheet">
	    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	    <!--[if lt IE 9]>
	      <script src="../../assets/js/html5shiv.js"></script>
	      <script src="../../assets/js/respond.min.js"></script>
	    <![endif]-->
  </head>

  <body>
    <div class="container">
      <!-- Static navbar -->
      <div id="wrapper" class="navbar navbar-fixed-top navbar-inverse">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"></a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="#">AboutUs</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
          	<li ><a href="#">Sign In</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
      <!-- Main component for a primary marketing message or call to action -->
      <div class="jumbotron landingPage">
      	<div class="row">
      	<div class="home-title">Leverage the power of alumni networks for your career goals!</div>
		<img src="http://www.alumnize.com/public/images/home-faces.png">
		<div class="home-sub-title">New to alumnize? Join Now!</div>
		
		</div>
      </div>

    </div> <!-- /container -->
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="jquery/js/jquery-2.0.3.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>
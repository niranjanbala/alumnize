<?php
session_start();
error_reporting(0);
require 'fb/facebook.php';

$facebook = new Facebook(array(
  'appId'  => '404356396268041',
  'secret' => 'f9a0c25bbb652dbda55743406e0625f1',
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

if ($user) 
{ 
	if($_SESSION['updated']==false)
	{
		header("location:update.php");		
	}
}


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="shortcut icon" href="images/favicon.ico" />
<title>Alumnize - Start Alumnizing!!!</title>
<link rel="stylesheet" type="text/css" media="screen" href="base.css" />
</head>
<body>
<div id="container">     
  	<div id="content-holder" class="clearfix">
    	<div id="left">
        	<img src="images/logo.png" class="logo" />
			<div class="definition">
            al·um·nize  (al-um-nhyz)
            <div class="sub">
<strong style="font-size:13px;">v.</strong> al·um·nized, al·um·niz·ing, al·um·niz·es<br />
-mix, mingle and network with alumni;
</div>
            </div>
        </div>
        <div id="right">
        
        	<h1>Start Alumnizing!!!</h1>
            <p>
            Does your current alumni networks provide you with  a comprehensive platform to connect with your alumni? 
            </p>
            <p>
            Are you connected with your alumni who are not in your current social and professional networks but yet can help you land your dream job?
            </p>
            <p>
            Whether you are looking for a job, looking to recruit or looking for ways to enhance professional and personal development, Alumnize offers a platform to network with your alumni to achieve your goals
            </p>
            <p>
	            Leverage the Power of Alumni network !! Start Aluminizing
            </p>
            <?php if($user){?>
                <div class="after-connect">
                        <p class="tick">
                           Thank you for signing up!
                        </p>
                        <a href="#" class="invite">Invite your friends to Alumnize</a>
                </div>
			<?php }else{?>
			<div class="before-connect">
                <p>
                   Sign Up today for a Free Invite!
                </p>
                <a href="<?php echo $facebook->getLoginUrl(array('scope'=>'email,publish_stream,user_about_me,user_education_history,user_location,user_work_history'));?>" class="connect"><img src="images/connect-facebook.png" align="Connect with facebook" /></a>
       	 </div>
         <?php }?>
        </div>
        <div class="clear">&nbsp;</div>
        <div class="footer">
        	<ul>
            	<li><a class="facebook" target="_blank" href="http://www.facebook.com/alumnize">Become fan on Facebook</a></li>
            	<li><a class="twitter" target="_blank" href="http://www.twitter.com/alumnize">Follow us on Twitter</a></li>
                <li><iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FAlumnize&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=true&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=192967367441385" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe></li>
                <li style="float:right;"><img src="images/coming-2.png" /></li>   
            </ul>
        </div>
        
    </div>
</div><!--Container Ends-->
<div id="fb-root"></div>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>
 ////===========================
 jQuery(function(){
	//Send Request
	jQuery('.invite').click(function(){
				sendRequestToRecipients();
	});
});

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '404356396268041', // App ID
            channelUrl : 'http://alumnize.com/coming/channel.php', // Channel File
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
        });

        
    };

    // Load the SDK Asynchronously
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
	function requestCallback(response)
	{
		//alert(response);
		
//		alert("Request sent successfully!");
	}
	
    function sendRequestToRecipients() {			
		   FB.ui({method: 'apprequests',
				message: "I just signed up for a beta invitation at alumnize.com."
			}, requestCallback);			 
    } 
 </script>
 
 
 
</body>
</html>

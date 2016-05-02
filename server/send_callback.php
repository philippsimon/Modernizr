<?php
$cookie_name = "checkForThirdPartyCookie";
$cookie_value = "MyCookieTestValue";
$isCookieSupported = "false";


if($_GET['calltype'] == 'setCookie'){
	setcookie($cookie_name, $cookie_value, time() + (86400*30), "/"); // 86400 = 30 days
	echo $_GET['callback'] . '(true)';
}
elseif($_GET['calltype'] == 'clearCookie'){
	setcookie($cookie_name, $cookie_value, time() - (86400*30), "/"); // clear by setting expiry date 30 days in past
	echo $_GET['callback'] . '(true)';
}
else{
	if(isset($_COOKIE[$cookie_name])) {
	$isCookieSupported = "true";
	 }
		#clear the cookie
		#setcookie($cookie_name, $cookie_value, time() - (120), "/");
	echo $_GET['callback'] . '(' . $isCookieSupported . ')';
	}	
?>
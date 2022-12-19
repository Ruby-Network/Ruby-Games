<?php
session_start();
if(!isset($_REQUEST["allan"])){
    if(!isset($_SESSION['username'])){header('location:/snes-nes/');}
}
?>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
    <link rel="icon" type="image/png" href="../emulator/emjs/img/icon.png"/>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link rel="stylesheet" href="../emulator/css/main.css">
<script src="../emulator/js/main.js"></script>
<div id="preloader"></div>
  <style>
 body{
     margin: 0;
     padding: 0;
 }
.containerr { 
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99999999;
  opacity: 0;
  transition: opacity .1s ease-in-out;
  -moz-transition: opacity .1s ease-in-out;
  -webkit-transition: opacity .1s ease-in-out;
}

.vertical--center {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 180px;
}
.a{
    left: 60px !important;
    position: fixed;
}
.bot {
  padding: 5px;
  margin: 10px;
  border-radius: 50%;
  background-color: #ff1100;
  border: 2px solid black;
  width: 50px;
  height: 50px;
  font-size: 25px;
  color: white;
  cursor: pointer;
}
.containerr:hover {
  opacity: 1.0;
  transition: opacity .1s ease-in-out;
  -moz-transition: opacity .1s ease-in-out;
  -webkit-transition: opacity .1s ease-in-out;
}
#helppp{
    visibility: hidden;
    transition: opacity .1s ease-in-out;
  -moz-transition: opacity .1s ease-in-out;
  -webkit-transition: opacity .1s ease-in-out;
}
body, html{
          margin:0;
          padding:0;
          background: black;
          height: 100%;
      }
    #game{
        width: calc(100vh * 4/3);
        height: 100vh;
        margin: auto;
overflow: hidden;
border: none;
    }
          </style>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Google Snake Game!</title>
  </head>
  <body>
      <center><iframe scrolling="no" style="width: calc(100vh * 4/4); height: 100vh; margin: auto;" frameBorder="0" scrolling="no" src="index.php"></iframe></center>
<div class="containerr">
    <div id="hov" class="vertical--center">
    <button id="helpp" onclick="window.location.href = '/snes-nes/';" class="bot">⬅</button>
    </div>
</div>
<script>

</script>
</html>
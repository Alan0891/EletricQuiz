<?php 
namespace src\core;
class core{

private $controller;
private $method;
private  $params=[];

public function route(){

   $uri = explode('index.php',URI);
   $uri = end($uri);
  
   if(!empty($uri)){
     $uri = explode('/',$uri);
     array_shift($uri);
     if($uri[0] === 'public'){
       array_shift($uri);
       $this->controller = 'src\controllers\\'.ucfirst($uri[0]).'Controller';
       array_shift($uri);
       if(!empty($uri)){
         $this->method = $uri[0];
         array_shift($uri);
       }else{
         $this->method = "index";
       }
       if(count($uri) > 0){
         $this->params = $uri;
       }
     }
   }else{
    $this->controller = 'LoginController';
    $this->method = 'index';
   }
   $c = new $this->controller(); 
   echo call_user_func_array([$c,$this->method],$this->params);
  }
}
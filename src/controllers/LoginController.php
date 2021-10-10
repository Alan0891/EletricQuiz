<?php 
namespace src\controllers;
use src\core\controller;
class LoginController extends controller{
    public function index(){
    $data = [];
       $this->tmpview('login',$data);
    }
}
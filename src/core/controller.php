<?php 
namespace src\core;
class controller{
    public function view($view,$data=[]){
        extract($data);
        include '../public/views/'.$view.'.html';
    }
    public function tmpview($view,$data=[]){
        extract($data);
        include '../public/views/tmp.html';
    }
    public function tmpviewall($view,$data=[]){
        extract($data);
        include '../public/views/'.$view.'.html';
    }
}
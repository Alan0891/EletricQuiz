<?php
namespace src\controllers;
use src\core\controller;
use src\models\Question;
class QuestionController extends controller{
    
    public function index(){  
        $data = [];
        $resp = $this->getQuestion();
        $data = json_decode($resp,1);
        $this->tmpview('quiz',$data);
    }
    public function getQuestion(){  
        return (new Question())->ask();
     }
}
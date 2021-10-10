<?php 
namespace src\models;
use src\models\DAO;
class Question{
private static $table = "tb_question";
   public function ask(){ 
   $db = new DAO();
   return json_encode($db->select("SELECT * FROM ".self::$table." ORDER BY RAND() LIMIT 1,1",[]));
   }
}
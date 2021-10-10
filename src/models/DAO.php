<?php 
namespace src\models;
use src\models\Connect;
use PDO;
class DAO{
    
    public function select($query,$params){
        $stmt = Connect::connectar()->prepare($query);
        $this->setParams($stmt,$params);
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $row;
    }
    public function setBind($stmt,$key,$value){
        $stmt->bindParam($key,$value);
    }
    public function setParams($stmt,$params){
        foreach($params as $key => $value){
          $this->setBind($stmt,$key,$value);
        }
    }
    public function sql($query,$params){
        $stmt = Connect::connectar()->prepare($query);
        $this->setParams($stmt,$params);
        $stmt->execute();
    }
}
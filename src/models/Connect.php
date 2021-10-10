<?php 
namespace src\models;
class Connect{

    private static $conn;

    public static function connectar(){
        try{
         self::$conn = new \PDO(DBDRIVER.':host='.DBHOST.';dbname='.DBNAME,DBUSER,DBPASS);   
         return self::$conn;
        }catch(\PDOException $error){
           return $error->getMessage();
        }
    }
}
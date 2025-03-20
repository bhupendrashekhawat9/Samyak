import {Db, MongoClient} from "mongodb";


let db: MongoClient = new MongoClient("mongodb+srv://bittu_10:<db_password>@cluster0.zplqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

class Database{
    
    private  client:MongoClient;
    private  instance: Database|null = null;
    private static db:Db|null = null;
    private readonly dbName = "Samyak";
    private readonly url = "mongodb+srv://bittu_10:<db_password>@cluster0.zplqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    private constructor(){
        this.client = new MongoClient(this.url)
        this.instance =  new Database();
        this.instance.client.connect();
        

    }
    private getInstance(){
        
    }
    public static connect():Db{
        if(!this.db){
            this.getInstance()
        }
        return this.db 
    }

}

export default Database;
import mongoose from "mongoose";

class Database {
  private static instance: Database | null = null;
  static readonly url = "mongodb+srv://bittu_10:[MongoToken]@cluster0.zplqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  private constructor() {}

  public static async connect(): Promise<typeof mongoose> {
    if (!this.instance) {
      // this.instance = new Database();
      try {
        console.log("Connecting to MongoDB...");
        
        const connection = await mongoose.connect(this.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("MongoDB Connected ✅");
        return connection;
      } catch (error) {
        console.error("MongoDB Connection Error ❌:", error);
        process.exit(1);
      }
    }
    return mongoose;
  }
}

export default Database;

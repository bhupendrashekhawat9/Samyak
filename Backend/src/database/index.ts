import mongoose from "mongoose";

class Database {
  private static instance: Database | null = null;
  private readonly url = "mongodb+srv://bittu_10:<db_password>@cluster0.zplqe.mongodb.net/Samyak?retryWrites=true&w=majority&appName=Cluster0";

  private constructor() {}

  public static async connect(): Promise<typeof mongoose> {
    if (!this.instance) {
      this.instance = new Database();
      try {
        const connection = await mongoose.connect(this.instance.url, {
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

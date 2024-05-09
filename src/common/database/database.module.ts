import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        process.env.LOCAL_MONGODB_URI ||
        'mongodb://localhost:27017/ECE-Project',
    ),
  ],
})
export class DatabaseModule {}

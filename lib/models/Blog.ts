import mongoose from 'mongoose';

export interface IBlog extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  image: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: false,
  },
  published: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

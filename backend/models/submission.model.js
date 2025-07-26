import mongoose from 'mongoose';
const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['LeetCode', 'HackerRank', 'Codeforces'],
    required: true
  },
  questionName: {
    type: String,
    required: true
  },
questionLink: {
    type: String
},
  note: {
    type: String,
  },
  topic: {
    type: String
},
diffculty: {
    type: String,
}},
{
timestamps: true
 });  
const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;

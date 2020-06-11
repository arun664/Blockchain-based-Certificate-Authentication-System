const mongoose = require ('mongoose')

const TransactionSchema = new mongoose.Schema(
    {
      usn: {
        type: String,
        trim: true
      },
      tid: {
        type: String,
        trim: true
      }
    }
  );

module.exports = mongoose.model('Certificate', TransactionSchema);
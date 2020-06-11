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
      },
      email: {
        type: String,
        trim: true
      },
      cert_id: {
        type: String,
        trim: true
      }
    }
  );

module.exports = mongoose.model('Certificate', TransactionSchema);
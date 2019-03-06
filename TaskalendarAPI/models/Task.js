const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    dayId: { type: Number, required: 'Cannot be empty' },
    todos: [
        {
            id: { type: String, required: 'Cannot be empty' },
            todo: String,
            isDone: Boolean
        }
    ]

});

module.exports = mongoose.model('Task', TaskSchema);
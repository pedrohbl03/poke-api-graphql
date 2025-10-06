import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  nickname: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  powerLevel: {
    type: Number,
    default: 1,
    min: [1, 'Power level must be at least 1'],
    max: [100, 'Power level must be at most 100']
  }
},
  {
    timestamps: true,
  }
);

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
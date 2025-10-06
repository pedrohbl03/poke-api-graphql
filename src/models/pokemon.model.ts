import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
    default: 1
  }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pokemonSchema.statics.powerLevelValidator = function (value: number) {
  return value >= 1 && value <= 100;
};

pokemonSchema.statics.favoritesExceededValidator = async function () {
  const count = await this.countDocuments({ favorite: true });
  return count < 4;
};

pokemonSchema.index({ name: 1 });

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
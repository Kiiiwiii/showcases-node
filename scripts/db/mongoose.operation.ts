import { DatabaseModule } from 'type';
import { Model, Document } from 'mongoose';

class MongooseOperation<T extends Document> implements DatabaseModule.MongooseOperation<T> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  addItem(item: T) {
    const newItem = new this.model(item);
    return newItem.save();
  }

  lists(options: Partial<T> = {}) {
    return this.model.find(options);
  }

  findItem(id: any = null, _creatorId?: any) {
    if (!_creatorId) {
      return this.model.findById(id);
    }
    return this.model.findOne({ _id: id, _creator: _creatorId });
  }

  deleteItem(id: string, _creatorId?: any) {
    if (!_creatorId) {
      return this.model.findByIdAndRemove(id);
    }
    return this.model.findOneAndDelete({ _id: id, _creator: _creatorId });
  }

  updateItem(id: string, update: Partial<T>, _creatorId?: any) {
    if (!_creatorId) {
      return this.model.findOneAndUpdate({ id }, update, { new: true });
    }
    return this.model.findOneAndUpdate({ _id: id, _creator: _creatorId }, update);
  }
}

export default MongooseOperation;
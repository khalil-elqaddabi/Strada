export default class CoachRepository {
  constructor(coachModel) {
    this.coachModel = coachModel;
  }


  create(data) {
    return this.coachModel.create(data);
  }

  findAll() {
    return this.coachModel.find({ isArchived: false });
  }


  findById(id) {
    return this.coachModel.findOne({
      _id: id,
      isArchived: false,
    });
  }


  update(id, data) {
    return this.coachModel.findOneAndUpdate(
      { _id: id, isArchived: false },
      { $set: data },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );
  }


  archive(id) {
    return this.coachModel.findByIdAndUpdate(
      id,
      { $set: { isArchived: true } },
      { returnDocument: "after" }
    );
  }
}
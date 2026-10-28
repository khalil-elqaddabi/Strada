import Stop from "../models/stop.model"


class StopRepository {
    async create(data) {
        return Stop.reate(data)
    }

    async findAll() {
        return Stop.find().sort({createAt : -1})
    }


    async findById(id) {
        return Stop.findById(id)
    }

    async updateById(id, data) {
        return Stop.findByIdAndUpdate(id, data, {
            new:true,
            runValidators: true,
        })
    }

    async deleteById(id) {
        return Stop.findByIdAndDelete(id)
    }


}

export default new StopRepository
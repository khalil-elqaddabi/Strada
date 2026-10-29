

export default class DepartureRepository{

    constructor({ departureModel }){
        this.Dep = departureModel;
    }

    async create(data){
        return this.Dep.create(data);
    }

    async findAll(){
        return this.Dep.find();
    }

    async findById(id){
        return this.Dep.findById(id)
    }

    async updateById(id, data){
        return this.Dep.findByIdAndUpdate(id, data, {new: true});
    }

    async delete(id){
        return this.Dep.findByIdAndDelete(id);
    }
} 
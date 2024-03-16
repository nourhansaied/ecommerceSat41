export class APIFeature {
  constructor(mongooseQuery, searchQuery) {
    (this.mongooseQuery = mongooseQuery), (this.searchQuery = searchQuery);
  }

  pagination() {
    if (this.searchQuery.page <= 0) this.searchQuery.page = 1;
    let pageNumber = this.searchQuery.page * 1 || 1;
    let limit = 2;
    let skip = (pageNumber - 1) * limit;
    this.mongooseQuery.find().skip(skip).limit(2);
    this.pageNumber = pageNumber
    return this;
  }

  filters() {
    let filterObj = JSON.stringify(this.searchQuery);
    filterObj = filterObj.replace(/(gte|gt|lte|lt)/g, (match) => "$" + match);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if(this.searchQuery.sort) {
        let sortedBy = this.searchQuery.sort;
        sortedBy = sortedBy.split(",").join(" ")
        this.mongooseQuery.sort(sortedBy)
    }
    return this;
  }

  select() {
    if(this.searchQuery.fields) {
        let fields = this.searchQuery.fields.split(",").join(" ")
        this.mongooseQuery.find().select(fields)
    }
    return this
  }

  search() {

    if(this.searchQuery.keywords) {
        this.mongooseQuery.find({
            $or: [
                {title:   {$regex: this.searchQuery.keywords} },
                {description:   {$regex: this.searchQuery.keywords} }
            ]
         })
    }

    return this
  }
}

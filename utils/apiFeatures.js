class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    if (this.query.author) this.queryString.find({ author: { $regex: this.query.author.toLowerCase(), $options: 'i' } });
    if (this.query.body) this.queryString.find({ body: { $regex: this.query.body.toLowerCase(), $options: 'i' } });
    if (this.query.title) this.queryString.find({ title: { $regex: this.query.title.toLowerCase(), $options: 'i' } });
    if (this.query.keywords) this.queryString.find({ keywords: { $regex: this.query.keywords.toLowerCase(), $options: 'i' } });
    return this;
  }

  default() {
    this.queryString.sort('createdAt');
    return this;
  }

  limitFields() {
    if (!this.query.fields) return this;
    const fields = this.query.fields.split(',');
    this.queryString.select(fields);
    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.queryString.skip(skip).limit(limit);
    return this;
  }
};

module.exports = ApiFeature;

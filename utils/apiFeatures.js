class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    if (this.query.author) this.queryString = this.queryString.find({ author: { $regex: this.query.author.toLowerCase(), $options: 'i' } });
    if (this.query.body) this.queryString = this.queryString.find({ body: { $regex: `^${this.query.body.toLowerCase()}`, $options: 'i' } });
    if (this.query.title) this.queryString = this.queryString.find({ title: { $regex: `^${this.query.title.toLowerCase()}`, $options: 'i' } });
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
};

module.exports = ApiFeature;

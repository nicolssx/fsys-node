module.exports = [
  {name: 'id', filterInvalid: true},
  {name: 'title', notNull: true},
  {name: 'icon', required: true},
  {name: 'isDefault', required: true, reg: /^\d{1}$/}
]

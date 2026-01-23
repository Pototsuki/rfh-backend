const Setting = require('../models/setting.model')

class SettingRepository {

  async getByKey(key) {
    return Setting.findOne({ where: { key } })
  }

  async set(key, value) {
    return Setting.upsert({
      key,
      value
    })
  }

}

module.exports = new SettingRepository()

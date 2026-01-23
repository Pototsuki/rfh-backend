const success = (res, data, message = 'Success') => {
  return res.status(200).json({
    status: true,
    message,
    data
  })
}

const error = (res, message = 'Error', code = 400) => {
  return res.status(code).json({
    status: false,
    message
  })
}

const successWithPagination = (res, data, pagination, message = 'Success') => {
  return res.status(200).json({
    status: true,
    message,
    data,
    pagination
  })
}

module.exports = {
  success,
  error,
  successWithPagination
}

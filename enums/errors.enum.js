const ErrorValidationEnum = Object.freeze({
  password_required: 'password_required',
  password_string: 'password_string',
  username_required: 'username_required',
  username_string: 'username_string',
  secret_key_required: 'secret_key_required',
  secret_key_string: 'secret_key_string',
  uuid_required: 'uuid_required',
  invalid_uuid_type: 'invalid_uuid_type',
  type_id_required: 'type_id_required',
  type_id_number: 'type_id_number',
  start_date_required: 'start_date_required',
  start_date_number: 'start_date_number',
  end_date_required: 'end_date_required',
  end_date_number: 'end_date_number',
  name_required: 'name_required',
  name_string: 'name_string',
  meta_string: 'meta_string',
  is_active_number: 'is_active_number',
  page_number: 'page_number',
  limit_number: 'limit_number',
  search_string: 'search_string',
  id_required: 'id_required',
  id_number: 'id_number',
  event_id_required: 'event_id_required',
  event_id_number: 'event_id_number',
  email_required: 'email_required',
  invalid_email_format: 'invalid_email_format',
  phone_required: 'phone_required',
  invalid_phone_format: 'invalid_phone_format',
  address_required: 'address_required',
  address_string: 'address_string',
  is_finished_number: 'is_finished_number'
})

const ErrorServiceEnum = Object.freeze({
  wrong_username_password: 'wrong_username_password',
  username_registered: 'username_registered',
  username_not_registerd: 'username_not_registered',
  email_registered: 'email_registered',
  max_admin_count_reached: 'max_admin_count_reached',
  do_not_have_access: 'do_not_have_access',
  event_type_registered: 'event_type_registered',
  event_type_not_registered: 'event_type_not_registered',
  event_registered: 'event_registered',
  event_not_registered: 'event_not_registered',
  student_registerd: 'student_registered',
  student_not_registered: 'student_not_registered',
  student_event_registered: 'student_event_registered',
  student_event_not_registered: 'student_event_not_registered',
  start_date_must_be_lower_than_end_date: 'start_date_must_be_lower_than_end_date'
})



module.exports = { ErrorValidationEnum, ErrorServiceEnum }
function result(statusCode, message) {
  return { statusCode, message };
}

export const BadRequest = function (message) {
  return result(400, message || '');
};

export const NotFound = function (message) {
  return result(404, message || '');
};

export const InternalServerError = function (message) {
  return result(500, message || '');
};

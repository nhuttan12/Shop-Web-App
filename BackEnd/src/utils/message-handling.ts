//succeded
const userCreateSuccess: string = 'Tạo tài khoản thành công';
const logInSuccessfully: string = 'Đăng nhập thành công';
//failed
const userBanned: string = 'Tài khoản đã bị khóa';
const userNotExist: string = 'Tài khoản không tồn tại';
const invalidUsernameOrPassword: string = 'Sai tài khoản hoặc mật khẩu';
const usernameOrPasswordNotExist: string =
  'Tài khoản hoặc mật khẩu không tồn tại';
const usernameAlreadyExist: string = 'Tài khoản đã tồn tại';
const errorInCreateAccount: string =
  'Đã xảy ra lỗi trong quá trình tạo tài khoản, vui lòng thử lại';
const userIsnotAuthorized: string = 'Người dùng chưa được xác thực';
const userIsNotAllowedToPerformAction: string =
  'Bạn không có quyền thực hiện hành động này';
const internalServerError: string = 'Internal Server Error';
const databaseInitialize: string='Database initialized';
const databaseNotInitialize: string='Database not initialized';

export const messageLog = {
  userCreateSuccess,
  userBanned,
  userNotExist,
  invalidUsernameOrPassword,
  usernameOrPasswordNotExist,
  logInSuccessfully,
  usernameAlreadyExist,
  errorInCreateAccount,
  userIsnotAuthorized,
  userIsNotAllowedToPerformAction,
  internalServerError,
  databaseInitialize,
  databaseNotInitialize
};

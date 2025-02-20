//succeded
const userCreateSuccess: string = 'Tạo tài khoản thành công';
const logInSuccessfully: string = 'Đăng nhập thành công';
const tokenRefreshedSuccessful: string = 'Token refresh successful';
const databaseInitialize: string='Database initialized';
const dataUpdated: string = 'Thông tin người dùng đã được cập nhật thành công';
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
const databaseNotInitialize: string='Database not initialized';
const passwordIsRequired: string = 'Password is required';
const errorInUserService: string = 'Error in user-service';
const invalidRole: string = 'Quyền không phù hợp';
const dataInvalid: string = 'Dữ liệu không hợp lệ';
const usernameHaveAtLeast3Character: string = 'Tài khoản phải có ít nhất 3 ký tự';
const emailIsNotValid: string = 'Email không hợp lệ';
const passwordHasAtLeast6Character: string = 'Mật khẩu phải có ít nhất 6 ký tự';
const passwordAndRetypePasswordNotSame: string = 'Mật khẩu và nhập lại mật khẩu phải giống nhau';
const passwordHasAtLeast1Character: string = 'Mật khẩu phải có ít nhất 1 ký tự';
const nameHaveAtLeast1Character: string = 'Tên người dùng phải có tối thiểu 1 ký tự';

export const messageLog = {
  nameHaveAtLeast1Character,
  passwordHasAtLeast1Character,
  passwordAndRetypePasswordNotSame,
  passwordHasAtLeast6Character,
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
  databaseNotInitialize,
  tokenRefreshedSuccessful,
  passwordIsRequired,
  errorInUserService,
  invalidRole,
  dataInvalid,
  dataUpdated,
  usernameHaveAtLeast3Character,
  emailIsNotValid
};

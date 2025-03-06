// src/core/presentation/i18n/locales/vi.ts
export default {
    common: {
      close: "Đóng",
    },
    core: {
      screens: {
        NotFound: {
          goHome: "Về trang chủ",
        },
      },
      errors: {
        screenNotFound: "Không tìm thấy trang",
        contextNotProvided: "{{contextName}} không được cung cấp.",
      },
    },
    auth: {
      screens: {
        Auth: {
          welcomeBack: "Chào mừng trở lại",
          createAccount: "Tạo tài khoản",
          signInContinue: "Đăng nhập để tiếp tục sử dụng ứng dụng",
          registerGetStarted: "Đăng ký để bắt đầu sử dụng ứng dụng",
          login: "Đăng nhập",
          register: "Đăng ký",
          fullName: "Họ và tên",
          email: "Email",
          emailOrUsername: "Email hoặc tên đăng nhập",
          password: "Mật khẩu",
          confirmPassword: "Xác nhận mật khẩu",
          forgotPassword: "Quên mật khẩu?",
          orContinueWith: "hoặc tiếp tục với",
        },
      },
      errors: {
        passwordsDoNotMatch: "Mật khẩu không khớp",
        invalidCredentials: "Email hoặc mật khẩu không đúng",
        emailAlreadyExists: "Email đã tồn tại",
        // New validation error messages
        emailRequired: "Email là bắt buộc",
        emailOrUsernameRequired: "Email hoặc tên đăng nhập là bắt buộc",
        invalidEmail: "Vui lòng nhập một địa chỉ email hợp lệ",
        usernameTooShort: "Tên đăng nhập phải có ít nhất 3 ký tự",
        invalidUsername: "Tên đăng nhập chỉ có thể chứa chữ cái, số và . _ -",
        passwordRequired: "Mật khẩu là bắt buộc",
        passwordTooShort: "Mật khẩu phải có ít nhất 6 ký tự",
      },
    },
    post: {
      screens: {
        Posts: {
          loading: "Đang tải...",
        },
        Post: {
          loading: "Đang tải...",
        },
      },
    },
  };
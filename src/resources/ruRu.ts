export const ruRu = {
    delivery: 'Доставка',
    contacts: 'Контакты',
    aboutUs: 'О нас',
    enter: 'Войти',
    exit: 'Выйти',
    whatDoYouWant: 'Что пожелаете?',
    basket: 'Корзина',
    registration: 'Регистрация',
    register: 'Зарегестрироваться',
    authorization: 'Авторизация',
    email: 'Почта',
    password: 'Пароль',
    repeatPassword: 'Повторите пароль',
    loading: 'Загрузка',
    hello: (role: string) => `Привет, ${role}`,

    //validations
    pleaseEnterEmail: 'Введите почту',
    pleaseEnterValidEmail: 'Введите верную почту',
    pleaseEnterPassword: 'Ввведите пароль',
    pleaseRepeatPassword: 'Введите пароль еще раз',
    passwordsShouldMatch: 'Пароли должны совпадать',
    passwordsShouldHaveAtLeastUpper: (number: number) => `Пароль должен иметь ${number} символ(а) в верхнем регистре`,
    passwordsShouldHaveAtLeastLower: (number: number) => `Пароль должен иметь ${number} символ(а) в нижнем регистре`,
    passwordsShouldHaveAtLeastNumber: (number: number) => `Пароль должен иметь ${number} цифру(ы)`,
    passwordsShouldHaveMinLength: (number: number) => `Пароль должен быть ${number} символов в длину`,


    //error
    somethingWentWrong: 'Что-то пошло не так. Попробуйте еще раз',
    userDoesNotExist: 'Пользователь с такой почтой не существует',
    userAlreadyExists: 'Пользователь с такой почтой уже существует',
    wrongPassword: 'Неверный пароль',

    //roles
    manager: 'Менеджер',
    customer: 'Покупатель',
    courier: 'Курьер',
};
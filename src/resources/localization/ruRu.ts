export const ruRu = {
    ru: 'Рус',
    en: 'Eng',

    delivery: 'Доставка',
    contacts: 'Контакты',
    aboutUs: 'О нас',
    enter: 'Войти',
    exit: 'Выйти',
    whatDoYouWant: 'Что пожелаете?',
    cart: 'Корзина',
    registration: 'Регистрация',
    courierRegistration: 'Регистрация курьера',
    register: 'Зарегестрироваться',
    toRegister: 'Зарегестрировать',
    authorization: 'Авторизация',
    email: 'Почта',
    password: 'Пароль',
    repeatPassword: 'Повторите пароль',
    loading: 'Загрузка',
    hello: (role: string) => `Привет, ${role}`,
    orders: 'Заказы',
    products: 'Блюда',
    couriers: 'Курьеры',
    add: 'Добавить',
    addNewProduct: 'Добавить новое блюдо',
    addNewProductOfType: (type: string) => `Добавить новое блюдо (${type})`,
    editProductOfType: (type: string) => `Изменить блюдо (${type})`,
    thereAreNoProductsOfType: (type: string) => `Блюда типа "${type}" не найдены`,
    thereAreNoProducts: `Блюда не найдены`,
    name: 'Название',
    personName: 'Имя',
    description: 'Описание',
    weight: 'Вес',
    price: 'Цена',
    spiciness: 'Острота',
    ingredients: 'Состав',
    addImage: 'Добавить изображение',
    delete: 'Удалить',
    edit: 'Изменить',
    yes: 'Да',
    no: 'Нет',
    all: 'Все',
    free: 'Свободные',
    delivering: 'Доставляют',
    create: 'Создать',
    thereAreNoCouriers: 'Курьеры не найдены',
    phone: 'Телефон',
    fire: 'Уволить',
    menu: 'Меню',
    addToCart: 'В корзину',
    yourCartIsEmpty: 'Ваша корзина пуста',
    goToMenu: 'Перейти в меню',
    checkout: 'Оформить заказ',
    clearCart: 'Очистить корзину',
    orderSum: 'Сумма заказа',
    pieces: 'шт.',

    //validations
    enterName: 'Введите имя',
    nameCanBeMaxLength: (number: number) => `Имя не может быть более ${number} символов`,
    enterPrice: 'Введите цену',
    enterWeight: 'Введите вес',
    weightCanBeMaxLength: (number: number) => `Вес не может быть не более ${number} символов`,
    enterDescription: 'Введите описание',
    descriptionCanBeMaxLength: (number: number) => `Описание не может быть более ${number} символов`,
    enterIngredients: 'Введите состав',
    ingredientsCanBeMaxLength: (number: number) => `Состав не может быть более ${number} символов`,
    pickImage: 'Выберите изображение',
    enterEmail: 'Введите почту',
    enterValidEmail: 'Введите верную почту',
    enterPassword: 'Ввведите пароль',
    pleaseRepeatPassword: 'Введите пароль еще раз',
    passwordsShouldMatch: 'Пароли должны совпадать',
    enterPersonName: 'Введите имя',
    enterPhone: 'Введите телефон',
    priceShouldBeMoreThan: (number: number) => `Цена должна быть больше ${number}`,
    priceShouldBeLessThan: (number: number) => `Цена должна быть меньше ${number}`,
    passwordsShouldHaveAtLeastUpper: (number: number) => `Пароль должен иметь ${number} символ(а) в верхнем регистре`,
    passwordsShouldHaveAtLeastLower: (number: number) => `Пароль должен иметь ${number} символ(а) в нижнем регистре`,
    passwordsShouldHaveAtLeastNumber: (number: number) => `Пароль должен иметь ${number} цифру(ы)`,
    passwordsShouldHaveMinLength: (number: number) => `Пароль должен быть ${number} символов в длину`,
    areYouSureYouWantToDeleteName: (name: string) => `Вы уверены, что хотите удалить блюдо "${name}"?`,
    areYouSureYouWantToDeleteProduct: `Вы уверены, что хотите удалить это блюдо?`,
    areYouSureYouWantToDeleteCourier: `Вы уверены, что хотите уволить этого курьера?`,


    //error
    somethingWentWrong: 'Что-то пошло не так. Попробуйте еще раз',
    userDoesNotExist: 'Пользователь с такой почтой не существует',
    userAlreadyExists: 'Пользователь с такой почтой уже существует',
    wrongPassword: 'Неверный пароль',

    //roles
    manager: 'Менеджер',
    customer: 'Покупатель',
    courier: 'Курьер',

    //product types
    sushi: 'Суши',
    rolls: 'Роллы',
    sets: 'Сеты',
    soups: 'Супы',
    noodles: 'Лапша',
    snacks: 'Закуски',
    drinks: 'Напитки',
    garnish: 'Гарнир',

    //spiciness types
    notSpicy: 'Не острое',
    spicy: 'Острое',
};
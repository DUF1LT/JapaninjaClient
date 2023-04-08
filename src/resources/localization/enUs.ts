export const enUs = {
    ru: 'Рус',
    en: 'Eng',

    delivery: 'Delivery',
    contacts: 'Contacts',
    aboutUs: 'About us',
    enter: 'Log In',
    exit: 'Log Out',
    whatDoYouWant: 'What do you want?',
    cart: 'Cart',
    registration: 'Sign Up',
    courierRegistration: 'Courier registration',
    register: 'Register',
    toRegister: 'Register',
    authorization: 'Authorization',
    email: 'Email',
    password: 'Password',
    repeatPassword: 'Repeat password',
    loading: 'Loading...',
    hello: (role: string) => `Hello, ${role}`,
    orders: 'Orders',
    products: 'Products',
    couriers: 'Couriers',
    add: 'Add',
    addNewProduct: 'Add new product',
    addNewProductOfType: (type: string) => `Add new product (${type})`,
    editProductOfType: (type: string) => `Edit product (${type})`,
    thereAreNoProductsOfType: (type: string) => `There are no products of type "${type}"`,
    thereAreNoProducts: `There are no products`,
    name: 'Name',
    personName: 'Name',
    description: 'Description',
    weight: 'Weight',
    price: 'Price',
    spiciness: 'Spiciness',
    ingredients: 'Ingredients',
    addImage: 'Add image',
    delete: 'Delete',
    edit: 'Edit',
    yes: 'Yes',
    no: 'No',
    all: 'All',
    free: 'Free',
    delivering: 'Delivering',
    create: 'Create',
    thereAreNoCouriers: 'There are no couriers',
    phone: 'Phone',
    fire: 'Fire',
    menu: 'Menu',
    addToCart: 'Add to cart',
    yourCartIsEmpty: 'Your cart is empty',
    goToMenu: 'Go to menu',
    checkout: 'Checkout',
    clearCart: 'Clear cart',
    orderSum: 'Order price',
    pieces: 'piece(s)',
    payment: 'Payment',
    deliveryPrice: 'Delivery price',
    totalPrice: 'Total price',
    rubles: 'rub.',
    yourOrder: 'Your order',
    cutlery: 'Cutlery',
    courierDelivery: 'Courier delivery',
    pickup: 'Pickup',
    deliveryInfo: 'Delivery info',
    address: 'Address',
    pickupAddress: 'Pickup address',
    receivingTime: 'Receiving time',
    yourData: 'Your data',
    additionalInformation: 'Additional information',
    leaveAnyUsefulOrderInformation: 'Leave any useful order information',
    asap: 'As soon as possible',
    toCertainTime: 'To certain time',
    createOrder: 'Create order',
    yourOrderIsAccepted: 'Your order is accepted!',
    deliveryType: 'Delivery type',
    yourOrderNumber: 'Your order number',
    deliveryTime: 'Delivery time',
    deliveryAddress: 'Delivery address',
    processing: 'Processing',
    preparing: 'Preparing',
    ready: 'Ready',
    shipping: 'Shipping',
    delivered: 'Delivered',
    closed: 'Closed',
    canceled: 'Canceled',
    thereAreNoOrders: 'There are no orders',
    client: 'Client',
    cancel: 'Cancel',
    process: 'Process',
    setToReady: 'Set Ready',
    ship: 'Ship',
    deliver: 'Deliver',
    close: 'Close',
    orderShouldBeInProcessing: 'Order should be in "Processing" status',
    active: 'Active',
    completed: 'Completed',
    more: 'More',
    order: 'Order',
    comment: 'Comment',
    completedTime: 'Completed at',
    deliveredTime: 'Delivered at',
    sortBy: 'Sort by',
    streetText: 'Street',
    houseNumberText: 'House',
    flatNumberText: 'Flat',
    entranceText: 'Entrance',
    floorText: 'Floor',
    street: (streetName: string) => `st. ${streetName}`,
    houseNumber: (houseNumber: string) => `h. ${houseNumber}`,
    flatNumber: (flatNumber: string) => `flat ${flatNumber}`,
    entrance: (entrance: string) => `ent. ${entrance}`,
    floor: (floor: string) => `fl. ${floor}`,
    profile: 'Profile',
    ordersAmount: 'Delivered orders',
    rating: 'Rating',
    editProfile: 'Edit profile',

    //validations
    enterName: 'Enter name',
    nameCanBeMaxLength: (number: number) => `Name can't be more than ${number} symbols`,
    enterPrice: 'Enter price',
    enterWeight: 'Enter weight',
    weightCanBeMaxLength: (number: number) => `Weight can't be more than ${number} symbols`,
    enterDescription: 'Enter description',
    descriptionCanBeMaxLength: (number: number) => `Description can't be more than ${number} symbols`,
    enterIngredients: 'Enter ingredients',
    ingredientsCanBeMaxLength: (number: number) => `Ingredient can't be more than ${number} symbols`,
    pickImage: 'Pick image',
    enterEmail: 'Enter email',
    enterValidEmail: 'Email correct email',
    enterPassword: 'Enter password',
    pleaseRepeatPassword: 'Repeat password',
    passwordsShouldMatch: 'Password should match',
    enterPersonName: 'Enter full name',
    enterPhone: 'Enter phone',
    enterAddress: 'Enter address',
    enterTime: 'Enter time',
    priceShouldBeMoreThan: (number: number) => `Price should be more than ${number}`,
    priceShouldBeLessThan: (number: number) => `Price should be less than ${number}`,
    passwordsShouldHaveAtLeastUpper: (number: number) => `Password should have at least ${number} symbol(s) in upper case`,
    passwordsShouldHaveAtLeastLower: (number: number) => `Password should have at least ${number} symbol(s) in lower case`,
    passwordsShouldHaveAtLeastNumber: (number: number) => `Password should have at least ${number} number(s)`,
    passwordsShouldHaveMinLength: (number: number) => `Password should have ${number} length`,
    areYouSureYouWantToDeleteName: (name: string) => `Are you shure you want to delete product "${name}"?`,
    areYouSureYouWantToDeleteProduct: `Are you shure you want to delete this product?`,
    areYouSureYouWantToDeleteCourier: `Are you shure you want to delete this courier?`,


    //error
    somethingWentWrong: 'Something went wrong. Please try again',
    userDoesNotExist: 'User with this email does not exist',
    userAlreadyExists: 'User with this email already exists',
    wrongPassword: 'Wrong password',

    //roles
    manager: 'Manager',
    customer: 'Customer',
    courier: 'Courier',

    //product types
    sushi: 'Sushi',
    rolls: 'Rolls',
    sets: 'Sets',
    soups: 'Soups',
    noodles: 'Noodles',
    snacks: 'Snacks',
    drinks: 'Drinks',
    garnish: 'Garnish',

    //spiciness types
    notSpicy: 'Not spicy',
    spicy: 'Spicy',
};
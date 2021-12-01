const users: userInfo[] = [
  {
    email: "amr@gmail.com",
    firstName: "amr",
    middleName: "othman",
    lastName: "younis",
    promoCode: "22fff3",
    password: "12345678",
  },
];

export const getSpecificUser = (email: string) => {
  const userInfoPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users.filter((user) => user.email === email)[0]);
    }, 1000);
  });
  return userInfoPromise;
};

export const isUser = (userMail: string, userPassword: string) => {
  const isExist = users.find(
    (user) => user.email == userMail && user.password == userPassword
  );
  const isUserPromise: Promise<Boolean> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(isExist ? true : false);
    }, 1000);
  });

  return isUserPromise;
};

export const signup = (data: userInfo) => {
  if (data) {
    users.push(data);
  }
};

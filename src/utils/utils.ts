const validate = (type: string, value: string) => {
  switch (type) {
    case "email":
      const emailPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
      return emailPattern.test(value);

    case "password":
      const validPassword = value.length >= 8;
      return validPassword;

    case "name":
      const namePattern = /^[a-zA-Z]+$/;
      return namePattern.test(value);
  }
};

export { validate };

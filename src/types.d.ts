type userInfo = {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    promoCode: string;
    password: string;
  };

  type Reducer<State, Action> = 
  (state: State, action: Action) => State;

  type Action = {
    type: string,
    payload?: any
  }
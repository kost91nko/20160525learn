const company = (state = {}, action) => {
  switch (action.type){
    case 'SET_COMPANY_NAME':
      return { ...state, name: action.name };
    default:
      return state;
  }
};

export default company;

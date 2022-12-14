const initialState = {
  dogs: [],
  temperaments: [],
  razadogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
    case "TEMPERAMENTOS":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "RAZAS_DOGS":
      return {
        ...state,
        razadogs: action.payload,
      };
    case "ordenarLiviano":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(a.weight.metric.slice(0, 3)) -
            parseInt(b.weight.metric.slice(0, 3))
        ),
      };
    case "ordenarPesado":
      return {
        ...state,
        dogs: state.dogs.sort(
          (a, b) =>
            parseInt(b.weight.metric.slice(0, 3)) -
            parseInt(a.weight.metric.slice(0, 3))
        ),
      };
    case "ordenar-asc-desc":
      return {
        ...state,
        dogs: state.dogs.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }),
      };
    case "ordenar-desc-asc":
      return {
        ...state,
        dogs: state.dogs.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        }),
      };
    default:
      return state;
  }
}
export default rootReducer;

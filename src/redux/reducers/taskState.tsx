const currentState = {taskName: '', Score:0};
export const taskStateReducer = (state = currentState, action: any) => {

  switch (action.type) {
    case'createState':

      return ({
        taskName: "Logic task",
        Score: 199
      })

    case'updateState':
      return( {
        taskName: "Coding task",
        Score: state.Score}
   )


    case'removeState':
      return currentState;


    default:
      return state;
  }
};
//export type RootState = ReturnType<typeof CreateStateReducer>;
export default taskStateReducer;

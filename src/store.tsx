import{configureStore} from  "@reduxjs/toolkit";
import{allReducers} from "./redux/reducers/index"


export  const store= configureStore(
  {reducer:allReducers}
);

export default  store;

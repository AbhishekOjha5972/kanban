import { DATA_ERROR, DATA_LOADING, DATA_SUCCESS, ONLY_DATA_SUCCESS } from "./data.types"

let initialState = {
    loading:false,
    error:false,
    boardData:[],
    onlyBoard:[]
}

export const dataReducer = (state=initialState,action) =>{
    const {payload,type} = action
    switch(type)
    {
        case DATA_LOADING:
            {
                return {...state,loading:true}
            }
        case DATA_ERROR:
            {
                return {...state,loading:true,loading:false}
            }
        case DATA_SUCCESS:
            {
                return {...state,loading:false,loading:false,boardData:payload}
            }
        case ONLY_DATA_SUCCESS:
            {
                return {...state,loading:false,loading:false,onlyBoard:payload}
            }
        default:
            {
                return state
            }
    }
}
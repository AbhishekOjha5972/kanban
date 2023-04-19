import {
  DATA_ERROR,
  DATA_LOADING,
  DATA_SUCCESS,
  ONLY_DATA_SUCCESS,
} from "./data.types";


let nav

export const getUserBoards = (navigate=nav) => async (dispatch) => {
  nav = navigate
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
      headers: {
        authorization: ls,
      },
    });
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch({ type: ONLY_DATA_SUCCESS, payload: res.data });
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};

export const getSpecificBoardData = (cred, navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/${cred}`,
      {
        headers: {
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch({ type: DATA_SUCCESS, payload: res.data });
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};



export const createBoardAction = (cred, navigate) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/createboard`,{
        method:"POST",
        body:JSON.stringify(cred),
        headers: {
          "Content-type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getUserBoards());
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};



export const updateBoardAction = (id,cred, navigate) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/updateBoard/${id}`,{
        method:"PATCH",
        body:JSON.stringify(cred),
        headers: {
          "Content-type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getUserBoards());
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const deleteBoardAction = (id,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/deleteBoard/${id}`,{
        method:"DELETE",
        headers: {
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getUserBoards());
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const changeSubtaskStatusAction = (id,currentBoardId,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/updateSubtask/${id}`,{
        method:"PATCH",
        headers: {
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const updateTaskAction = (id,cred,currentBoardId,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/updateTask/${id}`,{
        method:"PATCH",
        body:JSON.stringify(cred),
        headers: {
          "Content-Type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const deleteTaskAction = (id,currentBoardId,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/deleteTask/${id}`,{
        method:"DELETE",
        body:JSON.stringify({boardId:currentBoardId}),
        headers: {
          "Content-Type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const createTaskAction = (currentBoardId,cred,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/createTask/${currentBoardId}`,{
        method:"POST",
        body:JSON.stringify(cred),
        headers: {
          "Content-Type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const updateSubtaskAction = (id,cred,currentBoardId,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/updateSubtaskTitle/${id}`,{
        method:"PATCH",
        body:JSON.stringify(cred),
        headers: {
          "Content-Type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


export const deleteSubtaskAction = (id,taskId,currentBoardId,navigate=nav) => async (dispatch) => {
  let ls = localStorage.getItem("loggedin_user");
  dispatch({ type: DATA_LOADING });
  try {
    let boards = await fetch(
      `${import.meta.env.VITE_BASE_URL}/dashboard/deleteSubtask/${id}`,{
        method:"DELETE",
        body:JSON.stringify({taskId:taskId}),
        headers: {
          "Content-Type":"application/json",
          authorization: ls,
        },
      }
    );
    let res = await boards.json();
    if (res.message == "token expired"){
        alert("token expired")
      navigate("/login");
    } else {
      dispatch(getSpecificBoardData(currentBoardId));
    }
  } catch (err) {
    dispatch({ type: DATA_ERROR });
  }
};


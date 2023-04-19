import React from 'react'
import {
     createBoardAction,
     deleteBoardAction,
     getSpecificBoardData,
     getUserBoards,
     updateBoardAction,
     updateTaskAction,
} from "../redux/data.actions";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import {
     Box,
     Button,
     Input,
     Text,
     VStack,
     useToast,
     HStack,
     Center,
     Heading,
     Image,
} from "@chakra-ui/react";
const Std_TaskShower = React.lazy(() => import('../components/Std_TaskShower'));
import LoadingComponentForBoard from "../components/LoadingComponentForBoard";
const Std_Heading = React.lazy(() => import('../components/Std_Heading'));
import LoadingTaskComponents from '../components/LoadingTaskComponents';
import ModalComponent from "../components/ModalComponent";
import LoadingForText from '../components/LoadingForText';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BsGrid1X2Fill } from "react-icons/bs";
import { FcBarChart } from "react-icons/fc";
import { Suspense } from 'react';
import "../styles.css";
const homePageImage =  "../../public/homeSvg.svg"

import { DragDropContext, Droppable } from "react-beautiful-dnd"

const Dashboard = () => {
     const [boardInputToggle, setBoardInputToggle] = useState(false);
     let { onlyBoard, boardData, loading } = useSelector((store) => store.masterBoard);
     const [currentBoard, setCurrentBoard] = useState("Please select Board");
     const [editBoardToggle, setEditBoardToggle] = useState(0);
     const updateBoardTitleRef = useRef(null);
     const boardInputRef = useRef(null);
     let dispatch = useDispatch();
     let navigate = useNavigate();
     const toast = useToast();

     const [todoData, setTodoData] = useState([]);
     const [doingData, setDoingData] = useState([]);
     const [doneData, setDoneData] = useState([]);



     const handleGetSpecificBoardData = (id, name) => {
          setCurrentBoard(name);
          dispatch(getSpecificBoardData(id, navigate));
     };


     useEffect(() => {
          boardData.length && setTodoData(boardData[0].tasks.filter((ele) => ele.status == "Todo"));
          boardData.length && setDoingData(boardData[0].tasks.filter((ele) => ele.status == "Doing"));
          boardData.length && setDoneData(boardData[0].tasks.filter((ele) => ele.status == "Done"));
     }, [boardData[0]?.tasks.length, boardData, onlyBoard.length])


     useEffect(() => {
          setTodoData([])
          setDoingData([])
          setDoneData([])
          if (onlyBoard.length > 0) {
               setCurrentBoard("Select Board")
          }
          else {
               setCurrentBoard("Create Board")
          }
     }, [onlyBoard?.length])

     const handleCreateBoard = () => {
          if (boardInputRef.current.value) {
               dispatch(
                    createBoardAction({ name: boardInputRef.current.value }, navigate)
               );
               boardInputRef.current.value = ""
          } else {
               toast({
                    title: "Please fill all the fields.",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
               });
          }
          setBoardInputToggle(!boardInputToggle);
     };



     const handleUpdateName = (id) => {
          if (updateBoardTitleRef.current.value) {
               dispatch(
                    updateBoardAction(
                         id,
                         { name: updateBoardTitleRef.current.value },
                         navigate
                    )
               );
               toast({
                    title: "Board has been updated.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
               });
               setEditBoardToggle(0);
          } else {
               toast({
                    title: "Please fill all the fields.",
                    status: "warning",
                    duration: 9000,
                    isClosable: true,
               });
          }
     };

     const handleDeleteBoard = (id) => {
          setCurrentBoard("Create Board")
          dispatch(deleteBoardAction(id));
          toast({
               title: "Board has been deleted.",
               status: "success",
               duration: 9000,
               isClosable: true,
          });
          setEditBoardToggle(0);
     };


     //? draggable function 
     const handleDragEnd = (result) => {
          const { draggableId, destination, source } = result

          if (!destination || source.droppableId == destination.droppableId) {
               return
          }
          dispatch(updateTaskAction(draggableId, { status: destination.droppableId }, boardData[0]._id))
     }

     useEffect(() => {
          dispatch(getUserBoards(navigate));
     }, []);

     return (
          <Box>
               {/* top section  */}
               <Box>
                    <Box className="navbar">
                         <Box>
                              <FcBarChart />
                              <Text>Kanban</Text>
                         </Box>
                         <Box>
                              <Text>{currentBoard}</Text>
                              <ModalComponent />
                         </Box>
                    </Box>

                    <Box className="data-container">
                         <Box className="sidebar">
                              <Suspense fallback={<LoadingForText />}>
                                   <Std_Heading title="ALL BOARD" quantity={onlyBoard.length} />
                              </Suspense>
                              {
                                   !loading ?
                                        onlyBoard?.map((ele, i) => {
                                             return editBoardToggle !== ele._id ? (
                                                  <Box key={i} className="sidebar_boards_button"
                                                       onClick={() =>
                                                            handleGetSpecificBoardData(ele._id, ele.name)
                                                       }
                                                  >
                                                       <Text
                                                            noOfLines={1}
                                                            isTruncated={true}
                                                       >
                                                            <bdi>
                                                                 <BsGrid1X2Fill />
                                                            </bdi>
                                                            {ele.name}
                                                       </Text>

                                                       <Box>
                                                            <MdOutlineModeEditOutline
                                                                 color="blue"
                                                                 onClick={() => setEditBoardToggle(ele._id)}
                                                            />
                                                            <MdOutlineDelete
                                                                 color="red"
                                                                 onClick={() => handleDeleteBoard(ele._id)}
                                                            />
                                                       </Box>
                                                  </Box>
                                             ) : (
                                                  <Box className="sidebar_board_selected">
                                                       <Box>
                                                            <bdi>
                                                                 <BsGrid1X2Fill />
                                                            </bdi>
                                                            <input defaultValue={ele.name} ref={updateBoardTitleRef} autoFocus />
                                                       </Box>
                                                       <HStack>
                                                            <RxCheck
                                                                 color="green"
                                                                 onClick={() => handleUpdateName(ele._id)}
                                                            />
                                                            <RxCross2
                                                                 color="red"
                                                                 onClick={() => setEditBoardToggle(0)}
                                                            />
                                                       </HStack>
                                                  </Box>
                                             );
                                        })
                                        : <LoadingComponentForBoard />
                              }
                              <Box
                                   display={boardInputToggle ? "block" : "none"}
                              >
                                   <Box
                                        className="createBoard"
                                   >
                                        <input placeholder="Enter Board Name." ref={boardInputRef} />
                                        <div>
                                             <button onClick={handleCreateBoard}>➕</button>
                                             <button onClick={() => setBoardInputToggle(!boardInputToggle)}>
                                                  ❌
                                             </button>
                                        </div>
                                   </Box>
                              </Box>
                              <Button
                                   display={loading ? "none" : "flex"}
                                   color="#00bcd4"
                                   overflow="hidden"
                                   onClick={() => setBoardInputToggle(!boardInputToggle)}
                              >
                                   <bdi>
                                        <BsGrid1X2Fill />
                                   </bdi>
                                   +Create New Board
                              </Button>
                         </Box>
                         {
                              !boardData.length?
                                   <Box 
                                   width="100%"
                                   display="flex"
                                   justifyContent="center"
                                   alignItems="center"
                                   flexDirection="column"
                                   gap="10px"
                                   height="100vh"
                                   >
                                        <Image src='/homeSvg.svg' h="60%"/>
                                        <Heading textAlign="center">For seeing data click on any board if you have.</Heading>
                                   </Box>
                                   :
                                   <DragDropContext
                                        onDragEnd={handleDragEnd}
                                   >
                                        <Box className="task-container">

                                             <Droppable
                                                  droppableId='Todo'
                                             >
                                                  {
                                                       (provided, snapshot) =>
                                                            <Box
                                                                 ref={provided.innerRef}
                                                                 {...provided.droppableProps}
                                                                 className={`${snapshot.isDraggingOver && 'task-child-dragOver-css'}`}
                                                            >
                                                                 <Suspense fallback={<LoadingForText />}>
                                                                      <Std_Heading title="Todo" quantity={todoData.length} />
                                                                 </Suspense>
                                                                 {todoData?.map((ele, i) => {
                                                                      return (
                                                                           <Suspense fallback={<LoadingTaskComponents />} key={i}>
                                                                                <Std_TaskShower
                                                                                     key={i}
                                                                                     title={ele.title}
                                                                                     description={ele.description}
                                                                                     subtask={ele.subtask}
                                                                                     id={ele._id}
                                                                                     status={ele.status}
                                                                                     index={i}
                                                                                />
                                                                           </Suspense>
                                                                      );
                                                                 })}
                                                                 {provided.placeholder}
                                                            </Box>
                                                  }
                                             </Droppable>

                                             <Droppable
                                                  droppableId='Doing'
                                             >
                                                  {
                                                       (provided, snapshot) =>
                                                            <Box ref={provided.innerRef
                                                            }
                                                                 {...provided.droppableProps}
                                                                 className={`${snapshot.isDraggingOver && 'task-child-dragOver-css'}`}
                                                            >
                                                                 <Suspense fallback={<LoadingForText />}>
                                                                      <Std_Heading title="Doing" quantity={doingData.length} />
                                                                 </Suspense>
                                                                 {doingData?.map((ele, i) => {
                                                                      return (
                                                                           <Suspense fallback={<LoadingTaskComponents />} key={i}>
                                                                                <Std_TaskShower
                                                                                     key={i}
                                                                                     title={ele.title}
                                                                                     description={ele.description}
                                                                                     subtask={ele.subtask}
                                                                                     id={ele._id}
                                                                                     status={ele.status}
                                                                                     index={i}
                                                                                />
                                                                           </Suspense>
                                                                      );
                                                                 })}
                                                                 {provided.placeholder}
                                                            </Box>
                                                  }
                                             </Droppable>

                                             <Droppable
                                                  droppableId='Done'
                                             >
                                                  {
                                                       (provided, snapshot) => <Box ref={provided.innerRef
                                                       }
                                                            {...provided.droppableProps}
                                                            className={`${snapshot.isDraggingOver && 'task-child-dragOver-css'}`}
                                                       >
                                                            <Suspense fallback={<LoadingForText />}>
                                                                 <Std_Heading title="Done" quantity={doneData.length} />
                                                            </Suspense>
                                                            {doneData?.map((ele, i) => {
                                                                 return (
                                                                      <Suspense fallback={<LoadingTaskComponents />} key={i}>
                                                                           <Std_TaskShower
                                                                                key={i}
                                                                                title={ele.title}
                                                                                description={ele.description}
                                                                                subtask={ele.subtask}
                                                                                id={ele._id}
                                                                                status={ele.status}
                                                                                index={i}
                                                                           />
                                                                      </Suspense>
                                                                 );
                                                            })}
                                                            {provided.placeholder}
                                                       </Box>
                                                  }
                                             </Droppable>
                                        </Box>
                                   </DragDropContext>

                         }
                    </Box>
               </Box>
          </Box>
     );
};

export default Dashboard;

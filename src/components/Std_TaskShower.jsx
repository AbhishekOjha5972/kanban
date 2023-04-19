import {
     Box,
     Button,
     HStack,
     Input,
     Modal,
     ModalBody,
     ModalCloseButton,
     ModalContent,
     ModalFooter,
     ModalHeader,
     ModalOverlay,
     Select,
     Text,
     VStack,
     useDisclosure,
} from "@chakra-ui/react";
import Subtask_Component from "./Subtask_Component";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineModeEditOutline, MdOutlineDelete, MdDescription } from "react-icons/md"
import { SiTask } from "react-icons/si"
import { RxCheck, RxCross2 } from "react-icons/rx";
import { useToast } from '@chakra-ui/react'
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardAction, deleteTaskAction, updateTaskAction } from "../redux/data.actions";
import { Draggable } from "react-beautiful-dnd";

const Std_TaskShower = ({ description, title, subtask, id, status, index }) => {
     const [inputTaskToggle, setInputTaskToggle] = useState(false)
     const { boardData } = useSelector((store) => store.masterBoard)
     const { isOpen, onOpen, onClose } = useDisclosure();
     const dispatch = useDispatch()
     const [taskToggle, setTaskToggle] = useState(false)
     const taskRef = useRef(null)
     const taskDescriptionRef = useRef(null)
     const toast = useToast()
     const taskStatusRef = useRef(null)



     const handleUpdateTask = (id) => {

          if (taskRef.current.value && taskDescriptionRef.current.value) {
               let cred = {
                    title: taskRef.current.value,
                    description: taskDescriptionRef.current.value
               }
               dispatch(updateTaskAction(id, cred, boardData[0]._id))
               toast({
                    title: 'Task has been updated.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
               })
               setInputTaskToggle(!inputTaskToggle)
          } else {
               toast({
                    title: 'Please fill all the fields.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
               })
          }
     }
     const handleDeleteTask = (id) => {
          dispatch(deleteTaskAction(id, boardData[0]._id))
          toast({
               title: 'Task has been deleted.',
               status: 'success',
               duration: 5000,
               isClosable: true,
          })
     }

     const handleChangeTask = () => {
          dispatch(updateTaskAction(id, { status: taskStatusRef.current.value }, boardData[0]._id))
          toast({
               title: 'Task has been deleted.',
               status: 'success',
               duration: 5000,
               isClosable: true,
          })
     }

     return (
          <>
               <Draggable
                    draggableId={id}
                    index={index}
               >
                    {
                         (provided,snapshot) => <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => onOpen()}
                              bg="white"
                              w="100%"
                              p="20px"
                              borderRadius="10px"
                              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                              className={`task-container-css ${snapshot.isDragging && 'task-child-isDragging-css'}`}
                         >
                              <Text fontWeight="700" fontSize="20px" cursor="pointer">
                                   {description}
                              </Text>
                              <Text color="gray" >
                                   {subtask.filter((e) => e.isCompleted).length} of {subtask.length}{" "}
                                   subtasks
                              </Text>
                         </Box>
                    }
               </Draggable>
               <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader className="subtask-header">
                              {/* <SiTask /> */}
                              <Text display={inputTaskToggle ? "none" : "block"}>{title}</Text>
                              <Box style={{ display: inputTaskToggle ? "block" : "none" }}>
                                   <HStack >
                                        <input defaultValue={title} ref={taskRef} autoFocus />
                                        <HStack>
                                             <RxCheck onClick={() => handleUpdateTask(id)} />
                                             <RxCross2 onClick={() => setInputTaskToggle(!inputTaskToggle)} />
                                        </HStack>
                                   </HStack>
                              </Box>
                              <BsThreeDotsVertical onClick={() => setTaskToggle(!taskToggle)} />
                              <Box className="subtask-header-crud-css" display={taskToggle ? "block" : "none"}>
                                   <Box>
                                        <span
                                             onClick={() => {
                                                  setInputTaskToggle(!inputTaskToggle)
                                                  setTaskToggle(!taskToggle)
                                             }}
                                        >
                                             <MdOutlineModeEditOutline
                                                  color="blue"
                                             />
                                             Edit</span>

                                        <span
                                             onClick={() => handleDeleteTask(id)}
                                        >
                                             <MdOutlineDelete
                                                  color="red"
                                             />
                                             Delete</span>
                                   </Box>
                              </Box>
                         </ModalHeader>
                         <ModalBody>
                              {/* // ? description of the task section  */}
                              <HStack className="subtask-header-task-updater-css">
                                   <Box style={{ display: inputTaskToggle ? "none" : "block" }}>
                                        <Box display="flex" justifyContent="center" alignItems="center" gap="10px" mb="15px">
                                             <MdDescription color="#00bcd4" />
                                             <i>{description}</i>
                                        </Box>
                                   </Box>
                                   <Box style={{ display: inputTaskToggle ? "block" : "none" }}>
                                        <input ref={taskDescriptionRef} defaultValue={description} autoFocus />
                                   </Box>
                              </HStack>
                              <Box>
                                   <Text color="gray" padding="0px 0px 5px 0px">
                                        Subtasks ({subtask.filter((e) => e.isCompleted).length} of{" "}
                                        {subtask.length})
                                   </Text>
                                   <Box className="subtask-container">
                                        {subtask?.map((ele, i) => {
                                             return <Subtask_Component key={i} element={ele} taskId={id} />;
                                        })}
                                   </Box>
                              </Box>
                         </ModalBody>
                         <ModalFooter>
                              <Button bg="#00bcd4" color="white" mr={3} onClick={onClose}>
                                   Close
                              </Button>
                              <Select ref={taskStatusRef} onChange={handleChangeTask} defaultValue={status} required>
                                   <option value="Todo">Todo</option>
                                   <option value="Doing">Doing</option>
                                   <option value="Done">Done</option>
                              </Select>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     );
};

export default Std_TaskShower;

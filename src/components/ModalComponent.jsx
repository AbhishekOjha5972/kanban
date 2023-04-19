import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Input,
  Select,
} from "@chakra-ui/react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction } from "../redux/data.actions";
import { useToast } from '@chakra-ui/react'

const ModalComponent = () => {
  let [inputSubtastLength, setInputSubtastLength] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { boardData, onlyBoard, loading } = useSelector((store) => store.masterBoard)
  const dispatch = useDispatch()
  let formRef = useRef(null);
  const toast = useToast()
  

  const handleDeleteSubtasks = (val) => {
    const deleteVal = [...inputSubtastLength];
    deleteVal.splice(val, 1);
    setInputSubtastLength(deleteVal);
  };

  const handleChange = (val, i) => {
    const inputData = [...inputSubtastLength];
    inputData[i] = val.target.value;
    setInputSubtastLength(inputData);
  };

  //? getting form data
  const handleFormSubmit = () => {
    if (onlyBoard.length) {
      let boardId = ""
      if (onlyBoard.length == 1) {
        boardId = onlyBoard[0]._id
      }
      else if (onlyBoard.length > 1 && boardData.length == 0) {
        return toast({
          title: 'Many boards have been detected.',
          description: "Select some any board in which you want to create task.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        boardId = boardData[0]._id
      }
      let obj = {
        title: formRef.current.title.value,
        description: formRef.current.description.value,
        status: formRef.current.status.value,
        subtask: inputSubtastLength.map((ele) => {
          return {
            title: ele,
            isCompleted: false,
          };
        }),
      };
      dispatch(createTaskAction(boardId, obj))
      setInputSubtastLength([])
      onClose()
      formRef.current.reset();
      toast({
        title: 'New board has been added.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
    else {
      toast({
        title: 'Create board first.',
        description: "Click on '+Create New Board' button.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }

  };

  return (
    <>
      <Button className="std-btn" bg="#00bcd4" color="white" onClick={onOpen}>
        +Add New Task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form ref={formRef}>
              <div className="std-label-input">
                <label className="std-label">Task Name</label>
                <input className="std-input" id="title" required />
              </div>
              <div className="std-label-input">
                <label className="std-label">Description</label>
                <textarea
                  className="std-input"
                  required
                  id="description"
                ></textarea>
              </div>
              <div className="std-label-input">
                <label className="std-label">Subtasks</label>
                {inputSubtastLength.map((ele, i) => {
                  return (
                    <Box
                      key={i}
                      display="flex"
                      justifyContent="space-between"
                      margin="10px"
                    >
                      <Input
                        id="subtasks"
                        value={ele}
                        w="80%"
                        className="std-input"
                        onChange={(e) => handleChange(e, i)}
                        required
                      />
                      <Button
                        onClick={() => handleDeleteSubtasks(i)}
                        w="inherit"
                      >
                        ❌
                      </Button>
                    </Box>
                  );
                })}
                <button
                  type="button"
                  className="std-btn"
                  onClick={() =>
                    setInputSubtastLength([...inputSubtastLength, []])
                  }
                >
                  +Add New Subtasks
                </button>
              </div>
              <div className="std-label-select">
                <label className="std-label">Current Status</label>
                <Select className="std-select" required id="status">
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                  <option value="Done">Done</option>
                </Select>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              w="100%"
              className="std-btn"
              onClick={handleFormSubmit}
              variant="ghost"
              isLoading={loading}
            >
              Create Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComponent;

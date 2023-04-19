import { changeSubtaskStatusAction, deleteSubtaskAction, updateSubtaskAction } from "../redux/data.actions"
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { RxCheck, RxCross2 } from "react-icons/rx"
import React, { useRef, useState } from 'react'
import { useToast } from '@chakra-ui/react'

const Subtask_Component = ({ element,taskId }) => {
  const { boardData, loading } = useSelector((store) => store.masterBoard);
  const [selectedSubtask, setSelectedSubtask] = useState(false)
  const { title, _id, isCompleted } = element
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleStatusChange = (id) => {
    dispatch(changeSubtaskStatusAction(id, boardData[0]._id))
    toast({
      title: 'Status Updated',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const handleUpdateSubtask = (id) => {
    let cred = { title: inputRef.current.value }
    dispatch(updateSubtaskAction(id, cred, boardData[0]._id))
    toast({
      title: 'Task Updated',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    setSelectedSubtask(!selectedSubtask)
  }


  const handleDeleteSubtask = (id) =>{
      dispatch(deleteSubtaskAction(id,taskId,boardData[0]._id,))
      toast({
        title: 'Subtask has been deleted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
  }


  return !selectedSubtask ? (
    <Box className='subtask-child-container'>
      <Box>
        <input type="checkbox" onChange={() => handleStatusChange(_id)} checked={isCompleted} />
        <span className={isCompleted ? "input-type-checked-css" : "input-type-unchecked-css"}>{title}</span>
      </Box>
      <Box className="subtask-child-editor">
        <MdOutlineModeEditOutline
          color="blue"
          onClick={() => setSelectedSubtask(!selectedSubtask)}
        />
        <MdOutlineDelete
          color="red"
          onClick={() => handleDeleteSubtask(_id)}
        />
      </Box>
    </Box>
  ) :
    <Box className="subtask-child-edit-and-delete-css">
      <Box>
        <input type="checkbox" onChange={() => handleStatusChange(_id)} checked={isCompleted} />
        <input defaultValue={title} autoFocus={true} ref={inputRef} />
      </Box>
      <Box>
        <RxCheck onClick={() => handleUpdateSubtask(_id)} />
        <RxCross2 onClick={() => setSelectedSubtask(!selectedSubtask)} />
      </Box>
    </Box>
}

export default Subtask_Component
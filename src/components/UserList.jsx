import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getDetails, singleUser, upDateUser } from "../redux/app/store";

const UserList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails());
  }, [dispatch]);

  const { isLoading, users, isError } = useSelector((state) => state.app);

  const handleDelete = (id)=>{
     dispatch(deleteUser(id))
  }

  const handleEdit = (user) =>{
     dispatch(singleUser(user))
     
  }

  return (
    <Box w={['90%','90%','80%','70%']} mx={"auto"} mt={"2rem"}>
      <Box
        fontSize={"2rem"}
        textAlign={"center"}
        fontWeight={"700"}
        color={"purple"}
        textTransform={"uppercase"}
        my={"1rem"}
      >
        Users List
      </Box>
      {isLoading ? (
        <Box fontSize={"1.5rem"} fontWeight={"bold"} textAlign={"center"}>
          Loading...
        </Box>
      ) : (
        <TableContainer w={"100%"}>
          <Table>
            <Thead>
              <Tr>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  ID
                </Td>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  User Name
                </Td>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  Phone No.
                </Td>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  Email
                </Td>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  Age
                </Td>
                <Td fontSize={"1.2rem"} fontWeight={"600"} p={2}>
                  Salary
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              {users && users?.map((user, index) => (
                <Tr key={user.id}>
                  <Td>{index + 1}</Td>
                  <Td textTransform={'capitalize'}>{user.username}</Td>
                  <Td>{user.phone}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.age}</Td>
                  <Td>{user.salary}</Td>
                  <Td>
                    <HStack>
                         <Button colorScheme="green" onClick={()=>handleEdit(user)}>Edit</Button>
                         <Button colorScheme="red" onClick={()=>handleDelete(user.id)}>Delete</Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserList;

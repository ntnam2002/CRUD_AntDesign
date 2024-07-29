import React, { useEffect, useState, useMemo } from "react";
import { Space, Table, Button, Modal, Form, Input } from "antd";
import { MdDeleteForever } from "react-icons/md";
//import "./userTable.css";
import {
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    createUser,
} from "../services/userService";
import { GrUpdate } from "react-icons/gr";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            const formattedUsers = usersData.map((user, index) => ({
                key: index,
                ...user,
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
            fetchUsers();
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
        }
    };

    const showUpdateModal = async (userId) => {
        try {
            const user = await getUserById(userId);
            form.setFieldsValue(user[0]);
            setSelectedUser(user);
            setIsModalVisible(true);
        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
        }
    };

    const handleAddUser = () => {
        form.resetFields();
        setSelectedUser(null);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
        form.resetFields();
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();

            await updateUser(selectedUser[0].id, values);
            fetchUsers();
            handleCloseModal();
        } catch (error) {
            console.error(`Error updating user: ${error.message}`);
        }
    };

    const columns = useMemo(() => {
        if (users.length === 0) return [];

        const dynamicColumns = Object.keys(users[0]).map((key) => ({
            title: key.charAt(0).toUpperCase() + key.slice(1),
            dataIndex: key,
            key: key,
        }));

        dynamicColumns.push({
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showUpdateModal(record.id)}>
                        <GrUpdate />
                    </Button>
                    <Button onClick={() => handleDelete(record.id)}>
                        <MdDeleteForever />
                    </Button>
                </Space>
            ),
        });

        return dynamicColumns;
    }, [users]);

    return (
        <div className="table-container">
            <Button
                type="primary"
                style={{ margin: "20px", float: "right" }}
                onClick={handleAddUser}
            >
                Thêm user
            </Button>
            <Table columns={columns} dataSource={users} />
            <Modal
                title={selectedUser ? "Update User" : "Add User"}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                onOk={handleUpdate}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input the phone number!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserList;

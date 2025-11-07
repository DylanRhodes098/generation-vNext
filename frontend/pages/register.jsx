import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as userRegister } from "../services/auth";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

export default function Register() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setErr("");
        try {
            await userRegister({ full_name: values.fullName, password: values.password, email: values.email });
            navigate("/login", { replace: true });
        } catch (error) {
            const message = error?.response?.data?.error || "Something went wrong";
            setErr(message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="bg-white shadow rounded-lg p-6 space-y-4"
                >
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link className="text-blue-600 hover:text-blue-500" to="/login">Sign in</Link>
                        </p>
                    </div>

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input
                            id="fullName"
                            type="text"
                            placeholder="John Doe"
                            required
                            autoComplete="name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            autoComplete="new-password"
                        />
                    </Form.Item>

                    {err ? (
                        <p className="text-sm text-red-600">{err}</p>
                    ) : null}

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary" 
                            htmlType="submit"
                            className="w-full"
                        >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
        
    

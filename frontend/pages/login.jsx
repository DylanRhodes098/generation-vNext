import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as userLogin } from "../services/auth";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

export default function Login() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setErr("");
        try {
            const data = await userLogin({ email: values.email, password: values.password });
            if (data?.token) {
                sessionStorage.setItem("authToken", data.token);
                if (data?.id) sessionStorage.setItem("id", data.id);
            }
            navigate("/", { replace: true });
        } catch (error) {
            const message = error?.response?.data?.error || "Invalid credentials";
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
                        <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            New here?{' '}
                            <Link className="text-blue-600 hover:text-blue-500" to="/register">Create an account</Link>
                        </p>
                    </div>

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
                            autoComplete="current-password"
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
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

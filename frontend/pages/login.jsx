import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as userLogin } from "../services/auth";
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        setErr("");
        try {
            const data = await userLogin({ email, password });
            if (data?.token) {
                sessionStorage.setItem("authToken", data.token);
                if (data?.id) sessionStorage.setItem("id", data.id);
            }
            navigate("/", { replace: true });
        } catch (error) {
            const message = error?.response?.data?.error || "Invalid credentials";
            setErr(message);
        }
    }

    const onFinish = values => {
        console.log('Success:', values);
      };
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      }

    return (
     <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    onSubmit={onSubmit} 
    className="bg-white shadow rounded-lg p-6 space-y-4">
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        New here?{' '}
                        <Link className="text-blue-600 hover:text-blue-500" to="/register">Create an account</Link>
                    </p>
                </div>
                </div>
                </div>

                    <div>
                    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            autoComplete="email"
                        />
                        </Form.Item>
                    </div>

                    <div>
                    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]} 
                        htmlFor="password" 
                        className="block text-sm font-medium text-gray-700">
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            autoComplete="current-password"
                        />
                        </Form.Item>
                    </div>

                    {err ? (
                        <p className="text-sm text-red-600">{err}</p>
                    ) : null}

                    <Button
                    type="primary" 
                    htmlType="submit"
                        className=""
                    >
                        Sign in
                    </Button>
                </Form>
           
    );
}

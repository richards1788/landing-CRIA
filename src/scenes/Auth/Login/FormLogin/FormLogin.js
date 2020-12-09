import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { auth } from '../../../../services/Auth/AuthActions'

export const Login = ({ form }) => {
	const { login } = auth
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const handleSubmit = (values) => {
		console.log('Received values of form: ', values)
		dispatch(login(values.email, values.password))
	}

	return (
		<Form onFinish={handleSubmit} className='login-form' name='FormLogin' initialValues={{ remember: true }}>
			<Row>
				<Col span={24}>
					<Form.Item
						label={t('mail')}
						name='email'
						rules={[{ required: true, message: `${t('pleace')}s ${t('mail')}` }]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col span={24}>
					<Form.Item
						label={t('password')}
						name='password'
						rules={[{ required: true, message: `${t('pleace')}s ${t('password')}` }]}>
						<Input type='password' />
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col span={6}>
					<Form.Item>
						<a className='login-form-forgot' href=''>
							{t('reset_password')}
						</a>
					</Form.Item>
				</Col>
				<Col span={4} offset={14}>
					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							{t('continue')}
						</Button>
					</Form.Item>
				</Col>
			</Row>

			<Row>
				<Col span={6}>
					<Form.Item name='remember' valuePropName='checked'>
						<Checkbox>{t('remember')}</Checkbox>
					</Form.Item>
				</Col>
				<Col span={4} offset={14}>
					<Form.Item>
						<Form.Item>
							<Button type='primary' className='login-form-button'>
								{t('register')}
							</Button>
						</Form.Item>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

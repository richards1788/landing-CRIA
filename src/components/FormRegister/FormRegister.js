import React from 'react'
import { Form, Input, Row, Col, Checkbox, Button, Select, DatePicker } from 'antd'
import * as moment from 'moment'
import { useTranslation } from 'react-i18next'

export const Register = ({ form }) => {
	const { t } = useTranslation()
	const { Option } = Select
	const currentDate = moment()

	const validateTerms = (rule, value, callback) => {
		if (!value) {
			callback(t('accept_privacy'))
		} else {
			callback()
		}
	}

	const validateLength = (rule, value, callback) => {
		if (value && value.length < 3) {
			callback(t('minimum'))
		}
		if (value && value.length > 60) {
			callback(t('maximum'))
		} else {
			callback()
		}
	}

	const validateTime = (rule, value, callback) => {
		if (value) {
			const value_format = value.format('DD/MM/YYYY')
			const date_user = moment(value_format, 'DD/MM/YYYY')
			if (currentDate.diff(date_user, 'years') <= 18) {
				callback(t('not_age'))
			} else {
				callback()
			}
		} else {
			callback()
		}
	}

	const handleSubmit = (values) => {
		console.log('Received values of form: ', values)
	}

	const handleConfirmBlur = (e) => {
		const { value } = e.target
		//console.log('handle confir blur', value);
		//this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	const handleChange = (value) => {
		// console.log(`selected ${value}`);
	}

	return (
		<Form name='FormRegister' onFinish={handleSubmit}>
			{/*Nombre, Apellido*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name='nickname'
						rules={[
							{
								required: true,
								message: `${t('pleace')}s ${t('name_first')}`,
								whitespace: true,
							},
							{
								validator: validateLength,
							},
						]}
						label={t('name_first')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						label={t('name_last')}
						name='lastname'
						hasFeedback
						rules={[
							{
								required: true,
								message: `${t('pleace')}s ${t('name_last')}`,
								whitespace: true,
							},
							{
								validator: validateLength,
							},
						]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			{/*correo, telefono*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name='email'
						rules={[
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
							{
								required: true,
								message: `${t('pleace')} ${t('mail')}`,
							},
						]}
						label={t('mail')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						rules={[
							{
								required: true,
								message: `${t('pleace')} ${t('phone')}`,
							},
						]}
						name='phone'
						label={t('phone')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			{/*edad, sexo, estadoc ivil*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						label={t('sex')}
						name='sexo'
						rules={[
							{
								required: true,
								message: `${t('pleace_select')} ${t('sex')}`,
							},
						]}
						hasFeedback>
						<Select onChange={handleChange}>
							<Option value='F'>F</Option>
							<Option value='M'>M</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='civil'
						rules={[
							{
								required: true,
								message: `${t('pleace_select')} ${t('status_marital')}`,
							},
						]}
						label={t('status_marital')}
						hasFeedback>
						<Select onChange={handleChange}>
							<Option value='single'>{t('single')}</Option>
							<Option value='married'>{t('married')}</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>

			{/*fecha de nacimiento, lugar de nacimiento*/}
			<Row gutter={16}>
				<Col span={6}>
					<Form.Item
						label={t('birthdate')}
						name='date-picker'
						rules={[
							{
								type: 'object',
								required: true,
								message: `${t('pleace_select')} ${t('birthdate')}`,
							},
							{
								validator: validateTime,
							},
						]}
						hasFeedback>
						<DatePicker />
					</Form.Item>
				</Col>
				<Col span={18}>
					<Form.Item
						name='nacimiento'
						rules={[
							{
								required: true,
								message: `${t('pleace')} ${t('place_birth')}`,
								whitespace: true,
							},
							{
								validator: validateLength,
							},
						]}
						label={t('place_birth')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			{/*pasaporte, numero de pasaporte*/}
			<Row gutter={16}>
				<Col span={8}>
					<Form.Item
						name='pasaporte'
						rules={[
							{
								required: true,
								message: `${t('pleace')} ${t('passport')}`,
								whitespace: true,
							},
						]}
						label={t('passport')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
				<Col span={16}>
					<Form.Item
						rules={[
							{
								required: true,
								message: `${t('pleace')} ${t('passport_number')}`,
							},
						]}
						name='Numeropasaprte'
						label={t('passport_number')}
						hasFeedback>
						<Input />
					</Form.Item>
				</Col>
			</Row>

			{/*contrasena/ confirmacion*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name='password'
						rules={[
							{
								required: true,
								message: `${t('pleace')} ${t('password')}`,
							},
						]}
						label={t('password')}
						hasFeedback>
						<Input.Password />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(rule, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}

									return Promise.reject('The two passwords that you entered do not match!')
								},
							}),
						]}>
						<Input.Password />
					</Form.Item>
				</Col>
			</Row>

			{/*politicas*/}
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						name='agreement'
						valuePropName='checked'
						rules={[
							{
								validator: validateTerms,
							},
						]}>
						<Checkbox>{t('terms')}</Checkbox>
					</Form.Item>
				</Col>
			</Row>

			{/*subtmit*/}
			<Row type='flex' justify='end'>
				<Col span={4}>
					<Form.Item>
						<Button type='primary' htmlType='submit'>
							{t('register')}
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	)
}

const MongoClient = require('mongodb').MongoClient;

// Configurações do servidor MongoDB
const url = 'mongodb://localhost:27017'; // URL do servidor MongoDB
const dbName = 'mydatabase'; // Nome do banco de dados

export const tryCatch = (promise) => {
	// await without try, catch
	return promise
		.then((data) => {
			return [null, data];
		})
		.catch((err) => [err]);
};



/**
* @function
* @description [POST] - Cria um usuário ativo e seta uma permissão inicial
* @param {JSON} body
* @param {String} body.email email do usuário
* @param {String} body.password senha do usuário
* @param {String} body.confirmPassword confirmação de senha
* @param {String} body.cpf cpf do usuário
* @returns {(Object | String)} code 200 (Success)
* @returns {Number} code 500 (Internal Server Error)
* @returns {Array} code 500 (Internal Server Error)
* @returns {Same Email || CPF} code 400 (Bad Request)
*/
const createUserFunction = (req,res)=>{
	const create = async ()=> {
		const { email, password, confirmPassword, cpf, name, lastName, phone, address } = req.body;

		if(!email || !password || !confirmPassword || !cpf || !name || !lastName ){
			return res.status(500).json({message: "Preencha todos os campo"});
		}

		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "Email já cadastrado" });
		}

		const cpfExists = await User.findOne({ cpf });

		if (cpfExists) {
			return res.status(400).json({ message: "CPF já cadastrado" });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Senhas não correspondentes" });
		}

		const [ err, userID] = await tryCatch(
			UserInfo.create({name, lastName, phone, address})
		);

		if(err){
			return res.status(500).json({err});
		}
		const userInfo = mongoose.Types.ObjectId(userID._id);

		const user = new User({ email, password, cpf, userInfo });

		const [errFindGroup, group] = await tryCatch(getStandardGroups());
		if (errFindGroup) return res.status(500).json({ message: "Error" });
		user.save(async (err, createdUser) => {
			if (err)
				return res.status(500).json({ message: " Erro ao salvar o usuário" });

			if (permissions && permissions.length > 0) {
				const [errSetPermissionMatrix] = await tryCatch(
					setPermissionMatrix(createdUser._id, permissions, true)
				);

				if (errSetPermissionMatrix)
					return res.status(500).json({ message: " Erro ao salvar o usuário" });
			} else {
				const [errFindRoles, standardPerm] = await tryCatch(
					getStandardPermission()
				);

				if (errFindRoles)
					return res.status(500).json({ message: " Erro ao salvar o usuário" });

				const newPermissions = [
					{
						permission: standardPerm._id,
						group: group._id,
					},
				];

				const [errSetPermissionMatrix] = await tryCatch(
					setPermissionMatrix(createdUser._id, newPermissions, true)
				);

				if (errSetPermissionMatrix)
					return res.status(500).json({ message: " Erro ao salvar o usuário" });
			}
		});

		return res.status(200).json({ user });
	};
	create();
};
export const createUser = processMiddleware(createUserFunction,{ schema: {}, methods: ["POST"], filters: [] });

/**
* @function
* @description [GET] - Retorna um array de todos os usúario, tanto ativos como inativos
* @param {JSON} body
* @returns {Object} code 200 (Success)
* @returns {String} code 401 (unauthorized)
* @returns {String} code 500 (Internal Server Error)
*/
const getAllFunction = (req, res) =>{
	const listAll = async ()=>{
		const users = User.find({"active": true}).populate("userInfo");
		users.exec((err, data) => {
			if (err) res.status(500).json(err);
			else res.status(200).json(data);
		});
	};
	listAll();
};
export const getAll = processMiddleware(getAllFunction, {schema: {}, methods: ["GET"], filters: ["auth/auth"]});

/**
* @function
* @description [GET] - Retorna um array de todos os usúario ativos
* @param {JSON} body
* @returns {Object} code 200 (Success)
* @returns {String} code 401 (unauthorized)
* @returns {String} code 500 (Internal Server Error)
*/
const getInactiveFunction = (req, res) =>{
	const listAllInactive = async ()=>{
		const users = User.find({"active": false}).populate("userInfo");;
		users.exec((err, data) => {
			if (err) res.status(500).send(err);
			else res.status(200).send(data);
		});
	};
	listAllInactive();
};
export const getAllInactive = processMiddleware(getInactiveFunction, {schema: {}, methods: ["GET"], filters: ["auth/auth"]});

/**
* @function
* @description [POST] - Edita os dados do usuário apartir do token
* @param {JSON} body
* @param {String} body.email campo email
* @param {String} body.password campo senha
* @param {String} body.cpf campo cpf
* @param {String} body.active ativa ou inativa um usuário
* @returns {(Object | String)} code 200 (Success)
* @returns {Object | Number} code 500 (Internal Server Error)
* @returns {Array} code 500 (Internal Server Error)
*/
const editUserFunction = (req, res) =>{
	const { email, password, cpf, confirmPassword, name, lastName, phone, address } = req.body;
	const edit = async () => {
		if(password && password.length > 0){
			if(password != confirmPassword){
				return res.status(500).json({ message: "Senhas Divergentes" });
			}
			const [err, user] = await tryCatch(User.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }).exec());
			if (err) return res.status(500).json({ message: "Erro ao encontrar usuario: ", err });
			user.password = password;
			await user.save();
		}

		const [error, user] = await tryCatch(User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {email, cpf }).exec());
		if (error) return res.status(500).json({ message: "Erro ao salvar usuário: ", error });

		const [err] = await tryCatch(UserInfo.findOneAndUpdate({ _id: mongoose.Types.ObjectId(user.userInfo) }, {name, lastName, phone, address }).exec());

		if (err) return res.status(500).json({ message: "Erro ao salvar usuário: ", err });
		return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
	};
	edit();
};
export const editUser = processMiddleware(editUserFunction, {schema: {}, methods: ["POST"], filters: ["auth/auth"]});

/**
* @function
* @description [POST] - Inativa um usuário apartir do token
* @param {JSON} body
* @returns {Object} code 200 (Success)
* @returns {Not Found Token} code 500 (Internal Server Error)
* @returns {Array} code 500 (Internal Server Error)
*/
const deleteMyUserFunction = (req, res) =>{
	const remove = async () => {
		const [err] = await tryCatch(User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.user._id) }, {"active": false}).exec());
		if (err) return res.status(500).json({ message: "Erro ao tentar deletar usuário: ", err });
		return res.status(200).json({ message: "Usuário deletado!" });
	};
	remove();
};
export const deleteMyUser = processMiddleware(deleteMyUserFunction, {schema: {}, methods: ["POST"], filters: ["auth/auth"]});

/**
* @function
* @description [POST] - Faz login e gera um Token
* @param {JSON} body
* @param {String} body.email email do usuário
* @param {String} body.password senha do usuário
* @returns {(Object | String)} code 200 (Success)
* @returns {(Object | String Invalid)} code 400 (Bad Request)
* @returns {Object | Number} code 500 (Internal Server Error)
* @returns {Array | String} code 500 (Internal Server Error)
* @returns {Array | Number} code 500 (Internal Server Error)
*/
const loginFunction = (req, res) =>{
	const login = async () => {
		const { email, password } = req.body;

		const user = await User.findOne({ email, "active": true}).exec();
		if (!user) {
			return res.status(400).json({ message: "Usuário não encontrado" });
		}

		const isMatch = user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: "Senha incorreta" });
		}

		const token = generateToken({ _id: user._id, email });

		return res.status(200).json({ user, token });
	};
	login();
};
export const login = processMiddleware(loginFunction, {schema: {}, methods: ["POST"], filters: []});

/**
* @function
* @description [POST] - Envia uma senha provisória para o usuário
* @param {JSON} body
* @param {String} body.email email para alteração e envio da senha
* @returns {(object| String)} code 200 (Success)
* @returns {(Object | String Invalid)} code 400 (Bad Request)
* @returns {Object | Number} code 500 (Internal Server Error)
* @returns {Array | String} code 500 (Internal Server Error)
* @returns {Array | Number} code 500 (Internal Server Error)
*/
const forgotPasswordFunction = (req, res) =>{
	const resetPassword = async () => {
		const passwordRandom = Math.random().toString(36).slice(-8);
		const { email } = req.body;
		const user = await User.findOne({ email, "active": true}).exec();

		if (!user) {
			return res.status(400).json({ message: "Usuário não encontrado" });
		}

		user.password = passwordRandom;
		await user.save();
		Send.send({
			from: "biel@moux.com.br",
			to: email,
			subject: "Senha Provisória",
			html: `<p>${passwordRandom}</p>`
		}).then(response => {
			return res.json({ "message": "sua senha foi enviada por e-mail" });
		}).catch(err => {
			return res.json({ "message": "Erro ao enviar email" });
		});
	};
	resetPassword();
};
export const forgotPassword = processMiddleware(forgotPasswordFunction, {schema: {}, methods: ["POST"], filters: []});


const deleteUserFunction = (req, res) =>{
	const remove = async () => {
		const [err] = await tryCatch(User.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.body._id) }, {"active": false}).exec());
		if (err) return res.status(500).json({ message: "Erro ao tentar deletar usuário: ", err });
		return res.status(200).json({ message: "Usuário deletado!" });
	};
	remove();
};
export const deleteUser = processMiddleware(deleteUserFunction, {schema: {}, methods: ["POST"], filters: ["auth/auth"]});
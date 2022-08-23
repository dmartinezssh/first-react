import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usersService } from './api/users.service';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    const auth = useAuth()
    const navigate = useNavigate();
    return <>
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validate={(valores) => {
                let errores = {};
                if(!valores.username) {
                    errores.username = 'Por favor ingresa un nombre';
                }

                if(!valores.password) {
                    errores.password = 'Por favor ingresa una contraseña'
                } else if(valores.password.length < 6) {
                    errores.password = 'La contraseña no debe ser menor a 6 caracteres'
                }
                return errores;
            }}
            onSubmit={async (valores, { resetForm }) => {
                resetForm();
                setFormularioEnviado(true);
                setTimeout(() => setFormularioEnviado(false), 1500);

                const users = await usersService.post('auth/login', valores, { params: { }, headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9'} })
                    .catch(({response}) => console.error(response.data.message));
                auth.login(true);
                navigate('/search')
            }}
        >
            {( {errors} ) => (    
                <Form className="formulario">
                    <div>
                        <label htmlFor="username">Usuario</label>
                        <Field 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Usuario" 
                            autoComplete="off" 
                        />
                        <ErrorMessage name="username" component={() =><div className="error">{errors.username}</div>} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                        />
                        <ErrorMessage name="password" component={() => <div className="error">{errors.password}</div>} />
                    </div>
                    <button type="submit">Enviar</button>
                    {formularioEnviado &&<p className="exito">Formulario enviado con exito!</p>}
                </Form>
            )}
        </Formik>
    </>
}
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { usersService } from './api/users.service';

export const Auth = () => {
    const [formularioEnviado, setFormularioEnviado] = useState(false);
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

                /* if(!valores.sexo) {
                    errores.sexo = 'Por favor seleccione un sexo';
                } */
                return errores;
            }}
            onSubmit={async (valores, { resetForm }) => {
                resetForm();
                setFormularioEnviado(true);
                setTimeout(() => setFormularioEnviado(false), 1500);

                const users = await usersService.post('auth/login', valores)
                    .catch(({response}) => console.error(response.data.message));
                console.log(users.data);
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
                    {/* <div>
                        <Field name="country" as="select">
                            <option value="mx">México</option>
                            <option value="co">Colombia</option>
                            <option value="us">Estados Unidos</option>
                        </Field>
                    </div>
                    <div>
                        <label>
                            <Field type="radio" name="sexo" value="hombre" /> Hombre
                        </label>
                        <label>
                            <Field type="radio" name="sexo" value="mujer" /> Mujer
                        </label>
                        <ErrorMessage name="sexo" component={() => <div className="error">{errors.sexo}</div>} />
                    </div>
                    <div>
                        <Field name="mensaje" as="textarea" />
                    </div> */}
                    <button type="submit">Enviar</button>
                    {formularioEnviado &&<p className="exito">Formulario enviado con exito!</p>}
                </Form>
            )}
        </Formik>
    </>
}
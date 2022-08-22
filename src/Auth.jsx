import { useState } from 'react'
import { Formik } from 'formik';

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
                return errores;
            }}
            onSubmit={(valores, { resetForm }) => {
                resetForm();
                console.log('Formulario enviado', valores)
                setFormularioEnviado(true);
                setTimeout(() => setFormularioEnviado(false), 1500);
            }}
        >
            {( {values, touched, errors, handleChange, handleBlur, handleSubmit} ) => (    
                <form className="login" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Usuario</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Usuario" 
                            autoComplete="off" 
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && <div className="error">{errors.username}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && <div className="error">{errors.password}</div>}
                    </div>
                    <button type="submit">Enviar</button>
                    {formularioEnviado &&<p className="exito">Formulario enviado con exito!</p>}
                </form>
            )}
        </Formik>
    </>
}
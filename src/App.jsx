import { Link, Route, Routes, useParams, Outlet, Navigate } from 'react-router-dom';
import { NavLink } from './NavLink';
import { Auth } from './Auth';
import { useAuth, AuthProvider } from './useAuth';

const Home = () => <h1>HOME</h1>

const Search = () => {
    const products = [
        'Crema',
        'Media Crema',
        'Yogurth',
        'Leche Entera',
        'Leche Deslactosa'
    ]
    return <>
        <h1>SEARCH</h1>
        <ul>
            {products.map( (product, index) => (
                <li><Link key={index} to={`/search/${index}`}>{product}</Link></li>
            ))}
        </ul>
    </>
}

const SearchDetail = () => {
    const { id } = useParams()
    return <>
        <h1>Producto: {id}</h1>
        <Link to='ingredients'>Ver los ingredientes</Link>
        <Outlet />
    </>
}

const Ingredients = () => {
    const { id } = useParams()
    console.log(id);
    return <>
        <h3>Los Ingredientes son: </h3>
    </>
}

const Guard = ({children}) => {
    const { isAuthenticated } = useAuth()
    if(!isAuthenticated)
        return <Navigate to="/login" />
    return children
}


export const App = () => {
    return <div className="labels">
        <header>
            <h1>Etiquetado</h1>
            <nav>
                <ul>
                    <li><NavLink to='/' >Home</NavLink></li>
                    <li><NavLink to='/login'>Login</NavLink></li>
                    <li><NavLink to='/search'>Search</NavLink></li>
                </ul>
            </nav>
        </header>
        <AuthProvider>
            <Routes>
                <Route  path='/' element={<Home />} />
                <Route  path='/login' element={<Auth />} />
                <Route  path='/search' element={<Guard><Search /></Guard>} />
                <Route  path='/search/:id' element={<Guard><SearchDetail /></Guard>}>
                    <Route path='ingredients' element={<Ingredients/>} />
                </Route>
                <Route path='*' element={<h1>NOT FOUND</h1>} />
            </Routes>
        </AuthProvider>
        

    </div>
}
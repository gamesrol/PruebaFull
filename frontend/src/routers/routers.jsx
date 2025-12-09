import {createBrowserRouter} from 'react-router-dom'
import Layout from '../Layout/layout.jsx';
import PersonsList from '../components/Persons/PersonsList.jsx';
import PersonDetail from '../components/Persons/PersonDetail.jsx';
import PersonCreate from '../components/Persons/PersonCreate.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <PersonsList />
            },
            {
                path: '/persons/:id',
                element: <PersonDetail />
            },
            {
                path: '/persons/create/:id?',
                element: <PersonCreate />
            }
        ]
    }
]);
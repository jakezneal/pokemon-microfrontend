import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonPage from './pokemon-page/pokemon-page.component';

export default function Root(props) {
    const router = createBrowserRouter([
        {
            path: '/pokemon',
            element: <PokemonPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

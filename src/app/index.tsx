import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Cube, Home } from '../pages/home';

import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();

root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cube" element={<Cube />} />
                    <Route path="*" element={<p>Not Found</p>} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);

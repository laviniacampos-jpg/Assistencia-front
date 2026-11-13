import { useState, type JSX } from "react";
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface CustomMenuItem extends MenuItem {
    badge?: number;
    shortcut?: string;
    items?: CustomMenuItem[];
}

function Navegacao(): JSX.Element {

    const [menuAberto, setMenuAberto] = useState(false);

    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');

        return !!(
            isAuth &&
            token &&
            AuthRequests.checkTokenExpiry()
        );
    });

    const navigate = useNavigate();

    const nome =
        localStorage.getItem('nome') || 'Usuário';

    const email =
        localStorage.getItem('email') || '';

    const avatarImage =
        "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    const items: CustomMenuItem[] = [

        {
            label: 'Home',
            icon: 'pi pi-home',
            className:
                'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
            command: () => navigate('/')
        },

        ...(isAuthenticated ? [

            {
                label: 'Alunos',
                icon: 'pi pi-user',
                className:
                    'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () =>
                    navigate('/lista/alunos')
            },

            {
                label: 'Livros',
                icon: 'pi pi-book',
                className:
                    'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () =>
                    navigate('/lista/livros')
            },

            {
                label: 'Empréstimos',
                icon: 'pi pi-shopping-cart',
                className:
                    'mx-2 md:mx-4 text-white text-sm md:text-base lg:text-lg',
                command: () =>
                    navigate('/lista/emprestimos')
            }

        ] : [])
    ];

    const start = (
        <img
            alt="logo"
            src={appIcon}
            className="h-10 md:h-12 lg:h-14 w-auto ml-2 md:ml-4 lg:ml-6"
        />
    );

    const userActions = isAuthenticated ? (

        <div className="flex items-center justify-end mr-4 md:mr-6 lg:mr-10 gap-2 md:gap-4">

            <div className="flex flex-col pr-2 md:pr-3 hidden sm:flex">

                <p className="text-white font-semibold m-0 text-sm md:text-base">
                    {nome}
                </p>

                <p className="text-white text-xs md:text-sm m-0">
                    {email}
                </p>

            </div>

            <Avatar
                image={avatarImage}
                shape="circle"
                className="!w-8 !h-8 md:!w-10 md:!h-10"
            />

            <button
                className="bg-white ml-2 md:ml-4 text-slate-700 px-3 py-1.5 md:px-5 md:py-2 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                onClick={AuthRequests.removeToken}
            >
                <i className="pi pi-sign-out"></i>
                <span>Sair</span>
            </button>

        </div>

    ) : (

        <button
            className="bg-white font-bold text-slate-700 px-3 py-1.5 md:px-5 md:py-2 mr-4 md:mr-6 lg:mr-10 rounded border-none cursor-pointer flex items-center justify-center gap-1 hover:bg-gray-100 transition-colors text-xs md:text-sm"
            onClick={() => navigate('/login')}
        >
            <i className="pi pi-sign-in"></i>
            <span>Login</span>
        </button>

    );

    return (

        <>
            <header className="card bg-slate-700 flex items-center justify-between px-2 md:px-4 py-3 min-h-[64px]">

                {/* DESKTOP */}
                <div className="hidden md:flex flex-1">

                    <Menubar
                        model={items}
                        start={start}
                    />

                </div>

                {/* MOBILE */}
                <div className="flex md:hidden items-center justify-between w-full">

                    {start}

                    <button
                        className="text-white text-3xl mr-4"
                        onClick={() =>
                            setMenuAberto(!menuAberto)
                        }
                    >
                        ☰
                    </button>

                </div>

                {/* AÇÕES USUÁRIO DESKTOP */}
                <div className="hidden md:flex">
                    {userActions}
                </div>

            </header>

            {/* MENU MOBILE */}
            {
                menuAberto && (

                    <div className="md:hidden bg-slate-800 text-white p-4 flex flex-col gap-4">

                        {
                            items.map((item, index) => (

                                <button
                                    key={index}
                                    className="text-left hover:bg-slate-700 p-2 rounded transition-all"
                                    onClick={() => {

                                        if (item.command) {
                                            item.command({} as any);
                                        }

                                        setMenuAberto(false);
                                    }}
                                >

                                    <div className="flex items-center gap-2">

                                        {
                                            item.icon && (
                                                <i className={item.icon}></i>
                                            )
                                        }

                                        <span>
                                            {item.label}
                                        </span>

                                    </div>

                                </button>

                            ))
                        }

                        <div className="pt-4 border-t border-slate-600">

                            <div className="flex flex-col gap-4">

                                <div className="flex items-center gap-3">

                                    <Avatar
                                        image={avatarImage}
                                        shape="circle"
                                        className="!w-10 !h-10"
                                    />

                                    <div>

                                        <p className="text-white font-semibold m-0">
                                            {nome}
                                        </p>

                                        <p className="text-gray-300 text-sm m-0">
                                            {email}
                                        </p>

                                    </div>

                                </div>

                                {userActions}

                            </div>

                        </div>

                    </div>
                )
            }
        </>
    );
}

export default Navegacao;
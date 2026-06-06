import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login as loginRequest } from "../../api/authServices";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const { login: refreshAuth, isAuthenticated } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard", {
                replace: true,
            });
        }
    }, [isAuthenticated, navigate]);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const email = form.email.trim();

        if (!email || !form.password) {
            setError("Informe seu e-mail e senha para entrar.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await loginRequest(email, form.password);
            await refreshAuth();

            navigate("/dashboard", {
                replace: true,
            });
        } catch (err) {
            setError(
                err.message ||
                    "Não foi possível fazer login. Confira seus dados e tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen bg-[#F4F1E8] text-[#334155]">
            <section className="relative hidden w-[52%] flex-col justify-between overflow-hidden bg-[#1F3D2B] px-14 py-12 lg:flex">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(111,175,95,0.32),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(183,121,62,0.24),transparent_34%)]" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#6FAF5F_1px,transparent_1px),linear-gradient(90deg,#6FAF5F_1px,transparent_1px)] [background-size:48px_48px]" />

                <Link className="relative z-10 flex items-center gap-3 text-[#FFFDF7]" to="/">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F6B3F]">
                        <svg
                            className="h-5 w-5 text-[#9DD48D]"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M4 20c1.8-8.2 8.3-13.5 16-14-2.2 7.2-7.2 12.2-16 14Z" />
                            <path d="M4 20 12 12" />
                        </svg>
                    </span>
                    <span className="text-xl font-bold tracking-wide">Gaia</span>
                </Link>

                <div className="relative z-10 max-w-xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9DD48D]">
                        Plataforma de gestão agrícola
                    </p>
                    <h1 className="mt-5 text-5xl font-extrabold leading-tight text-[#FFFDF7]">
                        Inteligência no campo, decisões mais firmes.
                    </h1>
                    <p className="mt-6 max-w-lg text-base leading-8 text-white/65">
                        Controle finanças, culturas, clima e risco agrícola em um ambiente
                        simples para a rotina da propriedade.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                        {[
                            ["Gestão financeira", "Receitas, despesas e lucro"],
                            ["Culturas", "Plantio, manejo e colheita"],
                            ["Clima", "Alertas e previsão"],
                            ["Risco agrícola", "Score inteligente por lavoura"],
                        ].map(([title, text]) => (
                            <div
                                className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                                key={title}
                            >
                                <p className="font-bold text-[#FFFDF7]">{title}</p>
                                <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative z-10 text-xs text-white/35">
                    Gaia - Gestão Agrícola Inteligente
                </p>
            </section>

            <section className="flex flex-1 items-center justify-center px-5 py-10">
                <div className="w-full max-w-md">
                    <Link
                        className="mb-10 flex items-center justify-center gap-3 text-[#1F3D2B] lg:hidden"
                        to="/"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F3D2B] text-[#9DD48D]">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M4 20c1.8-8.2 8.3-13.5 16-14-2.2 7.2-7.2 12.2-16 14Z" />
                                <path d="M4 20 12 12" />
                            </svg>
                        </span>
                        <span className="text-xl font-bold">Gaia</span>
                    </Link>

                    <div className="rounded-xl border border-[#2F6B3F]/10 bg-[#FFFDF7] p-6 shadow-xl shadow-[#1F3D2B]/10 sm:p-8">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2F6B3F]">
                                Login
                            </p>
                            <h2 className="mt-3 text-3xl font-extrabold text-[#1F3D2B]">
                                Bem-vindo de volta
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Acesse sua conta para gerenciar sua propriedade.
                            </p>
                        </div>

                        <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit}>
                            <div>
                                <label
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                    htmlFor="email"
                                >
                                    E-mail
                                </label>
                                <input
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-[#D1D9CC] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F6B3F] focus:ring-4 focus:ring-[#2F6B3F]/10"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    required
                                    type="email"
                                    value={form.email}
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-4">
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                        htmlFor="password"
                                    >
                                        Senha
                                    </label>
                                    <Link
                                        className="text-xs font-semibold text-[#2F6B3F] hover:underline"
                                        to="/forgot-password"
                                    >
                                        Esqueci minha senha
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        autoComplete="current-password"
                                        className="w-full rounded-lg border border-[#D1D9CC] bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#2F6B3F] focus:ring-4 focus:ring-[#2F6B3F]/10"
                                        id="password"
                                        name="password"
                                        onChange={handleChange}
                                        placeholder="Digite sua senha"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                    />
                                    <button
                                        aria-label={
                                            showPassword ? "Ocultar senha" : "Mostrar senha"
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-bold text-slate-500 transition hover:bg-slate-100"
                                        onClick={() => setShowPassword((visible) => !visible)}
                                        type="button"
                                    >
                                        {showPassword ? "Ocultar" : "Ver"}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-lg border border-[#C94C4C]/25 bg-[#C94C4C]/10 px-4 py-3 text-sm leading-6 text-[#A33A3A]">
                                    {error}
                                </div>
                            )}

                            <button
                                className="flex w-full items-center justify-center rounded-lg bg-[#2F6B3F] px-5 py-3 text-sm font-extrabold text-[#FFFDF7] shadow-lg shadow-[#2F6B3F]/20 transition hover:bg-[#1F3D2B] disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? "Entrando..." : "Entrar na plataforma"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Não tem uma conta?{" "}
                            <Link
                                className="font-bold text-[#2F6B3F] hover:underline"
                                to="/register"
                            >
                                Cadastre-se gratuitamente
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

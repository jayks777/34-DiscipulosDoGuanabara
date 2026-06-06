import { Link } from "react-router-dom";

export default function Register() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F4F1E8] px-5 text-[#334155]">
            <section className="w-full max-w-md rounded-xl border border-[#2F6B3F]/10 bg-[#FFFDF7] p-8 text-center shadow-xl shadow-[#1F3D2B]/10">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#2F6B3F]">
                    Gaia
                </p>
                <h1 className="mt-3 text-3xl font-extrabold text-[#1F3D2B]">
                    Cadastro em breve
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                    A página de cadastro ainda será implementada. Por enquanto, use uma conta já criada para acessar a plataforma.
                </p>
                <Link
                    className="mt-6 inline-flex rounded-lg bg-[#2F6B3F] px-5 py-3 text-sm font-extrabold text-[#FFFDF7] transition hover:bg-[#1F3D2B]"
                    to="/login"
                >
                    Voltar para login
                </Link>
            </section>
        </main>
    );
}
